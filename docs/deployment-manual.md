# 服务器手动部署指南

## 环境要求

- Ubuntu 20.04+ 或 CentOS 7+
- 1核2G 以上配置
- 端口 7007 开放

---

## 部署步骤

### 1. 安装环境

```bash
# 安装 Docker
curl -fsSL https://get.docker.com | sh
systemctl start docker && systemctl enable docker

# 安装 Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# 安装 Node.js 22
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt-get install -y nodejs

# 安装 Yarn
npm install -g yarn
```

### 2. 下载项目

```bash
cd /opt
git clone https://ghproxy.cc/https://github.com/hjc0930/backstage-demo.git
cd backstage-demo
```

> 如果 git clone 失败，尝试其他镜像：
> - `https://gitclone.com/github.com/hjc0930/backstage-demo.git`
> - `https://hub.fastgit.xyz/hjc0930/backstage-demo.git`

### 3. 配置环境变量

```bash
# 创建 .env 文件（替换为你的服务器IP）
echo "APP_BASE_URL=http://你的服务器IP:7007" > .env

# 创建数据目录
mkdir -p data
```

### 4. 构建并启动

```bash
# 安装依赖
yarn install

# 类型检查
yarn tsc

# 构建前后端
yarn build:all

# 构建 Docker 镜像
yarn build-image

# 启动服务
docker-compose up -d
```

### 5. 验证部署

```bash
# 查看容器状态
docker-compose ps

# 查看日志
docker-compose logs -f

# 健康检查
curl http://localhost:7007/healthcheck
```

### 6. 开放端口

```bash
# Ubuntu
ufw allow 7007

# CentOS
firewall-cmd --add-port=7007/tcp --permanent
firewall-cmd --reload
```

---

## 访问应用

浏览器打开：`http://你的服务器IP:7007`

---

## 更新部署

```bash
cd /opt/backstage-demo

# 拉取最新代码
git pull

# 重新构建
yarn install
yarn tsc
yarn build:all
yarn build-image

# 重启服务
docker-compose down
docker-compose up -d
```

---

## 常用命令

```bash
# 查看日志
docker-compose logs -f

# 重启服务
docker-compose restart

# 停止服务
docker-compose down

# 进入容器
docker exec -it backstage sh

# 清理旧镜像
docker image prune -f
```

---

## 目录结构

```
/opt/backstage-demo/
├── docker-compose.yml    # Docker 编排配置
├── .env                  # 环境变量
├── data/                 # SQLite 数据库（持久化）
│   └── backstage.db
└── examples/             # Catalog 示例数据
```

---

## 数据备份

```bash
# 备份数据库
cp /opt/backstage-demo/data/backstage.db /backup/backstage-$(date +%Y%m%d).db

# 恢复数据库
cp /backup/backstage-20240101.db /opt/backstage-demo/data/backstage.db
docker-compose restart
```

---

## 故障排查

### 构建失败

```bash
# 检查 Node.js 版本
node -v  # 需要 22 或 24

# 清理后重新构建
yarn cache clean
rm -rf node_modules
yarn install
```

### 容器启动失败

```bash
# 查看详细日志
docker-compose logs

# 检查端口占用
netstat -tlnp | grep 7007

# 检查 .env 配置
cat .env
```

### 无法访问

```bash
# 检查容器状态
docker-compose ps

# 检查防火墙
ufw status        # Ubuntu
firewall-cmd --list-all  # CentOS

# 检查服务是否监听
curl http://localhost:7007/healthcheck
```
