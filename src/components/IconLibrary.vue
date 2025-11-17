<script setup>
import { ref } from 'vue'

const emit = defineEmits(['add-icon'])

// Icon categories
const icons = ref([
  {
    category: '表情符号',
    items: [
      { emoji: '❤️', name: '爱心' },
      { emoji: '✨', name: '星星' },
      { emoji: '🌟', name: '闪光' },
      { emoji: '💕', name: '双心' },
      { emoji: '🎉', name: '庆祝' },
      { emoji: '🎊', name: '彩球' },
      { emoji: '🌸', name: '樱花' },
      { emoji: '🌺', name: '花朵' },
      { emoji: '🍃', name: '叶子' },
      { emoji: '☀️', name: '太阳' },
      { emoji: '🌙', name: '月亮' },
      { emoji: '⭐', name: '五角星' }
    ]
  },
  {
    category: '形状标记',
    items: [
      { emoji: '●', name: '圆点' },
      { emoji: '■', name: '方块' },
      { emoji: '▲', name: '三角' },
      { emoji: '◆', name: '菱形' },
      { emoji: '★', name: '星形' },
      { emoji: '→', name: '箭头右' },
      { emoji: '←', name: '箭头左' },
      { emoji: '↑', name: '箭头上' },
      { emoji: '↓', name: '箭头下' },
      { emoji: '✓', name: '对勾' },
      { emoji: '✗', name: '叉号' },
      { emoji: '◉', name: '圆环' }
    ]
  },
  {
    category: '生活物品',
    items: [
      { emoji: '📱', name: '手机' },
      { emoji: '💻', name: '电脑' },
      { emoji: '📷', name: '相机' },
      { emoji: '🎨', name: '调色板' },
      { emoji: '📚', name: '书籍' },
      { emoji: '☕', name: '咖啡' },
      { emoji: '🍰', name: '蛋糕' },
      { emoji: '🎵', name: '音符' },
      { emoji: '🎁', name: '礼物' },
      { emoji: '✈️', name: '飞机' },
      { emoji: '🏠', name: '房子' },
      { emoji: '🌈', name: '彩虹' }
    ]
  },
  {
    category: '标签标记',
    items: [
      { emoji: '#', name: '井号' },
      { emoji: '@', name: '@符号' },
      { emoji: '※', name: '米字' },
      { emoji: '◇', name: '空心菱形' },
      { emoji: '◈', name: '菱形点' },
      { emoji: '『', name: '左书名号' },
      { emoji: '』', name: '右书名号' },
      { emoji: '「', name: '左引号' },
      { emoji: '」', name: '右引号' },
      { emoji: '【', name: '左方括号' },
      { emoji: '】', name: '右方括号' },
      { emoji: '〔', name: '左龟壳括号' }
    ]
  }
])

const expandedCategories = ref(['表情符号'])

const toggleCategory = (category) => {
  const index = expandedCategories.value.indexOf(category)
  if (index > -1) {
    expandedCategories.value.splice(index, 1)
  } else {
    expandedCategories.value.push(category)
  }
}

const addIcon = (emoji) => {
  emit('add-icon', emoji)
}
</script>

<template>
  <div class="icon-library">
    <div class="library-header">
      <h3>🎨 图标库</h3>
      <p class="hint">点击添加到画布</p>
    </div>

    <div class="library-content">
      <div
        v-for="category in icons"
        :key="category.category"
        class="icon-category"
      >
        <button
          class="category-header"
          @click="toggleCategory(category.category)"
        >
          <span class="expand-icon">
            {{ expandedCategories.includes(category.category) ? '▼' : '▶' }}
          </span>
          {{ category.category }}
        </button>

        <div
          v-show="expandedCategories.includes(category.category)"
          class="icon-grid"
        >
          <button
            v-for="icon in category.items"
            :key="icon.emoji"
            class="icon-item"
            @click="addIcon(icon.emoji)"
            :title="icon.name"
          >
            {{ icon.emoji }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.icon-library {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.library-header {
  padding: 16px;
  border-bottom: 2px solid #f0f0f0;
  background: white;
}

.library-header h3 {
  font-size: 16px;
  font-weight: 600;
  color: #222;
  margin: 0 0 4px 0;
}

.library-header .hint {
  font-size: 12px;
  color: #999;
  margin: 0;
}

.library-content {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
}

.icon-category {
  margin-bottom: 8px;
}

.category-header {
  width: 100%;
  padding: 10px 12px;
  background: #f8f8f8;
  border: none;
  border-radius: 6px;
  text-align: left;
  font-size: 13px;
  font-weight: 500;
  color: #555;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.category-header:hover {
  background: #f0f0f0;
}

.expand-icon {
  font-size: 10px;
  color: #999;
  display: inline-block;
  width: 12px;
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(44px, 1fr));
  gap: 6px;
  padding: 8px;
}

.icon-item {
  aspect-ratio: 1;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  background: white;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.icon-item:hover {
  background: #f8f8f8;
  border-color: #999;
  transform: scale(1.1);
}

.icon-item:active {
  transform: scale(0.95);
}

/* Custom scrollbar */
.library-content::-webkit-scrollbar {
  width: 6px;
}

.library-content::-webkit-scrollbar-track {
  background: #f5f5f5;
}

.library-content::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 3px;
}

.library-content::-webkit-scrollbar-thumb:hover {
  background: #999;
}
</style>
