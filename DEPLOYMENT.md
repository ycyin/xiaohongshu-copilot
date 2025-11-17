# 部署指南 | Deployment Guide

## 🚀 Vercel 部署（推荐）

### 方式一：通过 Vercel 网站部署（最简单）

#### 步骤 1：推送代码到 GitHub

```bash
# 如果还没有初始化 git
git init

# 添加所有文件
git add .

# 提交
git commit -m "feat: initial commit with XMind-style editor"

# 关联远程仓库
git remote add origin https://github.com/ycyin/xiaohongshu-copilot.git

# 推送
git push -u origin main
```

#### 步骤 2：在 Vercel 导入项目

1. 访问 [vercel.com](https://vercel.com)
2. 使用 GitHub 账号登录
3. 点击 **"Add New..."** → **"Project"**
4. 选择 `xiaohongshu-copilot` 仓库
5. 点击 **"Import"**

#### 步骤 3：配置构建设置

Vercel 会自动检测 Vite 项目，使用以下默认配置：

```
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
Node Version: 18.x
```

**✅ 无需修改，直接使用默认配置即可！**

#### 步骤 4：部署

点击 **"Deploy"** 按钮，等待 1-2 分钟即可完成部署。

#### 步骤 5：访问你的应用

部署成功后，你会得到一个链接：
```
https://xiaohongshu-copilot.vercel.app
```

🎉 完成！你的应用已经上线了！

---

### 方式二：通过 Vercel CLI 部署

#### 1. 安装 Vercel CLI

```bash
npm install -g vercel
```

#### 2. 登录 Vercel

```bash
vercel login
```

在浏览器中完成登录验证。

#### 3. 首次部署

在项目根目录运行：

```bash
vercel
```

根据提示操作：
```
? Set up and deploy "~/xiaohongshu-copilot"? [Y/n] Y
? Which scope? [选择你的账号]
? Link to existing project? [N]
? What's your project's name? xiaohongshu-copilot
? In which directory is your code located? ./
```

#### 4. 部署到生产环境

预览没问题后，部署到生产环境：

```bash
vercel --prod
```

#### 5. 查看部署信息

```bash
vercel ls
```

---

## 🔧 配置文件说明

项目已包含 `vercel.json` 配置文件：

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

**配置说明**：
- `rewrites`: SPA 路由支持（虽然本项目是单页面，但添加此配置确保兼容性）
- `headers`: 静态资源缓存优化，提升加载速度

---

## 🌍 自定义域名（可选）

### 在 Vercel 添加自定义域名

1. 在 Vercel 项目设置中，进入 **"Domains"**
2. 点击 **"Add Domain"**
3. 输入你的域名，如 `xiaohongshu.example.com`
4. 按提示配置 DNS 记录：

#### A 记录（推荐）
```
Type: A
Name: xiaohongshu
Value: 76.76.21.21
```

#### CNAME 记录
```
Type: CNAME
Name: xiaohongshu
Value: cname.vercel-dns.com
```

5. 等待 DNS 生效（通常 5-10 分钟）

---

## 🔄 自动部署

### 配置自动部署

Vercel 会自动为你配置 CI/CD：

- ✅ **主分支推送** → 自动部署到生产环境
- ✅ **Pull Request** → 自动创建预览环境
- ✅ **其他分支推送** → 自动创建预览环境

### Git 工作流

```bash
# 开发新功能
git checkout -b feature/new-feature
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature

# 创建 PR → Vercel 自动生成预览链接

# 合并到 main → 自动部署到生产环境
```

---

## 📊 环境变量（如需要）

如果将来需要添加环境变量（如 API 密钥）：

### 通过网站添加

1. 进入项目 **"Settings"** → **"Environment Variables"**
2. 添加变量，如：
   ```
   Name: VITE_API_URL
   Value: https://api.example.com
   ```
3. 选择环境：Production / Preview / Development
4. 保存后重新部署

### 通过 CLI 添加

```bash
vercel env add VITE_API_URL
```

### 在代码中使用

```javascript
const apiUrl = import.meta.env.VITE_API_URL
```

---

## 🐛 常见问题

### 1. 构建失败：找不到依赖

**解决方案**：
```bash
# 删除 node_modules 和 package-lock.json
rm -rf node_modules package-lock.json

# 重新安装
npm install

# 本地测试构建
npm run build

# 再次部署
git add .
git commit -m "fix: update dependencies"
git push
```

### 2. 页面空白

**原因**：通常是路径问题

**解决方案**：
- 检查 `vite.config.js` 中的 `base` 配置
- 确保使用相对路径导入资源

### 3. 部署后功能异常

**调试步骤**：
1. 打开浏览器控制台查看错误
2. 检查 Vercel 的构建日志
3. 本地运行 `npm run preview` 测试生产构建

---

## 📈 性能优化建议

### 1. 启用分析

```bash
vercel --prod --debug
```

### 2. 代码分割（已自动处理）

Vite 自动进行代码分割，无需额外配置。

### 3. 图片优化

如果将来添加图片资源，使用 Vercel 的图片优化：

```javascript
import Image from 'next/image' // 如果迁移到 Next.js
```

### 4. 监控性能

在 Vercel 控制台查看：
- **Analytics**: 访问统计
- **Speed Insights**: 性能指标
- **Real-Time Logs**: 实时日志

---

## 🔒 安全建议

1. **不要提交敏感信息**
   - API 密钥使用环境变量
   - 添加 `.env` 到 `.gitignore`

2. **启用 HTTPS**
   - Vercel 自动提供免费 SSL 证书
   - 强制 HTTPS 重定向（默认启用）

3. **设置 CORS**（如果需要）
   ```javascript
   // vercel.json
   {
     "headers": [
       {
         "source": "/api/(.*)",
         "headers": [
           { "key": "Access-Control-Allow-Origin", "value": "*" }
         ]
       }
     ]
   }
   ```

---

## 📱 其他部署平台

### Netlify

```bash
# 安装 Netlify CLI
npm install -g netlify-cli

# 部署
netlify deploy --prod
```

### GitHub Pages

```bash
# 安装 gh-pages
npm install -D gh-pages

# 添加脚本到 package.json
"deploy": "npm run build && gh-pages -d dist"

# 部署
npm run deploy
```

**注意**：需要在 `vite.config.js` 中设置：
```javascript
export default defineConfig({
  base: '/xiaohongshu-copilot/',
  // ...
})
```

---

## 🎯 总结

推荐使用 **Vercel 方式一**（网站部署），因为：

✅ 最简单快捷
✅ 自动 CI/CD
✅ 免费 SSL 证书
✅ 全球 CDN 加速
✅ 自动预览环境
✅ 无需配置

只需 3 步：
1. 推送代码到 GitHub
2. 在 Vercel 导入项目
3. 点击部署

**预计耗时**: 5 分钟

祝部署顺利！🚀
