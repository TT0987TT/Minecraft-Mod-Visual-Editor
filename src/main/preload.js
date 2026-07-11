const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  platform: {
    getInfo: () => ipcRenderer.invoke('platform:getInfo')
  },
  dialog: {
    openDirectory: () => ipcRenderer.invoke('dialog:openDirectory'),
    openFile: (filters) => ipcRenderer.invoke('dialog:openFile', filters),
    saveFile: (defaultName) => ipcRenderer.invoke('dialog:saveFile', defaultName)
  },
  project: {
    create: (config) => ipcRenderer.invoke('project:create', config),
    load: (projectPath) => ipcRenderer.invoke('project:load', projectPath),
    save: (projectPath, data) => ipcRenderer.invoke('project:save', projectPath, data),
    generateStructure: (config) => ipcRenderer.invoke('project:generateStructure', config)
  },
  compile: {
    build: (projectPath, options) => ipcRenderer.invoke('compile:build', projectPath, options),
    launchGame: (projectPath) => ipcRenderer.invoke('compile:launchGame', projectPath),
    onProgress: (callback) => ipcRenderer.on('compile:progress', (_, data) => callback(data))
  },
  file: {
    read: (filePath, encoding) => ipcRenderer.invoke('file:read', filePath, encoding),
    write: (filePath, content, encoding) => ipcRenderer.invoke('file:write', filePath, content, encoding),
    exists: (filePath) => ipcRenderer.invoke('file:exists', filePath),
    list: (dirPath) => ipcRenderer.invoke('file:list', dirPath),
    delete: (filePath) => ipcRenderer.invoke('file:delete', filePath),
    mkdir: (dirPath) => ipcRenderer.invoke('file:mkdir', dirPath),
    copy: (fromPath, toPath) => ipcRenderer.invoke('file:copy', fromPath, toPath),
    getTree: (rootPath) => ipcRenderer.invoke('file:getTree', rootPath)
  },
  app: {
    getAppPath: () => ipcRenderer.invoke('app:getAppPath')
  },
  shell: {
    openExternal: (url) => ipcRenderer.invoke('shell:openExternal', url),
    openPath: (filePath) => ipcRenderer.invoke('shell:openPath', filePath)
  },
  theme: {
    onThemeChange: (callback) => ipcRenderer.on('theme:change', (_, theme) => callback(theme))
  }
})