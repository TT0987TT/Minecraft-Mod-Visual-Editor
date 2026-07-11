<template>
  <div v-if="visible" class="modal-overlay" @click.self="handleClose">
    <div class="modal-content" style="min-width: 600px; max-width: 650px;">
      <div class="modal-header">
        <span class="modal-icon">#</span>
        {{ t('project.create') }}
      </div>

      <div class="form-group">
        <label class="form-label">{{ t('project.directory') }} *</label>
        <div style="display: flex; gap: 8px;">
          <input
            v-model="form.projectPath"
            class="form-input"
            :placeholder="'选择或输入项目保存目录'"
          />
          <button class="btn btn-sm" @click="browseDirectory">
            {{ t('project.browse') }}
          </button>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">{{ t('project.modId') }} *</label>
        <input
          v-model="form.modId"
          class="form-input"
          placeholder="小写字母开头,只能包含字母、数字和下划线"
          @input="onModIdChange"
        />
        <div class="form-hint">示例: myfirstmod、super_block、tools_addon</div>
      </div>

      <div class="form-group">
        <label class="form-label">{{ t('project.modName') }} *</label>
        <input
          v-model="form.modName"
          class="form-input"
          :placeholder="'显示给玩家的模组名称'"
        />
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">{{ t('project.modVersion') }}</label>
          <input
            v-model="form.modVersion"
            class="form-input"
            placeholder="1.0.0"
          />
        </div>
        <div class="form-group">
          <label class="form-label">{{ t('project.author') }}</label>
          <input
            v-model="form.author"
            class="form-input"
            placeholder="真NB工作室"
          />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">{{ t('project.platform') }}</label>
          <select v-model="form.platform" class="form-input">
            <option value="forge">Forge</option>
            <option value="fabric">Fabric</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">{{ t('project.mcVersion') }}</label>
          <select v-model="form.mcVersion" class="form-input">
            <option value="1.21.4">1.21.4</option>
            <option value="1.21.1">1.21.1</option>
            <option value="1.21.10">1.21.10</option>
            <option value="1.21">1.21</option>
            <option value="1.20.6">1.20.6</option>
            <option value="1.20.4">1.20.4</option>
            <option value="1.20.1">1.20.1</option>
            <option value="1.19.4">1.19.4</option>
            <option value="1.19.2">1.19.2</option>
            <option value="1.18.2">1.18.2</option>
            <option value="1.16.5">1.16.5</option>
            <option value="1.12.2">1.12.2</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">{{ t('project.packageName') }}</label>
        <input
          v-model="form.packageName"
          class="form-input"
          :placeholder="'com.' + (form.author || 'author').toLowerCase().replace(/[^a-z0-9]/g,'') + '.' + (form.modId || 'modid')"
        />
      </div>

      <div class="form-group">
        <label class="form-label">{{ t('project.modIcon') }}</label>
        <div class="icon-upload-area">
          <div v-if="form.modIcon" class="icon-preview">
            <img :src="form.modIcon" alt="Mod Icon" />
            <button class="btn btn-sm btn-danger" @click="form.modIcon = null">×</button>
          </div>
          <div v-else class="icon-placeholder" @click="selectIcon">
            <span>[IMG]</span>
            <span>点击上传图标</span>
            <span class="icon-hint">128x128 PNG</span>
          </div>
          <input
            type="file"
            ref="iconInput"
            style="display: none"
            accept="image/png"
            @change="handleIconSelect"
          />
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">{{ t('project.description') }}</label>
        <textarea
          v-model="form.description"
          class="form-input form-textarea"
          :placeholder="'简单描述你的模组...'"
          style="min-height: 80px;"
        ></textarea>
      </div>

      <div class="platform-info">
        <div class="platform-info-item">
          <span class="platform-badge">{{ form.platform === 'forge' ? 'Forge' : 'Fabric' }}</span>
          <span class="platform-badge">Minecraft {{ form.mcVersion }}</span>
          <span class="platform-badge">JDK {{ form.mcVersion >= '1.18' ? '17' : (form.mcVersion >= '1.17' ? '16' : '8') }}</span>
        </div>
        <div class="platform-info-text">将自动生成完整的{{ form.platform === 'forge' ? 'Forge' : 'Fabric' }}工程目录结构</div>
      </div>

      <div class="form-actions">
        <button class="btn" @click="handleClose">{{ t('project.cancel') }}</button>
        <button class="btn btn-primary btn-glow" @click="handleCreate">
          {{ t('project.confirm') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { t } from '../locales'

const props = defineProps({
  visible: { type: Boolean, default: false }
})

const emit = defineEmits(['close', 'create'])

const iconInput = ref(null)

const form = reactive({
  projectPath: '',
  modId: '',
  modName: '',
  modVersion: '1.0.0',
  author: '真NB工作室',
  platform: 'forge',
  mcVersion: '1.20.1',
  packageName: '',
  description: '',
  modIcon: null
})

const onModIdChange = () => {
  form.modId = form.modId.toLowerCase().replace(/[^a-z0-9_]/g, '')
  if (form.modId && !form.modName) {
    form.modName = form.modId.split('_').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }
  updatePackageName()
}

const updatePackageName = () => {
  if (form.author && form.modId) {
    const cleanAuthor = form.author.toLowerCase().replace(/[^a-z0-9]/g, '')
    if (!form.packageName || form.packageName === `com.${form.author}.${form.modId}`) {
      form.packageName = `com.${cleanAuthor}.${form.modId}`
    }
  }
}

const browseDirectory = async () => {
  if (window.electronAPI && window.electronAPI.dialog) {
    const result = await window.electronAPI.dialog.openDirectory()
    if (result) form.projectPath = result
  } else {
    const path = prompt('请输入项目目录路径:')
    if (path) form.projectPath = path
  }
}

const selectIcon = () => {
  if (iconInput.value) iconInput.value.click()
}

const handleIconSelect = (event) => {
  const file = event.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (e) => {
    form.modIcon = e.target.result
  }
  reader.readAsDataURL(file)
  event.target.value = ''
}

const handleCreate = () => {
  if (!form.projectPath) { alert('请选择项目目录'); return }
  if (!form.modId) { alert('请填写模组ID'); return }
  if (!/^[a-z][a-z0-9_]*$/.test(form.modId)) {
    alert('模组ID必须以小写字母开头，只能包含小写字母、数字和下划线')
    return
  }
  if (!form.modName) { alert('请填写模组名称'); return }
  if (!form.packageName) {
    const cleanAuthor = (form.author || 'author').toLowerCase().replace(/[^a-z0-9]/g, '')
    form.packageName = `com.${cleanAuthor}.${form.modId}`
  }

  emit('create', { ...form })
}

const handleClose = () => emit('close')
</script>

<style scoped>
.form-row {
  display: flex;
  gap: 16px;
}
.form-row > .form-group {
  flex: 1;
}
.form-hint {
  font-size: 11px;
  color: var(--text-secondary);
  margin-top: 4px;
}
.platform-info {
  padding: 14px;
  background: var(--bg-secondary);
  border-radius: 8px;
  margin-bottom: 8px;
}
.platform-info-item {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 6px;
}
.platform-badge {
  padding: 3px 10px;
  background: var(--bg-tertiary);
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  color: var(--text-primary);
}
.platform-info-text {
  font-size: 12px;
  color: var(--text-secondary);
}
.icon-upload-area {
  display: flex;
  align-items: center;
}
.icon-preview {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid var(--border-color);
}
.icon-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.icon-preview .btn {
  position: absolute;
  top: 2px;
  right: 2px;
  padding: 2px 6px;
  font-size: 10px;
  border-radius: 50%;
}
.icon-placeholder {
  width: 120px;
  height: 80px;
  border: 2px dashed var(--border-color);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  gap: 2px;
  font-size: 12px;
  color: var(--text-secondary);
}
.icon-placeholder:hover {
  border-color: var(--accent-color);
  background: rgba(64, 158, 255, 0.05);
}
.icon-hint {
  font-size: 10px;
  color: var(--text-secondary);
}
.modal-icon {
  margin-right: 8px;
}
.btn-glow {
  position: relative;
  overflow: hidden;
}
.btn-glow::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 60%);
  opacity: 0;
  transition: opacity 0.3s;
}
.btn-glow:hover::after {
  opacity: 1;
}
</style>