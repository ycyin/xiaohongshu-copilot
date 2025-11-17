<script setup>
import { ref, computed } from 'vue'
import InfiniteCanvas from './components/InfiniteCanvas.vue'
import IconLibrary from './components/IconLibrary.vue'
import TextEditor from './components/TextEditor.vue'
import PageEditor from './components/PageEditor.vue'
import { downloadImage } from './utils/canvasRenderer'

// Canvas ref
const canvasRef = ref(null)
const selectedPageId = ref('main')
const selectedElement = ref(null)
const selectedElementPageId = ref(null)

// Sidebar collapse state
const leftSidebarCollapsed = ref(false)
const rightSidebarCollapsed = ref(false)

// Computed: current selected page
const selectedPage = computed(() => {
  if (!canvasRef.value || !selectedPageId.value) return null
  return canvasRef.value.pages?.find(p => p.id === selectedPageId.value)
})

// Right editor mode: 'element' or 'page'
const rightEditorMode = computed(() => {
  return selectedElement.value ? 'element' : 'page'
})

// Handle element selection
const handleElementSelected = (element, pageId) => {
  selectedElement.value = element
  selectedElementPageId.value = pageId
  // If element is null (deselected), we're now in page editing mode
  if (element === null) {
    selectedElement.value = null
    selectedElementPageId.value = null
  }
}

// Handle page click (deselect element, edit page instead)
const handlePageClick = (pageId) => {
  selectedPageId.value = pageId
  selectedElement.value = null // Deselect element
  selectedElementPageId.value = null
}

// Handle adding icon from library
const handleAddIcon = (emoji) => {
  if (canvasRef.value) {
    canvasRef.value.addElementToCurrentPage({
      type: 'icon',
      text: emoji,
      x: 375,
      y: 500,
      fontSize: 64,
      color: '#333'
    })
  }
}

// Handle property updates from text editor
const handleUpdateProperty = (property, value) => {
  if (selectedElement.value && selectedElementPageId.value && canvasRef.value) {
    // Update the element in the page
    const page = canvasRef.value.pages.find(p => p.id === selectedElementPageId.value)
    if (page) {
      const element = page.elements.find(el => el.id === selectedElement.value.id)
      if (element) {
        element[property] = value
        // Update selectedElement ref to trigger TextEditor update
        selectedElement.value = { ...element }
      }
    }
  }
}

// Handle page property updates from page editor
const handleUpdatePageProperty = (property, value) => {
  if (selectedPage.value && canvasRef.value) {
    selectedPage.value[property] = value
  }
}

// Handle adding text
const handleAddText = () => {
  if (canvasRef.value) {
    canvasRef.value.addElementToCurrentPage({
      type: 'text',
      text: '新文本',
      x: 375,
      y: 300,
      fontSize: 32,
      fontWeight: 'normal',
      color: '#333',
      align: 'center',
      width: 600
    })
  }
}

// Export current page
const handleExport = () => {
  if (canvasRef.value) {
    const page = canvasRef.value.exportCurrentPage()
    if (page) {
      // Render to canvas and export
      const canvas = document.createElement('canvas')
      canvas.width = page.width
      canvas.height = page.height
      const ctx = canvas.getContext('2d')

      // Background
      ctx.fillStyle = page.backgroundColor
      ctx.fillRect(0, 0, page.width, page.height)

      // Render elements
      page.elements.forEach(element => {
        if (element.type === 'text') {
          ctx.fillStyle = element.color
          ctx.font = `${element.fontWeight} ${element.fontSize}px sans-serif`
          ctx.textAlign = element.align
          ctx.textBaseline = 'middle'

          // Simple text rendering (no wrap for now)
          ctx.fillText(element.text, element.x, element.y)
        } else if (element.type === 'icon') {
          ctx.fillStyle = element.color
          ctx.font = `${element.fontSize}px sans-serif`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(element.text, element.x, element.y)
        }
      })

      const dataUrl = canvas.toDataURL('image/png')
      const timestamp = new Date().getTime()
      downloadImage(dataUrl, `xiaohongshu-${page.name}-${timestamp}`)
    }
  }
}

// Export all pages
const handleExportAll = () => {
  if (canvasRef.value) {
    canvasRef.value.pages.forEach(page => {
      // Render each page
      const canvas = document.createElement('canvas')
      canvas.width = page.width
      canvas.height = page.height
      const ctx = canvas.getContext('2d')

      // Background
      ctx.fillStyle = page.backgroundColor
      ctx.fillRect(0, 0, page.width, page.height)

      // Render elements
      page.elements.forEach(element => {
        if (element.type === 'text') {
          ctx.fillStyle = element.color
          ctx.font = `${element.fontWeight} ${element.fontSize}px sans-serif`
          ctx.textAlign = element.align
          ctx.textBaseline = 'middle'
          ctx.fillText(element.text, element.x, element.y)
        } else if (element.type === 'icon') {
          ctx.fillStyle = element.color
          ctx.font = `${element.fontSize}px sans-serif`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(element.text, element.x, element.y)
        }
      })

      const dataUrl = canvas.toDataURL('image/png')
      const timestamp = new Date().getTime()
      downloadImage(dataUrl, `xiaohongshu-${page.name}-${timestamp}`)
    })
  }
}
</script>

<template>
  <div class="app">
    <header class="app-header">
      <div class="header-left">
        <h1>小红书图片助手</h1>
        <p class="subtitle">XMind 式多页面编辑 • 双击文本直接编辑 • 自由拖拽布局</p>
      </div>

      <!-- Quick Actions -->
      <div class="header-actions">
        <button @click="handleAddText" class="action-btn">
          ➕ 添加文本
        </button>
        <button @click="handleExport" class="action-btn action-btn-primary">
          💾 导出当前页
        </button>
        <button @click="handleExportAll" class="action-btn">
          📦 导出全部
        </button>
      </div>
    </header>

    <main class="app-main">
      <!-- Three-column layout: Icon Library | Infinite Canvas | Text Editor -->
      <div class="editor-workspace">
        <!-- Left: Icon Library -->
        <aside class="sidebar sidebar-left" :class="{ collapsed: leftSidebarCollapsed }">
          <button class="collapse-btn" @click="leftSidebarCollapsed = !leftSidebarCollapsed">
            {{ leftSidebarCollapsed ? '▶' : '◀' }}
          </button>
          <div v-show="!leftSidebarCollapsed" class="sidebar-content">
            <IconLibrary @add-icon="handleAddIcon" />
          </div>
        </aside>

        <!-- Center: Infinite Canvas -->
        <section class="canvas-section">
          <InfiniteCanvas
            ref="canvasRef"
            @page-selected="handlePageClick"
            @element-selected="handleElementSelected"
          />
        </section>

        <!-- Right: Editor (switches between Page and Text) -->
        <aside class="sidebar sidebar-right" :class="{ collapsed: rightSidebarCollapsed }">
          <button class="collapse-btn" @click="rightSidebarCollapsed = !rightSidebarCollapsed">
            {{ rightSidebarCollapsed ? '◀' : '▶' }}
          </button>
          <div v-show="!rightSidebarCollapsed" class="sidebar-content">
            <!-- Show TextEditor when element is selected -->
            <TextEditor
              v-if="rightEditorMode === 'element'"
              :selected-element="selectedElement"
              @update-property="handleUpdateProperty"
            />
            <!-- Show PageEditor when no element is selected -->
            <PageEditor
              v-else
              :selected-page="selectedPage"
              @update-page-property="handleUpdatePageProperty"
            />
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #e8e8e8;
}

.app-header {
  background: white;
  padding: 16px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  z-index: 1000;
}

.header-left h1 {
  font-size: 22px;
  font-weight: 700;
  color: #222;
  margin: 0;
}

.header-left .subtitle {
  font-size: 12px;
  color: #777;
  margin: 4px 0 0 0;
}

.header-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.action-btn {
  padding: 8px 16px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  color: #555;
}

.action-btn:hover {
  border-color: #999;
  background: #f8f8f8;
}

.action-btn-primary {
  background: #333;
  color: white;
  border-color: #333;
}

.action-btn-primary:hover {
  background: #555;
}

.app-main {
  flex: 1;
  overflow: hidden;
}

.editor-workspace {
  display: flex;
  gap: 0;
  height: calc(100vh - 90px);
  background: #e8e8e8;
  position: relative;
}

.sidebar {
  height: 100%;
  overflow: hidden;
  position: relative;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.sidebar-left {
  width: 250px;
  border-right: 1px solid #d0d0d0;
  background: #fafafa;
}

.sidebar-right {
  width: 320px;
  border-left: 1px solid #d0d0d0;
  background: #fafafa;
}

.sidebar.collapsed {
  width: 40px;
}

.sidebar-content {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.collapse-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  background: white;
  border: 1px solid #d0d0d0;
  border-radius: 4px;
  width: 24px;
  height: 48px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #666;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.sidebar-left .collapse-btn {
  right: -12px;
}

.sidebar-right .collapse-btn {
  left: -12px;
}

.collapse-btn:hover {
  background: #f5f5f5;
  color: #333;
}

.canvas-section {
  flex: 1;
  height: 100%;
  overflow: hidden;
  background: #e8e8e8;
}

/* Responsive */
@media (max-width: 1280px) {
  .sidebar-left {
    width: 200px;
  }

  .sidebar-right {
    width: 280px;
  }
}

@media (max-width: 1024px) {
  .app-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .editor-workspace {
    flex-direction: column;
  }

  .sidebar-left,
  .sidebar-right {
    border: none;
    max-height: 200px;
  }

  .sidebar-left {
    border-bottom: 1px solid #d0d0d0;
  }

  .sidebar-right {
    border-top: 1px solid #d0d0d0;
  }

  .collapse-btn {
    display: none;
  }
}

@media (max-width: 767px) {
  .app-header h1 {
    font-size: 18px;
  }

  .subtitle {
    font-size: 11px;
  }

  .action-btn {
    padding: 6px 12px;
    font-size: 12px;
  }

  .header-actions {
    width: 100%;
    flex-wrap: wrap;
  }

  .action-btn {
    flex: 1;
    min-width: 100px;
  }
}
</style>
