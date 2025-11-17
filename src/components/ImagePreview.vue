<script setup>
import { downloadImage } from '../utils/canvasRenderer'

// Props
const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (value) => ['cover', 'content'].includes(value)
  },
  imageDataUrl: {
    type: String,
    default: null
  }
})

// Download handler
const handleDownload = () => {
  if (props.imageDataUrl) {
    const timestamp = new Date().getTime()
    const filename = `xiaohongshu-${props.type}-${timestamp}`
    downloadImage(props.imageDataUrl, filename)
  }
}

// Display title
const displayTitle = props.type === 'cover' ? 'Cover Image' : 'Content Image'
</script>

<template>
  <div class="image-preview">
    <div class="preview-header">
      <h3>{{ displayTitle }}</h3>
      <button
        v-if="imageDataUrl"
        @click="handleDownload"
        class="btn-download"
        title="Download PNG"
      >
        ⬇ Download PNG
      </button>
    </div>

    <div class="preview-container">
      <div v-if="!imageDataUrl" class="placeholder">
        <div class="placeholder-content">
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
          <p>{{ displayTitle }} will appear here</p>
          <p class="placeholder-hint">Click "Generate {{ displayTitle }}" to create</p>
        </div>
      </div>

      <div v-else class="preview-image-wrapper">
        <img
          :src="imageDataUrl"
          :alt="displayTitle"
          class="preview-image"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.image-preview {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid #f0f0f0;
}

.preview-header h3 {
  font-size: 16px;
  font-weight: 600;
  color: #222;
  margin: 0;
}

.btn-download {
  padding: 8px 16px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-download:hover {
  background-color: #555;
}

.preview-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
}

.placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fafafa;
  border: 2px dashed #ddd;
  border-radius: 8px;
  padding: 40px 20px;
}

.placeholder-content {
  text-align: center;
  color: #999;
}

.placeholder-content svg {
  color: #ccc;
  margin-bottom: 16px;
}

.placeholder-content p {
  margin: 8px 0;
  font-size: 14px;
}

.placeholder-content .placeholder-hint {
  font-size: 12px;
  color: #bbb;
}

.preview-image-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.preview-image {
  max-width: 100%;
  max-height: 600px;
  height: auto;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

@media (max-width: 767px) {
  .preview-image {
    max-height: 400px;
  }
}
</style>
