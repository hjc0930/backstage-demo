# Backstage Demo

## 项目概述

这是一个基于 Backstage 构建的开发者门户平台，用于集中管理微服务、文档、API 和基础设施资源。

## 技术栈

| 类别 | 技术 |
|------|------|
| 前端框架 | React 18 + TypeScript |
| 后端运行时 | Node.js 22/24 |
| UI 库 | Material-UI (MUI) v4 |
| 包管理器 | Yarn 4.4.1 (Workspaces) |
| 构建工具 | Backstage CLI |
| 单元测试 | Jest + Testing Library |
| E2E 测试 | Playwright |
| 开发数据库 | SQLite (better-sqlite3) |
| 生产数据库 | PostgreSQL |

## 项目结构

```
backstage-demo/
├── packages/
│   ├── app/                 # 前端 React 应用
│   │   └── src/
│   │       ├── App.tsx      # 主应用配置（路由、插件注册）
│   │       ├── components/  # UI 组件
│   │       │   └── Root/    # 布局和侧边栏
│   │       └── theme/       # 自定义主题
│   └── backend/             # 后端 Node.js 服务
│       └── src/index.ts     # 后端入口和插件注册
├── plugins/                 # 自定义插件目录
├── docs/                    # 项目文档
├── examples/                # 示例数据和模板
├── app-config.yaml          # 开发环境配置
└── app-config.production.yaml  # 生产环境配置
```

## 常用命令

```bash
# 安装依赖
yarn install

# 启动开发服务器（前端 + 后端）
yarn start

# 构建所有包
yarn build:all

# 仅构建后端
yarn build:backend

# 构建 Docker 镜像
yarn build-image

# TypeScript 类型检查
yarn tsc

# 运行单元测试
yarn test

# 运行所有测试（含覆盖率）
yarn test:all

# 运行 E2E 测试
yarn test:e2e

# 代码检查（仅变更文件）
yarn lint

# 代码检查（所有文件）
yarn lint:all

# 检查代码格式
yarn prettier:check

# 自动修复问题
yarn fix

# 创建新插件/组件
yarn new

# 清理构建产物
yarn clean
```

## 端口配置

| 服务 | 端口 |
|------|------|
| 前端 (开发) | 3000 |
| 后端 API | 7007 |

## 配置文件

- `app-config.yaml` - 开发环境配置
- `app-config.production.yaml` - 生产环境配置
- `tsconfig.json` - TypeScript 配置
- `.eslintrc.js` - ESLint 配置
- `playwright.config.ts` - E2E 测试配置

## 自定义功能

### 主题定制

项目包含自定义主题，位于 `packages/app/src/theme/`：
- `my-theme.ts` - 浅色主题
- `my-theme-dark.ts` - 深色主题

主题特点：
- 主色调：#0052CC (蓝色)
- 字体：Roboto
- 自定义侧边栏、按钮、提示框等组件样式

### 侧边栏配置

侧边栏菜单项配置在 `packages/app/src/components/Root/Root.tsx`：
- Home（首页）
- Groups（组织架构）
- APIs（API 文档）
- Docs（技术文档）
- Create（创建模板）
- Notifications（通知）
- User Settings（用户设置）

## 后端插件加载顺序

后端 (`packages/backend/src/index.ts`) 按以下顺序加载插件：

1. App Backend（前端托管）
2. Proxy Backend（API 代理）
3. Scaffolder Backend（模板引擎）
4. TechDocs Backend（文档生成）
5. Auth Backend（认证）
6. Catalog Backend（服务目录）
7. Permission Backend（权限）
8. Search Backend（搜索）
9. Kubernetes Backend
10. Notifications Backend（通知）
11. Signals Backend（信号）

## 代码规范

- 使用 ESLint 和 Prettier 进行代码检查和格式化
- 遵循 Backstage 官方代码风格
- 提交前运行 `yarn lint` 和 `yarn tsc` 确保代码质量
- **React Hooks 导入规范**：使用具名导入而非 `React.xxx` 方式
  ```tsx
  // ✅ 推荐
  import { useState, useEffect } from 'react';

  // ❌ 不推荐
  import React from 'react';
  React.useState(...)
  React.useEffect(...)
  ```

## 注意事项

1. **认证配置**：当前使用 Guest Provider，生产环境需配置 GitHub 或其他认证提供商
2. **权限策略**：当前使用 AllowAllPolicy，生产环境需实现适当的权限策略
3. **数据库**：开发环境使用内存 SQLite，生产环境需配置 PostgreSQL
4. **TechDocs**：需要 Docker 环境来生成文档
5. **Node.js 版本**：要求 Node.js 22 或 24

## 相关文档

- [架构文档（中文）](docs/zh-CN/architecture.md)
- [架构文档（英文）](docs/en/architecture.md)
- [Backstage 官方文档](https://backstage.io/docs)
