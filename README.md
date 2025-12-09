# HomePage

一个简单的个人主页项目。

## 预览

🌐 **在线预览**: [https://www.1024.do/](https://www.1024.do/)

![预览截图](./screenshots/main.png)

## 技术栈

- Vue 3 + Composition API
- TypeScript
- Vite
- 纯 CSS 动画（无 UI 框架）

## 功能特性

- 🖼️ **壁纸系统**：支持三种壁纸源（每日一图、随机风景、随机动漫），可在设置中选择并缓存偏好
- ⏰ **时间日期**：实时显示当前日期和时间（格式：2025 年 12 月 09 日 星期二 10:35:18），点击可打开设置
- 💬 **一言模块**：显示随机名言，点击可刷新获取新内容
- 🏷️ **网站名称**：大字体显示在页面中央
- 🔗 **快速入口**：从配置文件加载常用链接，支持毛玻璃效果
- 📧 **联系方式**：从环境变量加载联系方式（GitHub、Email、Telegram），使用图标展示
- ⚙️ **设置面板**：点击时间区域打开设置，可切换壁纸类型

## 快速开始

### 🐳 Docker 部署（推荐）

#### 方式一：使用 Docker Compose（推荐）

1. **配置应用信息**

   编辑 `src/config/app.json`：

   ```json
   {
     "title": "你的主页标题",
     "siteName": "Your HomePage",
     "repository": "https://github.com/your-username/your-repo"
   }
   ```

2. **配置环境变量**

   复制 `env.template` 为 `.env` 并填写你的联系方式：

   ```bash
   cp env.template .env
   ```

   编辑 `.env` 文件：

   ```
   VITE_CONTACT_GITHUB=https://github.com/your-username
   VITE_CONTACT_EMAIL=your-email@example.com
   VITE_CONTACT_TELEGRAM=https://t.me/your-username
   ```

3. **配置快速入口**

   编辑 `src/config/quick-links.json`：

   ```json
   [
     { "label": "Google", "url": "https://google.com" },
     { "label": "GitHub", "url": "https://github.com" }
   ]
   ```

4. **构建并启动**

   ```bash
   docker-compose up -d --build
   ```

   访问 http://localhost:8080 即可查看你的主页。

#### 方式二：使用 Docker 命令

1. **构建镜像**

   ```bash
   docker build -t homepage .
   ```

2. **运行容器**

   ```bash
   docker run -d -p 8080:8080 --name homepage homepage
   ```

   访问 http://localhost:8080 即可查看你的主页。

#### Docker 部署说明

- 默认端口：`8080`，可通过修改 `docker-compose.yml` 中的端口映射来更改
- 容器会自动重启（`restart: unless-stopped`）

### 💻 本地开发

#### 安装依赖

```bash
npm install
```

#### 配置应用信息

编辑 `src/config/app.json`：

```json
{
  "title": "你的主页标题",
  "siteName": "Your HomePage",
  "repository": "https://github.com/your-username/your-repo"
}
```

#### 配置环境变量

复制 `env.template` 为 `.env` 并填写你的联系方式：

```bash
cp env.template .env
```

编辑 `.env` 文件：

```
VITE_CONTACT_GITHUB=https://github.com/your-username
VITE_CONTACT_EMAIL=your-email@example.com
VITE_CONTACT_TELEGRAM=https://t.me/your-username
```

#### 配置快速入口

编辑 `src/config/quick-links.json`：

```json
[
  { "label": "Google", "url": "https://google.com" },
  { "label": "GitHub", "url": "https://github.com" }
]
```

#### 开发

```bash
npm run dev
```

#### 构建

```bash
npm run build
```

## 配置说明

### 应用配置 (`src/config/app.json`)

- `title`: 浏览器标签页标题
- `siteName`: 页面中央显示的网站名称
- `repository`: 项目仓库地址（用于版权信息显示）

### 快速入口配置 (`src/config/quick-links.json`)

所有快速入口链接都在此文件中配置，格式如下：

```json
[
  { "label": "显示文本", "url": "链接地址" }
]
```

### 联系方式配置 (`.env`)

联系方式通过环境变量配置：

- `VITE_CONTACT_GITHUB`: GitHub 链接（可选）
- `VITE_CONTACT_EMAIL`: 邮箱地址（可选）
- `VITE_CONTACT_TELEGRAM`: Telegram 链接（可选）

未配置的联系方式将不会显示。