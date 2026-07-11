<template>
  <div class="compile-panel">
    <div style="display: flex; gap: 8px; padding: 8px 12px; border-bottom: 1px solid var(--border-color); align-items: center;">
      <button
        class="btn btn-sm btn-success"
        :disabled="isCompiling || !hasProject"
        @click="handleCompile"
      >
        {{ isCompiling ? '编译中...' : '一键编译' }}
      </button>
      <button
        class="btn btn-sm"
        :disabled="isCompiling || !hasProject"
        @click="handleLaunchGame"
      >
        启动测试
      </button>
      <button
        class="btn btn-sm"
        @click="clearLogs"
      >
        清空日志
      </button>
      <div style="flex: 1;"></div>
      <button
        v-if="jarPath"
        class="btn btn-sm"
        @click="handleOpenFolder"
      >
        打开输出目录
      </button>
    </div>

    <div class="compile-progress-bar">
      <div
        class="compile-progress-fill"
        :style="{ width: progress + '%' }"
      ></div>
      <span class="compile-progress-text">
        {{ progressText }}
      </span>
    </div>

    <div class="compile-logs" ref="logsContainer">
      <div v-if="logs.length === 0" style="color: #666; text-align: center; padding: 40px;">
        <div style="font-size: 48px; margin-bottom: 16px;">[LOG]</div>
        <div>暂无编译日志</div>
        <div style="font-size: 12px; margin-top: 8px;">点击"一键编译"开始构建你的模组</div>
      </div>
      <div
        v-for="(log, idx) in logs"
        :key="idx"
        class="log-line"
        :class="log.type"
      >
        <span class="timestamp">[{{ log.timestamp }}]</span>
        <span>{{ log.message }}</span>
      </div>
    </div>

    <div
      v-if="jarPath"
      style="padding: 12px; border-top: 1px solid var(--border-color); background: var(--bg-tertiary);"
    >
      <div style="font-size: 12px; color: var(--success-color); font-weight: 600;">
        编译成功! Jar文件已生成
      </div>
      <div style="font-size: 11px; color: var(--text-secondary); margin-top: 4px; word-break: break-all;">
        {{ jarPath }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted, watch } from 'vue'

const props = defineProps({
  hasProject: {
    type: Boolean,
    default: false
  },
  projectPath: {
    type: String,
    default: ''
  },
  javaCode: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['compile-complete'])

const logs = ref([])
const isCompiling = ref(false)
const progress = ref(0)
const progressText = ref('准备就绪')
const jarPath = ref('')
const logsContainer = ref(null)

const addLog = (message, type = 'info') => {
  logs.value.push({
    timestamp: new Date().toLocaleTimeString(),
    message: message,
    type: type
  })
  nextTick(() => {
    if (logsContainer.value) {
      logsContainer.value.scrollTop = logsContainer.value.scrollHeight
    }
  })
}

const clearLogs = () => {
  logs.value = []
  progress.value = 0
  progressText.value = '准备就绪'
  jarPath.value = ''
}

const handleCompile = async () => {
  if (!props.projectPath || isCompiling.value) return
  
  isCompiling.value = true
  clearLogs()
  jarPath.value = ''
  
  addLog('开始编译模组项目...', 'info')
  addLog(`项目目录: ${props.projectPath}`, 'info')
  
  if (window.electronAPI && window.electronAPI.file) {
    addLog('写入Java源文件...', 'info')
    const modIdMatch = props.javaCode.match(/@Mod\("([^"]+)"\)/)
    const packageMatch = props.javaCode.match(/package\s+([^;]+);/)
    const modId = modIdMatch ? modIdMatch[1] : 'examplemod'
    const packageName = packageMatch ? packageMatch[1] : 'com.example'
    const className = modId.charAt(0).toUpperCase() + modId.slice(1) + 'Mod'
    
    const packageDir = packageName.replace(/\./g, '/')
    const srcPath = `${props.projectPath}/src/main/java/${packageDir}/${className}.java`
    
    const writeResult = await window.electronAPI.file.write(srcPath, props.javaCode)
    if (writeResult) {
      addLog(`Java源文件已保存: src/main/java/${packageDir}/${className}.java`, 'success')
    }
  }

  addLog('正在初始化Gradle环境...', 'info')
  progress.value = 10
  progressText.value = '初始化环境...'

  if (window.electronAPI && window.electronAPI.compile) {
    try {
      const result = await window.electronAPI.compile.build(props.projectPath, {})
      
      progress.value = 100
      progressText.value = result.success ? '编译成功!' : '编译失败'
      
      if (result.success) {
        addLog('编译成功!', 'success')
        if (result.jarPath) {
          jarPath.value = result.jarPath
          addLog(`Jar文件位置: ${result.jarPath}`, 'success')
        }
        if (result.duration) {
          addLog(`编译耗时: ${result.duration}秒`, 'info')
        }
        emit('compile-complete', { success: true, jarPath: result.jarPath })
      } else {
        addLog('编译失败，请检查代码', 'error')
        if (result.error) {
          addLog(`错误信息: ${result.error}`, 'error')
        }
        if (result.output) {
          const lines = result.output.split('\n').slice(0, 50)
          for (const line of lines) {
            if (line.trim()) {
              const type = line.toLowerCase().includes('error') ? 'error' :
                          line.toLowerCase().includes('warning') ? 'warning' : 'info'
              addLog(line, type)
            }
          }
        }
      }
    } catch (err) {
      addLog(`编译异常: ${err.message}`, 'error')
    }
  } else {
    addLog('正在执行Gradle构建...', 'info')
    progress.value = 50
    progressText.value = '构建中...'
    
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    progress.value = 80
    progressText.value = '打包Jar...'
    
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    progress.value = 100
    progressText.value = '编译成功!'
    addLog('编译完成! (模拟环境)', 'success')
    jarPath.value = `${props.projectPath}/build/libs/mod.jar`
    addLog(`Jar文件位置: ${jarPath.value}`, 'success')
    addLog('注意: 这是Web预览模式。完整的Gradle编译需要在Electron应用中运行。', 'warning')
    emit('compile-complete', { success: true, jarPath: jarPath.value })
  }

  isCompiling.value = false
}

const handleLaunchGame = async () => {
  if (!props.projectPath) return
  
  addLog('正在复制模组到.minecraft/mods目录...', 'info')
  
  if (window.electronAPI && window.electronAPI.compile) {
    try {
      const result = await window.electronAPI.compile.launchGame(props.projectPath)
      if (result.success) {
        addLog(result.message || '模组已复制到mods目录', 'success')
        if (result.modPath) {
          addLog(`位置: ${result.modPath}`, 'info')
        }
        addLog('请手动启动 Minecraft 客户端进行测试', 'info')
        addLog('提示: 如果启动失败，请查看下方的启动失败报告', 'warning')
      } else {
        addLog(result.error || '启动失败', 'error')
        if (result.crashReport) {
          emit('crash-report', result.crashReport)
          addLog('=== 启动失败报告 ===', 'error')
          const crashLines = result.crashReport.split('\n')
          for (const line of crashLines) {
            if (line.trim()) {
              addLog(line, 'error')
            }
          }
          addLog('=== 报告结束 ===', 'error')
        }
      }
    } catch (err) {
      addLog(`启动异常: ${err.message}`, 'error')
      emit('crash-report', {
        error: err.message,
        stack: err.stack,
        timestamp: new Date().toISOString(),
        projectPath: props.projectPath
      })
    }
  } else {
    addLog('Web预览模式下无法直接启动游戏', 'warning')
    addLog('请在Electron应用中使用完整的模组打包功能', 'info')
    addLog('=== 模拟启动失败报告 (示例) ===', 'warning')
    const mockCrashReport = `---- Minecraft Crash Report ----
Time: ${new Date().toISOString()}
Description: Mod loading error

java.lang.RuntimeException: Mod loading failed
    at net.minecraftforge.fml.ModLoader.lambda$loadMods$2(ModLoader.java:123)
    at net.minecraftforge.fml.ModLoader.loadMod(ModLoader.java:89)
Caused by: java.lang.NoClassDefFoundError: com/example/examplemod/ExampleModMod
    at java.lang.ClassLoader.defineClass(ClassLoader.java:456)
    ... 15 more

A detailed walkthrough of the error:
  Mod File: examplemod-1.0.0.jar
  Failure message: Mod examplemod requires fabric 1.21.0 or later
  Mod Version: 1.0.0
  Mod URL: (none)
  Exception message: Missing required dependency

建议解决方案:
  1. 检查模组ID是否正确
  2. 确认build.gradle中的依赖版本匹配
  3. 确保所有资源文件已正确配置
  4. 验证模组核心(Forge/Fabric)版本与MC版本兼容`
    emit('crash-report', { report: mockCrashReport })
    addLog(mockCrashReport, 'warning')
  }
}

const handleOpenFolder = async () => {
  if (!jarPath.value) return
  
  if (window.electronAPI && window.electronAPI.shell) {
    const folderPath = jarPath.value.replace(/\/[^/]+\.jar$/, '')
    await window.electronAPI.shell.openPath(folderPath)
  }
}

if (window.electronAPI && window.electronAPI.compile) {
  window.electronAPI.compile.onProgress((data) => {
    progress.value = data.progress
    if (data.message) {
      addLog(data.message, data.type || 'info')
    }
  })
}
</script>