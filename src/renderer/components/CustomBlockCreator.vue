<template>
  <div v-if="visible" class="modal-overlay" @click.self="handleClose">
    <div class="modal-content" style="min-width: 600px;">
      <div class="modal-header">
        {{ editingBlock ? '编辑' : '创建' }}自定义积木
      </div>

      <div class="form-group">
        <label class="form-label">积木名称 *</label>
        <input
          v-model="blockForm.name"
          class="form-input"
          placeholder="例如: 发送消息给玩家"
        />
      </div>

      <div class="form-group">
        <label class="form-label">积木描述</label>
        <textarea
          v-model="blockForm.description"
          class="form-input form-textarea"
          placeholder="描述这个积木的作用..."
          style="min-height: 60px;"
        ></textarea>
      </div>

      <div class="form-group" style="display: flex; gap: 16px;">
        <div style="flex: 1;">
          <label class="form-label">积木颜色</label>
          <div style="display: flex; align-items: center; gap: 8px;">
            <input
              v-model="blockForm.color"
              type="color"
              class="color-picker"
            />
            <input
              v-model="blockForm.color"
              class="form-input"
              placeholder="#FFD700"
              style="flex: 1;"
            />
          </div>
        </div>
        <div style="width: 150px;">
          <label class="form-label">积木类型</label>
          <select v-model="blockForm.isOutput" class="form-input">
            <option :value="false">语句块</option>
            <option :value="true">值输出块</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">是否包含子积木执行区</label>
        <select v-model="blockForm.hasStatement" class="form-input">
          <option :value="false">否</option>
          <option :value="true">是 (像if语句一样)</option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">
          参数列表
          <span style="color: var(--text-secondary); font-weight: normal;">
            (使用 ${参数名} 在模板中引用)
          </span>
        </label>
        <div v-for="(param, idx) in blockForm.parameters" :key="idx" class="param-row">
          <input
            v-model="param.name"
            class="form-input"
            placeholder="参数名 (英文)"
            style="flex: 1;"
          />
          <select v-model="param.type" class="form-input" style="width: 100px;">
            <option value="input">输入值</option>
            <option value="text">文本框</option>
            <option value="dropdown">下拉框</option>
          </select>
          <input
            v-if="param.type === 'text'"
            v-model="param.default"
            class="form-input"
            placeholder="默认值"
            style="width: 120px;"
          />
          <input
            v-if="param.type === 'dropdown'"
            v-model="param.optionsStr"
            class="form-input"
            placeholder="选项,逗号分隔"
            style="width: 150px;"
          />
          <button class="btn btn-sm btn-danger" @click="removeParameter(idx)">删除</button>
        </div>
        <button class="btn btn-sm" @click="addParameter" style="margin-top: 8px;">
          + 添加参数
        </button>
      </div>

      <div class="form-group">
        <label class="form-label">
          Java代码模板 *
          <span style="color: var(--text-secondary); font-weight: normal;">
            (使用 ${参数名} 引用参数)
          </span>
        </label>
        <textarea
          v-model="blockForm.template"
          class="form-input form-textarea"
          placeholder="例如: player.sendMessage(${message});"
          style="min-height: 150px;"
        ></textarea>
      </div>

      <div class="form-actions">
        <button class="btn" @click="handleClose">取消</button>
        <button class="btn btn-primary" @click="handleSave">
          {{ editingBlock ? '保存修改' : '创建积木' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  editBlock: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'save'])

const editingBlock = ref(null)

const getDefaultForm = () => ({
  name: '',
  description: '',
  color: '#FFD700',
  isOutput: false,
  hasStatement: false,
  parameters: [],
  template: ''
})

const blockForm = reactive(getDefaultForm())

watch(() => props.editBlock, (newVal) => {
  if (newVal) {
    editingBlock.value = newVal
    Object.assign(blockForm, {
      id: newVal.id,
      name: newVal.name || '',
      description: newVal.description || '',
      color: newVal.color || '#FFD700',
      isOutput: newVal.isOutput || false,
      hasStatement: newVal.hasStatement || false,
      parameters: JSON.parse(JSON.stringify(newVal.parameters || [])),
      template: newVal.template || ''
    })
    
    for (const param of blockForm.parameters) {
      if (param.type === 'dropdown' && param.options && !param.optionsStr) {
        param.optionsStr = param.options.map(o => o.join(':')).join(',')
      }
    }
  } else {
    editingBlock.value = null
    Object.assign(blockForm, getDefaultForm())
  }
})

watch(() => props.visible, (newVal) => {
  if (newVal && !props.editBlock) {
    Object.assign(blockForm, getDefaultForm())
    editingBlock.value = null
  }
})

const addParameter = () => {
  blockForm.parameters.push({
    name: '',
    type: 'input',
    label: '',
    default: '',
    optionsStr: ''
  })
}

const removeParameter = (idx) => {
  blockForm.parameters.splice(idx, 1)
}

const parseOptions = (optionsStr) => {
  if (!optionsStr) return [['选项1', 'value1'], ['选项2', 'value2']]
  return optionsStr.split(',').map(opt => {
    const parts = opt.trim().split(':')
    return [parts[0] || '选项', parts[1] || parts[0] || 'value']
  })
}

const handleSave = () => {
  if (!blockForm.name.trim()) {
    alert('请填写积木名称')
    return
  }
  if (!blockForm.template.trim()) {
    alert('请填写Java代码模板')
    return
  }

  const parameters = blockForm.parameters.map(p => {
    const param = {
      name: p.name,
      type: p.type,
      label: p.label || p.name
    }
    if (p.type === 'dropdown') {
      param.options = parseOptions(p.optionsStr)
    } else if (p.type === 'text') {
      param.default = p.default
    }
    return param
  })

  const blockData = {
    id: blockForm.id || 'custom_' + Date.now(),
    name: blockForm.name,
    description: blockForm.description,
    color: blockForm.color,
    isOutput: blockForm.isOutput,
    hasStatement: blockForm.hasStatement,
    parameters,
    template: blockForm.template
  }

  emit('save', blockData)
  handleClose()
}

const handleClose = () => {
  emit('close')
}
</script>