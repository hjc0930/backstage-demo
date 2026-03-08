# Publish API 和 API Detail 页面实现计划

## 目标

1. 实现 **Publish API** 页面 - 5步向导式API发布流程
2. 实现 **API Detail** 页面 - 展示API详细信息，包含Try it调试功能
3. 将 Dashboard 的 Recently Updated APIs 数据与 API Detail 页面关联

---

## 页面 1: Publish API

### 功能需求

- 标题: Publish API
- 副标题: Register and publish new APIs to the catalog
- 5步向导:
  1. Service Definition - 定义服务基本信息
  2. API Specification - 配置API规格
  3. Gateway Plugins - 配置网关插件
  4. Portal Settings - 配置门户设置
  5. Review & Deploy - 审核并部署

### UI 布局

```
┌─────────────────────────────────────────────────────────────────┐
│  Header: Publish API                                            │
│  Subtitle: Register and publish new APIs to the catalog         │
├─────────────────────────────────────────────────────────────────┤
│  [Step 1]────[Step 2]────[Step 3]────[Step 4]────[Step 5]      │  ← 步骤条
│  Service    API         Gateway    Portal     Review
│  Definition Specification Plugins   Settings  & Deploy
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │              当前步骤内容区域                                ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  [← Back]                                         [Next →]     │  ← 底部按钮
└─────────────────────────────────────────────────────────────────┘
```

### 步骤详情

**Step 1: Service Definition**
- Service Name (必填)
- Description
- Owner/Team
- Version
- Tags (多选)

**Step 2: API Specification**
- API Type (REST / GraphQL / gRPC)
- Base URL
- OpenAPI Spec URL (可选)
- Authentication Type (None / API Key / OAuth2 / JWT)

**Step 3: Gateway Plugins**
- Rate Limiting (开关)
- Rate Limit (requests/minute)
- Caching (开关)
- Cache TTL (seconds)
- Request Timeout (ms)

**Step 4: Portal Settings**
- Visibility (Public / Internal / Private)
- Documentation URL
- Support Contact
- SLA Level (Gold / Silver / Bronze)

**Step 5: Review & Deploy**
- 显示所有配置的汇总
- 支持返回修改
- 点击 "Publish" 开始发布
- 发布成功后显示成功信息

---

## 页面 2: API Detail

### 功能需求

- 展示API的详细信息
- 包含: 基本信息、端点列表、Gateway配置、认证信息、更新历史、所有者
- 每个API有 "Try it" 按钮，点击打开调试面板
- 调试面板包含: 端点选择、参数输入、发送请求、查看响应

### UI 布局

```
┌─────────────────────────────────────────────────────────────────┐
│  Header: [API Name]                                              │
│  Subtitle: [API Description]                                     │
├─────────────────────────────────────────────────────────────────┤
│  [Overview] [Endpoints] [Gateway] [Auth] [History]              │  ← 标签页
├─────────────────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────┐  ┌────────────┐ │
│  │                                       │  │            │ │
│  │         API Details Content            │  │ Try it    │ │
│  │                                       │  │  Panel    │ │
│  │                                       │  │            │ │
│  └───────────────────────────────────────────┘  └────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### 标签页详情

**Overview**
- 基本信息: 名称、描述、版本、类型、状态
- Owner信息
- 快速链接: 文档、Gateway配置

**Endpoints**
- 端点列表表格
- 每个端点显示: 方法、路径、描述、Try it按钮

**Gateway**
- Rate Limiting配置
- Caching配置
- Timeout配置

**Auth**
- 认证类型
- 认证配置详情

**History**
- 更新历史表格
- 版本变更记录

---

## 数据关联

### Dashboard 集成

- Dashboard 的 `RecentlyUpdatedApis` 组件中的 API 名称可点击
- 点击后跳转到 `/api-detail/:apiId` 路由
- 传递 API ID 作为路由参数

### Mock 数据结构

```typescript
interface ApiDetail {
  id: string;
  name: string;
  description: string;
  version: string;
  type: 'REST' | 'GraphQL' | 'gRPC';
  status: 'Active' | 'Deprecated' | 'Draft';
  owner: {
    name: string;
    email: string;
  };
  baseUrl: string;
  endpoints: ApiEndpoint[];
  gateway: GatewayConfig;
  auth: AuthConfig;
  history: HistoryItem[];
  updatedAt: string;
  createdAt: string;
}

interface ApiEndpoint {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  description: string;
  parameters?: Parameter[];
}

interface GatewayConfig {
  rateLimiting: boolean;
  rateLimit: number;
  caching: boolean;
  cacheTtl: number;
  timeout: number;
}

interface AuthConfig {
  type: 'none' | 'api-key' | 'oauth2' | 'jwt';
  details?: Record<string, string>;
}

interface HistoryItem {
  version: string;
  date: string;
  changes: string;
  author: string;
}
```

---

## 文件结构

```
packages/app/src/views/PublishApi/
├── index.tsx                    # 主页面（步骤控制）
├── PublishStepper.tsx          # 步骤条组件
├── steps/
│   ├── ServiceDefinitionStep.tsx    # 步骤1: 服务定义
│   ├── ApiSpecificationStep.tsx     # 步骤2: API规格
│   ├── GatewayPluginsStep.tsx       # 步骤3: 网关插件
│   ├── PortalSettingsStep.tsx       # 步骤4: 门户设置
│   └── ReviewDeployStep.tsx          # 步骤5: 审核并发布
├── types.ts                     # 类型定义
└── mockData.ts                  # 发布配置 mock 数据

packages/app/src/views/ApiDetail/
├── index.tsx                    # 主页面（标签页 + Try it面板）
├── TryItPanel.tsx               # Try it 调试面板组件
├── tabs/
│   ├── OverviewTab.tsx          # 概览标签
│   ├── EndpointsTab.tsx         # 端点标签
│   ├── GatewayTab.tsx           # 网关配置标签
│   ├── AuthTab.tsx              # 认证配置标签
│   └── HistoryTab.tsx           # 历史标签
├── types.ts                     # 类型定义
└── mockData.ts                  # API 详情 mock 数据
```

---

## 路由配置

在 `App.tsx` 中添加:

```tsx
import { PublishApi } from './views/PublishApi';
import { ApiDetail } from './views/ApiDetail';

// 在 FlatRoutes 中添加:
<Route path="/publish-api" element={<PublishApi />} />
<Route path="/api-detail/:apiId" element={<ApiDetail />} />
```

---

## 实现步骤

### 步骤 1: 创建 Publish API 页面

1. 创建 `views/PublishApi/types.ts` - 发布配置类型
2. 创建 `views/PublishApi/mockData.ts` - 默认配置数据
3. 创建 `views/PublishApi/PublishStepper.tsx` - 步骤条组件
4. 更新 `views/PublishApi/index.tsx` - 主页面框架
5. 创建 5 个步骤组件

### 步骤 2: 创建 API Detail 页面

1. 创建 `views/ApiDetail/types.ts` - API 详情类型
2. 创建 `views/ApiDetail/mockData.ts` - API 详情数据
3. 创建 `views/ApiDetail/TryItPanel.tsx` - 调试面板组件
4. 创建 5 个标签页组件
5. 更新 `views/ApiDetail/index.tsx` - 主页面

### 步骤 3: 数据关联

1. 更新 `views/Dashboard/RecentlyUpdatedApis.tsx` - 修改点击跳转逻辑
2. 确保 mock 数据的 ID 一致

### 步骤 4: 配置路由

1. 在 `App.tsx` 中添加 Publish API 和 Api Detail 路由

### 步骤 5: 验证

- 运行 `yarn tsc` 检查类型
- 运行 `yarn start` 启动服务
- 访问 `/publish-api` 验证发布向导
- 访问 `/api-detail/:apiId` 验证详情页
- 验证 Dashboard 的 API 链接跳转

---

## 文件修改清单

| 文件路径 | 操作 | 说明 |
|---------|------|------|
| `views/PublishApi/types.ts` | 新建 | 发布配置类型 |
| `views/PublishApi/mockData.ts` | 新建 | 默认配置数据 |
| `views/PublishApi/PublishStepper.tsx` | 新建 | 步骤条组件 |
| `views/PublishApi/steps/*.tsx` | 新建 | 5个步骤组件 |
| `views/PublishApi/index.tsx` | 重写 | 主页面 |
| `views/ApiDetail/types.ts` | 新建 | API详情类型 |
| `views/ApiDetail/mockData.ts` | 新建 | API详情数据 |
| `views/ApiDetail/TryItPanel.tsx` | 新建 | 调试面板 |
| `views/ApiDetail/tabs/*.tsx` | 新建 | 5个标签页组件 |
| `views/ApiDetail/index.tsx` | 新建 | 主页面 |
| `views/Dashboard/RecentlyUpdatedApis.tsx` | 修改 | 修改跳转路由 |
| `App.tsx` | 修改 | 添加路由 |

---

## 验证方式

1. 运行 `yarn tsc` 检查类型错误
2. 运行 `yarn start` 启动开发服务器
3. 访问 http://localhost:3000/publish-api 验证:
   - 5步骤向导流程
   - 各步骤表单
   - 发布功能
4. 访问 http://localhost:3000/api-detail/1 验证:
   - 标签页切换
   - Try it 调试面板
   - 各标签页内容
5. 验证 Dashboard 的 Recently Updated APIs 点击跳转
