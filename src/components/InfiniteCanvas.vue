<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import PageCanvas from './PageCanvas.vue'

const emit = defineEmits(['page-selected', 'element-selected'])

// Pages state
const pages = ref([
  {
    id: 'main',
    name: '主图',
    type: 'main',
    width: 750,
    height: 1000,
    backgroundColor: 'rgb(243, 209, 158)',
    elements: [
      { id: 'el-1', type: 'text', text: '主图标题', x: 375, y: 200, fontSize: 64, fontWeight: 'bold', color: '#333', align: 'center', width: 600 }
    ]
  },
  {
    id: 'sub-1',
    name: '副图 1',
    type: 'sub',
    width: 750,
    height: 1000,
    backgroundColor: 'rgb(243, 209, 158)',
    elements: [
      { id: 'el-2', type: 'text', text: '副图 1 内容', x: 375, y: 300, fontSize: 48, fontWeight: 'bold', color: '#333', align: 'center', width: 600 }
    ]
  }
])

const selectedPageId = ref('main')
const canvasRef = ref(null)
const viewportOffset = ref({ x: 0, y: 0 })
const viewportScale = ref(0.5)
const isPanning = ref(false)
const panStart = ref({ x: 0, y: 0 })
const pageIdCounter = ref(2)

// Selected page
const selectedPage = computed(() => {
  return pages.value.find(p => p.id === selectedPageId.value)
})

// Page positions for layout (horizontal layout with gaps, like XMind)
const pagePositions = computed(() => {
  const gap = 100
  let currentX = gap
  const startY = gap
  return pages.value.map(page => {
    const pos = {
      id: page.id,
      x: currentX,
      y: startY,
      width: page.width,
      height: page.height
    }
    currentX += page.width + gap
    return pos
  })
})

// Canvas bounds
const canvasBounds = computed(() => {
  if (pagePositions.value.length === 0) return { width: 0, height: 0 }
  const lastPage = pagePositions.value[pagePositions.value.length - 1]
  return {
    width: lastPage.x + lastPage.width + 100,
    height: lastPage.y + lastPage.height + 100
  }
})

// Add new page
const addPage = (type = 'sub') => {
  const newId = `sub-${pageIdCounter.value++}`
  pages.value.push({
    id: newId,
    name: `副图 ${pageIdCounter.value - 1}`,
    type: 'sub',
    width: 750,
    height: 1000,
    backgroundColor: 'rgb(243, 209, 158)',
    elements: [
      {
        id: `el-${Date.now()}`,
        type: 'text',
        text: `副图 ${pageIdCounter.value - 1} 内容`,
        x: 375,
        y: 300,
        fontSize: 48,
        fontWeight: 'bold',
        color: '#333',
        align: 'center',
        width: 600
      }
    ]
  })
  selectedPageId.value = newId
}

// Delete page
const deletePage = (pageId) => {
  if (pages.value.length <= 1) return
  const index = pages.value.findIndex(p => p.id === pageId)
  if (index === -1) return

  pages.value.splice(index, 1)

  // Select another page
  if (selectedPageId.value === pageId) {
    selectedPageId.value = pages.value[Math.max(0, index - 1)].id
  }
}

// Select page
const selectPage = (pageId) => {
  selectedPageId.value = pageId
  emit('page-selected', pageId)
}

// Pan canvas
const onCanvasMouseDown = (e) => {
  if (e.target === canvasRef.value || e.target.classList.contains('infinite-canvas-content')) {
    isPanning.value = true
    panStart.value = {
      x: e.clientX - viewportOffset.value.x,
      y: e.clientY - viewportOffset.value.y
    }
    e.preventDefault()
  }
}

const onCanvasMouseMove = (e) => {
  if (isPanning.value) {
    viewportOffset.value = {
      x: e.clientX - panStart.value.x,
      y: e.clientY - panStart.value.y
    }
  }
}

const onCanvasMouseUp = () => {
  isPanning.value = false
}

// Zoom
const onWheel = (e) => {
  if (e.ctrlKey || e.metaKey) {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.1 : 0.1
    viewportScale.value = Math.max(0.1, Math.min(2, viewportScale.value + delta))
  }
}

// Update page elements
const updatePageElements = (pageId, elements) => {
  const page = pages.value.find(p => p.id === pageId)
  if (page) {
    page.elements = elements
  }
}

// Add element to current page
const addElementToCurrentPage = (element) => {
  if (selectedPage.value) {
    selectedPage.value.elements.push({
      ...element,
      id: `el-${Date.now()}`
    })
  }
}

// Export current page
const exportCurrentPage = () => {
  // This will be called from parent
  return selectedPage.value
}

// Center view on page
const centerOnPage = (pageId) => {
  const pos = pagePositions.value.find(p => p.id === pageId)
  if (pos && canvasRef.value) {
    const rect = canvasRef.value.getBoundingClientRect()
    viewportOffset.value = {
      x: rect.width / 2 - (pos.x + pos.width / 2) * viewportScale.value,
      y: rect.height / 2 - (pos.y + pos.height / 2) * viewportScale.value
    }
  }
}

onMounted(() => {
  nextTick(() => {
    centerOnPage('main')
  })
})

defineExpose({
  pages,
  selectedPage,
  addPage,
  addElementToCurrentPage,
  exportCurrentPage
})
</script>

<template>
  <div class="infinite-canvas-container">
    <!-- Toolbar -->
    <div class="canvas-toolbar">
      <div class="toolbar-left">
        <button @click="addPage('sub')" class="toolbar-btn">
          ➕ 添加副图
        </button>
        <span class="divider"></span>
        <button
          @click="deletePage(selectedPageId)"
          :disabled="pages.length <= 1 || selectedPage?.type === 'main'"
          class="toolbar-btn"
        >
          🗑️ 删除当前页
        </button>
      </div>

      <div class="toolbar-center">
        <span class="page-indicator">
          {{ selectedPage?.name || '未选择' }}
        </span>
      </div>

      <div class="toolbar-right">
        <button @click="viewportScale = Math.max(0.1, viewportScale - 0.1)" class="toolbar-btn-icon">
          🔍−
        </button>
        <span class="zoom-level">{{ Math.round(viewportScale * 100) }}%</span>
        <button @click="viewportScale = Math.min(2, viewportScale + 0.1)" class="toolbar-btn-icon">
          🔍+
        </button>
        <button @click="viewportScale = 0.5" class="toolbar-btn-sm">
          重置
        </button>
      </div>
    </div>

    <!-- Infinite Canvas -->
    <div
      ref="canvasRef"
      class="infinite-canvas"
      :class="{ panning: isPanning }"
      @mousedown="onCanvasMouseDown"
      @mousemove="onCanvasMouseMove"
      @mouseup="onCanvasMouseUp"
      @mouseleave="onCanvasMouseUp"
      @wheel="onWheel"
    >
      <div
        class="infinite-canvas-content"
        :style="{
          transform: `translate(${viewportOffset.x}px, ${viewportOffset.y}px) scale(${viewportScale})`,
          width: canvasBounds.width + 'px',
          height: canvasBounds.height + 'px'
        }"
      >
        <!-- Pages -->
        <div
          v-for="(page, index) in pages"
          :key="page.id"
          class="page-container"
          :class="{ selected: page.id === selectedPageId }"
          :style="{
            left: pagePositions[index].x + 'px',
            top: pagePositions[index].y + 'px',
            width: page.width + 'px',
            height: page.height + 'px'
          }"
          @click="selectPage(page.id)"
        >
          <!-- Page Label -->
          <div class="page-label">
            {{ page.name }}
          </div>

          <!-- Page Canvas -->
          <PageCanvas
            :page-id="page.id"
            :width="page.width"
            :height="page.height"
            :background-color="page.backgroundColor"
            :elements="page.elements"
            :is-selected="page.id === selectedPageId"
            @update-elements="(els) => updatePageElements(page.id, els)"
            @element-selected="(el) => emit('element-selected', el, page.id)"
          />
        </div>
      </div>
    </div>

    <!-- Mini Map / Page Navigator -->
    <div class="page-navigator">
      <div class="navigator-title">页面</div>
      <div class="navigator-pages">
        <div
          v-for="page in pages"
          :key="page.id"
          class="navigator-page"
          :class="{ active: page.id === selectedPageId }"
          @click="selectPage(page.id); centerOnPage(page.id)"
        >
          <div class="navigator-page-preview">
            {{ page.type === 'main' ? '📱' : '📄' }}
          </div>
          <div class="navigator-page-name">{{ page.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.infinite-canvas-container {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  background: #e8e8e8;
}

.canvas-toolbar {
  background: white;
  border-bottom: 1px solid #ddd;
  padding: 10px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
}

.toolbar-left,
.toolbar-center,
.toolbar-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.toolbar-btn {
  padding: 6px 12px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.toolbar-btn:hover:not(:disabled) {
  background: #f5f5f5;
  border-color: #999;
}

.toolbar-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.toolbar-btn-icon {
  padding: 4px 8px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}

.toolbar-btn-icon:hover {
  background: #f5f5f5;
}

.toolbar-btn-sm {
  padding: 4px 8px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}

.toolbar-btn-sm:hover {
  background: #f5f5f5;
}

.divider {
  width: 1px;
  height: 20px;
  background: #ddd;
}

.page-indicator {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.zoom-level {
  font-size: 13px;
  color: #666;
  min-width: 45px;
  text-align: center;
}

.infinite-canvas {
  flex: 1;
  overflow: hidden;
  position: relative;
  background:
    linear-gradient(#ccc 1px, transparent 1px),
    linear-gradient(90deg, #ccc 1px, transparent 1px);
  background-size: 20px 20px;
  cursor: grab;
}

.infinite-canvas.panning {
  cursor: grabbing;
}

.infinite-canvas-content {
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: 0 0;
  pointer-events: none;
}

.page-container {
  position: absolute;
  pointer-events: all;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.2s, transform 0.2s;
  background: white;
  overflow: hidden;
}

.page-container:hover {
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.25);
}

.page-container.selected {
  box-shadow: 0 0 0 3px #4a90e2;
}

.page-label {
  position: absolute;
  top: -30px;
  left: 0;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  background: white;
  padding: 4px 12px;
  border-radius: 4px 4px 0 0;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
}

.page-navigator {
  position: absolute;
  bottom: 20px;
  left: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  padding: 12px;
  max-width: 200px;
  z-index: 100;
}

.navigator-title {
  font-size: 13px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;
}

.navigator-pages {
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-height: 300px;
  overflow-y: auto;
}

.navigator-page {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}

.navigator-page:hover {
  background: #f5f5f5;
}

.navigator-page.active {
  background: #e3f2fd;
}

.navigator-page-preview {
  font-size: 20px;
  flex-shrink: 0;
}

.navigator-page-name {
  font-size: 12px;
  color: #555;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
