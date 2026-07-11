<template>
  <div class="blockly-workspace-wrapper">
    <div class="workspace-toolbar">
      <button class="btn btn-sm" @click="clearWorkspace">
        清空
      </button>
      <button class="btn btn-sm" @click="exportBlocks">
        导出积木
      </button>
      <button class="btn btn-sm" @click="importBlocks">
        导入积木
      </button>
      <div style="flex: 1;"></div>
      <button class="btn btn-sm btn-primary" @click="syncBlocksToCode">
        生成代码
      </button>
    </div>
    <div class="blockly-container" ref="blocklyContainer">
      <div ref="workspaceDiv"></div>
    </div>
    <input
      type="file"
      ref="fileInput"
      style="display: none"
      accept=".xml"
      @change="handleFileImport"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, defineExpose } from 'vue'
import * as Blockly from 'blockly'
import { useProjectStore } from '../store'
import { registerAllBlocks, registerCustomBlocks, buildToolboxXML } from '../utils/blockDefinitions'
import { setupJavaGenerator, generateJavaCode } from '../utils/codeGenerator'

const emit = defineEmits(['code-generated', 'blocks-changed'])
const props = defineProps({
  customBlocks: {
    type: Array,
    default: () => []
  }
})

const projectStore = useProjectStore()
const blocklyContainer = ref(null)
const workspaceDiv = ref(null)
const fileInput = ref(null)
let workspace = null
let javaGenerator = null
let resizeObserver = null

const initBlockly = () => {
  if (!workspaceDiv.value) return

  registerAllBlocks(Blockly)
  registerCustomBlocks(Blockly, props.customBlocks || [])

  const toolboxXml = buildToolboxXML(props.customBlocks || [])
  const toolboxDom = Blockly.utils.xml.textToDom(toolboxXml)

  javaGenerator = new Blockly.Generator('Java')
  Object.assign(javaGenerator, Blockly.JavaScript)
  
  setupJavaGenerator(javaGenerator, projectStore)

  workspace = Blockly.inject(workspaceDiv.value, {
    toolbox: toolboxDom,
    grid: {
      spacing: 20,
      length: 3,
      colour: '#cccccc',
      snap: false
    },
    zoom: {
      controls: true,
      wheel: true,
      startScale: 1.0,
      maxScale: 3,
      minScale: 0.3,
      scaleSpeed: 1.2
    },
    theme: Blockly.Themes.Modern,
    trashcan: true,
    scrollbars: true,
    move: {
      scrollbars: true,
      drag: true,
      wheel: true
    },
    renderer: 'geras',
    scrollBars: true,
    drag: {
      enabled: true
    },
    allowMove: true,
    movable: true
  })

  workspace.addChangeListener((event) => {
    if (event.type === Blockly.Events.BLOCK_MOVE ||
        event.type === Blockly.Events.BLOCK_CREATE ||
        event.type === Blockly.Events.BLOCK_DELETE ||
        event.type === Blockly.Events.BLOCK_CHANGE) {
      const xml = Blockly.utils.xml.domToText(
        Blockly.Xml.workspaceToDom(workspace)
      )
      emit('blocks-changed', xml)
    }
  })
}

const clearWorkspace = () => {
  if (workspace) {
    workspace.clear()
  }
}

const exportBlocks = () => {
  if (!workspace) return
  const xml = Blockly.Xml.workspaceToDom(workspace)
  const xmlText = Blockly.utils.xml.domToText(xml)
  const blob = new Blob([xmlText], { type: 'application/xml' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `mod-blocks-${Date.now()}.xml`
  a.click()
  URL.revokeObjectURL(url)
}

const importBlocks = () => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

const handleFileImport = (event) => {
  const file = event.target.files[0]
  if (!file || !workspace) return
  
  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const xml = Blockly.utils.xml.textToDom(e.target.result)
      workspace.clear()
      Blockly.Xml.domToWorkspace(xml, workspace)
    } catch (err) {
      alert('导入失败: ' + err.message)
    }
  }
  reader.readAsText(file)
  event.target.value = ''
}

const syncBlocksToCode = () => {
  if (!workspace || !javaGenerator) return
  
  const xml = Blockly.utils.xml.domToText(
    Blockly.Xml.workspaceToDom(workspace)
  )
  
  try {
    let code = ''
    const topBlocks = workspace.getTopBlocks(true)
    for (const block of topBlocks) {
      code += javaGenerator.blockToCode(block)
    }
    
    const fullCode = generateJavaCode(code, projectStore)
    emit('code-generated', fullCode, xml)
  } catch (err) {
    console.error('代码生成错误:', err)
    const fallbackCode = generateJavaCode(xml, projectStore)
    emit('code-generated', fallbackCode, xml)
  }
}

const loadBlocksFromXml = (xmlString) => {
  if (!workspace || !xmlString) return
  try {
    workspace.clear()
    const xml = Blockly.utils.xml.textToDom(xmlString)
    Blockly.Xml.domToWorkspace(xml, workspace)
  } catch (err) {
    console.error('加载积木失败:', err)
  }
}

const refreshToolbox = (customBlocks) => {
  if (!workspace) return
  registerCustomBlocks(Blockly, customBlocks || [])
  const toolboxXml = buildToolboxXML(customBlocks || [])
  const toolboxDom = Blockly.utils.xml.textToDom(toolboxXml)
  workspace.updateToolbox(toolboxDom)
}

onMounted(() => {
  setTimeout(() => {
    initBlockly()
    resizeObserver = new ResizeObserver(() => {
      if (workspace && Blockly.svgResize) {
        Blockly.svgResize(workspace)
      }
    })
    if (blocklyContainer.value) {
      resizeObserver.observe(blocklyContainer.value)
    }
  }, 100)
})

onBeforeUnmount(() => {
  if (workspace) {
    workspace.dispose()
  }
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
})

watch(() => props.customBlocks, (newVal) => {
  if (workspace && newVal) {
    refreshToolbox(newVal)
  }
}, { deep: true })

defineExpose({
  clearWorkspace,
  exportBlocks,
  importBlocks,
  syncBlocksToCode,
  loadBlocksFromXml
})
</script>