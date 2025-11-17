# 小红书图片助手 | Xiaohongshu Image Assistant

一个基于 Vue 3 的 **XMind 风格可视化图片编辑器**，专为小红书内容创作者设计。支持多页面管理、双击内联编辑、横向画布布局，无需后端即可生成精美的主图和副图。

A **XMind-style visual image editor** built with Vue 3, designed for Xiaohongshu content creators. Features multi-page management, inline editing, horizontal canvas layout, and client-side image generation.

![Demo](https://img.shields.io/badge/Vue-3.4-4FC08D?logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.2-646CFF?logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue.svg)

## ✨ 主要特性 | Key Features

### 🖼️ XMind 式无限画布
- **横向布局**: 主图和副图从左到右排列，类似思维导图
- **无限画布**: 支持平移和缩放（10%-200%）
- **多页面管理**: 默认主图 + 副图，支持无限添加
- **网格背景**: 清晰定位，专业视觉效果
- **页面导航器**: 左下角浮动面板，快速跳转定位

### ✏️ 双模式编辑
- **双击直接编辑**: 双击文本元素即可内联编辑，Ctrl+Enter 保存
- **右侧详细编辑**: 完整的文本编辑器面板
  - 多行文本输入框
  - 7 档预设字号 + 精确滑块（12-120px）
  - 字体粗细（正常/粗体）
  - 文本对齐（左/中/右）
  - 12 色预设色板 + 自定义颜色
  - 宽度滑块调整

### 🎨 自由拖拽操作
- **拖拽移动**: 直接拖动文本和图标到任意位置
- **宽度调整**: 拖拽文本元素右侧圆点调整宽度
- **元素选择**: 点击选中，蓝色虚线框高亮
- **快捷删除**: Delete/Backspace 删除选中元素

### 📚 丰富的图标库
- **4 大分类**: 表情符号、形状标记、生活物品、标签符号
- **48+ 图标**: ❤️ ✨ 🌟 💕 ● ■ ▲ ★ 📱 💻 ☕ # @ 等
- **一键添加**: 点击图标即可添加到当前页面
- **可折叠侧栏**: 左侧图标库支持折叠，节省空间

### 💾 灵活的导出功能
- **导出当前页**: 导出选中的单个页面为 PNG
- **批量导出**: 一键导出所有页面
- **高质量 PNG**: 750×1000px，适合移动端
- **自动命名**: 时间戳 + 页面名称

### 📱 响应式布局
- **三栏设计**: 图标库（可折叠）| 画布 | 文本编辑器（可折叠）
- **可折叠侧栏**: 左右侧边栏支持折叠，最大化画布空间
- **自适应**: 桌面端三栏，平板/移动端堆叠
- **跨平台**: 支持所有现代浏览器

## 🛠️ 技术栈 | Tech Stack

- **Vue 3** - Composition API with `<script setup>`
- **Vite** - Lightning-fast build tool and dev server
- **Canvas API** - Client-side image rendering
- **Vanilla CSS** - Scoped component styles, no frameworks

## 📁 项目结构 | Project Structure

```
xiaohongshu-copilot/
├── src/
│   ├── main.js                 # 应用入口
│   ├── App.vue                 # 主应用组件，三栏布局
│   ├── style.css               # 全局样式
│   ├── components/
│   │   ├── InfiniteCanvas.vue  # 无限画布容器（核心）
│   │   ├── PageCanvas.vue      # 单页画布，支持内联编辑
│   │   ├── IconLibrary.vue     # 图标库组件
│   │   └── TextEditor.vue      # 右侧文本编辑器
│   └── utils/
│       └── canvasRenderer.js   # Canvas 渲染和导出工具
├── index.html
├── package.json
└── vite.config.js
```

## 🚀 安装与运行 | Installation & Setup

1. **克隆项目 | Clone repository**:
   ```bash
   git clone https://github.com/yourusername/xiaohongshu-copilot.git
   cd xiaohongshu-copilot
   ```

2. **安装依赖 | Install dependencies**:
   ```bash
   npm install
   ```

3. **启动开发服务器 | Run development server**:
   ```bash
   npm run dev
   ```
   应用将在 `http://localhost:5173` 运行

4. **构建生产版本 | Build for production**:
   ```bash
   npm run build
   ```

5. **预览生产版本 | Preview production build**:
   ```bash
   npm run preview
   ```

## 📖 使用指南 | User Guide

### 界面布局

```
┌────────────────────────────────────────────────────────────┐
│  小红书图片助手                                               │
│  ➕ 添加文本   💾 导出当前页   📦 导出全部                     │
├─────────┬──────────────────────────────────┬──────────────┤
│         │                                  │              │
│ 图标库  │        XMind 横向画布              │  文本编辑器   │
│  ◀     │                                  │       ▶      │
│         │  ┌─────┐  ┌─────┐  ┌─────┐     │              │
│ ❤️ ✨  │  │ 主图 │  │副图1 │  │副图2 │     │  文本内容    │
│ ● ■ ★ │  └─────┘  └─────┘  └─────┘     │  字号/颜色    │
│ 📱 💻 │                                  │  对齐/粗细    │
│         │  🔍- 50% 🔍+  ➕添加副图         │              │
│         │                                  │              │
│ 可折叠  │  页面: 📱 主图 📄 副图1 📄 副图2   │    可折叠    │
└─────────┴──────────────────────────────────┴──────────────┘
```

### 快速开始

1. **打开应用**: 访问 `http://localhost:5173`

2. **查看默认页面**:
   - 系统自动创建"主图"和"副图 1"
   - 横向排列在画布上

3. **添加内容**:
   - **方式1**: 点击顶部"➕ 添加文本"
   - **方式2**: 点击左侧图标库中的图标

4. **编辑文本** - 两种方式:
   - **快速编辑**: 双击文本元素，内联编辑框弹出
     - 输入内容
     - Ctrl+Enter 保存
     - Esc 取消
   - **详细编辑**: 点击选中元素 → 右侧编辑器修改
     - 调整字号、颜色、对齐等

5. **管理页面**:
   - 点击工具栏"➕ 添加副图"创建新页面
   - 点击"🗑️ 删除当前页"删除（主图受保护）
   - 左下角导航器快速跳转

6. **画布操作**:
   - **平移**: 空白处拖动
   - **缩放**: Ctrl/Cmd + 鼠标滚轮
   - **缩放控制**: 工具栏 🔍- / 🔍+ / 重置

7. **折叠侧栏**:
   - 点击左侧 `◀` 折叠图标库
   - 点击右侧 `▶` 折叠文本编辑器
   - 获得更大画布空间

8. **导出图片**:
   - **导出当前页**: 点击"💾 导出当前页"
   - **批量导出**: 点击"📦 导出全部"

### 快捷键

| 快捷键 | 功能 |
|--------|------|
| `双击文本` | 进入内联编辑模式 |
| `Ctrl + Enter` | 保存内联编辑 |
| `Esc` | 取消内联编辑 |
| `Delete` / `Backspace` | 删除选中元素 |
| `Ctrl/Cmd + 滚轮` | 缩放画布 |

## 🎯 核心实现 | How It Works

### 架构设计

```
App.vue (主应用)
├── IconLibrary (左侧图标库)
│   └── 可折叠侧栏
├── InfiniteCanvas (中间无限画布)
│   ├── 页面横向布局逻辑
│   ├── 缩放和平移控制
│   ├── 页面导航器
│   └── PageCanvas[] (多个页面)
│       ├── 元素拖拽逻辑
│       ├── 双击内联编辑
│       └── 元素选择和删除
└── TextEditor (右侧文本编辑器)
    ├── 可折叠侧栏
    └── 详细属性编辑
```

### 数据流

1. **添加元素**:
   - IconLibrary → emit → App.vue → InfiniteCanvas → 当前 PageCanvas

2. **选择元素**:
   - PageCanvas (点击) → emit → InfiniteCanvas → emit → App.vue → TextEditor

3. **编辑元素**:
   - **内联编辑**: PageCanvas 内部完成
   - **属性编辑**: TextEditor → emit → App.vue → 更新 page.elements

4. **导出图片**:
   - App.vue → 遍历 pages → Canvas 渲染 → PNG 下载

### 页面布局算法

```javascript
// 横向布局，类似 XMind
const pagePositions = computed(() => {
  const gap = 100
  let currentX = gap
  const startY = gap

  return pages.value.map(page => {
    const pos = { x: currentX, y: startY, ... }
    currentX += page.width + gap  // 横向累加
    return pos
  })
})
```

### 内联编辑实现

```javascript
// 双击触发编辑
const startEditing = (element, e) => {
  if (e.detail === 2) { // 双击检测
    editingElementId.value = element.id
    editingText.value = element.text
  }
}

// 渲染编辑框
<textarea
  v-if="element.id === editingElementId"
  v-model="editingText"
  @blur="finishEditing"
  @keydown.enter.ctrl="finishEditing"
/>
```

## 🎨 自定义配置 | Customization

### 修改画布尺寸

编辑 `InfiniteCanvas.vue`:

```javascript
const pages = ref([
  {
    width: 750,   // 修改宽度
    height: 1000, // 修改高度
    // ...
  }
])
```

### 修改背景颜色

编辑页面的 `backgroundColor` 属性:

```javascript
backgroundColor: 'rgb(243, 209, 158)'  // 改为你的颜色
```

### 添加更多图标

编辑 `IconLibrary.vue`:

```javascript
{
  category: '自定义分类',
  items: [
    { emoji: '🎉', name: '庆祝' },
    { emoji: '🎊', name: '彩球' },
    // 添加更多...
  ]
}
```

### 调整页面间距

编辑 `InfiniteCanvas.vue` 中的 `gap`:

```javascript
const gap = 100  // 改为你想要的间距（px）
```

## 🔄 特色功能对比 | Feature Comparison

| 功能 | 传统编辑器 | 本应用 |
|------|-----------|--------|
| 页面布局 | 分页切换 | ✨ XMind 横向画布 |
| 文本编辑 | 属性面板 | ✨ 双击内联 + 详细编辑 |
| 页面管理 | 固定数量 | ✨ 无限添加副图 |
| 画布操作 | 固定视图 | ✨ 缩放/平移/网格 |
| 侧栏控制 | 固定显示 | ✨ 可折叠节省空间 |
| 导航方式 | 标签切换 | ✨ 可视化导航器 |

## 🌟 未来规划 | Future Enhancements

- [ ] **图片上传**: 支持上传自定义图片到画布
- [ ] **图层管理**: 元素层级调整（置顶/置底）
- [ ] **撤销/重做**: Ctrl+Z / Ctrl+Y 操作历史
- [ ] **模板库**: 预设模板一键应用
- [ ] **元素旋转**: 支持任意角度旋转
- [ ] **背景设置**: 纯色/渐变/图案背景
- [ ] **分组功能**: 多元素组合管理
- [ ] **云端存储**: 保存和分享设计
- [ ] **协作编辑**: 多人实时协作
- [ ] **更多字体**: 自定义字体上传

## 🌐 浏览器兼容性 | Browser Compatibility

| 浏览器 | 版本要求 | 状态 |
|--------|---------|------|
| Chrome | ≥ 90 | ✅ 推荐 |
| Edge | ≥ 90 | ✅ 推荐 |
| Firefox | ≥ 88 | ✅ 支持 |
| Safari | ≥ 14 | ✅ 支持 |

**要求**: 支持 ES6+、Canvas API、CSS Grid

## 📄 开源协议 | License

MIT License - 自由使用、修改和分发

## 🤝 贡献指南 | Contributing

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 💬 反馈与支持 | Feedback & Support

- **Issue**: [GitHub Issues](https://github.com/yourusername/xiaohongshu-copilot/issues)
- **讨论**: [GitHub Discussions](https://github.com/yourusername/xiaohongshu-copilot/discussions)

## 🙏 致谢 | Acknowledgments

- Vue.js 团队提供优秀的前端框架
- Vite 提供极速开发体验
- 所有贡献者的支持

---

**Made with ❤️ for Xiaohongshu Creators**

⭐ 如果这个项目对你有帮助，请给个 Star！
