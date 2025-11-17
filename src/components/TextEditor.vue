<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  selectedElement: Object
})

const emit = defineEmits(['update-property'])

// Local state for editing
const localText = ref('')
const localFontSize = ref(24)
const localFontWeight = ref('normal')
const localColor = ref('#333333')
const localAlign = ref('center')
const localWidth = ref(600)

// Preset sizes
const fontSizePresets = [
  { label: '特小', value: 16 },
  { label: '小', value: 20 },
  { label: '正常', value: 24 },
  { label: '中', value: 32 },
  { label: '大', value: 48 },
  { label: '特大', value: 64 },
  { label: '超大', value: 80 }
]

// Color presets
const colorPresets = [
  '#000000', '#333333', '#666666', '#999999',
  '#FFFFFF', '#FF0000', '#FF6B6B', '#FFA07A',
  '#FFD700', '#90EE90', '#87CEEB', '#9370DB'
]

// Watch for selected element changes
watch(() => props.selectedElement, (element) => {
  if (element) {
    localText.value = element.text || ''
    localFontSize.value = element.fontSize || 24
    localFontWeight.value = element.fontWeight || 'normal'
    localColor.value = element.color || '#333333'
    localAlign.value = element.align || 'center'
    localWidth.value = element.width || 600
  }
}, { immediate: true })

// Update handlers
const updateText = () => {
  emit('update-property', 'text', localText.value)
}

const updateFontSize = (value) => {
  localFontSize.value = value
  emit('update-property', 'fontSize', value)
}

const updateFontWeight = (value) => {
  localFontWeight.value = value
  emit('update-property', 'fontWeight', value)
}

const updateColor = (value) => {
  localColor.value = value
  emit('update-property', 'color', value)
}

const updateAlign = (value) => {
  localAlign.value = value
  emit('update-property', 'align', value)
}

const updateWidth = (value) => {
  localWidth.value = value
  emit('update-property', 'width', value)
}

const hasSelection = computed(() => !!props.selectedElement)
</script>

<template>
  <div class="text-editor">
    <div class="editor-header">
      <h3>✏️ 文本编辑</h3>
      <p v-if="!hasSelection" class="hint">选择一个元素开始编辑</p>
    </div>

    <div v-if="hasSelection" class="editor-content">
      <!-- Text Content -->
      <div class="editor-section">
        <label class="section-label">文本内容</label>
        <textarea
          v-model="localText"
          @input="updateText"
          class="text-input"
          rows="6"
          placeholder="输入文本内容..."
        ></textarea>
      </div>

      <!-- Font Size -->
      <div class="editor-section">
        <label class="section-label">字号大小</label>
        <div class="size-presets">
          <button
            v-for="preset in fontSizePresets"
            :key="preset.value"
            @click="updateFontSize(preset.value)"
            :class="['preset-btn', { active: localFontSize === preset.value }]"
          >
            {{ preset.label }}
          </button>
        </div>
        <div class="slider-control">
          <input
            type="range"
            :value="localFontSize"
            @input="updateFontSize(Number($event.target.value))"
            min="12"
            max="120"
            step="2"
          />
          <span class="slider-value">{{ localFontSize }}px</span>
        </div>
      </div>

      <!-- Font Weight -->
      <div class="editor-section">
        <label class="section-label">字体粗细</label>
        <div class="button-group">
          <button
            @click="updateFontWeight('normal')"
            :class="['toggle-btn', { active: localFontWeight === 'normal' }]"
          >
            正常
          </button>
          <button
            @click="updateFontWeight('bold')"
            :class="['toggle-btn', { active: localFontWeight === 'bold' }]"
          >
            粗体
          </button>
        </div>
      </div>

      <!-- Text Align -->
      <div class="editor-section">
        <label class="section-label">文本对齐</label>
        <div class="button-group">
          <button
            @click="updateAlign('left')"
            :class="['toggle-btn', { active: localAlign === 'left' }]"
          >
            ← 左对齐
          </button>
          <button
            @click="updateAlign('center')"
            :class="['toggle-btn', { active: localAlign === 'center' }]"
          >
            ↔ 居中
          </button>
          <button
            @click="updateAlign('right')"
            :class="['toggle-btn', { active: localAlign === 'right' }]"
          >
            右对齐 →
          </button>
        </div>
      </div>

      <!-- Color -->
      <div class="editor-section">
        <label class="section-label">文本颜色</label>
        <div class="color-presets">
          <button
            v-for="color in colorPresets"
            :key="color"
            @click="updateColor(color)"
            :class="['color-btn', { active: localColor === color }]"
            :style="{ backgroundColor: color }"
            :title="color"
          ></button>
        </div>
        <div class="color-picker-row">
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
            placeholder="#000000"
          />
        </div>
      </div>

      <!-- Width -->
      <div class="editor-section">
        <label class="section-label">文本宽度</label>
        <div class="slider-control">
          <input
            type="range"
            :value="localWidth"
            @input="updateWidth(Number($event.target.value))"
            min="100"
            max="700"
            step="10"
          />
          <span class="slider-value">{{ localWidth }}px</span>
        </div>
      </div>
    </div>

    <div v-else class="editor-empty">
      <div class="empty-icon">📝</div>
      <p>点击画布上的文本元素</p>
      <p class="empty-hint">即可在此处进行编辑</p>
    </div>
  </div>
</template>

<style scoped>
.text-editor {
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
  margin-bottom: 20px;
}

.editor-section:last-child {
  margin-bottom: 0;
}

.section-label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #555;
  margin-bottom: 8px;
}

.text-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  min-height: 80px;
  transition: border-color 0.2s;
}

.text-input:focus {
  outline: none;
  border-color: #666;
}

.size-presets {
  display: flex;
  gap: 6px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.preset-btn {
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
  color: #666;
}

.preset-btn:hover {
  border-color: #999;
  background: #f8f8f8;
}

.preset-btn.active {
  background: #333;
  color: white;
  border-color: #333;
}

.slider-control {
  display: flex;
  align-items: center;
  gap: 12px;
}

.slider-control input[type="range"] {
  flex: 1;
}

.slider-value {
  font-size: 13px;
  color: #666;
  min-width: 50px;
  text-align: right;
  font-weight: 500;
}

.button-group {
  display: flex;
  gap: 8px;
}

.toggle-btn {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: white;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
  color: #666;
}

.toggle-btn:hover {
  border-color: #999;
  background: #f8f8f8;
}

.toggle-btn.active {
  background: #333;
  color: white;
  border-color: #333;
}

.color-presets {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 8px;
  margin-bottom: 10px;
}

.color-btn {
  aspect-ratio: 1;
  border: 2px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  padding: 0;
}

.color-btn:hover {
  transform: scale(1.1);
  border-color: #999;
}

.color-btn.active {
  border-color: #333;
  border-width: 3px;
  box-shadow: 0 0 0 2px rgba(51, 51, 51, 0.1);
}

.color-picker-row {
  display: flex;
  gap: 8px;
  align-items: center;
}

.color-picker {
  width: 50px;
  height: 38px;
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
