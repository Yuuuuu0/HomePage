# 构建应用
FROM node:18 AS builder

WORKDIR /app

# 接收构建参数
ARG VITE_CONTACT_GITHUB
ARG VITE_CONTACT_EMAIL
ARG VITE_CONTACT_TELEGRAM

COPY package*.json ./

RUN npm install

COPY . .

# 创建 .env 文件，优先使用构建参数，如果参数为空则使用模板
RUN if [ -n "$VITE_CONTACT_GITHUB" ] || [ -n "$VITE_CONTACT_EMAIL" ] || [ -n "$VITE_CONTACT_TELEGRAM" ]; then \
      echo "VITE_CONTACT_GITHUB=${VITE_CONTACT_GITHUB}" > .env && \
      echo "VITE_CONTACT_EMAIL=${VITE_CONTACT_EMAIL}" >> .env && \
      echo "VITE_CONTACT_TELEGRAM=${VITE_CONTACT_TELEGRAM}" >> .env; \
    else \
      [ ! -e ".env" ] && cp env.template .env || true; \
    fi

RUN npm run build

# 最小化镜像
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist

RUN npm install -g http-server

EXPOSE 8080

CMD ["http-server", "dist", "-p", "8080"]
