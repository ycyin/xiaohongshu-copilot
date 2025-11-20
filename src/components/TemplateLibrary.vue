<script setup>
import { ref } from 'vue'

const emit = defineEmits(['add-template'])

// Template categories with beautiful, styled templates
const categories = ref([
  {
    name: '表格',
    icon: '📊',
    templates: [
      {
        id: 'table-elegant-2x2',
        name: '精美四格',
        preview: '四格',
        elements: [
          // Title
          { type: 'text', text: '四大要点', x: 375, y: 100, fontSize: 42, fontWeight: 'bold', color: '#2c3e50', align: 'center', width: 500 },
          // Decorative line under title
          { type: 'line', x: 375, y: 135, width: 200, height: 3, color: '#3498db' },

          // Top-left box
          { type: 'rectangle', x: 200, y: 250, width: 280, height: 200, backgroundColor: '#e8f5fe', border: '3px solid #3498db', borderRadius: 15 },
          { type: 'text', text: '01', x: 200, y: 200, fontSize: 48, fontWeight: 'bold', color: '#3498db', align: 'center', width: 100 },
          { type: 'text', text: '第一点标题', x: 200, y: 250, fontSize: 24, fontWeight: 'bold', color: '#2c3e50', align: 'center', width: 250 },
          { type: 'text', text: '详细描述内容', x: 200, y: 300, fontSize: 18, fontWeight: 'normal', color: '#555', align: 'center', width: 250 },

          // Top-right box
          { type: 'rectangle', x: 550, y: 250, width: 280, height: 200, backgroundColor: '#fef5e7', border: '3px solid #f39c12', borderRadius: 15 },
          { type: 'text', text: '02', x: 550, y: 200, fontSize: 48, fontWeight: 'bold', color: '#f39c12', align: 'center', width: 100 },
          { type: 'text', text: '第二点标题', x: 550, y: 250, fontSize: 24, fontWeight: 'bold', color: '#2c3e50', align: 'center', width: 250 },
          { type: 'text', text: '详细描述内容', x: 550, y: 300, fontSize: 18, fontWeight: 'normal', color: '#555', align: 'center', width: 250 },

          // Bottom-left box
          { type: 'rectangle', x: 200, y: 520, width: 280, height: 200, backgroundColor: '#ebfaf5', border: '3px solid #2ecc71', borderRadius: 15 },
          { type: 'text', text: '03', x: 200, y: 470, fontSize: 48, fontWeight: 'bold', color: '#2ecc71', align: 'center', width: 100 },
          { type: 'text', text: '第三点标题', x: 200, y: 520, fontSize: 24, fontWeight: 'bold', color: '#2c3e50', align: 'center', width: 250 },
          { type: 'text', text: '详细描述内容', x: 200, y: 570, fontSize: 18, fontWeight: 'normal', color: '#555', align: 'center', width: 250 },

          // Bottom-right box
          { type: 'rectangle', x: 550, y: 520, width: 280, height: 200, backgroundColor: '#fdeef4', border: '3px solid #e74c3c', borderRadius: 15 },
          { type: 'text', text: '04', x: 550, y: 470, fontSize: 48, fontWeight: 'bold', color: '#e74c3c', align: 'center', width: 100 },
          { type: 'text', text: '第四点标题', x: 550, y: 520, fontSize: 24, fontWeight: 'bold', color: '#2c3e50', align: 'center', width: 250 },
          { type: 'text', text: '详细描述内容', x: 550, y: 570, fontSize: 18, fontWeight: 'normal', color: '#555', align: 'center', width: 250 },
        ]
      },
      {
        id: 'table-timeline',
        name: '时间轴清单',
        preview: '时间',
        elements: [
          // Title
          { type: 'text', text: '任务清单', x: 375, y: 100, fontSize: 42, fontWeight: 'bold', color: '#2c3e50', align: 'center', width: 500 },

          // Vertical timeline
          { type: 'line', x: 150, y: 400, width: 4, height: 500, color: '#bdc3c7' },

          // Item 1
          { type: 'circle', x: 150, y: 220, size: 24, backgroundColor: '#3498db', border: '4px solid #3498db' },
          { type: 'rectangle', x: 400, y: 220, width: 450, height: 90, backgroundColor: '#ffffff', border: '2px solid #3498db', borderRadius: 12 },
          { type: 'text', text: '✓ 第一项任务', x: 380, y: 210, fontSize: 24, fontWeight: 'bold', color: '#2c3e50', align: 'left', width: 400 },
          { type: 'text', text: '任务详细说明', x: 380, y: 240, fontSize: 16, fontWeight: 'normal', color: '#7f8c8d', align: 'left', width: 400 },

          // Item 2
          { type: 'circle', x: 150, y: 350, size: 24, backgroundColor: '#2ecc71', border: '4px solid #2ecc71' },
          { type: 'rectangle', x: 400, y: 350, width: 450, height: 90, backgroundColor: '#ffffff', border: '2px solid #2ecc71', borderRadius: 12 },
          { type: 'text', text: '✓ 第二项任务', x: 380, y: 340, fontSize: 24, fontWeight: 'bold', color: '#2c3e50', align: 'left', width: 400 },
          { type: 'text', text: '任务详细说明', x: 380, y: 370, fontSize: 16, fontWeight: 'normal', color: '#7f8c8d', align: 'left', width: 400 },

          // Item 3
          { type: 'circle', x: 150, y: 480, size: 24, backgroundColor: '#f39c12', border: '4px solid #f39c12' },
          { type: 'rectangle', x: 400, y: 480, width: 450, height: 90, backgroundColor: '#ffffff', border: '2px solid #f39c12', borderRadius: 12 },
          { type: 'text', text: '✓ 第三项任务', x: 380, y: 470, fontSize: 24, fontWeight: 'bold', color: '#2c3e50', align: 'left', width: 400 },
          { type: 'text', text: '任务详细说明', x: 380, y: 500, fontSize: 16, fontWeight: 'normal', color: '#7f8c8d', align: 'left', width: 400 },

          // Item 4
          { type: 'circle', x: 150, y: 610, size: 24, backgroundColor: '#e74c3c', border: '4px solid #e74c3c' },
          { type: 'rectangle', x: 400, y: 610, width: 450, height: 90, backgroundColor: '#ffffff', border: '2px solid #e74c3c', borderRadius: 12 },
          { type: 'text', text: '✓ 第四项任务', x: 380, y: 600, fontSize: 24, fontWeight: 'bold', color: '#2c3e50', align: 'left', width: 400 },
          { type: 'text', text: '任务详细说明', x: 380, y: 630, fontSize: 16, fontWeight: 'normal', color: '#7f8c8d', align: 'left', width: 400 },
        ]
      },
      {
        id: 'table-comparison',
        name: '对比表格',
        preview: '对比',
        elements: [
          // Title
          { type: 'text', text: '方案对比', x: 375, y: 80, fontSize: 42, fontWeight: 'bold', color: '#2c3e50', align: 'center', width: 600 },
          { type: 'line', x: 375, y: 115, width: 180, height: 3, color: '#3498db' },

          // VS icon
          { type: 'circle', x: 375, y: 350, size: 80, backgroundColor: '#3498db', border: 'none' },
          { type: 'text', text: 'VS', x: 375, y: 350, fontSize: 32, fontWeight: 'bold', color: '#ffffff', align: 'center', width: 100 },

          // Left option
          { type: 'rectangle', x: 190, y: 350, width: 280, height: 400, backgroundColor: '#e8f5fe', border: '3px solid #3498db', borderRadius: 20 },
          { type: 'text', text: '方案 A', x: 190, y: 220, fontSize: 36, fontWeight: 'bold', color: '#3498db', align: 'center', width: 250 },
          { type: 'text', text: '✓ 优点一', x: 190, y: 300, fontSize: 20, fontWeight: 'normal', color: '#2c3e50', align: 'left', width: 220 },
          { type: 'text', text: '✓ 优点二', x: 190, y: 350, fontSize: 20, fontWeight: 'normal', color: '#2c3e50', align: 'left', width: 220 },
          { type: 'text', text: '✓ 优点三', x: 190, y: 400, fontSize: 20, fontWeight: 'normal', color: '#2c3e50', align: 'left', width: 220 },
          { type: 'text', text: '⚠ 缺点一', x: 190, y: 470, fontSize: 18, fontWeight: 'normal', color: '#7f8c8d', align: 'left', width: 220 },

          // Right option
          { type: 'rectangle', x: 560, y: 350, width: 280, height: 400, backgroundColor: '#fef5e7', border: '3px solid #f39c12', borderRadius: 20 },
          { type: 'text', text: '方案 B', x: 560, y: 220, fontSize: 36, fontWeight: 'bold', color: '#f39c12', align: 'center', width: 250 },
          { type: 'text', text: '✓ 优点一', x: 560, y: 300, fontSize: 20, fontWeight: 'normal', color: '#2c3e50', align: 'left', width: 220 },
          { type: 'text', text: '✓ 优点二', x: 560, y: 350, fontSize: 20, fontWeight: 'normal', color: '#2c3e50', align: 'left', width: 220 },
          { type: 'text', text: '✓ 优点三', x: 560, y: 400, fontSize: 20, fontWeight: 'normal', color: '#2c3e50', align: 'left', width: 220 },
          { type: 'text', text: '⚠ 缺点一', x: 560, y: 470, fontSize: 18, fontWeight: 'normal', color: '#7f8c8d', align: 'left', width: 220 },
        ]
      }
    ]
  },
  {
    name: '流程',
    icon: '→',
    templates: [
      {
        id: 'flow-with-connectors',
        name: '连接线流程图',
        preview: '连线',
        elements: [
          // Title
          { type: 'text', text: '流程图示例', x: 375, y: 80, fontSize: 40, fontWeight: 'bold', color: '#2c3e50', align: 'center', width: 600 },

          // Step 1
          { type: 'rectangle', x: 150, y: 250, width: 150, height: 100, backgroundColor: '#e8f5fe', border: '3px solid #3498db', borderRadius: 15 },
          { type: 'text', text: '开始', x: 150, y: 250, fontSize: 26, fontWeight: 'bold', color: '#3498db', align: 'center', width: 140 },

          // Connector 1
          { type: 'connector', fromX: 225, fromY: 250, toX: 340, toY: 250, lineType: 'straight', style: 'solid', color: '#3498db', strokeWidth: 3, startArrow: false, endArrow: true },

          // Step 2
          { type: 'rectangle', x: 375, y: 250, width: 150, height: 100, backgroundColor: '#ebfaf5', border: '3px solid #2ecc71', borderRadius: 15 },
          { type: 'text', text: '处理', x: 375, y: 250, fontSize: 26, fontWeight: 'bold', color: '#2ecc71', align: 'center', width: 140 },

          // Connector 2
          { type: 'connector', fromX: 450, fromY: 250, toX: 565, toY: 250, lineType: 'straight', style: 'solid', color: '#2ecc71', strokeWidth: 3, startArrow: false, endArrow: true },

          // Step 3
          { type: 'rectangle', x: 600, y: 250, width: 150, height: 100, backgroundColor: '#fef5e7', border: '3px solid #f39c12', borderRadius: 15 },
          { type: 'text', text: '完成', x: 600, y: 250, fontSize: 26, fontWeight: 'bold', color: '#f39c12', align: 'center', width: 140 },

          // Branch connector (curved)
          { type: 'connector', fromX: 375, fromY: 300, toX: 375, toY: 430, lineType: 'elbow', style: 'dashed', color: '#e74c3c', strokeWidth: 2, startArrow: false, endArrow: true },

          // Branch step
          { type: 'rectangle', x: 375, y: 480, width: 180, height: 80, backgroundColor: '#fdeef4', border: '3px solid #e74c3c', borderRadius: 15 },
          { type: 'text', text: '异常处理', x: 375, y: 480, fontSize: 22, fontWeight: 'bold', color: '#e74c3c', align: 'center', width: 160 },
        ]
      },
      {
        id: 'flow-modern-horizontal',
        name: '现代横向流程',
        preview: '步骤',
        elements: [
          // Title
          { type: 'text', text: '实施流程', x: 375, y: 100, fontSize: 42, fontWeight: 'bold', color: '#2c3e50', align: 'center', width: 600 },
          { type: 'line', x: 375, y: 135, width: 180, height: 3, color: '#3498db' },

          // Step 1
          { type: 'rectangle', x: 130, y: 350, width: 150, height: 150, backgroundColor: '#3498db', border: 'none', borderRadius: 20 },
          { type: 'text', text: '01', x: 130, y: 310, fontSize: 32, fontWeight: 'bold', color: '#3498db', align: 'center', width: 100 },
          { type: 'text', text: '规划阶段', x: 130, y: 350, fontSize: 24, fontWeight: 'bold', color: '#ffffff', align: 'center', width: 140 },
          { type: 'text', text: '制定方案', x: 130, y: 430, fontSize: 14, fontWeight: 'normal', color: '#2c3e50', align: 'center', width: 140 },

          // Arrow 1
          { type: 'icon', text: '→', x: 235, y: 350, fontSize: 48, color: '#95a5a6' },

          // Step 2
          { type: 'rectangle', x: 320, y: 350, width: 150, height: 150, backgroundColor: '#2ecc71', border: 'none', borderRadius: 20 },
          { type: 'text', text: '02', x: 320, y: 310, fontSize: 32, fontWeight: 'bold', color: '#2ecc71', align: 'center', width: 100 },
          { type: 'text', text: '执行阶段', x: 320, y: 350, fontSize: 24, fontWeight: 'bold', color: '#ffffff', align: 'center', width: 140 },
          { type: 'text', text: '开始实施', x: 320, y: 430, fontSize: 14, fontWeight: 'normal', color: '#2c3e50', align: 'center', width: 140 },

          // Arrow 2
          { type: 'icon', text: '→', x: 425, y: 350, fontSize: 48, color: '#95a5a6' },

          // Step 3
          { type: 'rectangle', x: 510, y: 350, width: 150, height: 150, backgroundColor: '#f39c12', border: 'none', borderRadius: 20 },
          { type: 'text', text: '03', x: 510, y: 310, fontSize: 32, fontWeight: 'bold', color: '#f39c12', align: 'center', width: 100 },
          { type: 'text', text: '优化阶段', x: 510, y: 350, fontSize: 24, fontWeight: 'bold', color: '#ffffff', align: 'center', width: 140 },
          { type: 'text', text: '持续改进', x: 510, y: 430, fontSize: 14, fontWeight: 'normal', color: '#2c3e50', align: 'center', width: 140 },

          // Arrow 3
          { type: 'icon', text: '→', x: 615, y: 350, fontSize: 48, color: '#95a5a6' },

          // Step 4
          { type: 'rectangle', x: 700, y: 350, width: 150, height: 150, backgroundColor: '#e74c3c', border: 'none', borderRadius: 20 },
          { type: 'text', text: '04', x: 700, y: 310, fontSize: 32, fontWeight: 'bold', color: '#e74c3c', align: 'center', width: 100 },
          { type: 'text', text: '完成阶段', x: 700, y: 350, fontSize: 24, fontWeight: 'bold', color: '#ffffff', align: 'center', width: 140 },
          { type: 'text', text: '总结交付', x: 700, y: 430, fontSize: 14, fontWeight: 'normal', color: '#2c3e50', align: 'center', width: 140 },
        ]
      },
      {
        id: 'flow-scrtv-beautiful',
        name: 'SCRTV故事模型',
        preview: 'SCRTV',
        elements: [
          // Title
          { type: 'text', text: 'SCRTV 故事框架', x: 375, y: 80, fontSize: 40, fontWeight: 'bold', color: '#2c3e50', align: 'center', width: 600 },
          { type: 'line', x: 375, y: 115, width: 240, height: 3, color: '#9b59b6' },

          // Background bar
          { type: 'rectangle', x: 375, y: 300, width: 700, height: 120, backgroundColor: '#f8f9fa', border: '2px solid #e9ecef', borderRadius: 60 },

          // Step S
          { type: 'circle', x: 100, y: 300, size: 100, backgroundColor: '#3498db', border: 'none' },
          { type: 'text', text: 'S', x: 100, y: 280, fontSize: 40, fontWeight: 'bold', color: '#ffffff', align: 'center', width: 80 },
          { type: 'text', text: '表情境', x: 100, y: 320, fontSize: 18, fontWeight: 'normal', color: '#ffffff', align: 'center', width: 80 },
          { type: 'text', text: 'Scene', x: 100, y: 390, fontSize: 16, fontWeight: 'bold', color: '#3498db', align: 'center', width: 100 },

          // Step C
          { type: 'circle', x: 235, y: 300, size: 100, backgroundColor: '#2ecc71', border: 'none' },
          { type: 'text', text: 'C', x: 235, y: 280, fontSize: 40, fontWeight: 'bold', color: '#ffffff', align: 'center', width: 80 },
          { type: 'text', text: '爆冲突', x: 235, y: 320, fontSize: 18, fontWeight: 'normal', color: '#ffffff', align: 'center', width: 80 },
          { type: 'text', text: 'Conflict', x: 235, y: 390, fontSize: 16, fontWeight: 'bold', color: '#2ecc71', align: 'center', width: 100 },

          // Step R
          { type: 'circle', x: 375, y: 300, size: 100, backgroundColor: '#f39c12', border: 'none' },
          { type: 'text', text: 'R', x: 375, y: 280, fontSize: 40, fontWeight: 'bold', color: '#ffffff', align: 'center', width: 80 },
          { type: 'text', text: '找原因', x: 375, y: 320, fontSize: 18, fontWeight: 'normal', color: '#ffffff', align: 'center', width: 80 },
          { type: 'text', text: 'Reason', x: 375, y: 390, fontSize: 16, fontWeight: 'bold', color: '#f39c12', align: 'center', width: 100 },

          // Step T
          { type: 'circle', x: 515, y: 300, size: 100, backgroundColor: '#9b59b6', border: 'none' },
          { type: 'text', text: 'T', x: 515, y: 280, fontSize: 40, fontWeight: 'bold', color: '#ffffff', align: 'center', width: 80 },
          { type: 'text', text: '定策略', x: 515, y: 320, fontSize: 18, fontWeight: 'normal', color: '#ffffff', align: 'center', width: 80 },
          { type: 'text', text: 'Tactics', x: 515, y: 390, fontSize: 16, fontWeight: 'bold', color: '#9b59b6', align: 'center', width: 100 },

          // Step V
          { type: 'circle', x: 650, y: 300, size: 100, backgroundColor: '#e74c3c', border: 'none' },
          { type: 'text', text: 'V', x: 650, y: 280, fontSize: 40, fontWeight: 'bold', color: '#ffffff', align: 'center', width: 80 },
          { type: 'text', text: '塑价值', x: 650, y: 320, fontSize: 18, fontWeight: 'normal', color: '#ffffff', align: 'center', width: 80 },
          { type: 'text', text: 'Value', x: 650, y: 390, fontSize: 16, fontWeight: 'bold', color: '#e74c3c', align: 'center', width: 100 },
        ]
      }
    ]
  },
  {
    name: '卡片',
    icon: '🎴',
    templates: [
      {
        id: 'card-feature-grid',
        name: '特性展示',
        preview: '特性',
        elements: [
          // Title
          { type: 'text', text: '核心特性', x: 375, y: 100, fontSize: 42, fontWeight: 'bold', color: '#2c3e50', align: 'center', width: 600 },
          { type: 'line', x: 375, y: 135, width: 160, height: 3, color: '#3498db' },

          // Card 1
          { type: 'rectangle', x: 150, y: 280, width: 240, height: 280, backgroundColor: '#ffffff', border: '3px solid #3498db', borderRadius: 20 },
          { type: 'circle', x: 150, y: 210, size: 70, backgroundColor: '#3498db', border: 'none' },
          { type: 'icon', text: '⚡', x: 150, y: 210, fontSize: 40, color: '#ffffff' },
          { type: 'text', text: '高效快速', x: 150, y: 310, fontSize: 26, fontWeight: 'bold', color: '#2c3e50', align: 'center', width: 200 },
          { type: 'text', text: '极致的性能优化\n毫秒级响应', x: 150, y: 370, fontSize: 16, fontWeight: 'normal', color: '#7f8c8d', align: 'center', width: 200 },

          // Card 2
          { type: 'rectangle', x: 420, y: 280, width: 240, height: 280, backgroundColor: '#ffffff', border: '3px solid #2ecc71', borderRadius: 20 },
          { type: 'circle', x: 420, y: 210, size: 70, backgroundColor: '#2ecc71', border: 'none' },
          { type: 'icon', text: '🎯', x: 420, y: 210, fontSize: 40, color: '#ffffff' },
          { type: 'text', text: '精准定位', x: 420, y: 310, fontSize: 26, fontWeight: 'bold', color: '#2c3e50', align: 'center', width: 200 },
          { type: 'text', text: '智能算法支持\n准确率99%', x: 420, y: 370, fontSize: 16, fontWeight: 'normal', color: '#7f8c8d', align: 'center', width: 200 },

          // Card 3
          { type: 'rectangle', x: 150, y: 610, width: 240, height: 280, backgroundColor: '#ffffff', border: '3px solid #f39c12', borderRadius: 20 },
          { type: 'circle', x: 150, y: 540, size: 70, backgroundColor: '#f39c12', border: 'none' },
          { type: 'icon', text: '🔒', x: 150, y: 540, fontSize: 40, color: '#ffffff' },
          { type: 'text', text: '安全可靠', x: 150, y: 640, fontSize: 26, fontWeight: 'bold', color: '#2c3e50', align: 'center', width: 200 },
          { type: 'text', text: '多重加密保护\n数据安全第一', x: 150, y: 700, fontSize: 16, fontWeight: 'normal', color: '#7f8c8d', align: 'center', width: 200 },

          // Card 4
          { type: 'rectangle', x: 420, y: 610, width: 240, height: 280, backgroundColor: '#ffffff', border: '3px solid #e74c3c', borderRadius: 20 },
          { type: 'circle', x: 420, y: 540, size: 70, backgroundColor: '#e74c3c', border: 'none' },
          { type: 'icon', text: '💎', x: 420, y: 540, fontSize: 40, color: '#ffffff' },
          { type: 'text', text: '品质保证', x: 420, y: 640, fontSize: 26, fontWeight: 'bold', color: '#2c3e50', align: 'center', width: 200 },
          { type: 'text', text: '严格质量把控\n精益求精', x: 420, y: 700, fontSize: 16, fontWeight: 'normal', color: '#7f8c8d', align: 'center', width: 200 },
        ]
      },
      {
        id: 'card-info-banner',
        name: '信息横幅',
        preview: '横幅',
        elements: [
          // Main banner
          { type: 'rectangle', x: 375, y: 250, width: 650, height: 180, backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none', borderRadius: 25 },
          { type: 'circle', x: 150, y: 250, size: 120, backgroundColor: '#ffffff', border: '5px solid #667eea' },
          { type: 'icon', text: '🎉', x: 150, y: 250, fontSize: 60, color: '#667eea' },
          { type: 'text', text: '重要通知', x: 440, y: 220, fontSize: 36, fontWeight: 'bold', color: '#ffffff', align: 'left', width: 400 },
          { type: 'text', text: '这里是重要信息的详细内容描述', x: 440, y: 270, fontSize: 20, fontWeight: 'normal', color: '#f0f0f0', align: 'left', width: 400 },

          // Bottom info cards
          { type: 'rectangle', x: 185, y: 420, width: 180, height: 140, backgroundColor: '#e8f5fe', border: '2px solid #3498db', borderRadius: 15 },
          { type: 'text', text: '📊', x: 185, y: 400, fontSize: 40, color: '#3498db', align: 'center', width: 100 },
          { type: 'text', text: '数据分析', x: 185, y: 450, fontSize: 22, fontWeight: 'bold', color: '#2c3e50', align: 'center', width: 160 },

          { type: 'rectangle', x: 375, y: 420, width: 180, height: 140, backgroundColor: '#ebfaf5', border: '2px solid #2ecc71', borderRadius: 15 },
          { type: 'text', text: '⚙️', x: 375, y: 400, fontSize: 40, color: '#2ecc71', align: 'center', width: 100 },
          { type: 'text', text: '系统设置', x: 375, y: 450, fontSize: 22, fontWeight: 'bold', color: '#2c3e50', align: 'center', width: 160 },

          { type: 'rectangle', x: 565, y: 420, width: 180, height: 140, backgroundColor: '#fef5e7', border: '2px solid #f39c12', borderRadius: 15 },
          { type: 'text', text: '📝', x: 565, y: 400, fontSize: 40, color: '#f39c12', align: 'center', width: 100 },
          { type: 'text', text: '内容管理', x: 565, y: 450, fontSize: 22, fontWeight: 'bold', color: '#2c3e50', align: 'center', width: 160 },
        ]
      }
    ]
  },
  {
    name: '思维导图',
    icon: '🧠',
    templates: [
      {
        id: 'mindmap-fishbone',
        name: '鱼骨图分析',
        preview: '鱼骨',
        elements: [
          // Title
          { type: 'text', text: '问题分析 - 鱼骨图', x: 375, y: 80, fontSize: 40, fontWeight: 'bold', color: '#2c3e50', align: 'center', width: 600 },
          { type: 'line', x: 265, y: 115, width: 220, height: 3, color: '#3498db' },

          // Main spine (vertical) - using rectangle for better visibility
          { type: 'rectangle', x: 375, y: 450, width: 6, height: 600, backgroundColor: '#34495e', border: 'none', borderRadius: 3 },

          // Result/Problem box at bottom
          { type: 'circle', x: 375, y: 780, size: 100, backgroundColor: '#e74c3c', border: '5px solid #c0392b' },
          { type: 'text', text: '问题', x: 375, y: 765, fontSize: 28, fontWeight: 'bold', color: '#ffffff', align: 'center', width: 80 },
          { type: 'text', text: '结果', x: 375, y: 795, fontSize: 18, fontWeight: 'normal', color: '#ffffff', align: 'center', width: 80 },

          // Left branch 1 (top)
          { type: 'line', x: 290, y: 227, width: 95, height: 3, color: '#3498db', rotate: 35 },
          { type: 'rectangle', x: 180, y: 180, width: 200, height: 80, backgroundColor: '#e8f5fe', border: '3px solid #3498db', borderRadius: 12 },
          { type: 'text', text: '原因一', x: 180, y: 165, fontSize: 22, fontWeight: 'bold', color: '#3498db', align: 'center', width: 180 },
          { type: 'text', text: '具体因素描述', x: 180, y: 195, fontSize: 16, fontWeight: 'normal', color: '#555', align: 'center', width: 180 },

          // Sub-branch 1-1
          { type: 'icon', text: '•', x: 95, y: 270, fontSize: 16, color: '#7f8c8d' },
          { type: 'text', text: '细节描述', x: 120, y: 270, fontSize: 14, fontWeight: 'normal', color: '#7f8c8d', align: 'left', width: 120 },

          // Right branch 1 (top)
          { type: 'line', x: 378, y: 227, width: 95, height: 3, color: '#2ecc71', rotate: -35 },
          { type: 'rectangle', x: 570, y: 180, width: 200, height: 80, backgroundColor: '#ebfaf5', border: '3px solid #2ecc71', borderRadius: 12 },
          { type: 'text', text: '原因二', x: 570, y: 165, fontSize: 22, fontWeight: 'bold', color: '#2ecc71', align: 'center', width: 180 },
          { type: 'text', text: '具体因素描述', x: 570, y: 195, fontSize: 16, fontWeight: 'normal', color: '#555', align: 'center', width: 180 },

          // Sub-branch 1-2
          { type: 'icon', text: '•', x: 635, y: 270, fontSize: 16, color: '#7f8c8d' },
          { type: 'text', text: '细节描述', x: 660, y: 270, fontSize: 14, fontWeight: 'normal', color: '#7f8c8d', align: 'left', width: 120 },

          // Left branch 2 (middle-top)
          { type: 'line', x: 290, y: 347, width: 95, height: 3, color: '#f39c12', rotate: 35 },
          { type: 'rectangle', x: 180, y: 310, width: 200, height: 80, backgroundColor: '#fef5e7', border: '3px solid #f39c12', borderRadius: 12 },
          { type: 'text', text: '原因三', x: 180, y: 295, fontSize: 22, fontWeight: 'bold', color: '#f39c12', align: 'center', width: 180 },
          { type: 'text', text: '具体因素描述', x: 180, y: 325, fontSize: 16, fontWeight: 'normal', color: '#555', align: 'center', width: 180 },

          // Right branch 2 (middle-top)
          { type: 'line', x: 378, y: 347, width: 95, height: 3, color: '#9b59b6', rotate: -35 },
          { type: 'rectangle', x: 570, y: 310, width: 200, height: 80, backgroundColor: '#f4ecf7', border: '3px solid #9b59b6', borderRadius: 12 },
          { type: 'text', text: '原因四', x: 570, y: 295, fontSize: 22, fontWeight: 'bold', color: '#9b59b6', align: 'center', width: 180 },
          { type: 'text', text: '具体因素描述', x: 570, y: 325, fontSize: 16, fontWeight: 'normal', color: '#555', align: 'center', width: 180 },

          // Left branch 3 (middle-bottom)
          { type: 'line', x: 290, y: 477, width: 95, height: 3, color: '#16a085', rotate: 35 },
          { type: 'rectangle', x: 180, y: 440, width: 200, height: 80, backgroundColor: '#d5f4e6', border: '3px solid #16a085', borderRadius: 12 },
          { type: 'text', text: '原因五', x: 180, y: 425, fontSize: 22, fontWeight: 'bold', color: '#16a085', align: 'center', width: 180 },
          { type: 'text', text: '具体因素描述', x: 180, y: 455, fontSize: 16, fontWeight: 'normal', color: '#555', align: 'center', width: 180 },

          // Right branch 3 (middle-bottom)
          { type: 'line', x: 378, y: 477, width: 95, height: 3, color: '#e67e22', rotate: -35 },
          { type: 'rectangle', x: 570, y: 440, width: 200, height: 80, backgroundColor: '#fef5e7', border: '3px solid #e67e22', borderRadius: 12 },
          { type: 'text', text: '原因六', x: 570, y: 425, fontSize: 22, fontWeight: 'bold', color: '#e67e22', align: 'center', width: 180 },
          { type: 'text', text: '具体因素描述', x: 570, y: 455, fontSize: 16, fontWeight: 'normal', color: '#555', align: 'center', width: 180 },

          // Left branch 4 (bottom)
          { type: 'line', x: 290, y: 607, width: 95, height: 3, color: '#c0392b', rotate: 35 },
          { type: 'rectangle', x: 180, y: 570, width: 200, height: 80, backgroundColor: '#fadbd8', border: '3px solid #c0392b', borderRadius: 12 },
          { type: 'text', text: '原因七', x: 180, y: 555, fontSize: 22, fontWeight: 'bold', color: '#c0392b', align: 'center', width: 180 },
          { type: 'text', text: '具体因素描述', x: 180, y: 585, fontSize: 16, fontWeight: 'normal', color: '#555', align: 'center', width: 180 },

          // Right branch 4 (bottom)
          { type: 'line', x: 378, y: 607, width: 95, height: 3, color: '#d35400', rotate: -35 },
          { type: 'rectangle', x: 570, y: 570, width: 200, height: 80, backgroundColor: '#fdebd0', border: '3px solid #d35400', borderRadius: 12 },
          { type: 'text', text: '原因八', x: 570, y: 555, fontSize: 22, fontWeight: 'bold', color: '#d35400', align: 'center', width: 180 },
          { type: 'text', text: '具体因素描述', x: 570, y: 585, fontSize: 16, fontWeight: 'normal', color: '#555', align: 'center', width: 180 },
        ]
      },
      {
        id: 'mindmap-beautiful-radial',
        name: '放射思维图',
        preview: '放射',
        elements: [
          // Center circle with gradient effect
          { type: 'circle', x: 375, y: 350, size: 140, backgroundColor: '#9b59b6', border: '5px solid #8e44ad' },
          { type: 'text', text: '中心主题', x: 375, y: 350, fontSize: 28, fontWeight: 'bold', color: '#ffffff', align: 'center', width: 120 },

          // Branch 1 - Top
          { type: 'line', x: 375, y: 250, width: 4, height: 60, color: '#3498db' },
          { type: 'rectangle', x: 375, y: 180, width: 180, height: 90, backgroundColor: '#e8f5fe', border: '3px solid #3498db', borderRadius: 12 },
          { type: 'text', text: '💡 创意想法', x: 375, y: 180, fontSize: 20, fontWeight: 'bold', color: '#2c3e50', align: 'center', width: 160 },

          // Branch 2 - Top Right
          { type: 'line', x: 455, y: 305, width: 80, height: 3, color: '#2ecc71', rotate: -45 },
          { type: 'rectangle', x: 550, y: 220, width: 180, height: 90, backgroundColor: '#ebfaf5', border: '3px solid #2ecc71', borderRadius: 12 },
          { type: 'text', text: '📊 数据分析', x: 550, y: 220, fontSize: 20, fontWeight: 'bold', color: '#2c3e50', align: 'center', width: 160 },

          // Branch 3 - Right
          { type: 'line', x: 475, y: 350, width: 70, height: 4, color: '#f39c12' },
          { type: 'rectangle', x: 590, y: 350, width: 180, height: 90, backgroundColor: '#fef5e7', border: '3px solid #f39c12', borderRadius: 12 },
          { type: 'text', text: '🎯 目标规划', x: 590, y: 350, fontSize: 20, fontWeight: 'bold', color: '#2c3e50', align: 'center', width: 160 },

          // Branch 4 - Bottom Right
          { type: 'line', x: 455, y: 395, width: 80, height: 3, color: '#e74c3c', rotate: 45 },
          { type: 'rectangle', x: 550, y: 480, width: 180, height: 90, backgroundColor: '#fdeef4', border: '3px solid #e74c3c', borderRadius: 12 },
          { type: 'text', text: '🚀 执行方案', x: 550, y: 480, fontSize: 20, fontWeight: 'bold', color: '#2c3e50', align: 'center', width: 160 },

          // Branch 5 - Bottom
          { type: 'line', x: 375, y: 420, width: 4, height: 60, color: '#1abc9c' },
          { type: 'rectangle', x: 375, y: 520, width: 180, height: 90, backgroundColor: '#e8f8f5', border: '3px solid #1abc9c', borderRadius: 12 },
          { type: 'text', text: '📝 总结反思', x: 375, y: 520, fontSize: 20, fontWeight: 'bold', color: '#2c3e50', align: 'center', width: 160 },

          // Branch 6 - Bottom Left
          { type: 'line', x: 295, y: 395, width: 80, height: 3, color: '#e67e22', rotate: -45 },
          { type: 'rectangle', x: 200, y: 480, width: 180, height: 90, backgroundColor: '#fef5e7', border: '3px solid #e67e22', borderRadius: 12 },
          { type: 'text', text: '⚡ 快速迭代', x: 200, y: 480, fontSize: 20, fontWeight: 'bold', color: '#2c3e50', align: 'center', width: 160 },

          // Branch 7 - Left
          { type: 'line', x: 305, y: 350, width: 70, height: 4, color: '#16a085' },
          { type: 'rectangle', x: 160, y: 350, width: 180, height: 90, backgroundColor: '#d5f4e6', border: '3px solid #16a085', borderRadius: 12 },
          { type: 'text', text: '💪 团队协作', x: 160, y: 350, fontSize: 20, fontWeight: 'bold', color: '#2c3e50', align: 'center', width: 160 },

          // Branch 8 - Top Left
          { type: 'line', x: 295, y: 305, width: 80, height: 3, color: '#c0392b', rotate: 45 },
          { type: 'rectangle', x: 200, y: 220, width: 180, height: 90, backgroundColor: '#fadbd8', border: '3px solid #c0392b', borderRadius: 12 },
          { type: 'text', text: '🎨 设计优化', x: 200, y: 220, fontSize: 20, fontWeight: 'bold', color: '#2c3e50', align: 'center', width: 160 },
        ]
      }
    ]
  },
  {
    name: '模型框架',
    icon: '📦',
    templates: [
      {
        id: 'model-prep-pro',
        name: 'PREP专业版',
        preview: 'PREP',
        elements: [
          // Title
          { type: 'text', text: 'PREP 结论先行法则', x: 375, y: 80, fontSize: 40, fontWeight: 'bold', color: '#2c3e50', align: 'center', width: 600 },
          { type: 'line', x: 375, y: 115, width: 280, height: 3, color: '#9b59b6' },

          // P - Point
          { type: 'rectangle', x: 375, y: 220, width: 600, height: 120, backgroundColor: '#e8f5fe', border: '3px solid #3498db', borderRadius: 15 },
          { type: 'circle', x: 140, y: 220, size: 80, backgroundColor: '#3498db', border: 'none' },
          { type: 'text', text: 'P', x: 140, y: 220, fontSize: 42, fontWeight: 'bold', color: '#ffffff', align: 'center', width: 70 },
          { type: 'text', text: 'Point - 结论观点', x: 430, y: 200, fontSize: 28, fontWeight: 'bold', color: '#2c3e50', align: 'left', width: 400 },
          { type: 'text', text: '开门见山，先说结论', x: 430, y: 240, fontSize: 18, fontWeight: 'normal', color: '#555', align: 'left', width: 400 },

          // R - Reason
          { type: 'rectangle', x: 375, y: 370, width: 600, height: 120, backgroundColor: '#ebfaf5', border: '3px solid #2ecc71', borderRadius: 15 },
          { type: 'circle', x: 140, y: 370, size: 80, backgroundColor: '#2ecc71', border: 'none' },
          { type: 'text', text: 'R', x: 140, y: 370, fontSize: 42, fontWeight: 'bold', color: '#ffffff', align: 'center', width: 70 },
          { type: 'text', text: 'Reason - 支撑理由', x: 430, y: 350, fontSize: 28, fontWeight: 'bold', color: '#2c3e50', align: 'left', width: 400 },
          { type: 'text', text: '说明为什么这样认为', x: 430, y: 390, fontSize: 18, fontWeight: 'normal', color: '#555', align: 'left', width: 400 },

          // E - Example
          { type: 'rectangle', x: 375, y: 520, width: 600, height: 120, backgroundColor: '#fef5e7', border: '3px solid #f39c12', borderRadius: 15 },
          { type: 'circle', x: 140, y: 520, size: 80, backgroundColor: '#f39c12', border: 'none' },
          { type: 'text', text: 'E', x: 140, y: 520, fontSize: 42, fontWeight: 'bold', color: '#ffffff', align: 'center', width: 70 },
          { type: 'text', text: 'Example - 举例论证', x: 430, y: 500, fontSize: 28, fontWeight: 'bold', color: '#2c3e50', align: 'left', width: 400 },
          { type: 'text', text: '用具体案例佐证观点', x: 430, y: 540, fontSize: 18, fontWeight: 'normal', color: '#555', align: 'left', width: 400 },

          // P - Point Again
          { type: 'rectangle', x: 375, y: 670, width: 600, height: 120, backgroundColor: '#fdeef4', border: '3px solid #e74c3c', borderRadius: 15 },
          { type: 'circle', x: 140, y: 670, size: 80, backgroundColor: '#e74c3c', border: 'none' },
          { type: 'text', text: 'P', x: 140, y: 670, fontSize: 42, fontWeight: 'bold', color: '#ffffff', align: 'center', width: 70 },
          { type: 'text', text: 'Point - 重申结论', x: 430, y: 650, fontSize: 28, fontWeight: 'bold', color: '#2c3e50', align: 'left', width: 400 },
          { type: 'text', text: '再次强调核心观点', x: 430, y: 690, fontSize: 18, fontWeight: 'normal', color: '#555', align: 'left', width: 400 },
        ]
      },
      {
        id: 'model-5w2h-pro',
        name: '5W2H分析法',
        preview: '5W2H',
        elements: [
          // Title with decoration
          { type: 'text', text: '5W2H 问题分析法', x: 375, y: 80, fontSize: 40, fontWeight: 'bold', color: '#2c3e50', align: 'center', width: 600 },
          { type: 'line', x: 375, y: 115, width: 260, height: 3, color: '#3498db' },

          // Left column
          { type: 'rectangle', x: 190, y: 240, width: 280, height: 100, backgroundColor: '#e8f5fe', border: '3px solid #3498db', borderRadius: 12 },
          { type: 'text', text: 'What', x: 120, y: 240, fontSize: 32, fontWeight: 'bold', color: '#3498db', align: 'center', width: 100 },
          { type: 'text', text: '是什么？', x: 190, y: 225, fontSize: 22, fontWeight: 'bold', color: '#2c3e50', align: 'center', width: 260 },
          { type: 'text', text: '目标和内容', x: 190, y: 255, fontSize: 16, fontWeight: 'normal', color: '#555', align: 'center', width: 260 },

          { type: 'rectangle', x: 190, y: 370, width: 280, height: 100, backgroundColor: '#ebfaf5', border: '3px solid #2ecc71', borderRadius: 12 },
          { type: 'text', text: 'Why', x: 120, y: 370, fontSize: 32, fontWeight: 'bold', color: '#2ecc71', align: 'center', width: 100 },
          { type: 'text', text: '为什么？', x: 190, y: 355, fontSize: 22, fontWeight: 'bold', color: '#2c3e50', align: 'center', width: 260 },
          { type: 'text', text: '原因和目的', x: 190, y: 385, fontSize: 16, fontWeight: 'normal', color: '#555', align: 'center', width: 260 },

          { type: 'rectangle', x: 190, y: 500, width: 280, height: 100, backgroundColor: '#fef5e7', border: '3px solid #f39c12', borderRadius: 12 },
          { type: 'text', text: 'Who', x: 120, y: 500, fontSize: 32, fontWeight: 'bold', color: '#f39c12', align: 'center', width: 100 },
          { type: 'text', text: '谁负责？', x: 190, y: 485, fontSize: 22, fontWeight: 'bold', color: '#2c3e50', align: 'center', width: 260 },
          { type: 'text', text: '责任人', x: 190, y: 515, fontSize: 16, fontWeight: 'normal', color: '#555', align: 'center', width: 260 },

          { type: 'rectangle', x: 190, y: 630, width: 280, height: 100, backgroundColor: '#fdeef4', border: '3px solid #e74c3c', borderRadius: 12 },
          { type: 'text', text: 'When', x: 120, y: 630, fontSize: 32, fontWeight: 'bold', color: '#e74c3c', align: 'center', width: 100 },
          { type: 'text', text: '何时做？', x: 190, y: 615, fontSize: 22, fontWeight: 'bold', color: '#2c3e50', align: 'center', width: 260 },
          { type: 'text', text: '时间节点', x: 190, y: 645, fontSize: 16, fontWeight: 'normal', color: '#555', align: 'center', width: 260 },

          // Right column
          { type: 'rectangle', x: 560, y: 240, width: 280, height: 100, backgroundColor: '#f4ecf7', border: '3px solid #9b59b6', borderRadius: 12 },
          { type: 'text', text: 'Where', x: 630, y: 240, fontSize: 32, fontWeight: 'bold', color: '#9b59b6', align: 'center', width: 100 },
          { type: 'text', text: '在哪里？', x: 560, y: 225, fontSize: 22, fontWeight: 'bold', color: '#2c3e50', align: 'center', width: 260 },
          { type: 'text', text: '地点场所', x: 560, y: 255, fontSize: 16, fontWeight: 'normal', color: '#555', align: 'center', width: 260 },

          { type: 'rectangle', x: 560, y: 370, width: 280, height: 100, backgroundColor: '#d5f4e6', border: '3px solid #16a085', borderRadius: 12 },
          { type: 'text', text: 'How', x: 630, y: 370, fontSize: 32, fontWeight: 'bold', color: '#16a085', align: 'center', width: 100 },
          { type: 'text', text: '怎么做？', x: 560, y: 355, fontSize: 22, fontWeight: 'bold', color: '#2c3e50', align: 'center', width: 260 },
          { type: 'text', text: '方法手段', x: 560, y: 385, fontSize: 16, fontWeight: 'normal', color: '#555', align: 'center', width: 260 },

          { type: 'rectangle', x: 560, y: 500, width: 280, height: 100, backgroundColor: '#ffeaa7', border: '3px solid #fdcb6e', borderRadius: 12 },
          { type: 'text', text: 'How much', x: 560, y: 485, fontSize: 26, fontWeight: 'bold', color: '#d63031', align: 'center', width: 260 },
          { type: 'text', text: '多少成本？', x: 560, y: 515, fontSize: 22, fontWeight: 'bold', color: '#2c3e50', align: 'center', width: 260 },
        ]
      }
    ]
  },
  {
    name: '清单',
    icon: '✓',
    templates: [
      {
        id: 'checklist-pro',
        name: '精美清单',
        preview: '清单',
        elements: [
          // Header
          { type: 'rectangle', x: 375, y: 120, width: 650, height: 100, backgroundColor: '#3498db', border: 'none', borderRadius: 20 },
          { type: 'text', text: '📋 待办清单', x: 375, y: 120, fontSize: 38, fontWeight: 'bold', color: '#ffffff', align: 'center', width: 600 },

          // Item 1
          { type: 'rectangle', x: 375, y: 240, width: 620, height: 80, backgroundColor: '#ffffff', border: '2px solid #e9ecef', borderRadius: 12 },
          { type: 'circle', x: 110, y: 240, size: 40, backgroundColor: '#2ecc71', border: 'none' },
          { type: 'icon', text: '✓', x: 110, y: 240, fontSize: 28, color: '#ffffff' },
          { type: 'text', text: '第一项重要任务', x: 330, y: 240, fontSize: 22, fontWeight: 'bold', color: '#2c3e50', align: 'left', width: 450 },

          // Item 2
          { type: 'rectangle', x: 375, y: 350, width: 620, height: 80, backgroundColor: '#ffffff', border: '2px solid #e9ecef', borderRadius: 12 },
          { type: 'circle', x: 110, y: 350, size: 40, backgroundColor: '#3498db', border: 'none' },
          { type: 'icon', text: '✓', x: 110, y: 350, fontSize: 28, color: '#ffffff' },
          { type: 'text', text: '第二项重要任务', x: 330, y: 350, fontSize: 22, fontWeight: 'bold', color: '#2c3e50', align: 'left', width: 450 },

          // Item 3
          { type: 'rectangle', x: 375, y: 460, width: 620, height: 80, backgroundColor: '#ffffff', border: '2px solid #e9ecef', borderRadius: 12 },
          { type: 'circle', x: 110, y: 460, size: 40, backgroundColor: '#f39c12', border: 'none' },
          { type: 'icon', text: '✓', x: 110, y: 460, fontSize: 28, color: '#ffffff' },
          { type: 'text', text: '第三项重要任务', x: 330, y: 460, fontSize: 22, fontWeight: 'bold', color: '#2c3e50', align: 'left', width: 450 },

          // Item 4
          { type: 'rectangle', x: 375, y: 570, width: 620, height: 80, backgroundColor: '#ffffff', border: '2px solid #e9ecef', borderRadius: 12 },
          { type: 'circle', x: 110, y: 570, size: 40, backgroundColor: '#e74c3c', border: 'none' },
          { type: 'icon', text: '✓', x: 110, y: 570, fontSize: 28, color: '#ffffff' },
          { type: 'text', text: '第四项重要任务', x: 330, y: 570, fontSize: 22, fontWeight: 'bold', color: '#2c3e50', align: 'left', width: 450 },

          // Progress bar
          { type: 'rectangle', x: 375, y: 700, width: 620, height: 30, backgroundColor: '#ecf0f1', border: 'none', borderRadius: 15 },
          { type: 'rectangle', x: 220, y: 700, width: 300, height: 30, backgroundColor: '#2ecc71', border: 'none', borderRadius: 15 },
          { type: 'text', text: '完成度: 75%', x: 375, y: 750, fontSize: 18, fontWeight: 'bold', color: '#2ecc71', align: 'center', width: 200 },
        ]
      }
    ]
  }
])

const selectedCategory = ref(0)

const addTemplate = (template) => {
  emit('add-template', template)
}
</script>

<template>
  <div class="template-library">
    <div class="library-header">
      <h3>📋 模板库</h3>
      <p class="hint">精美预设模板，一键应用</p>
    </div>

    <!-- Category Tabs -->
    <div class="category-tabs">
      <button
        v-for="(category, index) in categories"
        :key="index"
        @click="selectedCategory = index"
        :class="['category-tab', { active: selectedCategory === index }]"
      >
        <span class="tab-icon">{{ category.icon }}</span>
        <span class="tab-name">{{ category.name }}</span>
      </button>
    </div>

    <!-- Templates Grid -->
    <div class="templates-grid">
      <div
        v-for="template in categories[selectedCategory].templates"
        :key="template.id"
        class="template-card"
        @click="addTemplate(template)"
      >
        <div class="template-preview">
          <span class="preview-text">{{ template.preview }}</span>
        </div>
        <div class="template-name">{{ template.name }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.template-library {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: white;
  overflow: hidden;
}

.library-header {
  padding: 16px;
  border-bottom: 2px solid #f0f0f0;
  background: white;
  flex-shrink: 0;
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

.category-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 12px;
  border-bottom: 1px solid #f0f0f0;
  background: #fafafa;
  overflow-x: auto;
  flex-shrink: 0;
}

.category-tab {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 13px;
  color: #555;
  white-space: nowrap;
}

.category-tab:hover {
  border-color: #999;
  background: #f8f8f8;
}

.category-tab.active {
  border-color: #4a90e2;
  background: #e3f2fd;
  color: #333;
  font-weight: 500;
}

.tab-icon {
  font-size: 16px;
}

.tab-name {
  font-size: 13px;
}

.templates-grid {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  align-content: start;
}

.template-card {
  border: 2px solid #e5e5e5;
  border-radius: 8px;
  padding: 12px;
  cursor: pointer;
  transition: all 0.2s;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.template-card:hover {
  border-color: #4a90e2;
  background: #f8fbff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.15);
}

.template-preview {
  width: 100%;
  height: 80px;
  border-radius: 6px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.preview-text {
  opacity: 0.95;
}

.template-name {
  font-size: 13px;
  font-weight: 500;
  color: #333;
  text-align: center;
}

/* Custom scrollbar */
.templates-grid::-webkit-scrollbar {
  width: 6px;
}

.templates-grid::-webkit-scrollbar-track {
  background: #f5f5f5;
}

.templates-grid::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 3px;
}

.templates-grid::-webkit-scrollbar-thumb:hover {
  background: #999;
}
</style>
