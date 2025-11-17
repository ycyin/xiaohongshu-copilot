<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  selectedPage: Object
})

const emit = defineEmits(['update-page-property'])

// Local state
const localBackgroundColor = ref('#F3D19E')
const localPageName = ref('')

// Color presets
const colorPresets = [
  { name: '默认米色', color: 'rgb(243, 209, 158)' },
  { name: '纯白', color: '#FFFFFF' },
  { name: '浅灰', color: '#F5F5F5' },
  { name: '米白', color: '#FFF8DC' },
  { name: '淡粉', color: '#FFE4E1' },
  { name: '淡蓝', color: '#E0F2FE' },
  { name: '淡绿', color: '#ECFCCB' },
  { name: '淡紫', color: '#F3E8FF' },
  { name: '淡黄', color: '#FEF9C3' },
  { name: '淡橙', color: '#FFEDD5' },
  { name: '淡青', color: '#CFFAFE' },
  { name: '浅褐', color: '#E7E5E4' }
]

// Size presets
const sizePresets = [
  { name: '小红书标准', width: 750, height: 1000 },
  { name: '正方形', width: 1000, height: 1000 },
  { name: '宽屏 16:9', width: 1280, height: 720 },
  { name: 'Instagram', width: 1080, height: 1350 },
  { name: 'A4 竖版', width: 794, height: 1123 }
]

// Watch for selected page changes
watch(() => props.selectedPage, (page) => {
  if (page) {
    // Convert rgb to hex if needed
    const bgColor = page.backgroundColor
    if (bgColor.startsWith('rgb')) {
      const match = bgColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/)
      if (match) {
        const r = parseInt(match[1])
        const g = parseInt(match[2])
        const b = parseInt(match[3])
        localBackgroundColor.value = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
      }
    } else {
      localBackgroundColor.value = bgColor
    }
    localPageName.value = page.name || ''
  }
}, { immediate: true })

// Update handlers
const updateBackgroundColor = (color) => {
  localBackgroundColor.value = color
  emit('update-page-property', 'backgroundColor', color)
}

const updatePageName = () => {
  emit('update-page-property', 'name', localPageName.value)
}

const updatePageSize = (width, height) => {
  emit('update-page-property', 'width', width)
  emit('update-page-property', 'height', height)
}
</script>

<template>
  <div class="page-editor">
    <div class="editor-header">
      <h3>📄 页面设置</h3>
      <p class="hint">编辑当前页面的属性</p>
    </div>

    <div v-if="selectedPage" class="editor-content">
      <!-- Page Name -->
      <div class="editor-section">
        <label class="section-label">页面名称</label>
        <input
          type="text"
          v-model="localPageName"
          @blur="updatePageName"
          @keydown.enter="updatePageName"
          class="text-input"
          placeholder="输入页面名称"
        />
      </div>

      <!-- Background Color -->
      <div class="editor-section">
        <label class="section-label">背景颜色</label>

        <!-- Color Presets -->
        <div class="color-presets-grid">
          <button
            v-for="preset in colorPresets"
            :key="preset.color"
            @click="updateBackgroundColor(preset.color)"
            :class="['color-preset-btn', { active: localBackgroundColor === preset.color || selectedPage.backgroundColor === preset.color }]"
            :title="preset.name"
          >
            <div class="color-preview" :style="{ backgroundColor: preset.color }"></div>
            <span class="color-name">{{ preset.name }}</span>
          </button>
        </div>

        <!-- Custom Color Picker -->
        <div class="color-picker-row">
          <label class="picker-label">自定义颜色</label>
          <div class="picker-group">
            <input
              type="color"
              :value="localBackgroundColor"
              @input="updateBackgroundColor($event.target.value)"
              class="color-picker"
            />
            <input
              type="text"
              :value="localBackgroundColor"
              @input="updateBackgroundColor($event.target.value)"
              @blur="updateBackgroundColor($event.target.value)"
              class="color-input"
              placeholder="#F3D19E"
            />
          </div>
        </div>
      </div>

      <!-- Page Size -->
      <div class="editor-section">
        <label class="section-label">画布尺寸</label>
        <div class="size-info">
          <span class="size-label">当前尺寸:</span>
          <span class="size-value">{{ selectedPage.width }} × {{ selectedPage.height }} px</span>
        </div>

        <div class="size-presets">
          <button
            v-for="preset in sizePresets"
            :key="preset.name"
            @click="updatePageSize(preset.width, preset.height)"
            :class="['preset-size-btn', {
              active: selectedPage.width === preset.width && selectedPage.height === preset.height
            }]"
          >
            {{ preset.name }}
            <span class="preset-size">{{ preset.width }}×{{ preset.height }}</span>
          </button>
        </div>
      </div>

      <!-- Page Info -->
      <div class="editor-section">
        <label class="section-label">页面信息</label>
        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">页面类型</span>
            <span class="info-value">{{ selectedPage.type === 'main' ? '主图' : '副图' }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">元素数量</span>
            <span class="info-value">{{ selectedPage.elements?.length || 0 }} 个</span>
          </div>
          <div class="info-item">
            <span class="info-label">宽高比</span>
            <span class="info-value">{{ (selectedPage.width / selectedPage.height).toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="editor-empty">
      <div class="empty-icon">📄</div>
      <p>点击画布中的页面</p>
      <p class="empty-hint">即可在此处编辑页面属性</p>
    </div>
  </div>
</template>

<style scoped>
.page-editor {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.editor-header {
  padding: 16px;
  border-bottom: 2px solid #f0f0f0;
  background: white;
}

.editor-header h3 {
  font-size: 16px;
  font-weight: 600;
  color: #222;
  margin: 0 0 4px 0;
}

.editor-header .hint {
  font-size: 12px;
  color: #999;
  margin: 0;
}

.editor-content {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

.editor-section {
  margin-bottom: 24px;
}

.editor-section:last-child {
  margin-bottom: 0;
}

.section-label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #555;
  margin-bottom: 12px;
}

.text-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.2s;
}

.text-input:focus {
  outline: none;
  border-color: #666;
}

.color-presets-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-bottom: 12px;
}

.color-preset-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border: 2px solid #e5e5e5;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
}

.color-preset-btn:hover {
  border-color: #999;
  background: #f8f8f8;
}

.color-preset-btn.active {
  border-color: #4a90e2;
  background: #e3f2fd;
}

.color-preview {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
}

.color-name {
  font-size: 12px;
  color: #555;
  flex: 1;
}

.color-picker-row {
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
}

.picker-label {
  display: block;
  font-size: 12px;
  color: #777;
  margin-bottom: 8px;
}

.picker-group {
  display: flex;
  gap: 8px;
  align-items: center;
}

.color-picker {
  width: 60px;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  padding: 2px;
}

.color-input {
  flex: 1;
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 13px;
  font-family: monospace;
}

.color-input:focus {
  outline: none;
  border-color: #666;
}

.size-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  background: #f8f8f8;
  border-radius: 6px;
  margin-bottom: 12px;
}

.size-label {
  font-size: 13px;
  color: #666;
}

.size-value {
  font-size: 13px;
  font-weight: 600;
  color: #333;
  font-family: monospace;
}

.size-presets {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.preset-size-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 13px;
  color: #555;
}

.preset-size-btn:hover {
  border-color: #999;
  background: #f8f8f8;
}

.preset-size-btn.active {
  border-color: #4a90e2;
  background: #e3f2fd;
  color: #333;
  font-weight: 500;
}

.preset-size {
  font-size: 11px;
  color: #999;
  font-family: monospace;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: #f8f8f8;
  border-radius: 6px;
}

.info-label {
  font-size: 12px;
  color: #666;
}

.info-value {
  font-size: 12px;
  font-weight: 600;
  color: #333;
}

.editor-empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  color: #999;
  text-align: center;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.editor-empty p {
  margin: 4px 0;
  font-size: 14px;
}

.empty-hint {
  font-size: 12px;
  color: #bbb;
}

/* Custom scrollbar */
.editor-content::-webkit-scrollbar {
  width: 6px;
}

.editor-content::-webkit-scrollbar-track {
  background: #f5f5f5;
}

.editor-content::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 3px;
}

.editor-content::-webkit-scrollbar-thumb:hover {
  background: #999;
}
</style>
