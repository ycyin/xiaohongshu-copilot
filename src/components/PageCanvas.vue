<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  pageId: String,
  width: Number,
  height: Number,
  backgroundColor: String,
  elements: Array,
  isSelected: Boolean
})

const emit = defineEmits(['update-elements', 'element-selected'])

// Local elements state
const localElements = ref([...props.elements])

// Editing state
const editingElementId = ref(null)
const editingText = ref('')
const selectedElementId = ref(null)
const isDragging = ref(false)
const isResizing = ref(false)
const dragStart = ref({ x: 0, y: 0 })
const elementStart = ref({ x: 0, y: 0 })

watch(() => props.elements, (newElements) => {
  localElements.value = [...newElements]
}, { deep: true })

const selectedElement = computed(() => {
  return localElements.value.find(el => el.id === selectedElementId.value)
})

// Start inline editing
const startEditing = (element, e) => {
  if (e.detail === 2) { // Double click
    editingElementId.value = element.id
    editingText.value = element.text
    e.stopPropagation()
  }
}

// Finish editing
const finishEditing = () => {
  if (editingElementId.value) {
    const element = localElements.value.find(el => el.id === editingElementId.value)
    if (element) {
      element.text = editingText.value
      emit('update-elements', localElements.value)
    }
    editingElementId.value = null
    editingText.value = ''
  }
}

// Mouse down on element
const onElementMouseDown = (e, element) => {
  if (editingElementId.value) return

  selectedElementId.value = element.id

  if (e.target.classList.contains('resize-handle')) {
    isResizing.value = true
    elementStart.value = { width: element.width }
  } else {
    isDragging.value = true
    elementStart.value = { x: element.x, y: element.y }
  }

  dragStart.value = { x: e.clientX, y: e.clientY }
  e.stopPropagation()
  e.preventDefault()
}

// Mouse move
const onMouseMove = (e) => {
  if (!selectedElement.value) return

  const deltaX = e.clientX - dragStart.value.x
  const deltaY = e.clientY - dragStart.value.y

  if (isDragging.value) {
    selectedElement.value.x = elementStart.value.x + deltaX
    selectedElement.value.y = elementStart.value.y + deltaY
  } else if (isResizing.value && selectedElement.value.type === 'text') {
    selectedElement.value.width = Math.max(100, elementStart.value.width + deltaX)
  }
}

// Mouse up
const onMouseUp = () => {
  if (isDragging.value || isResizing.value) {
    emit('update-elements', localElements.value)
  }
  isDragging.value = false
  isResizing.value = false
}

// Select element
const selectElement = (elementId) => {
  if (!editingElementId.value) {
    selectedElementId.value = elementId
    const element = localElements.value.find(el => el.id === elementId)
    emit('element-selected', element)
  }
}

// Deselect
const deselectAll = (e) => {
  if (e.target.classList.contains('page-canvas-surface')) {
    selectedElementId.value = null
    emit('element-selected', null)
    finishEditing()
  }
}

// Delete selected element
const deleteSelected = () => {
  if (selectedElementId.value) {
    localElements.value = localElements.value.filter(el => el.id !== selectedElementId.value)
    selectedElementId.value = null
    emit('update-elements', localElements.value)
  }
}

// Handle keyboard
const onKeyDown = (e) => {
  if (props.isSelected && selectedElementId.value && !editingElementId.value) {
    if (e.key === 'Delete' || e.key === 'Backspace') {
      deleteSelected()
      e.preventDefault()
    }
  }
}

// Add event listener
if (typeof document !== 'undefined') {
  document.addEventListener('keydown', onKeyDown)
}
</script>

<template>
  <div
    class="page-canvas"
    :style="{
      width: width + 'px',
      height: height + 'px',
      backgroundColor: backgroundColor
    }"
    @mousemove="onMouseMove"
    @mouseup="onMouseUp"
    @mouseleave="onMouseUp"
  >
    <div
      class="page-canvas-surface"
      @click="deselectAll"
    >
      <!-- Elements -->
      <div
        v-for="element in localElements"
        :key="element.id"
        class="canvas-element"
        :class="{
          selected: element.id === selectedElementId,
          editing: element.id === editingElementId
        }"
        :style="{
          left: element.x + 'px',
          top: element.y + 'px',
          transform: element.type === 'text'
            ? `translate(-50%, -50%)`
            : 'translate(-50%, -50%)'
        }"
        @mousedown="(e) => onElementMouseDown(e, element)"
        @click="(e) => { selectElement(element.id); startEditing(element, e); }"
      >
        <!-- Text Element -->
        <div
          v-if="element.type === 'text' && element.id !== editingElementId"
          class="text-element"
          :style="{
            fontSize: element.fontSize + 'px',
            fontWeight: element.fontWeight || 'normal',
            color: element.color || '#333',
            textAlign: element.align || 'center',
            width: element.width + 'px'
          }"
        >
          {{ element.text }}
        </div>

        <!-- Text Editing Input -->
        <textarea
          v-if="element.type === 'text' && element.id === editingElementId"
          v-model="editingText"
          class="text-editing-input"
          :style="{
            fontSize: element.fontSize + 'px',
            fontWeight: element.fontWeight || 'normal',
            color: element.color || '#333',
            textAlign: element.align || 'center',
            width: element.width + 'px'
          }"
          @blur="finishEditing"
          @keydown.enter.ctrl="finishEditing"
          @keydown.esc="finishEditing"
          @click.stop
          ref="editInput"
          autofocus
        ></textarea>

        <!-- Icon Element -->
        <div
          v-if="element.type === 'icon'"
          class="icon-element"
          :style="{
            fontSize: element.fontSize + 'px',
            color: element.color || '#333'
          }"
        >
          {{ element.text }}
        </div>

        <!-- Selection Handles -->
        <div v-if="element.id === selectedElementId && !editingElementId" class="selection-handles">
          <div v-if="element.type === 'text'" class="resize-handle resize-handle-right"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-canvas {
  position: relative;
  overflow: hidden;
  user-select: none;
}

.page-canvas-surface {
  width: 100%;
  height: 100%;
  position: relative;
}

.canvas-element {
  position: absolute;
  cursor: move;
}

.canvas-element.selected {
  z-index: 10;
}

.canvas-element.editing {
  z-index: 20;
  cursor: text;
}

.text-element {
  white-space: pre-wrap;
  word-wrap: break-word;
  pointer-events: none;
  line-height: 1.3;
}

.text-editing-input {
  border: 2px solid #4a90e2;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.95);
  padding: 8px;
  resize: none;
  font-family: inherit;
  line-height: 1.3;
  min-height: 60px;
  outline: none;
  box-shadow: 0 2px 12px rgba(74, 144, 226, 0.3);
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
  border-radius: 2px;
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
</style>
