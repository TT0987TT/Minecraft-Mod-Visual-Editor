const { exec, spawn } = require('child_process')
const path = require('path')
const fs = require('fs')
const os = require('os')

function getJavaPath() {
  const appPath = process.resourcesPath || path.join(__dirname, '../../../resources')
  const bundledJdk = path.join(appPath, 'jdk', 'bin', 'java.exe')
  if (fs.existsSync(bundledJdk)) {
    return bundledJdk
  }
  const localJdk = path.join(process.cwd(), 'resources', 'jdk', 'bin', 'java.exe')
  if (fs.existsSync(localJdk)) {
    return localJdk
  }
  return 'java'
}

function getGradlePath(projectPath) {
  const gradlewBat = path.join(projectPath, 'gradlew.bat')
  if (fs.existsSync(gradlewBat)) {
    return gradlewBat
  }
  return 'gradle'
}

function sanitizeChinesePath(inputPath) {
  const dirName = path.dirname(inputPath)
  const baseName = path.basename(inputPath)
  const sanitizedBase = baseName.replace(/[^\x00-\x7F]/g, '_').replace(/\s+/g, '_')
  if (sanitizedBase !== baseName) {
    return path.join(path.dirname(dirName), 'mcmod_temp_' + Date.now(), sanitizedBase)
  }
  return inputPath
}

async function compileProject(projectPath, options, progressCallback) {
  return new Promise((resolve) => {
    const workPath = sanitizeChinesePath(projectPath)
    const isTempWork = workPath !== projectPath
    
    if (isTempWork) {
      try {
        copyDirectory(projectPath, workPath)
      } catch (err) {
        resolve({
          success: false,
          error: '路径包含中文或特殊字符，临时目录创建失败: ' + err.message,
          output: ''
        })
        return
      }
    }

    let logs = []
    let startTime = Date.now()

    progressCallback(5, '初始化编译环境...', 'info')

    const gradlewBat = path.join(workPath, 'gradlew.bat')
    if (!fs.existsSync(gradlewBat)) {
      generateGradleWrapper(workPath)
    }

    const javaHome = detectJavaHome()
    const env = { ...process.env }
    if (javaHome) {
      env.JAVA_HOME = javaHome
    }

    progressCallback(15, '正在清理旧的编译产物...', 'info')

    const cleanProcess = spawn('cmd', ['/c', 'gradlew.bat', 'clean'], {
      cwd: workPath,
      env: env,
      shell: true
    })

    cleanProcess.stdout.on('data', (data) => {
      const msg = data.toString()
      logs.push(msg)
      progressCallback(25, '清理完成，准备编译...', 'info')
    })

    cleanProcess.stderr.on('data', (data) => {
      logs.push(data.toString())
    })

    cleanProcess.on('close', (code) => {
      progressCallback(30, '开始编译模组代码...', 'info')

      const buildProcess = spawn('cmd', ['/c', 'gradlew.bat', 'build', '--no-daemon', '-x', 'test'], {
        cwd: workPath,
        env: env,
        shell: true
      })

      let buildOutput = ''

      buildProcess.stdout.on('data', (data) => {
        const msg = data.toString()
        buildOutput += msg
        logs.push(msg)
        
        if (msg.includes('BUILD SUCCESSFUL')) {
          progressCallback(90, '编译即将完成...', 'success')
        } else if (msg.includes('> Task')) {
          const taskMatch = msg.match(/> Task\s+(.+)/)
          if (taskMatch) {
            const currentProgress = 30 + Math.min(60, (taskMatch.index / buildOutput.length) * 60)
            progressCallback(Math.floor(currentProgress), '正在执行: ' + taskMatch[1].trim(), 'info')
          }
        }
      })

      buildProcess.stderr.on('data', (data) => {
        const msg = data.toString()
        buildOutput += msg
        logs.push(msg)
      })

      buildProcess.on('close', (buildCode) => {
        const duration = ((Date.now() - startTime) / 1000).toFixed(2)
        
        if (buildCode === 0 || buildOutput.includes('BUILD SUCCESSFUL')) {
          const jarPath = findBuiltJar(workPath)
          progressCallback(100, '编译完成! 耗时 ' + duration + 's', 'success')
          
          if (isTempWork && jarPath) {
            const destDir = path.join(projectPath, 'build', 'libs')
            if (!fs.existsSync(destDir)) {
              fs.mkdirSync(destDir, { recursive: true })
            }
            const jarName = path.basename(jarPath)
            fs.copyFileSync(jarPath, path.join(destDir, jarName))
          }

          resolve({
            success: true,
            jarPath: jarPath || '未找到jar文件',
            output: logs.join('\n'),
            duration: duration
          })
        } else {
          const errors = parseBuildErrors(buildOutput)
          progressCallback(100, '编译失败，请查看日志', 'error')
          resolve({
            success: false,
            error: errors.length > 0 ? errors[0] : '编译失败，请查看详细日志',
            errors: errors,
            output: logs.join('\n'),
            duration: duration
          })
        }

        if (isTempWork) {
          try {
            removeDirectory(workPath)
          } catch (e) {}
        }
      })

      buildProcess.on('error', (err) => {
        progressCallback(100, '编译进程异常: ' + err.message, 'error')
        resolve({
          success: false,
          error: '编译进程启动失败: ' + err.message,
          output: logs.join('\n')
        })
      })
    })

    cleanProcess.on('error', (err) => {
      progressCallback(100, '清理失败: ' + err.message, 'error')
      resolve({
        success: false,
        error: '清理进程启动失败: ' + err.message,
        output: logs.join('\n')
      })
    })
  })
}

function parseBuildErrors(output) {
  const errors = []
  const lines = output.split('\n')
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (line.includes('error:') || line.includes('ERROR') || line.match(/\.java:\d+:/)) {
      errors.push(line.trim())
    }
  }
  
  return errors
}

function findBuiltJar(projectPath) {
  const libsDir = path.join(projectPath, 'build', 'libs')
  if (!fs.existsSync(libsDir)) return null
  
  const files = fs.readdirSync(libsDir).filter(f => f.endsWith('.jar') && !f.includes('-sources') && !f.includes('-javadoc'))
  if (files.length > 0) {
    return path.join(libsDir, files[0])
  }
  return null
}

function generateGradleWrapper(projectPath) {
  const gradlewContent = `@rem
@rem Copyright 2015 the original author or authors.
@rem
@rem Licensed under the Apache License, Version 2.0 (the "License");
@rem you may not use this file except in compliance with the License.
@rem You may obtain a copy of the License at
@rem
@rem      https://www.apache.org/licenses/LICENSE-2.0
@rem
@rem Unless required by applicable law or agreed to in writing, software
@rem distributed under the License is distributed on an "AS IS" BASIS,
@rem WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
@rem See the License for the specific language governing permissions and
@rem limitations under the License.
@rem

@if "%DEBUG%" == "" @echo off
@rem ##########################################################################
@rem
@rem  Gradle startup script for Windows
@rem
@rem ##########################################################################

@rem Set local scope for the variables with windows NT shell
if "%OS%"=="Windows_NT" setlocal

set DIRNAME=%~dp0
if "%DIRNAME%" == "" set DIRNAME=.
set APP_BASE_NAME=%~n0
set APP_HOME=%DIRNAME%

@rem Resolve any "." and ".." in APP_HOME to make it shorter.
for %%i in ("%APP_HOME%") do set APP_HOME=%%~fi

@rem Add default JVM options here. You can also use JAVA_OPTS and GRADLE_OPTS to pass JVM options to this script.
set DEFAULT_JVM_OPTS="-Xmx6g" "-Xms1g"

@rem Find java.exe
if defined JAVA_HOME goto findJavaFromJavaHome

set JAVA_EXE=java.exe
%JAVA_EXE% -version >NUL 2>&1
if "%ERRORLEVEL%" == "0" goto execute

echo.
echo ERROR: JAVA_HOME is not set and no 'java' command could be found in your PATH.
echo.
echo Please set the JAVA_HOME variable in your environment to match the
echo location of your Java installation.

goto fail

:findJavaFromJavaHome
set JAVA_HOME=%JAVA_HOME:"=%
set JAVA_EXE=%JAVA_HOME%/bin/java.exe

if exist "%JAVA_EXE%" goto execute

echo.
echo ERROR: JAVA_HOME is set to an invalid directory: %JAVA_HOME%
echo.
echo Please set the JAVA_HOME variable in your environment to match the
echo location of your Java installation.

goto fail

:execute
@rem Setup the command line

set CLASSPATH=%APP_HOME%\gradle\wrapper\gradle-wrapper.jar

@rem Execute Gradle
"%JAVA_EXE%" %DEFAULT_JVM_OPTS% %JAVA_OPTS% %GRADLE_OPTS% "-Dorg.gradle.appname=%APP_BASE_NAME%" -classpath "%CLASSPATH%" org.gradle.wrapper.GradleWrapperMain %*

:end
@rem End local scope for the variables with windows NT shell
if "%ERRORLEVEL%"=="0" goto mainEnd

:fail
rem Set variable GRADLE_EXIT_CONSOLE if you need the _script_ return code instead of
rem the _cmd.exe /c_ return code!
if  not "" == "%GRADLE_EXIT_CONSOLE%" exit 1
exit /b 1

:mainEnd
if "%OS%"=="Windows_NT" endlocal

:omega
`
  
  fs.writeFileSync(path.join(projectPath, 'gradlew.bat'), gradlewContent)
}

function detectJavaHome() {
  if (process.env.JAVA_HOME) {
    return process.env.JAVA_HOME
  }
  return null
}

function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true })
  }
  const entries = fs.readdirSync(src, { withFileTypes: true })
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)
    if (entry.isDirectory()) {
      if (!entry.name.startsWith('.') && entry.name !== 'build' && entry.name !== 'node_modules' && entry.name !== 'dist') {
        copyDirectory(srcPath, destPath)
      }
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

function removeDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) return
  const entries = fs.readdirSync(dirPath, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name)
    if (entry.isDirectory()) {
      removeDirectory(fullPath)
    } else {
      try {
        fs.unlinkSync(fullPath)
      } catch (e) {}
    }
  }
  try {
    fs.rmdirSync(dirPath)
  } catch (e) {}
}

async function launchMinecraft(projectPath) {
  return new Promise((resolve) => {
    const jarPath = findBuiltJar(projectPath)
    if (!jarPath) {
      resolve({
        success: false,
        error: '未找到编译后的jar文件，请先编译项目'
      })
      return
    }

    const minecraftDir = path.join(os.homedir(), '.minecraft')
    const modsDir = path.join(minecraftDir, 'mods')
    
    if (!fs.existsSync(modsDir)) {
      fs.mkdirSync(modsDir, { recursive: true })
    }

    const jarName = path.basename(jarPath)
    const destModPath = path.join(modsDir, jarName)
    
    try {
      fs.copyFileSync(jarPath, destModPath)
    } catch (err) {
      resolve({
        success: false,
        error: '复制mod到.minecraft目录失败: ' + err.message
      })
      return
    }

    resolve({
      success: true,
      message: '模组已复制到 ' + destModPath + '，请手动启动 Minecraft Forge 1.20.1 客户端进行测试',
      modPath: destModPath
    })
  })
}

module.exports = {
  compileProject,
  launchMinecraft,
  getJavaPath,
  findBuiltJar
}