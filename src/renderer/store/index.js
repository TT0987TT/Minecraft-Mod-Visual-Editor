import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useProjectStore = defineStore('project', () => {
  const projectPath = ref('')
  const projectConfig = ref(null)
  const projectFile = ref(null)
  const workspace = ref(null)
  const customBlocks = ref([])
  const isLoaded = ref(false)
  const modIcon = ref(null)

  const modId = computed(() => projectConfig.value?.modId || 'examplemod')
  const modName = computed(() => projectConfig.value?.modName || 'Example Mod')
  const packageName = computed(() => projectConfig.value?.packageName || 'com.example')
  const platform = computed(() => projectConfig.value?.platform || 'forge')
  const mcVersion = computed(() => projectConfig.value?.mcVersion || '1.20.1')

  function setProject(path, config, file) {
    projectPath.value = path
    projectConfig.value = config
    projectFile.value = file
    customBlocks.value = file?.workspace?.customBlocks || []
    modIcon.value = file?.modIcon || null
    isLoaded.value = true
  }

  function clearProject() {
    projectPath.value = ''
    projectConfig.value = null
    projectFile.value = null
    workspace.value = null
    customBlocks.value = []
    modIcon.value = null
    isLoaded.value = false
  }

  function addCustomBlock(block) {
    const existing = customBlocks.value.find(b => b.id === block.id)
    if (!existing) {
      customBlocks.value.push(block)
      saveProjectState()
    }
  }

  function updateCustomBlock(id, updates) {
    const idx = customBlocks.value.findIndex(b => b.id === id)
    if (idx !== -1) {
      customBlocks.value[idx] = { ...customBlocks.value[idx], ...updates }
      saveProjectState()
    }
  }

  function deleteCustomBlock(id) {
    const idx = customBlocks.value.findIndex(b => b.id === id)
    if (idx !== -1) {
      customBlocks.value.splice(idx, 1)
      saveProjectState()
    }
  }

  function setModIcon(iconData) {
    modIcon.value = iconData
    saveProjectState()
  }

  async function saveProjectState() {
    if (!projectPath.value) return
    await window.electronAPI.project.save(projectPath.value, {
      workspace: {
        customBlocks: customBlocks.value
      },
      modIcon: modIcon.value
    })
  }

  return {
    projectPath,
    projectConfig,
    projectFile,
    workspace,
    customBlocks,
    isLoaded,
    modIcon,
    modId,
    modName,
    packageName,
    platform,
    mcVersion,
    setProject,
    clearProject,
    addCustomBlock,
    updateCustomBlock,
    deleteCustomBlock,
    setModIcon
  }
})

export const useEditorStore = defineStore('editor', () => {
  const blocksXml = ref('')
  const javaCode = ref('')
  const currentFile = ref(null)
  const fileTree = ref([])
  const activeTab = ref('code')
  const isCompiling = ref(false)
  const compileLogs = ref([])
  const compileProgress = ref(0)
  const isSyncing = ref(false)
  const codeErrors = ref([])
  const crashReport = ref(null)

  function setBlocks(xml) {
    blocksXml.value = xml
  }

  function setCode(code) {
    javaCode.value = code
  }

  function setCurrentFile(file) {
    currentFile.value = file
  }

  function setFileTree(tree) {
    fileTree.value = tree
  }

  function addCompileLog(message, type = 'info') {
    compileLogs.value.push({
      timestamp: new Date().toLocaleTimeString(),
      message,
      type
    })
  }

  function clearCompileLogs() {
    compileLogs.value = []
    compileProgress.value = 0
  }

  function setCodeErrors(errors) {
    codeErrors.value = errors || []
  }

  function setCrashReport(report) {
    crashReport.value = report
  }

  return {
    blocksXml,
    javaCode,
    currentFile,
    fileTree,
    activeTab,
    isCompiling,
    compileLogs,
    compileProgress,
    isSyncing,
    codeErrors,
    crashReport,
    setBlocks,
    setCode,
    setCurrentFile,
    setFileTree,
    addCompileLog,
    clearCompileLogs,
    setCodeErrors,
    setCrashReport
  }
})

export const useUIStore = defineStore('ui', () => {
  const theme = ref('light')
  const sidebarWidth = ref(320)
  const rightPanelWidth = ref(400)
  const showCustomBlockModal = ref(false)
  const showNewProjectModal = ref(false)
  const language = ref('zh-CN')
  const showAnnouncement = ref(true)
  const autoCheckEnabled = ref(true)

  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  function setTheme(t) {
    theme.value = t
  }

  function setLanguage(lang) {
    language.value = lang
  }

  function dismissAnnouncement() {
    showAnnouncement.value = false
  }

  function toggleAutoCheck() {
    autoCheckEnabled.value = !autoCheckEnabled.value
  }

  return {
    theme,
    sidebarWidth,
    rightPanelWidth,
    showCustomBlockModal,
    showNewProjectModal,
    language,
    showAnnouncement,
    autoCheckEnabled,
    toggleTheme,
    setTheme,
    setLanguage,
    dismissAnnouncement,
    toggleAutoCheck
  }
})