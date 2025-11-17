<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  width: {
    type: Number,
    default: 750
  },
  height: {
    type: Number,
    default: 1000
  },
  backgroundColor: {
    type: String,
    default: 'rgb(243, 209, 158)'
  }
})

const emit = defineEmits(['export'])

// Canvas and editor state
const canvasRef = ref(null)
const editorRef = ref(null)
const elements = ref([])
const selectedElementId = ref(null)
const isDragging = ref(false)
const isResizing = ref(false)
const dragStart = ref({ x: 0, y: 0 })
const elementIdCounter = ref(0)

// Scale for responsive display
const scale = ref(1)
const canvasDisplayWidth = computed(() => props.width * scale.value)
const canvasDisplayHeight = computed(() => props.height * scale.value)

// Selected element
const selectedElement = computed(() => {
  return elements.value.find(el => el.id === selectedElementId.value)
})

// Initialize canvas with sample elements
onMounted(() => {
  calculateScale()
  window.addEventListener('resize', calculateScale)

  // Add default title element
  addTextElement('标题', props.width / 2, 200, 48, 'bold', 'center')
  // Add default content element
  addTextElement('在这里输入内容...', props.width / 2, 400, 24, 'normal', 'center')
})

// Calculate scale based on container width
const calculateScale = () => {
  if (editorRef.value) {
    const containerWidth = editorRef.value.clientWidth - 40
    scale.value = Math.min(1, containerWidth / props.width)
  }
}

// Add a new text element
const addTextElement = (text, x, y, fontSize = 24, fontWeight = 'normal', align = 'left') => {
  const id = `element-${elementIdCounter.value++}`
  elements.value.push({
    id,
    type: 'text',
    text,
    x,
    y,
    fontSize,
    fontWeight,
    fontFamily: 'sans-serif',
    color: '#333',
    align,
    width: 600,
    rotation: 0
  })
  selectedElementId.value = id
}

// Add a new icon element
const addIconElement = (icon, x = null, y = null) => {
  const id = `element-${elementIdCounter.value++}`
  elements.value.push({
    id,
    type: 'icon',
    text: icon,
    x: x || props.width / 2,
    y: y || props.height / 2,
    fontSize: 64,
    color: '#333',
    align: 'center',
    width: 100,
    rotation: 0
  })
  selectedElementId.value = id
}

// Mouse down on element - start dragging
const onElementMouseDown = (e, elementId) => {
  if (e.target.classList.contains('resize-handle')) {
    isResizing.value = true
  } else {
    isDragging.value = true
  }

  selectedElementId.value = elementId
  const rect = editorRef.value.getBoundingClientRect()
  dragStart.value = {
    x: (e.clientX - rect.left) / scale.value,
    y: (e.clientY - rect.top) / scale.value
  }

  e.preventDefault()
  e.stopPropagation()
}

// Mouse move - drag or resize element
const onMouseMove = (e) => {
  if (!selectedElement.value) return

  const rect = editorRef.value.getBoundingClientRect()
  const currentX = (e.clientX - rect.left) / scale.value
  const currentY = (e.clientY - rect.top) / scale.value

  if (isDragging.value) {
    const deltaX = currentX - dragStart.value.x
    const deltaY = currentY - dragStart.value.y

    selectedElement.value.x += deltaX
    selectedElement.value.y += deltaY

    dragStart.value = { x: currentX, y: currentY }
  } else if (isResizing.value) {
    const deltaX = currentX - dragStart.value.x
    selectedElement.value.width = Math.max(50, selectedElement.value.width + deltaX)
    dragStart.value = { x: currentX, y: currentY }
  }
}

// Mouse up - stop dragging/resizing
const onMouseUp = () => {
  isDragging.value = false
  isResizing.value = false
}

// Deselect element when clicking canvas background
const onCanvasClick = (e) => {
  if (e.target === e.currentTarget) {
    selectedElementId.value = null
  }
}

// Delete selected element
const deleteSelectedElement = () => {
  if (selectedElementId.value) {
    elements.value = elements.value.filter(el => el.id !== selectedElementId.value)
    selectedElementId.value = null
  }
}

// Update element property
const updateElementProperty = (property, value) => {
  if (selectedElement.value) {
    selectedElement.value[property] = value
  }
}

// Export canvas as image
const exportImage = () => {
  const canvas = document.createElement('canvas')
  canvas.width = props.width
  canvas.height = props.height
  const ctx = canvas.getContext('2d')

  // Background
  ctx.fillStyle = props.backgroundColor
  ctx.fillRect(0, 0, props.width, props.height)

  // Render all elements
  elements.value.forEach(element => {
    if (element.type === 'text') {
      ctx.fillStyle = element.color
      ctx.font = `${element.fontWeight} ${element.fontSize}px ${element.fontFamily}`
      ctx.textAlign = element.align
      ctx.textBaseline = 'top'

      // Word wrap
      const lines = wrapText(ctx, element.text, element.width)
      lines.forEach((line, index) => {
        const lineY = element.y + (index * element.fontSize * 1.3)
        ctx.fillText(line, element.x, lineY)
      })
    } else if (element.type === 'icon') {
      // Render icon (emoji)
      ctx.fillStyle = element.color
      ctx.font = `${element.fontSize}px ${element.fontFamily}`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(element.text, element.x, element.y)
    }
  })

  const dataUrl = canvas.toDataURL('image/png')
  emit('export', dataUrl)
  return dataUrl
}

// Word wrap helper
const wrapText = (ctx, text, maxWidth) => {
  const words = text.split(' ')
  const lines = []
  let currentLine = ''

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word
    const metrics = ctx.measureText(testLine)

    if (metrics.width > maxWidth && currentLine) {
      lines.push(currentLine)
      currentLine = word
    } else {
      currentLine = testLine
    }
  }

  if (currentLine) {
    lines.push(currentLine)
  }

  return lines
}

// Keyboard shortcuts
const onKeyDown = (e) => {
  if (e.key === 'Delete' || e.key === 'Backspace') {
    if (selectedElementId.value && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
      deleteSelectedElement()
      e.preventDefault()
    }
  }
}

onMounted(() => {
  document.addEventListener('keydown', onKeyDown)
})

defineExpose({
  exportImage,
  addTextElement,
  addIconElement,
  selectedElement,
  updateElementProperty
})
</script>

<template>
  <div class="canvas-editor" ref="editorRef">
    <!-- Toolbar -->
    <div class="toolbar">
      <button @click="addTextElement('新文本', props.width / 2, 300, 24, 'normal', 'center')" class="tool-btn">
        ➕ 添加文本
      </button>
      <button @click="deleteSelectedElement" :disabled="!selectedElementId" class="tool-btn">
        🗑️ 删除
      </button>
      <button @click="exportImage" class="tool-btn tool-btn-primary">
        💾 导出图片
      </button>
    </div>

    <!-- Canvas Area -->
    <div
      class="canvas-container"
      :style="{
        width: canvasDisplayWidth + 'px',
        height: canvasDisplayHeight + 'px',
        backgroundColor: backgroundColor
      }"
      @click="onCanvasClick"
      @mousemove="onMouseMove"
      @mouseup="onMouseUp"
      @mouseleave="onMouseUp"
    >
      <!-- Elements -->
      <div
        v-for="element in elements"
        :key="element.id"
        class="canvas-element"
        :class="{ selected: element.id === selectedElementId }"
        :style="{
          left: (element.x * scale) + 'px',
          top: (element.y * scale) + 'px',
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: 'center center'
        }"
        @mousedown="(e) => onElementMouseDown(e, element.id)"
      >
        <div
          v-if="element.type === 'text'"
          class="text-element"
          :style="{
            fontSize: element.fontSize + 'px',
            fontWeight: element.fontWeight,
            fontFamily: element.fontFamily,
            color: element.color,
            textAlign: element.align,
            width: element.width + 'px'
          }"
        >
          {{ element.text }}
        </div>

        <div
          v-else-if="element.type === 'icon'"
          class="icon-element"
          :style="{
            fontSize: element.fontSize + 'px',
            color: element.color
          }"
        >
          {{ element.text }}
        </div>

        <!-- Selection handles -->
        <div v-if="element.id === selectedElementId" class="selection-handles">
          <div v-if="element.type === 'text'" class="resize-handle resize-handle-right" @mousedown.stop="isResizing = true"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.canvas-editor {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.toolbar {
  display: flex;
  gap: 8px;
  padding: 12px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  flex-wrap: wrap;
}

.tool-btn {
  padding: 8px 16px;
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.tool-btn:hover:not(:disabled) {
  background: #e5e5e5;
  border-color: #ccc;
}

.tool-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.tool-btn-primary {
  background: #333;
  color: white;
  border-color: #333;
}

.tool-btn-primary:hover {
  background: #555;
}

.canvas-container {
  position: relative;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  cursor: default;
}

.canvas-element {
  position: absolute;
  cursor: move;
  user-select: none;
}

.canvas-element.selected {
  z-index: 100;
}

.text-element {
  white-space: pre-wrap;
  word-wrap: break-word;
  pointer-events: none;
}

.icon-element {
  pointer-events: none;
  text-align: center;
  line-height: 1;
}

.selection-handles {
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  border: 2px dashed #4a90e2;
  pointer-events: none;
}

.resize-handle {
  position: absolute;
  width: 12px;
  height: 12px;
  background: #4a90e2;
  border: 2px solid white;
  border-radius: 50%;
  pointer-events: all;
  cursor: ew-resize;
}

.resize-handle-right {
  right: -6px;
  top: 50%;
  transform: translateY(-50%);
}

.properties-panel {
  padding: 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.properties-panel.empty {
  text-align: center;
  padding: 32px;
  color: #999;
}

.properties-panel h4 {
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
  color: #222;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 8px;
}

.property-group {
  margin-bottom: 12px;
}

.property-group label {
  display: block;
  margin-bottom: 6px;
  font-size: 13px;
  font-weight: 500;
  color: #555;
}

.property-group input,
.property-group select,
.property-group textarea {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
}

.property-group input[type="color"] {
  height: 38px;
  cursor: pointer;
}

.property-group input[type="range"] {
  padding: 0;
}

.property-group textarea {
  resize: vertical;
  min-height: 60px;
}

.property-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 12px;
}

@media (max-width: 767px) {
  .property-row {
    grid-template-columns: 1fr;
  }
}
</style>
