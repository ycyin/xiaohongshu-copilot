<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  selectedConnector: Object
})

const emit = defineEmits(['update-property'])

// Local state
const localLineType = ref('straight')
const localStyle = ref('solid')
const localColor = ref('#333333')
const localStrokeWidth = ref(2)
const localStartArrow = ref(false)
const localEndArrow = ref(true)

// Watch for connector changes
watch(() => props.selectedConnector, (connector) => {
  if (connector) {
    localLineType.value = connector.lineType || 'straight'
    localStyle.value = connector.style || 'solid'
    localColor.value = connector.color || '#333333'
    localStrokeWidth.value = connector.strokeWidth || 2
    localStartArrow.value = connector.startArrow || false
    localEndArrow.value = connector.endArrow !== false
  }
}, { immediate: true })

// Update handlers
const updateLineType = (value) => {
  localLineType.value = value
  emit('update-property', 'lineType', value)
}

const updateStyle = (value) => {
  localStyle.value = value
  emit('update-property', 'style', value)
}

const updateColor = (value) => {
  localColor.value = value
  emit('update-property', 'color', value)
}

const updateStrokeWidth = (value) => {
  localStrokeWidth.value = value
  emit('update-property', 'strokeWidth', value)
}

const updateStartArrow = (value) => {
  localStartArrow.value = value
  emit('update-property', 'startArrow', value)
}

const updateEndArrow = (value) => {
  localEndArrow.value = value
  emit('update-property', 'endArrow', value)
}

// Color presets
const colorPresets = [
  { name: '黑色', color: '#333333' },
  { name: '蓝色', color: '#3498db' },
  { name: '绿色', color: '#2ecc71' },
  { name: '红色', color: '#e74c3c' },
  { name: '橙色', color: '#f39c12' },
  { name: '紫色', color: '#9b59b6' },
  { name: '青色', color: '#1abc9c' },
  { name: '灰色', color: '#95a5a6' },
]
</script>

<template>
  <div class="connector-editor">
    <div class="editor-header">
      <h3>🔗 连接线编辑</h3>
      <p class="hint">自定义连接线样式</p>
    </div>

    <div v-if="selectedConnector" class="editor-content">
      <!-- Line Type -->
      <div class="editor-section">
        <label class="section-label">线条类型</label>
        <div class="line-type-grid">
          <button
            @click="updateLineType('straight')"
            :class="['line-type-btn', { active: localLineType === 'straight' }]"
          >
            <svg width="60" height="30" viewBox="0 0 60 30">
              <line x1="5" y1="15" x2="55" y2="15" stroke="currentColor" stroke-width="2" />
            </svg>
            <span>直线</span>
          </button>
          <button
            @click="updateLineType('curved')"
            :class="['line-type-btn', { active: localLineType === 'curved' }]"
          >
            <svg width="60" height="30" viewBox="0 0 60 30">
              <path d="M 5 15 C 20 15, 40 15, 55 15" stroke="currentColor" stroke-width="2" fill="none" />
            </svg>
            <span>曲线</span>
          </button>
          <button
            @click="updateLineType('step')"
            :class="['line-type-btn', { active: localLineType === 'step' }]"
          >
            <svg width="60" height="30" viewBox="0 0 60 30">
              <path d="M 5 20 L 30 20 L 30 10 L 55 10" stroke="currentColor" stroke-width="2" fill="none" />
            </svg>
            <span>阶梯</span>
          </button>
          <button
            @click="updateLineType('elbow')"
            :class="['line-type-btn', { active: localLineType === 'elbow' }]"
          >
            <svg width="60" height="30" viewBox="0 0 60 30">
              <path d="M 5 25 L 5 15 L 55 15 L 55 5" stroke="currentColor" stroke-width="2" fill="none" />
            </svg>
            <span>折线</span>
          </button>
        </div>
      </div>

      <!-- Line Style -->
      <div class="editor-section">
        <label class="section-label">线条样式</label>
        <div class="style-buttons">
          <button
            @click="updateStyle('solid')"
            :class="['style-btn', { active: localStyle === 'solid' }]"
          >
            <svg width="60" height="4" viewBox="0 0 60 4">
              <line x1="0" y1="2" x2="60" y2="2" stroke="currentColor" stroke-width="2" />
            </svg>
            <span>实线</span>
          </button>
          <button
            @click="updateStyle('dashed')"
            :class="['style-btn', { active: localStyle === 'dashed' }]"
          >
            <svg width="60" height="4" viewBox="0 0 60 4">
              <line x1="0" y1="2" x2="60" y2="2" stroke="currentColor" stroke-width="2" stroke-dasharray="5,5" />
            </svg>
            <span>虚线</span>
          </button>
          <button
            @click="updateStyle('dotted')"
            :class="['style-btn', { active: localStyle === 'dotted' }]"
          >
            <svg width="60" height="4" viewBox="0 0 60 4">
              <line x1="0" y1="2" x2="60" y2="2" stroke="currentColor" stroke-width="2" stroke-dasharray="2,2" />
            </svg>
            <span>点线</span>
          </button>
        </div>
      </div>

      <!-- Stroke Width -->
      <div class="editor-section">
        <label class="section-label">线条粗细: {{ localStrokeWidth }}px</label>
        <input
          type="range"
          :value="localStrokeWidth"
          @input="updateStrokeWidth(parseInt($event.target.value))"
          min="1"
          max="10"
          step="1"
          class="slider"
        />
        <div class="preset-values">
          <button
            v-for="size in [1, 2, 3, 4, 6, 8]"
            :key="size"
            @click="updateStrokeWidth(size)"
            :class="['preset-btn', { active: localStrokeWidth === size }]"
          >
            {{ size }}px
          </button>
        </div>
      </div>

      <!-- Arrow Options -->
      <div class="editor-section">
        <label class="section-label">箭头选项</label>
        <div class="arrow-options">
          <label class="checkbox-label">
            <input
              type="checkbox"
              :checked="localStartArrow"
              @change="updateStartArrow($event.target.checked)"
            />
            <span>起点箭头</span>
          </label>
          <label class="checkbox-label">
            <input
              type="checkbox"
              :checked="localEndArrow"
              @change="updateEndArrow($event.target.checked)"
            />
            <span>终点箭头</span>
          </label>
        </div>
      </div>

      <!-- Color -->
      <div class="editor-section">
        <label class="section-label">颜色</label>
        <div class="color-presets-grid">
          <button
            v-for="preset in colorPresets"
            :key="preset.color"
            @click="updateColor(preset.color)"
            :class="['color-preset-btn', { active: localColor === preset.color }]"
            :title="preset.name"
          >
            <div class="color-preview" :style="{ backgroundColor: preset.color }"></div>
            <span class="color-name">{{ preset.name }}</span>
          </button>
        </div>
        <div class="color-picker-row">
          <label class="picker-label">自定义颜色</label>
          <div class="picker-group">
            <input
              type="color"
              :value="localColor"
              @input="updateColor($event.target.value)"
              class="color-picker"
            />
            <input
              type="text"
              :value="localColor"
              @input="updateColor($event.target.value)"
              class="color-input"
              placeholder="#333333"
            />
          </div>
        </div>
      </div>
    </div>

    <div v-else class="editor-empty">
      <div class="empty-icon">🔗</div>
      <p>选择连接线</p>
      <p class="empty-hint">点击画布中的连接线即可编辑</p>
    </div>
  </div>
</template>

<style scoped>
.connector-editor {
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

.section-label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #555;
  margin-bottom: 12px;
}

.line-type-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.line-type-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 12px 8px;
  border: 2px solid #e5e5e5;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 12px;
  color: #666;
}

.line-type-btn:hover {
  border-color: #999;
  background: #f8f8f8;
}

.line-type-btn.active {
  border-color: #4a90e2;
  background: #e3f2fd;
  color: #4a90e2;
}

.style-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.style-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 13px;
  color: #555;
}

.style-btn:hover {
  border-color: #999;
  background: #f8f8f8;
}

.style-btn.active {
  border-color: #4a90e2;
  background: #e3f2fd;
  color: #333;
}

.slider {
  width: 100%;
  margin-bottom: 12px;
}

.preset-values {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.preset-btn {
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s;
}

.preset-btn:hover {
  border-color: #999;
  background: #f8f8f8;
}

.preset-btn.active {
  border-color: #4a90e2;
  background: #e3f2fd;
  color: #4a90e2;
  font-weight: 500;
}

.arrow-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #555;
}

.checkbox-label input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
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
}

.color-name {
  font-size: 12px;
  color: #555;
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
