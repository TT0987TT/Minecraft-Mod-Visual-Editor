<template>
  <div class="app-container" :data-lang="currentLocale">
    <div v-if="uiStore.showAnnouncement" class="announcement-bar">
      <span>{{ t('app.announcement') }}</span>
      <button class="close-btn" @click="uiStore.dismissAnnouncement()">×</button>
    </div>

    <header class="app-header">
      <span class="title">
        {{ t('app.title') }}
        <span class="version-tag">{{ t('app.version') }}</span>
      </span>
      <span class="creator-name">{{ t('app.creator') }}</span>
      <span v-if="projectStore.isLoaded" class="project-info">
        {{ projectStore.modName }} ({{ projectStore.modId }})
        <span v-if="projectStore.platform === 'fabric'" style="color:#8b5cf6;margin-left:4px;">Fabric</span>
        <span v-else style="color:#f59e0b;margin-left:4px;">Forge</span>
        <span style="margin-left:4px;font-size:10px;">{{ projectStore.mcVersion }}</span>
      </span>
      <div class="header-actions">
        <div class="lang-selector">
          <select v-model="currentLang" @change="changeLanguage">
            <option value="zh-CN">中文</option>
            <option value="en-US">English</option>
            <option value="lzh">文言文</option>
          </select>
        </div>
        <button class="btn btn-sm" @click="showNewProjectModal = true" v-if="!projectStore.isLoaded">
          {{ t('menu.newProject') }}
        </button>
        <button class="btn btn-sm" @click="handleOpenProject" v-if="!projectStore.isLoaded">
          {{ t('menu.openProject') }}
        </button>
        <button class="btn btn-sm" @click="showCustomBlockModal = true" v-if="projectStore.isLoaded">
          {{ t('menu.customBlock') }}
        </button>
        <button class="btn btn-sm" @click="toggleTheme">
          {{ uiStore.theme === 'light' ? '暗色' : '亮色' }}
        </button>
        <button class="btn btn-sm" @click="handleAbout">
          {{ t('menu.about') }}
        </button>
      </div>
    </header>

    <div v-if="!projectStore.isLoaded" class="main-layout">
      <div class="home-container">
        <div class="home-logo">M</div>
        <div class="home-title">{{ t('app.title') }}</div>
        <div class="home-subtitle">{{ t('app.subtitle') }}</div>
        <div style="display: flex; gap: 12px; margin-top: 8px;">
          <button class="btn btn-primary" @click="showNewProjectModal = true">
            {{ t('home.createNew') }}
          </button>
          <button class="btn" @click="handleOpenProject">
            {{ t('home.openExisting') }}
          </button>
        </div>
        <div class="home-features">
          <div class="home-feature-card">
            <div class="home-feature-icon">■</div>
            <div class="home-feature-title">{{ t('home.feature1Title') }}</div>
            <div class="home-feature-desc">{{ t('home.feature1Desc') }}</div>
          </div>
          <div class="home-feature-card">
            <div class="home-feature-icon">□</div>
            <div class="home-feature-title">{{ t('home.feature2Title') }}</div>
            <div class="home-feature-desc">{{ t('home.feature2Desc') }}</div>
          </div>
          <div class="home-feature-card">
            <div class="home-feature-icon">¶</div>
            <div class="home-feature-title">{{ t('home.feature3Title') }}</div>
            <div class="home-feature-desc">{{ t('home.feature3Desc') }}</div>
          </div>
          <div class="home-feature-card">
            <div class="home-feature-icon">§</div>
            <div class="home-feature-title">{{ t('home.feature4Title') }}</div>
            <div class="home-feature-desc">{{ t('home.feature4Desc') }}</div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="main-layout">
      <aside class="left-sidebar">
        <div class="sidebar-header">
          <span>{{ t('editor.blocks') }}</span>
          <button class="btn btn-sm" @click="showCustomBlockModal = true">
            + {{ t('menu.customBlock') }}
          </button>
        </div>
        <div class="blockly-toolbox">
          <div v-if="customBlocks.length > 0" style="margin-bottom: 12px;">
            <div style="font-size: 12px; font-weight: 600; margin-bottom: 8px; color: #FFD700;">
              {{ t('editor.customBlocks') }} ({{ customBlocks.length }})
            </div>
            <div
              v-for="block in customBlocks"
              :key="block.id"
              class="custom-block-item"
            >
              <div class="block-name">
                <span :style="{ display: 'inline-block', width: 10, height: 10, background: block.color, borderRadius: 2, marginRight: 6 }"></span>
                {{ block.name }}
              </div>
              <div v-if="block.description" class="block-desc">{{ block.description }}</div>
              <div class="block-actions">
                <button class="btn btn-sm" @click="editCustomBlock(block)">编辑</button>
                <button class="btn btn-sm btn-danger" @click="deleteCustomBlock(block.id)">删除</button>
              </div>
            </div>
          </div>
          <div style="font-size: 12px; color: var(--text-secondary); padding: 8px; line-height: 1.6;">
            {{ t('editor.hints') }}
          </div>
          <div style="font-size: 11px; color: var(--text-secondary); padding: 12px 8px; line-height: 1.7; margin-top: 16px; background: var(--bg-secondary); border-radius: 8px; border: 1px solid var(--border-color);">
            <strong>{{ t('editor.blockCategories') }}:</strong><br>
            - 模组基础 / 方块系统 / 物品盔甲工具<br>
            - 自定义实体 / 世界生成 / 事件监听<br>
            - 附魔药水 / 合成系统 / GUI界面<br>
            - 网络通信 / 粒子效果 / 声音系统<br>
            - 进度系统 / 数据组件 / 标签系统<br>
            - 结构生成 / 交易系统 / 命令系统<br>
            - 维度系统 / 渲染系统 / 逻辑控制<br>
            - 数学运算 / 文本操作 / 列表数组<br>
            - 变量 / 函数方法 / 自定义积木
          </div>
        </div>
      </aside>

      <BlocklyEditor
        ref="blocklyEditorRef"
        :custom-blocks="customBlocks"
        @code-generated="handleCodeGenerated"
        @blocks-changed="handleBlocksChanged"
      />

      <aside class="right-panel">
        <div class="right-panel-tabs">
          <div class="right-panel-tab" :class="{ active: rightPanelTab === 'code' }" @click="rightPanelTab = 'code'">
            {{ t('editor.code') }}
          </div>
          <div class="right-panel-tab" :class="{ active: rightPanelTab === 'compile' }" @click="rightPanelTab = 'compile'">
            {{ t('editor.compile') }}
          </div>
          <div class="right-panel-tab" :class="{ active: rightPanelTab === 'files' }" @click="rightPanelTab = 'files'; refreshFileTree()">
            {{ t('editor.files') }}
          </div>
        </div>
        <div class="right-panel-content">
          <div v-if="rightPanelTab === 'code'" style="flex: 1; display: flex; flex-direction: column;">
            <div style="display: flex; gap: 8px; padding: 8px 12px; border-bottom: 1px solid var(--border-color); align-items: center;">
              <span style="font-size: 12px; color: var(--text-secondary);">{{ currentFileName }}</span>
              <div style="flex: 1;"></div>
              <label style="font-size: 11px; color: var(--text-secondary); cursor: pointer; display: flex; align-items: center; gap: 4px;">
                <input type="checkbox" v-model="uiStore.autoCheckEnabled" style="cursor: pointer;" />
                {{ t('editor.autoCheck') }}
              </label>
              <button class="btn btn-sm" @click="handleSaveCode" :disabled="isSyncing">
                {{ t('editor.save') }}
              </button>
              <button class="btn btn-sm" @click="handleCodeToBlocks" :disabled="isSyncing">
                {{ t('editor.parseToBlocks') }}
              </button>
            </div>
            <CodeEditor
              ref="codeEditorRef"
              v-model="javaCode"
              language="java"
              @code-changed="handleCodeChanged"
            />
            <div v-if="editorStore.codeErrors.length > 0" class="code-error-panel">
              <div v-for="(err, idx) in editorStore.codeErrors" :key="idx" class="code-error-item">
                <span class="error-line">L{{ err.line || '?' }}</span>
                <span>{{ err.message }}</span>
              </div>
            </div>
          </div>

          <div v-else-if="rightPanelTab === 'compile'">
            <CompilePanel
              :has-project="projectStore.isLoaded"
              :project-path="projectStore.projectPath"
              :java-code="javaCode"
              @compile-complete="handleCompileComplete"
              @crash-report="handleCrashReport"
            />
            <div v-if="crashReport" class="crash-report-panel">
              <div class="crash-report-header">
                <span>{{ t('editor.crashReport') }}</span>
                <button class="btn btn-sm" @click="crashReport = null">×</button>
              </div>
              <pre class="crash-report-content">{{ typeof crashReport === 'string' ? crashReport : crashReport.report || crashReport.error || JSON.stringify(crashReport, null, 2) }}</pre>
            </div>
          </div>

          <div v-else-if="rightPanelTab === 'files'" class="file-tree-wrapper">
            <div v-if="fileTree.length === 0" style="text-align: center; padding: 40px; color: var(--text-secondary);">
              {{ t('status.loading') }}
            </div>
            <div v-else style="font-family: 'Cascadia Code', 'Consolas', monospace; font-size: 12px;">
              <div
                v-for="(file, idx) in fileTree"
                :key="idx"
                style="padding: 5px 8px; cursor: pointer; border-radius: 4px; transition: background 0.15s;"
                :style="{ 
                  paddingLeft: (file.depth * 16 + 8) + 'px',
                  background: selectedFile === file.path ? 'var(--bg-tertiary)' : 'transparent'
                }"
                @click="handleFileClick(file)"
                @dblclick="handleFileDblClick(file)"
              >
                {{ file.isDirectory ? '[DIR]' : '[FILE]' }} {{ file.name }}
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>

    <div class="bottom-bar">
      <div class="supported-platforms">
        <span style="font-weight:600;">支持:</span>
        <span class="platform-tag">Forge 1.12.2~1.21.4</span>
        <span class="platform-tag">Fabric 1.16.5~1.21.10</span>
      </div>
      <div style="flex: 1;"></div>
      <span v-if="projectStore.isLoaded" class="status-item">
        {{ projectStore.platform === 'fabric' ? 'Fabric' : 'Forge' }} {{ projectStore.mcVersion }}
      </span>
      <span class="status-item">
        JDK {{ projectStore.mcVersion >= '1.21.10' ? '21' : (projectStore.mcVersion >= '1.18' ? '17' : (projectStore.mcVersion >= '1.17' ? '16' : '8')) }}
      </span>
      <span v-if="projectStore.isLoaded" class="status-item">
        {{ projectStore.projectPath }}
      </span>
      <span class="status-item">
        {{ t('status.blocks') }}: {{ customBlocks.length }}
      </span>
      <span class="status-item" style="font-weight:500;">
        {{ t('app.version') }}
      </span>
    </div>

    <ProjectCreator
      :visible="showNewProjectModal"
      @close="showNewProjectModal = false"
      @create="handleCreateProject"
    />

    <CustomBlockCreator
      :visible="showCustomBlockModal"
      :edit-block="editingCustomBlock"
      @close="handleCustomBlockClose"
      @save="handleCustomBlockSave"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useProjectStore, useUIStore, useEditorStore } from './store'
import BlocklyEditor from './components/BlocklyEditor.vue'
import CodeEditor from './components/CodeEditor.vue'
import ProjectCreator from './components/ProjectCreator.vue'
import CustomBlockCreator from './components/CustomBlockCreator.vue'
import CompilePanel from './components/CompilePanel.vue'
import { generateJavaCode, parseJavaCodeToBlocks } from './utils/codeGenerator'
import { t, setLocale, getCurrentLang, currentLocale } from './locales'

const projectStore = useProjectStore()
const uiStore = useUIStore()
const editorStore = useEditorStore()

const blocklyEditorRef = ref(null)
const codeEditorRef = ref(null)
const javaCode = ref('')
const blocksXml = ref('')
const rightPanelTab = ref('code')
const showNewProjectModal = ref(false)
const showCustomBlockModal = ref(false)
const editingCustomBlock = ref(null)
const isSyncing = ref(false)
const fileTree = ref([])
const selectedFile = ref(null)
const currentLang = ref(getCurrentLang())
const crashReport = ref(null)

const customBlocks = computed(() => projectStore.customBlocks || [])
const currentFileName = computed(() => {
  const modId = projectStore.modId || 'modid'
  const className = modId.charAt(0).toUpperCase() + modId.slice(1) + 'Mod.java'
  return className
})

const changeLanguage = () => {
  setLocale(currentLang.value)
  uiStore.setLanguage(currentLang.value)
}

watch(currentLang, (newLang) => {
  setLocale(newLang)
  uiStore.setLanguage(newLang)
})

const toggleTheme = () => {
  uiStore.setTheme(uiStore.theme === 'light' ? 'dark' : 'light')
  if (uiStore.theme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

const handleAbout = () => {
  alert(t('about.content'))
}

const handleCreateProject = async (config) => {
  showNewProjectModal.value = false
  
  if (!window.electronAPI || !window.electronAPI.project) {
    alert('Web预览模式下无法创建实际文件系统项目\n\n请运行完整的Electron应用以获得完整功能。')
    projectStore.setProject(
      config.projectPath,
      config,
      { workspace: { customBlocks: [], blocks: [] } }
    )
    refreshFileTree()
    javaCode.value = generateJavaCode('', projectStore)
    return
  }

  const result = await window.electronAPI.project.create(config)
  if (result.success) {
    projectStore.setProject(
      result.projectPath,
      config,
      result.projectFile
    )
    if (config.modIcon) {
      projectStore.setModIcon(config.modIcon)
    }
    refreshFileTree()
    javaCode.value = generateJavaCode('', projectStore)
    performAutoCheck()
    alert('项目创建成功!\n\n目录: ' + result.projectPath)
  } else {
    alert('项目创建失败: ' + (result.error || '未知错误'))
  }
}

const handleOpenProject = async () => {
  if (!window.electronAPI || !window.electronAPI.dialog) {
    alert('Web预览模式下无法从文件系统打开项目\n\n请运行完整的Electron应用。')
    const mockConfig = {
      projectPath: '/demo/project',
      modId: 'demo_mod',
      modName: 'Demo Mod',
      modVersion: '1.0.0',
      author: '真NB工作室',
      platform: 'forge',
      mcVersion: '1.20.1',
      packageName: 'com.demo.demomod',
      description: '示例模组项目'
    }
    projectStore.setProject(mockConfig.projectPath, mockConfig, { workspace: { customBlocks: [], blocks: [] } })
    javaCode.value = generateJavaCode('', projectStore)
    return
  }

  const projectDir = await window.electronAPI.dialog.openDirectory()
  if (!projectDir) return

  const result = await window.electronAPI.project.load(projectDir)
  if (result.success) {
    projectStore.setProject(
      result.projectPath,
      result.projectFile.config,
      result.projectFile
    )
    refreshFileTree()
    javaCode.value = generateJavaCode('', projectStore)
    performAutoCheck()
    
    if (result.projectFile.workspace && result.projectFile.workspace.blocks && blocklyEditorRef.value) {
      blocklyEditorRef.value.loadBlocksFromXml(result.projectFile.workspace.blocks)
    }
  } else {
    alert('无法打开项目: ' + (result.error || '该目录不是有效的模组项目'))
  }
}

const handleCodeGenerated = (code, xml) => {
  javaCode.value = code
  blocksXml.value = xml
  
  if (uiStore.autoCheckEnabled) {
    performAutoCheck()
  }
  
  if (window.electronAPI && window.electronAPI.project && projectStore.isLoaded) {
    window.electronAPI.project.save(projectStore.projectPath, {
      workspace: {
        blocks: xml,
        customBlocks: customBlocks.value
      }
    })
  }
}

const handleBlocksChanged = (xml) => {
  blocksXml.value = xml
}

const handleCodeChanged = (code) => {
  javaCode.value = code
  if (uiStore.autoCheckEnabled) {
    debouncedAutoCheck()
  }
}

let autoCheckTimer = null
const debouncedAutoCheck = () => {
  if (autoCheckTimer) clearTimeout(autoCheckTimer)
  autoCheckTimer = setTimeout(() => performAutoCheck(), 800)
}

const performAutoCheck = () => {
  const errors = []
  const code = javaCode.value
  const platform = projectStore.platform || 'forge'
  
  if (!code || code.trim().length === 0) {
    editorStore.setCodeErrors([])
    return
  }

  const lines = code.split('\n')
  
  const braceCount = (code.match(/\{/g) || []).length - (code.match(/\}/g) || []).length
  if (braceCount !== 0) {
    errors.push({ line: '?', message: `括号不匹配: 多了 ${braceCount > 0 ? braceCount : -braceCount} 个${braceCount > 0 ? '{' : '}'}` })
  }
  
  const parenCount = (code.match(/\(/g) || []).length - (code.match(/\)/g) || []).length
  if (parenCount !== 0) {
    errors.push({ line: '?', message: `圆括号不匹配` })
  }
  
  if (platform === 'fabric') {
    if (!code.includes('implements ModInitializer') && !code.includes('implements ClientModInitializer')) {
      errors.push({ line: '?', message: 'Fabric模组需要实现 ModInitializer 接口' })
    }
    if (!code.includes('onInitialize')) {
      errors.push({ line: '?', message: '缺少 onInitialize() 方法' })
    }
  } else {
    if (!code.includes('@Mod(') && !code.includes('@Mod("')) {
      errors.push({ line: '?', message: '缺少 @Mod 注解' })
    }
  }
  
  if (!code.includes('package ')) {
    errors.push({ line: '1', message: '缺少 package 声明' })
  }
  
  const classMatch = code.match(/class\s+(\w+)/)
  if (classMatch) {
    const fileName = currentFileName.value.replace('.java', '')
    if (classMatch[1] !== fileName) {
      errors.push({ line: '?', message: `类名 "${classMatch[1]}" 与文件名 "${fileName}.java" 不匹配` })
    }
  }
  
  editorStore.setCodeErrors(errors)
}

const handleSaveCode = async () => {
  if (!projectStore.isLoaded) return
  
  const modId = projectStore.modId || 'modid'
  const className = modId.charAt(0).toUpperCase() + modId.slice(1) + 'Mod'
  const packageName = projectStore.packageName || 'com.example'
  const packageDir = packageName.replace(/\./g, '/')
  const filePath = `${projectStore.projectPath}/src/main/java/${packageDir}/${className}.java`
  
  if (!window.electronAPI || !window.electronAPI.file) {
    alert('Web预览模式\n\n代码已在内存中保存')
    return
  }

  const result = await window.electronAPI.file.write(filePath, javaCode.value)
  if (result) {
    alert('文件已保存:\n' + filePath)
  } else {
    alert('保存失败')
  }
}

const handleCodeToBlocks = () => {
  if (!blocklyEditorRef.value) return
  isSyncing.value = true
  const xml = parseJavaCodeToBlocks(javaCode.value)
  blocklyEditorRef.value.loadBlocksFromXml(xml)
  setTimeout(() => { isSyncing.value = false }, 500)
}

const editCustomBlock = (block) => {
  editingCustomBlock.value = block
  showCustomBlockModal.value = true
}

const deleteCustomBlock = (id) => {
  if (!confirm('确定要删除这个自定义积木吗?')) return
  projectStore.deleteCustomBlock(id)
}

const handleCustomBlockClose = () => {
  showCustomBlockModal.value = false
  editingCustomBlock.value = null
}

const handleCustomBlockSave = (blockData) => {
  if (editingCustomBlock.value) {
    projectStore.updateCustomBlock(editingCustomBlock.value.id, blockData)
  } else {
    projectStore.addCustomBlock(blockData)
  }
  if (blocklyEditorRef.value) {
    setTimeout(() => {
      blocklyEditorRef.value.forceUpdate && blocklyEditorRef.value.forceUpdate()
    }, 100)
  }
}

const handleCompileComplete = (result) => {
  if (result && result.success) {
    rightPanelTab.value = 'compile'
  }
}

const handleCrashReport = (report) => {
  crashReport.value = report
  if (report) {
    editorStore.setCrashReport(report)
    rightPanelTab.value = 'compile'
  }
}

const refreshFileTree = async () => {
  if (!projectStore.isLoaded) { fileTree.value = []; return }
  
  if (!window.electronAPI || !window.electronAPI.file) {
    fileTree.value = [
      { name: 'src', isDirectory: true, depth: 0, path: 'src' },
      { name: 'main', isDirectory: true, depth: 1, path: 'src/main' },
      { name: 'java', isDirectory: true, depth: 2, path: 'src/main/java' },
      { name: `${projectStore.modId}Mod.java`, isDirectory: false, depth: 3, path: 'main.java' },
      { name: 'resources', isDirectory: true, depth: 2, path: 'src/main/resources' },
      { name: 'mods.toml', isDirectory: false, depth: 3, path: 'mods.toml' },
      { name: 'build.gradle', isDirectory: false, depth: 0, path: 'build.gradle' },
      { name: 'settings.gradle', isDirectory: false, depth: 0, path: 'settings.gradle' },
      { name: 'gradle.properties', isDirectory: false, depth: 0, path: 'gradle.properties' }
    ]
    return
  }

  const result = await window.electronAPI.file.list(projectStore.projectPath)
  const tree = []
  
  if (result.success && result.entries) {
    for (const entry of result.entries) {
      if (!entry.name.startsWith('.')) {
        tree.push({
          name: entry.name,
          isDirectory: entry.isDirectory,
          depth: 0,
          path: entry.path
        })
      }
    }
  }
  
  fileTree.value = tree
}

const handleFileClick = (file) => {
  selectedFile.value = file.path
}

const handleFileDblClick = async (file) => {
  if (file.isDirectory) return
  
  if (!window.electronAPI || !window.electronAPI.file) {
    alert('Web预览模式下无法读取文件')
    return
  }

  const result = await window.electronAPI.file.read(file.path)
  if (result && result.success) {
    javaCode.value = result.content
    if (file.name.endsWith('.java')) {
      rightPanelTab.value = 'code'
    }
  }
}

onMounted(() => {
  const defaultCode = generateJavaCode('', {
    modId: 'examplemod',
    modName: 'Example Mod',
    packageName: 'com.example.examplemod',
    customBlocks: [],
    platform: 'forge',
    mcVersion: '1.20.1'
  })
  javaCode.value = defaultCode
})
</script>