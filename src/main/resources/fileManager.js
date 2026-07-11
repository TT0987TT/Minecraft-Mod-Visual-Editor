const fs = require('fs')
const path = require('path')

function listDirectory(dirPath) {
  try {
    if (!fs.existsSync(dirPath)) {
      return { success: false, error: '目录不存在' }
    }
    const entries = fs.readdirSync(dirPath, { withFileTypes: true })
    const result = entries.map(entry => ({
      name: entry.name,
      isDirectory: entry.isDirectory(),
      path: path.join(dirPath, entry.name)
    }))
    return { success: true, entries: result }
  } catch (err) {
    return { success: false, error: err.message }
  }
}

function getFileTree(rootPath, prefix = '') {
  try {
    if (!fs.existsSync(rootPath)) {
      return { success: false, error: '目录不存在' }
    }

    const tree = []
    const buildTree = (currentPath, relativePath) => {
      const entries = fs.readdirSync(currentPath, { withFileTypes: true })
      const dirs = []
      const files = []

      for (const entry of entries) {
        const fullPath = path.join(currentPath, entry.name)
        const relPath = relativePath ? path.join(relativePath, entry.name) : entry.name
        
        if (entry.isDirectory()) {
          if (!entry.name.startsWith('.') && 
              entry.name !== 'node_modules' && 
              entry.name !== 'dist' && 
              entry.name !== 'build' &&
              entry.name !== '.git') {
            dirs.push({ name: entry.name, path: fullPath, relPath: relPath, children: [] })
          }
        } else {
          files.push({ name: entry.name, path: fullPath, relPath: relPath, isFile: true })
        }
      }

      dirs.sort((a, b) => a.name.localeCompare(b.name))
      files.sort((a, b) => a.name.localeCompare(b.name))

      for (const dir of dirs) {
        buildTree(dir.path, dir.relPath)
        tree.push(dir)
      }
      for (const file of files) {
        tree.push(file)
      }
    }

    buildTree(rootPath, '')
    return { success: true, tree: tree }
  } catch (err) {
    return { success: false, error: err.message }
  }
}

module.exports = {
  listDirectory,
  getFileTree
}