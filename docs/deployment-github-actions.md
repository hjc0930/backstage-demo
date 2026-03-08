# GitHub Actions 自动部署配置指南

## 工作流说明

| 文件 | 说明 | 适用场景 |
|------|------|---------|
| `deploy-server-build.yml` | 服务器端构建 | **推荐** - 服务器直接拉取代码构建，无需镜像仓库 |
| `deploy.yml` | 腾讯云 TCR | 使用腾讯云容器镜像服务 |
| `deploy-dockerhub.yml` | Docker Hub | 使用 Docker Hub 镜像仓库 |

---

## 方案一：服务器端构建（推荐）

**原理**：GitHub Actions 通过 SSH 连接服务器，执行 `git pull` + `yarn build` + `docker-compose up`

### 优点
- 无需镜像仓库
- 配置简单
- 部署速度快

### 需要配置的 GitHub Secrets

| Secret | 必填 | 说明 | 示例 |
|--------|------|------|------|
| `SERVER_HOST` | 是 | 服务器公网 IP | `1.2.3.4` |
| `SERVER_USER` | 是 | SSH 用户名 | `root` 或 `ubuntu` |
| `SERVER_SSH_KEY` | 是 | SSH 私钥 | 见下方说明 |
| `APP_BASE_URL` | 是 | 应用访问地址 | `http://1.2.3.4:7007` |
| `SERVER_PORT` | 否 | SSH 端口 | `22`（默认） |
| `PROJECT_PATH` | 否 | 项目路径 | `/opt/backstage-demo`（默认） |

### 服务器初始化

首次部署前，在服务器上执行：

```bash
# 1. 安装 Docker
curl -fsSL https://get.docker.com | sh
systemctl start docker
systemctl enable docker

# 2. 安装 Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# 3. 安装 Node.js 22
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt-get install -y nodejs

# 4. 安装 Yarn
npm install -g yarn

# 5. Clone 项目
cd /opt
git clone https://github.com/你的用户名/backstage-demo.git
cd backstage-demo

# 6. 创建环境变量文件
cat > .env << 'EOF'
APP_BASE_URL=http://你的服务器IP:7007
EOF

# 7. 创建数据目录
mkdir -p data
```

### 配置 SSH 密钥

**1. 生成密钥对**

```bash
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github_actions_key
```

**2. 将公钥添加到服务器**

```bash
ssh-copy-id -i ~/.ssh/github_actions_key.pub user@your-server-ip
```

或者手动添加：

```bash
cat ~/.ssh/github_actions_key.pub >> ~/.ssh/authorized_keys
```

**3. 将私钥添加到 GitHub Secrets**

复制私钥内容（包含 BEGIN 和 END 行）：

```bash
cat ~/.ssh/github_actions_key
```

在 GitHub 仓库中：`Settings` → `Secrets and variables` → `Actions` → `New repository secret`

- Name: `SERVER_SSH_KEY`
- Value: 粘贴私钥内容

### 部署流程

```
Push to main → SSH 连接服务器 → git pull → yarn build → docker-compose up → 健康检查
```

---

## 方案二：使用镜像仓库

如果需要使用镜像仓库，请参考 `deploy.yml`（腾讯云 TCR）或 `deploy-dockerhub.yml`（Docker Hub）。

### 额外需要的 Secrets

**腾讯云 TCR：**
| Secret | 说明 |
|--------|------|
| `TCR_NAMESPACE` | TCR 命名空间 |
| `TCR_USERNAME` | TCR 用户名 |
| `TCR_PASSWORD` | TCR 密码 |

**Docker Hub：**
| Secret | 说明 |
|--------|------|
| `DOCKER_USERNAME` | Docker Hub 用户名 |
| `DOCKER_PASSWORD` | Docker Hub 密码 |

---

## 手动触发部署

在 GitHub 仓库页面：`Actions` → 选择工作流 → `Run workflow`

---

## 查看日志

```bash
# SSH 登录服务器
ssh user@server-ip

# 查看容器日志
cd /opt/backstage-demo
docker-compose logs -f
```

---

## 故障排查

### SSH 连接失败
- 检查 `SERVER_HOST`、`SERVER_USER`、`SERVER_SSH_KEY` 是否正确
- 确认服务器 SSH 端口开放

### 构建失败
- SSH 登录服务器手动执行构建命令排查
- 检查 Node.js 版本是否为 22 或 24

### 容器启动失败
- 检查 `.env` 文件中的 `APP_BASE_URL` 是否正确
- 检查端口 7007 是否开放
