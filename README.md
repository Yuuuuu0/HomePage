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

## 快速开始

### 配置说明

在开始之前，需要先完成以下配置（Docker 部署和本地开发都需要）：

1. **配置应用信息**

   复制模板文件并编辑：

   ```bash
   cp src/config/app.json.template src/config/app.json
   ```

   编辑 `src/config/app.json`：

   ```json
   {
     "title": "你的主页标题",
     "siteName": "Your HomePage"
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

   复制模板文件并编辑：

   ```bash
   cp src/config/quick-links.json.template src/config/quick-links.json
   ```

   编辑 `src/config/quick-links.json`：

   ```json
   [
     { "label": "Google", "url": "https://google.com" },
     { "label": "GitHub", "url": "https://github.com" }
   ]
   ```

> **注意**：`src/config/app.json` 和 `src/config/quick-links.json` 已被 `.gitignore` 忽略，不会提交到仓库。每次部署时，需要从模板文件复制并配置。

### 🐳 Docker 部署（推荐）

#### 方式一：使用 Docker Compose（推荐）

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

首次部署时，从模板文件复制：

```bash
cp src/config/app.json.template src/config/app.json
```

配置项说明：

- `title`: 浏览器标签页标题
- `siteName`: 页面中央显示的网站名称

### 快速入口配置 (`src/config/quick-links.json`)

首次部署时，从模板文件复制：

```bash
cp src/config/quick-links.json.template src/config/quick-links.json
```

所有快速入口链接都在此文件中配置，格式如下：

```json
[
  { "label": "显示文本", "url": "链接地址" }
]
```

> **提示**：这两个配置文件已被 `.gitignore` 忽略，不会提交到仓库。每次在新环境部署时，都需要从对应的 `.template` 文件复制并配置。

### 联系方式配置 (`.env`)

联系方式通过环境变量配置：

- `VITE_CONTACT_GITHUB`: GitHub 链接（可选）
- `VITE_CONTACT_EMAIL`: 邮箱地址（可选）
- `VITE_CONTACT_TELEGRAM`: Telegram 链接（可选）

未配置的联系方式将不会显示。
