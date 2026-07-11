<template>
  <div class="code-editor-wrapper" ref="containerRef">
    <div ref="editorDiv" style="width: 100%; height: 100%;"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, defineExpose, nextTick } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: 'java'
  },
  readOnly: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'code-changed'])

const containerRef = ref(null)
const editorDiv = ref(null)
let editor = null
let monacoInstance = null
let resizeObserver = null
let isInternalChange = false

const initEditor = async () => {
  try {
    const monaco = await import('monaco-editor')
    monacoInstance = monaco

    if (!editorDiv.value) return

    editor = monaco.editor.create(editorDiv.value, {
      value: props.modelValue || '',
      language: props.language,
      theme: 'vs-dark',
      automaticLayout: true,
      fontSize: 13,
      minimap: {
        enabled: true
      },
      scrollBeyondLastLine: false,
      wordWrap: 'on',
      readOnly: props.readOnly,
      tabSize: 4,
      insertSpaces: false,
      detectIndentation: true,
      folding: true,
      renderLineHighlight: 'line',
      cursorBlinking: 'smooth',
      cursorSmoothCaretAnimation: 'on'
    })

    editor.onDidChangeModelContent(() => {
      if (!isInternalChange) {
        const value = editor.getValue()
        emit('update:modelValue', value)
        emit('code-changed', value)
      }
    })
  } catch (err) {
    console.error('Monaco编辑器加载失败:', err)
    createFallbackEditor()
  }
}

const createFallbackEditor = () => {
  if (!editorDiv.value) return
  
  const textarea = document.createElement('textarea')
  textarea.style.width = '100%'
  textarea.style.height = '100%'
  textarea.style.background = '#1e1e1e'
  textarea.style.color = '#e0e0e0'
  textarea.style.border = 'none'
  textarea.style.outline = 'none'
  textarea.style.padding = '12px'
  textarea.style.fontFamily = 'Consolas, Monaco, monospace'
  textarea.style.fontSize = '13px'
  textarea.style.resize = 'none'
  textarea.value = props.modelValue || ''
  textarea.readOnly = props.readOnly
  
  textarea.addEventListener('input', (e) => {
    emit('update:modelValue', e.target.value)
    emit('code-changed', e.target.value)
  })
  
  editorDiv.value.appendChild(textarea)
  editor = {
    getValue: () => textarea.value,
    setValue: (val) => {
      textarea.value = val
    },
    dispose: () => {
      textarea.remove()
    },
    layout: () => {}
  }
}

const setCode = (code) => {
  if (editor && editor.setValue) {
    isInternalChange = true
    editor.setValue(code || '')
    setTimeout(() => {
      isInternalChange = false
    }, 100)
  }
}

const getCode = () => {
  if (editor && editor.getValue) {
    return editor.getValue()
  }
  return ''
}

const setLanguage = (lang) => {
  if (editor && monacoInstance) {
    const model = editor.getModel()
    if (model) {
      monacoInstance.editor.setModelLanguage(model, lang)
    }
  }
}

onMounted(() => {
  setTimeout(() => {
    initEditor()
  }, 200)
})

onBeforeUnmount(() => {
  if (editor && editor.dispose) {
    editor.dispose()
  }
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
})

watch(() => props.modelValue, (newVal) => {
  if (editor && editor.setValue) {
    const currentValue = editor.getValue()
    if (currentValue !== newVal) {
      isInternalChange = true
      editor.setValue(newVal || '')
      setTimeout(() => {
        isInternalChange = false
      }, 100)
    }
  }
})

watch(() => props.language, (newVal) => {
  setLanguage(newVal)
})

defineExpose({
  setCode,
  getCode,
  setLanguage
})
</script>