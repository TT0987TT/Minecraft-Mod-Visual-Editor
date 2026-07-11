const { app, BrowserWindow, ipcMain, dialog, shell, nativeTheme } = require('electron')
const path = require('path')
const fs = require('fs')
const os = require('os')

const forgeCompiler = require('./compiler/forgeCompiler')
const projectManager = require('./project/projectManager')
const fileManager = require('./resources/fileManager')

let mainWindow = null
let isDev = process.env.NODE_ENV === 'development'

function fixWindowsCompatibility() {
  if (process.platform === 'win32') {
    app.commandLine.appendSwitch('disable-features', 'RendererAppContainer')
    app.commandLine.appendSwitch('disable-gpu-compositing')
    app.commandLine.appendSwitch('in-process-gpu')
    app.commandLine.appendSwitch('disable-renderer-backgrounding')
    app.commandLine.appendSwitch('disable-background-timer-throttling')
    
    const winVersion = os.release()
    if (winVersion.startsWith('10.') || winVersion.startsWith('6.3')) {
      app.commandLine.appendSwitch('disable-direct-composition')
    }
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1600,
    height: 900,
    minWidth: 1280,
    minHeight: 720,
    frame: true,
    backgroundColor: nativeTheme.shouldUseDarkColors ? '#1e1e1e' : '#ffffff',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
      backgroundThrottling: false
    },
    icon: path.join(__dirname, '../../resources/icons/icon.png')
  })

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173')
    mainWindow.webContents.openDevTools({ mode: 'detach' })
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('theme:change', nativeTheme.shouldUseDarkColors ? 'dark' : 'light')
  })

  nativeTheme.on('updated', () => {
    if (mainWindow) {
      mainWindow.webContents.send('theme:change', nativeTheme.shouldUseDarkColors ? 'dark' : 'light')
    }
  })
}

fixWindowsCompatibility()

app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

ipcMain.handle('dialog:openDirectory', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory']
  })
  if (!result.canceled) {
    return result.filePaths[0]
  }
  return null
})

ipcMain.handle('dialog:openFile', async (_, filters) => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: filters || []
  })
  if (!result.canceled) {
    return result.filePaths[0]
  }
  return null
})

ipcMain.handle('dialog:saveFile', async (_, defaultName) => {
  const result = await dialog.showSaveDialog(mainWindow, {
    defaultPath: defaultName || 'mod-project'
  })
  if (!result.canceled) {
    return result.filePath
  }
  return null
})

ipcMain.handle('project:create', (_, config) => {
  return projectManager.createProject(config)
})

ipcMain.handle('project:load', (_, projectPath) => {
  return projectManager.loadProject(projectPath)
})

ipcMain.handle('project:save', (_, projectPath, data) => {
  return projectManager.saveProject(projectPath, data)
})

ipcMain.handle('project:generateStructure', (_, config) => {
  return projectManager.generateForgeStructure(config)
})

ipcMain.handle('compile:build', (_, projectPath, options) => {
  return new Promise((resolve) => {
    forgeCompiler.compileProject(projectPath, options, (progress, message, type) => {
      if (mainWindow) {
        mainWindow.webContents.send('compile:progress', { progress, message, type })
      }
    }).then((result) => {
      resolve(result)
    })
  })
})

ipcMain.handle('compile:launchGame', (_, projectPath) => {
  return forgeCompiler.launchMinecraft(projectPath)
})

ipcMain.handle('file:read', (_, filePath, encoding) => {
  try {
    const content = fs.readFileSync(filePath, encoding || 'utf-8')
    return { success: true, content }
  } catch (err) {
    return { success: false, error: err.message }
  }
})

ipcMain.handle('file:write', (_, filePath, content, encoding) => {
  try {
    const dir = path.dirname(filePath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(filePath, content, encoding || 'utf-8')
    return { success: true }
  } catch (err) => {
    return { success: false, error: err.message }
  }
})

ipcMain.handle('file:exists', (_, filePath) => {
  return fs.existsSync(filePath)
})

ipcMain.handle('file:list', (_, dirPath) => {
  return fileManager.listDirectory(dirPath)
})

ipcMain.handle('file:delete', (_, filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }
    return { success: true }
  } catch (err) {
    return { success: false, error: err.message }
  }
})

ipcMain.handle('file:mkdir', (_, dirPath) => {
  try {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true })
    }
    return { success: true }
  } catch (err) {
    return { success: false, error: err.message }
  }
})

ipcMain.handle('file:copy', (_, fromPath, toPath) => {
  try {
    const dir = path.dirname(toPath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.copyFileSync(fromPath, toPath)
    return { success: true }
  } catch (err) {
    return { success: false, error: err.message }
  }
})

ipcMain.handle('file:getTree', (_, rootPath) => {
  return fileManager.getFileTree(rootPath)
})

ipcMain.handle('app:getAppPath', () => {
  return {
    appPath: app.getAppPath(),
    userData: app.getPath('userData'),
    temp: app.getPath('temp'),
    home: app.getPath('home'),
    documents: app.getPath('documents')
  }
})

ipcMain.handle('shell:openExternal', (_, url) => {
  return shell.openExternal(url)
})

ipcMain.handle('shell:openPath', (_, filePath) => {
  return shell.openPath(filePath)
})

ipcMain.handle('platform:getInfo', () => {
  return {
    platform: process.platform,
    arch: process.arch,
    release: os.release(),
    totalMem: os.totalmem(),
    freeMem: os.freemem(),
    homedir: os.homedir(),
    tmpdir: os.tmpdir(),
    cpus: os.cpus().length,
    isWin10: os.release().startsWith('10.'),
    isWin11: os.release().startsWith('10.0.22') || parseInt(os.release()) >= 11
  }
})