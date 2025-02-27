# 使用 Node 官方镜像作为基础镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /server-page

# 首先只复制包管理文件以利用 Docker 缓存层
COPY package*.json ./

# 安装依赖
RUN yarn install

# 复制所有源代码
COPY . .

# 构建应用
RUN yarn build

# 暴露端口（根据你的应用实际端口修改）
EXPOSE 3100

# 使用生产环境启动命令
CMD ["yarn", "start:prod"]