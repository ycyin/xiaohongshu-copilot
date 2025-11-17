/**
 * Canvas rendering utilities for generating Xiaohongshu-style images
 *
 * Main functions:
 * - wrapText: Automatically wraps text to fit within a given width
 * - renderCoverImage: Generates a cover image (3:4 aspect ratio, title-focused)
 * - renderContentImage: Generates a content image (more text-heavy)
 */

const BACKGROUND_COLOR = 'rgb(243, 209, 158)'

/**
 * Wraps text to fit within maxWidth, breaking at word boundaries
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {string} text - Text to wrap
 * @param {number} maxWidth - Maximum width in pixels
 * @returns {string[]} Array of text lines
 */
export function wrapText(ctx, text, maxWidth) {
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

/**
 * Generates a cover image (3:4 aspect ratio, title-focused)
 * @param {Object} options - Configuration object
 * @param {string} options.title - Post title (required)
 * @param {string} options.keywords - Keywords/highlights (optional)
 * @param {string} options.fontFamily - Font family ('sans' or 'serif')
 * @param {string} options.fontSize - Font size ('small', 'medium', 'large')
 * @param {string} options.textAlign - Text alignment ('left' or 'center')
 * @param {number} options.padding - Inner padding
 * @returns {string} Data URL of the generated image
 */
export function renderCoverImage(options) {
  const {
    title,
    keywords = '',
    fontFamily = 'sans',
    fontSize = 'medium',
    textAlign = 'center',
    padding = 40
  } = options

  // Canvas dimensions (3:4 aspect ratio, optimized for mobile)
  const width = 750
  const height = 1000

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')

  // Background
  ctx.fillStyle = BACKGROUND_COLOR
  ctx.fillRect(0, 0, width, height)

  // Font settings
  const baseFontFamily = fontFamily === 'serif'
    ? 'Georgia, "Times New Roman", serif'
    : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'

  const titleFontSizes = { small: 48, medium: 64, large: 80 }
  const keywordFontSizes = { small: 20, medium: 24, large: 28 }

  const titleFontSize = titleFontSizes[fontSize]
  const keywordFontSize = keywordFontSizes[fontSize]

  // Draw title
  ctx.fillStyle = '#333'
  ctx.font = `bold ${titleFontSize}px ${baseFontFamily}`
  ctx.textAlign = textAlign

  const maxTextWidth = width - (padding * 2)
  const titleLines = wrapText(ctx, title, maxTextWidth)

  // Calculate vertical centering
  const lineHeight = titleFontSize * 1.3
  const titleBlockHeight = titleLines.length * lineHeight
  const keywordsHeight = keywords ? keywordFontSize * 1.5 : 0
  const totalHeight = titleBlockHeight + (keywords ? 40 : 0) + keywordsHeight

  let startY = (height - totalHeight) / 2

  // Render title lines
  const x = textAlign === 'center' ? width / 2 : padding
  titleLines.forEach((line, index) => {
    ctx.fillText(line, x, startY + (index * lineHeight))
  })

  // Draw keywords if provided
  if (keywords) {
    ctx.font = `${keywordFontSize}px ${baseFontFamily}`
    ctx.fillStyle = '#666'
    const keywordsY = startY + titleBlockHeight + 40
    ctx.fillText(keywords, x, keywordsY)
  }

  return canvas.toDataURL('image/png')
}

/**
 * Generates a content image (more text-heavy, shows main content)
 * @param {Object} options - Configuration object
 * @param {string} options.title - Post title (required)
 * @param {string} options.content - Main content text (required)
 * @param {string} options.keywords - Keywords/highlights (optional)
 * @param {string} options.fontFamily - Font family ('sans' or 'serif')
 * @param {string} options.fontSize - Font size ('small', 'medium', 'large')
 * @param {string} options.textAlign - Text alignment ('left' or 'center')
 * @param {number} options.padding - Inner padding
 * @returns {string} Data URL of the generated image
 */
export function renderContentImage(options) {
  const {
    title,
    content,
    keywords = '',
    fontFamily = 'sans',
    fontSize = 'medium',
    textAlign = 'left',
    padding = 40
  } = options

  // Canvas dimensions (same 3:4 ratio for consistency)
  const width = 750
  const height = 1000

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')

  // Background
  ctx.fillStyle = BACKGROUND_COLOR
  ctx.fillRect(0, 0, width, height)

  // Font settings
  const baseFontFamily = fontFamily === 'serif'
    ? 'Georgia, "Times New Roman", serif'
    : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'

  const titleFontSizes = { small: 32, medium: 40, large: 48 }
  const contentFontSizes = { small: 20, medium: 24, large: 28 }
  const keywordFontSizes = { small: 16, medium: 18, large: 20 }

  const titleFontSize = titleFontSizes[fontSize]
  const contentFontSize = contentFontSizes[fontSize]
  const keywordFontSize = keywordFontSizes[fontSize]

  const maxTextWidth = width - (padding * 2)
  let currentY = padding + 20

  // Draw title
  ctx.fillStyle = '#222'
  ctx.font = `bold ${titleFontSize}px ${baseFontFamily}`
  ctx.textAlign = textAlign

  const titleX = textAlign === 'center' ? width / 2 : padding
  const titleLines = wrapText(ctx, title, maxTextWidth)
  const titleLineHeight = titleFontSize * 1.3

  titleLines.forEach((line, index) => {
    ctx.fillText(line, titleX, currentY + (index * titleLineHeight))
  })

  currentY += titleLines.length * titleLineHeight + 30

  // Draw keywords if provided
  if (keywords) {
    ctx.font = `italic ${keywordFontSize}px ${baseFontFamily}`
    ctx.fillStyle = '#777'
    ctx.fillText(keywords, titleX, currentY)
    currentY += keywordFontSize * 1.5 + 20
  }

  // Draw divider line
  ctx.strokeStyle = '#999'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(padding, currentY)
  ctx.lineTo(width - padding, currentY)
  ctx.stroke()
  currentY += 30

  // Draw content
  ctx.fillStyle = '#444'
  ctx.font = `${contentFontSize}px ${baseFontFamily}`
  ctx.textAlign = textAlign

  const contentX = textAlign === 'center' ? width / 2 : padding
  const contentLines = wrapText(ctx, content, maxTextWidth)
  const contentLineHeight = contentFontSize * 1.5

  contentLines.forEach((line, index) => {
    // Stop if we run out of space
    if (currentY + contentLineHeight > height - padding) {
      return
    }
    ctx.fillText(line, contentX, currentY + (index * contentLineHeight))
  })

  return canvas.toDataURL('image/png')
}

/**
 * Downloads a data URL as a PNG file
 * @param {string} dataUrl - Data URL of the image
 * @param {string} filename - Desired filename (without extension)
 */
export function downloadImage(dataUrl, filename) {
  const link = document.createElement('a')
  link.download = `${filename}.png`
  link.href = dataUrl
  link.click()
}
