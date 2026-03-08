#!/bin/bash

# Backstage 部署脚本
# 用法: ./deploy.sh [branch]

set -e

# 配置
BRANCH=${1:-develop}
PROJECT_DIR=$(dirname "$0")
LOG_FILE="$PROJECT_DIR/deploy.log"

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log() {
    echo -e "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1" | tee -a "$LOG_FILE"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a "$LOG_FILE"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1" | tee -a "$LOG_FILE"
}

# 检查命令是否存在
check_command() {
    if ! command -v $1 &> /dev/null; then
        log_error "$1 未安装"
        exit 1
    fi
}

# 主流程
main() {
    log "=========================================="
    log "开始部署 Backstage"
    log "分支: $BRANCH"
    log "目录: $PROJECT_DIR"
    log "=========================================="

    cd "$PROJECT_DIR"

    # 检查依赖
    log "检查依赖..."
    check_command git
    check_command yarn
    check_command docker
    check_command docker-compose

    # 拉取最新代码
    log "拉取最新代码..."
    git fetch origin
    git checkout "$BRANCH"
    git pull origin "$BRANCH"

    # 安装依赖
    log "安装依赖..."
    yarn install --frozen-lockfile

    # 构建后端
    log "构建后端..."
    yarn build:backend

    # 构建 Docker 镜像
    log "构建 Docker 镜像..."
    yarn build-image

    # 保存旧镜像用于回滚
    log "保存旧镜像用于回滚..."
    docker tag backstage:latest backstage:previous 2>/dev/null || true

    # 停止旧容器
    log "停止旧容器..."
    docker-compose down || true

    # 启动新容器
    log "启动新容器..."
    docker-compose up -d

    # 等待服务启动
    log "等待服务启动..."
    sleep 10

    # 健康检查
    log "执行健康检查..."
    for i in {1..30}; do
        if curl -sf http://localhost:7007/healthcheck > /dev/null 2>&1; then
            log_success "健康检查通过!"
            break
        fi
        if [ $i -eq 30 ]; then
            log_error "健康检查失败!"
            log "尝试回滚..."
            docker tag backstage:previous backstage:latest
            docker-compose down
            docker-compose up -d
            exit 1
        fi
        log "尝试 $i/30 - 服务尚未就绪..."
        sleep 2
    done

    # 清理旧镜像
    log "清理旧镜像..."
    docker image prune -f

    # 显示状态
    log "=========================================="
    log_success "部署完成!"
    log "=========================================="
    docker-compose ps
}

# 执行
main "$@"
