<script setup>
import { computed } from 'vue'

// Props
const props = defineProps({
  title: String,
  content: String,
  keywords: String,
  fontFamily: String,
  fontSize: String,
  textAlign: String,
  padding: Number,
  isGenerating: Boolean
})

// Emits
const emit = defineEmits([
  'update:title',
  'update:content',
  'update:keywords',
  'update:fontFamily',
  'update:fontSize',
  'update:textAlign',
  'update:padding',
  'generate-cover',
  'generate-content',
  'generate-both',
  'reset'
])

// Check if required fields are filled
const canGenerate = computed(() => {
  return props.title?.trim() && props.content?.trim() && !props.isGenerating
})

// Button text based on generating state
const buttonText = computed(() => {
  return props.isGenerating ? 'Generating…' : ''
})
</script>

<template>
  <div class="input-form">
    <div class="form-section">
      <h3>Content</h3>

      <div class="form-group">
        <label for="title">Post Title *</label>
        <input
          id="title"
          type="text"
          :value="title"
          @input="emit('update:title', $event.target.value)"
          placeholder="Enter your post title"
          :disabled="isGenerating"
        />
      </div>

      <div class="form-group">
        <label for="content">Main Content / Description *</label>
        <textarea
          id="content"
          :value="content"
          @input="emit('update:content', $event.target.value)"
          placeholder="Enter your main content or description"
          rows="6"
          :disabled="isGenerating"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="keywords">Keywords / Highlights</label>
        <input
          id="keywords"
          type="text"
          :value="keywords"
          @input="emit('update:keywords', $event.target.value)"
          placeholder="Optional keywords or highlights"
          :disabled="isGenerating"
        />
      </div>
    </div>

    <div class="form-section">
      <h3>Style Options</h3>

      <div class="form-group">
        <label for="fontFamily">Font Family</label>
        <select
          id="fontFamily"
          :value="fontFamily"
          @change="emit('update:fontFamily', $event.target.value)"
          :disabled="isGenerating"
        >
          <option value="sans">Sans-serif</option>
          <option value="serif">Serif</option>
        </select>
      </div>

      <div class="form-group">
        <label for="fontSize">Font Size</label>
        <select
          id="fontSize"
          :value="fontSize"
          @change="emit('update:fontSize', $event.target.value)"
          :disabled="isGenerating"
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>

      <div class="form-group">
        <label for="textAlign">Text Alignment</label>
        <select
          id="textAlign"
          :value="textAlign"
          @change="emit('update:textAlign', $event.target.value)"
          :disabled="isGenerating"
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
        </select>
      </div>

      <div class="form-group">
        <label for="padding">
          Padding: {{ padding }}px
        </label>
        <input
          id="padding"
          type="range"
          :value="padding"
          @input="emit('update:padding', Number($event.target.value))"
          min="20"
          max="80"
          step="10"
          :disabled="isGenerating"
        />
      </div>
    </div>

    <div class="form-section">
      <h3>Generate</h3>

      <div class="button-group">
        <button
          @click="emit('generate-cover')"
          :disabled="!canGenerate"
          class="btn btn-primary"
        >
          {{ isGenerating ? buttonText : 'Generate Cover Image' }}
        </button>

        <button
          @click="emit('generate-content')"
          :disabled="!canGenerate"
          class="btn btn-primary"
        >
          {{ isGenerating ? buttonText : 'Generate Content Image' }}
        </button>

        <button
          @click="emit('generate-both')"
          :disabled="!canGenerate"
          class="btn btn-primary btn-highlight"
        >
          {{ isGenerating ? buttonText : 'Generate Both' }}
        </button>

        <button
          @click="emit('reset')"
          :disabled="isGenerating"
          class="btn btn-secondary"
        >
          Reset
        </button>
      </div>

      <p v-if="!canGenerate && !isGenerating" class="hint">
        Please fill in both title and content to generate images.
      </p>
    </div>
  </div>
</template>

<style scoped>
.input-form {
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.form-section {
  margin-bottom: 28px;
}

.form-section:last-child {
  margin-bottom: 0;
}

.form-section h3 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #222;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 8px;
}

.form-group {
  margin-bottom: 16px;
}

.form-group:last-child {
  margin-bottom: 0;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #555;
}

.form-group input[type="text"],
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.2s;
}

.form-group input[type="text"]:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #666;
}

.form-group input[type="text"]:disabled,
.form-group textarea:disabled,
.form-group select:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.form-group input[type="range"] {
  width: 100%;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.btn {
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-primary {
  background-color: #333;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #555;
}

.btn-primary.btn-highlight {
  background-color: rgb(243, 209, 158);
  color: #333;
}

.btn-primary.btn-highlight:hover:not(:disabled) {
  background-color: rgb(230, 190, 130);
}

.btn-secondary {
  background-color: #f0f0f0;
  color: #333;
}

.btn-secondary:hover:not(:disabled) {
  background-color: #e0e0e0;
}

.hint {
  margin-top: 12px;
  font-size: 13px;
  color: #999;
  font-style: italic;
}

@media (min-width: 768px) {
  .button-group {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .btn {
    flex: 1;
    min-width: 140px;
  }
}
</style>
