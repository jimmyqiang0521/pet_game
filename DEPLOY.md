# 部署指南

## 方案一：GitHub Pages（推荐，完全免费）

### 步骤：

1. **注册 GitHub 账号**
   - 访问 https://github.com
   - 点击 "Sign up" 注册

2. **创建新仓库**
   - 登录后点击右上角 "+" → "New repository"
   - Repository name: `pet-game`（或任意名称）
   - 选择 "Public"
   - 点击 "Create repository"

3. **上传文件**
   
   方式A - 网页上传（最简单）：
   - 点击 "uploading an existing file"
   - 将整个项目的文件拖拽上传
   - 点击 "Commit changes"

   方式B - Git 命令行：
   ```bash
   cd d:\trae\宠物
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/你的用户名/pet-game.git
   git push -u origin main
   ```

4. **启用 GitHub Pages**
   - 进入仓库页面
   - 点击 "Settings" 标签
   - 左侧菜单找到 "Pages"
   - Source 选择 "Deploy from a branch"
   - Branch 选择 "main"，文件夹选择 "/ (root)"
   - 点击 "Save"

5. **访问网站**
   - 等待 1-2 分钟部署完成
   - 访问地址：`https://你的用户名.github.io/pet-game/`

---

## 方案二：Vercel（推荐，速度快）

### 步骤：

1. **注册 Vercel 账号**
   - 访问 https://vercel.com
   - 使用 GitHub 账号登录

2. **导入项目**
   - 点击 "New Project"
   - 选择你的 GitHub 仓库
   - 或者直接拖拽文件夹上传

3. **部署**
   - 点击 "Deploy"
   - 等待部署完成（约 1 分钟）

4. **访问网站**
   - 会自动生成一个域名：`https://pet-game-xxx.vercel.app`

---

## 方案三：Netlify（免费，功能强大）

### 步骤：

1. **注册 Netlify 账号**
   - 访问 https://www.netlify.com
   - 使用 GitHub 登录

2. **部署**
   - 点击 "Add new site" → "Deploy manually"
   - 将整个项目文件夹拖拽到页面
   - 等待上传完成

3. **访问网站**
   - 自动生成域名：`https://xxx.netlify.app`

---

## 方案四：Cloudflare Pages（免费，全球CDN）

### 步骤：

1. **注册 Cloudflare 账号**
   - 访问 https://pages.cloudflare.com

2. **连接 GitHub**
   - 点击 "Create a project"
   - 连接 GitHub 并选择仓库

3. **部署**
   - 构建设置留空（纯静态网站）
   - 点击 "Save and Deploy"

---

## 推荐方案对比

| 平台 | 优点 | 缺点 | 推荐度 |
|------|------|------|--------|
| GitHub Pages | 完全免费，稳定，无需额外账号 | 国内访问较慢 | ⭐⭐⭐⭐⭐ |
| Vercel | 速度快，自动部署，界面美观 | 免费额度有限制 | ⭐⭐⭐⭐⭐ |
| Netlify | 功能强大，支持表单 | 国内访问不稳定 | ⭐⭐⭐⭐ |
| Cloudflare | 全球CDN，速度快 | 配置稍复杂 | ⭐⭐⭐⭐ |

---

## 自定义域名（可选）

如果你有自己的域名，可以在部署平台设置：

1. 在平台设置中添加自定义域名
2. 在域名服务商处添加 DNS 记录
3. 等待 DNS 生效

---

## 常见问题

**Q: 部署后页面空白？**
A: 检查文件路径是否正确，确保使用相对路径

**Q: 如何更新网站？**
A: 
- GitHub: 修改代码后 push 到仓库，自动部署
- Vercel/Netlify: 连接 GitHub 后自动部署
- 手动上传: 重新上传文件

**Q: 如何查看访问统计？**
A: 
- GitHub Pages: 无内置统计
- Vercel/Netlify: 有访问统计功能
- 可集成 Google Analytics

---

## 快速开始

最简单的方式：

1. 创建 GitHub 账号
2. 创建仓库并上传文件
3. 启用 GitHub Pages
4. 分享链接给朋友！

就这么简单！🎉
