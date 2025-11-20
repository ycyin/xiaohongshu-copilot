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

const emit = defineEmits(['update-elements', 'element-selected', 'edge-click'])

// Local elements state
const localElements = ref([...props.elements])

// Editing state
const editingElementId = ref(null)
const editingText = ref('')
const selectedElementId = ref(null)
const isDragging = ref(false)
const isResizing = ref(false)
const resizeDirection = ref(null) // 'top', 'right', 'bottom', 'left'
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

  // Edge zones are handled by onEdgeMouseDown, so don't interfere
  if (e.target.classList.contains('edge-zone')) {
    return
  }

  selectedElementId.value = element.id

  if (e.target.classList.contains('resize-handle')) {
    isResizing.value = true
    resizeDirection.value = 'right'
    elementStart.value = {
      x: element.x,
      y: element.y,
      width: element.width,
      height: element.height || element.fontSize || 50
    }
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
  } else if (isResizing.value) {
    const element = selectedElement.value
    console.log('Resizing:', resizeDirection.value, 'delta:', deltaX, deltaY)

    if (element.type === 'text') {
      // Text: only width can be resized (left/right edges)
      if (resizeDirection.value === 'right') {
        element.width = Math.max(50, elementStart.value.width + deltaX)
      } else if (resizeDirection.value === 'left') {
        const newWidth = Math.max(50, elementStart.value.width - deltaX)
        element.width = newWidth
        element.x = elementStart.value.x + (elementStart.value.width - newWidth) / 2
      }
      // top/bottom do nothing for text
    } else if (element.type === 'rectangle') {
      // Rectangle: all edges can be resized
      if (resizeDirection.value === 'right') {
        element.width = Math.max(50, elementStart.value.width + deltaX)
      } else if (resizeDirection.value === 'left') {
        const newWidth = Math.max(50, elementStart.value.width - deltaX)
        element.width = newWidth
        element.x = elementStart.value.x + (elementStart.value.width - newWidth) / 2
      } else if (resizeDirection.value === 'bottom') {
        element.height = Math.max(50, elementStart.value.height + deltaY)
      } else if (resizeDirection.value === 'top') {
        const newHeight = Math.max(50, elementStart.value.height - deltaY)
        element.height = newHeight
        element.y = elementStart.value.y + (elementStart.value.height - newHeight) / 2
      }
    } else if (element.type === 'circle') {
      // Circle: resize uniformly
      const delta = resizeDirection.value === 'right' || resizeDirection.value === 'bottom'
        ? Math.max(deltaX, deltaY)
        : -Math.max(-deltaX, -deltaY)
      element.size = Math.max(20, elementStart.value.size + delta)
    } else if (element.type === 'icon') {
      // Icon: resize font size
      const delta = resizeDirection.value === 'right' || resizeDirection.value === 'bottom'
        ? Math.max(deltaX, deltaY)
        : -Math.max(-deltaX, -deltaY)
      element.fontSize = Math.max(16, elementStart.value.fontSize + delta * 0.5)
    }
  }
}

// Mouse up
const onMouseUp = () => {
  if (isDragging.value || isResizing.value) {
    emit('update-elements', localElements.value)
  }
  isDragging.value = false
  isResizing.value = false
  resizeDirection.value = null
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

// Get connector path for SVG
const getConnectorPath = (connector) => {
  const fromX = connector.fromX || 0
  const fromY = connector.fromY || 0
  const toX = connector.toX || 100
  const toY = connector.toY || 100

  const lineType = connector.lineType || 'straight'

  if (lineType === 'straight') {
    return `M ${fromX} ${fromY} L ${toX} ${toY}`
  } else if (lineType === 'curved') {
    // Bezier curve
    const midX = (fromX + toX) / 2
    const controlOffset = Math.abs(toX - fromX) * 0.3
    return `M ${fromX} ${fromY} C ${fromX + controlOffset} ${fromY}, ${toX - controlOffset} ${toY}, ${toX} ${toY}`
  } else if (lineType === 'step') {
    // Step line (right-angle)
    const midX = (fromX + toX) / 2
    return `M ${fromX} ${fromY} L ${midX} ${fromY} L ${midX} ${toY} L ${toX} ${toY}`
  } else if (lineType === 'elbow') {
    // Elbow line (vertical-horizontal-vertical)
    const midY = (fromY + toY) / 2
    return `M ${fromX} ${fromY} L ${fromX} ${midY} L ${toX} ${midY} L ${toX} ${toY}`
  }

  return `M ${fromX} ${fromY} L ${toX} ${toY}`
}

// Handle edge click for connector creation
const onEdgeClick = (elementId, edge, e) => {
  e.stopPropagation()
  e.preventDefault()
  console.log('onEdgeClick called:', elementId, edge)
  emit('edge-click', elementId, edge)
}

// Handle edge mousedown for resizing
const onEdgeMouseDown = (elementId, edge, e) => {
  e.stopPropagation()
  e.preventDefault()

  const element = localElements.value.find(el => el.id === elementId)
  if (!element) return

  // Check if Ctrl/Cmd key is pressed for connector mode
  if (e.ctrlKey || e.metaKey) {
    console.log('onEdgeClick called (with Ctrl):', elementId, edge)
    emit('edge-click', elementId, edge)
    return
  }

  // Otherwise, start resizing
  console.log('Starting resize:', elementId, edge, element.type)
  selectedElementId.value = elementId
  isResizing.value = true
  resizeDirection.value = edge
  dragStart.value = { x: e.clientX, y: e.clientY }

  // Initialize elementStart with proper values for each element type
  if (element.type === 'text') {
    elementStart.value = {
      x: element.x,
      y: element.y,
      width: element.width || 100,
      fontSize: element.fontSize || 32
    }
  } else if (element.type === 'rectangle') {
    elementStart.value = {
      x: element.x,
      y: element.y,
      width: element.width || 100,
      height: element.height || 100
    }
  } else if (element.type === 'circle') {
    elementStart.value = {
      x: element.x,
      y: element.y,
      size: element.size || 100
    }
  } else if (element.type === 'icon') {
    elementStart.value = {
      x: element.x,
      y: element.y,
      fontSize: element.fontSize || 64
    }
  }

  console.log('Element start state:', elementStart.value)
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
      <!-- Connectors Layer (rendered first, behind other elements) -->
      <svg
        class="connectors-layer"
        :style="{
          position: 'absolute',
          left: '0',
          top: '0',
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          overflow: 'visible',
          zIndex: 1
        }"
      >
        <defs>
          <!-- Arrow markers for all connectors -->
          <marker
            v-for="connector in localElements.filter(el => el.type === 'connector')"
            :key="`arrow-${connector.id}`"
            :id="`arrowhead-${connector.id}`"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <polygon
              points="0 0, 10 3, 0 6"
              :fill="connector.color || '#333'"
            />
          </marker>
          <marker
            v-for="connector in localElements.filter(el => el.type === 'connector' && el.startArrow)"
            :key="`arrow-start-${connector.id}`"
            :id="`arrowhead-start-${connector.id}`"
            markerWidth="10"
            markerHeight="10"
            refX="1"
            refY="3"
            orient="auto-start-reverse"
            markerUnits="strokeWidth"
          >
            <polygon
              points="10 0, 0 3, 10 6"
              :fill="connector.color || '#333'"
            />
          </marker>
        </defs>

        <!-- Connector paths -->
        <path
          v-for="connector in localElements.filter(el => el.type === 'connector')"
          :key="connector.id"
          :d="getConnectorPath(connector)"
          :stroke="connector.color || '#333'"
          :stroke-width="connector.strokeWidth || 2"
          fill="none"
          :stroke-dasharray="connector.style === 'dashed' ? '5,5' : (connector.style === 'dotted' ? '2,2' : 'none')"
          :marker-end="connector.endArrow !== false ? `url(#arrowhead-${connector.id})` : ''"
          :marker-start="connector.startArrow ? `url(#arrowhead-start-${connector.id})` : ''"
          class="connector-path"
          :class="{ selected: connector.id === selectedElementId }"
          @click.stop="selectElement(connector.id)"
        />
      </svg>

      <!-- Elements -->
      <div
        v-for="element in localElements.filter(el => el.type !== 'connector')"
        :key="element.id"
        class="canvas-element"
        :class="{
          selected: element.id === selectedElementId,
          editing: element.id === editingElementId,
          'no-center': element.type === 'line'
        }"
        :style="{
          left: element.x + 'px',
          top: element.y + 'px',
          transform: (element.type === 'text' || element.type === 'icon' || element.type === 'rectangle' || element.type === 'circle')
            ? `translate(-50%, -50%)`
            : 'none',
          zIndex: 10
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

        <!-- Rectangle Element -->
        <div
          v-if="element.type === 'rectangle'"
          class="rectangle-element"
          :style="{
            width: element.width + 'px',
            height: element.height + 'px',
            backgroundColor: element.backgroundColor || 'transparent',
            border: element.border || '2px solid #333',
            borderRadius: (element.borderRadius || 0) + 'px'
          }"
        ></div>

        <!-- Circle Element -->
        <div
          v-if="element.type === 'circle'"
          class="circle-element"
          :style="{
            width: element.size + 'px',
            height: element.size + 'px',
            backgroundColor: element.backgroundColor || 'transparent',
            border: element.border || '2px solid #333'
          }"
        ></div>

        <!-- Line Element -->
        <div
          v-if="element.type === 'line'"
          class="line-element"
          :style="{
            width: element.width + 'px',
            height: element.height || '2px',
            backgroundColor: element.color || '#333',
            transform: element.rotate ? `rotate(${element.rotate}deg)` : 'none',
            transformOrigin: 'left center'
          }"
        ></div>

        <!-- Selection Handles -->
        <div v-if="element.id === selectedElementId && !editingElementId" class="selection-handles">
          <div v-if="element.type === 'text'" class="resize-handle resize-handle-right"></div>
        </div>

        <!-- Edge Click Zones for connector creation -->
        <div
          v-if="element.type === 'text' || element.type === 'icon' || element.type === 'rectangle' || element.type === 'circle'"
          class="edge-zones"
        >
          <div
            class="edge-zone edge-top"
            @mousedown="onEdgeMouseDown(element.id, 'top', $event)"
          ></div>
          <div
            class="edge-zone edge-right"
            @mousedown="onEdgeMouseDown(element.id, 'right', $event)"
          ></div>
          <div
            class="edge-zone edge-bottom"
            @mousedown="onEdgeMouseDown(element.id, 'bottom', $event)"
          ></div>
          <div
            class="edge-zone edge-left"
            @mousedown="onEdgeMouseDown(element.id, 'left', $event)"
          ></div>
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

/* Connectors layer */
.connectors-layer {
  z-index: 1;
}

.connector-path {
  cursor: pointer;
  pointer-events: stroke;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: stroke-width 0.2s;
}

.connector-path:hover {
  stroke-width: 4 !important;
}

.connector-path.selected {
  stroke-width: 4 !important;
  filter: drop-shadow(0 0 4px rgba(74, 144, 226, 0.6));
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

.rectangle-element {
  pointer-events: none;
}

.circle-element {
  pointer-events: none;
  border-radius: 50%;
}

.line-element {
  pointer-events: none;
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
  z-index: 20;
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
  z-index: 25;
}

.resize-handle-right {
  right: -6px;
  top: 50%;
  transform: translateY(-50%);
}

/* Edge zones for connector creation */
.edge-zones {
  position: absolute;
  top: -8px;
  left: -8px;
  right: -8px;
  bottom: -8px;
  pointer-events: none;
  z-index: 10;
}

.edge-zone {
  position: absolute;
  pointer-events: all;
  background: transparent;
  transition: all 0.2s;
  border: 1px solid transparent;
}

.edge-zone:hover {
  background-color: rgba(74, 144, 226, 0.3);
  border-color: #4a90e2;
}

.edge-zone::after {
  content: '';
  position: absolute;
  background: #4a90e2;
  opacity: 0;
  transition: opacity 0.2s;
  border-radius: 2px;
}

.edge-zone:hover::after {
  opacity: 1;
}

.edge-top,
.edge-bottom {
  height: 12px;
  left: 10%;
  right: 10%;
  cursor: ns-resize;
}

.edge-top {
  top: 0;
  border-radius: 4px 4px 0 0;
}

.edge-top::after {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 3px;
}

.edge-bottom {
  bottom: 0;
  border-radius: 0 0 4px 4px;
}

.edge-bottom::after {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 3px;
}

.edge-left,
.edge-right {
  width: 12px;
  top: 10%;
  bottom: 10%;
  cursor: ew-resize;
}

.edge-left {
  left: 0;
  border-radius: 4px 0 0 4px;
}

.edge-left::after {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 3px;
  height: 30px;
}

.edge-right {
  right: 0;
  border-radius: 0 4px 4px 0;
}

.edge-right::after {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 3px;
  height: 30px;
}
</style>
