# GitHub Actions 自动部署配置指南

## 概述

本项目支持通过 GitHub Actions 自动部署到腾讯云服务器。当代码合并到 `main` 分支时，会自动触发部署流程。

## 工作流文件

| 文件 | 说明 |
|------|------|
| `.github/workflows/deploy.yml` | 使用腾讯云容器镜像服务 (TCR) |
| `.github/workflows/deploy-dockerhub.yml` | 使用 Docker Hub（免费） |

## 配置步骤

### 1. 配置 GitHub Secrets

在 GitHub 仓库中，进入 `Settings` → `Secrets and variables` → `Actions`，添加以下 Secrets：

#### 必需的 Secrets

| Secret 名称 | 说明 |
|-------------|------|
| `TENCENT_CLOUD_HOST` | 腾讯云服务器公网 IP |
| `TENCENT_CLOUD_USER` | SSH 登录用户名（如 `root` 或 `ubuntu`） |
| `TENCENT_CLOUD_SSH_KEY` | SSH 私钥（用于免密登录） |
| `APP_BASE_URL` | 应用访问地址（如 `http://1.2.3.4:7007`） |

#### 镜像仓库 Secrets（二选一）

**使用腾讯云 TCR：**
| Secret 名称 | 说明 |
|-------------|------|
| `TCR_NAMESPACE` | TCR 命名空间 |
| `TCR_USERNAME` | TCR 用户名 |
| `TCR_PASSWORD` | TCR 密码 |

**使用 Docker Hub：**
| Secret 名称 | 说明 |
|-------------|------|
| `DOCKER_USERNAME` | Docker Hub 用户名 |
| `DOCKER_PASSWORD` | Docker Hub 密码或 Access Token |

### 2. 配置 SSH 密钥

在本地生成 SSH 密钥（如果没有）：

```bash
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github_actions_key
```

将公钥添加到腾讯云服务器：

```bash
# 方式1：使用 ssh-copy-id
ssh-copy-id -i ~/.ssh/github_actions_key.pub user@your-server-ip

# 方式2：手动添加
cat ~/.ssh/github_actions_key.pub | ssh user@your-server-ip "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

将私钥内容添加到 GitHub Secret `TENCENT_CLOUD_SSH_KEY`：

```bash
# 复制私钥内容（包含 -----BEGIN 和 -----END 行）
cat ~/.ssh/github_actions_key
```

### 3. 服务器初始化

首次部署前，在腾讯云服务器上执行：

```bash
# 安装 Docker
curl -fsSL https://get.docker.com | sh
systemctl enable docker
systemctl start docker

# 安装 Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# 创建项目目录
mkdir -p /opt/backstage-demo/data
cd /opt/backstage-demo

# 创建 docker-compose.yml
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  backstage:
    image: YOUR_USERNAME/backstage:latest
    container_name: backstage
    ports:
      - "7007:7007"
    volumes:
      - ./data:/app/data
      - ./examples:/app/examples
    environment:
      - APP_BASE_URL=http://YOUR_SERVER_IP:7007
    restart: unless-stopped
EOF

# 如果使用腾讯云 TCR，先登录
docker login --username=YOUR_TCR_USERNAME --password=YOUR_TCR_PASSWORD ccr.ccs.tencentyun.com
```

### 4. 配置防火墙

```bash
# Ubuntu
sudo ufw allow 7007

# CentOS
sudo firewall-cmd --add-port=7007/tcp --permanent
sudo firewall-cmd --reload
```

### 5. 选择工作流

- **使用腾讯云 TCR**：删除或禁用 `deploy-dockerhub.yml`，使用 `deploy.yml`
- **使用 Docker Hub**：删除或禁用 `deploy.yml`，使用 `deploy-dockerhub.yml`

## 部署流程

```
Push to main → 构建 → 推送镜像 → SSH 部署 → 健康检查
```

1. **构建阶段**：安装依赖、构建后端、打包 Docker 镜像
2. **推送阶段**：推送镜像到镜像仓库
3. **部署阶段**：SSH 连接服务器，拉取新镜像，重启容器
4. **健康检查**：验证服务是否正常运行

## 手动触发部署

在 GitHub 仓库页面，进入 `Actions` → 选择工作流 → `Run workflow`

## 查看部署日志

```bash
# 在服务器上查看
cd /opt/backstage-demo
docker-compose logs -f
```

## 故障排查

### 部署失败

1. 检查 GitHub Actions 日志
2. 检查服务器 Docker 状态：`systemctl status docker`
3. 检查容器日志：`docker-compose logs`

### SSH 连接失败

1. 确认服务器 IP 正确
2. 确认 SSH 端口（默认 22）开放
3. 确认 SSH 密钥配置正确

### 镜像拉取失败

1. 确认镜像仓库凭据正确
2. 确认服务器已登录镜像仓库

## 可选：配置 HTTPS

使用 Nginx + Let's Encrypt：

```nginx
server {
    listen 80;
    server_name backstage.yourdomain.com;

    location / {
        proxy_pass http://localhost:7007;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

使用 Certbot 获取证书：

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d backstage.yourdomain.com
```
