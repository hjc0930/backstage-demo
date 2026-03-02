# Backstage 系统架构文档

> 本文档详细描述了 Backstage 开发者门户系统的架构设计

## 目录

1. [系统概览](#1-系统概览)
2. [整体架构图](#2-整体架构图)
3. [前端架构](#3-前端架构)
4. [后端架构](#4-后端架构)
5. [插件系统](#5-插件系统)
6. [数据流架构](#6-数据流架构)
7. [数据库设计](#7-数据库设计)
8. [认证与权限](#8-认证与权限)
9. [部署架构](#9-部署架构)
10. [技术栈详情](#10-技术栈详情)

---

## 1. 系统概览

### 1.1 项目信息

| 项目 | 值 |
|------|-----|
| 项目名称 | Backstage Demo |
| 版本 | 1.47.0 |
| 架构模式 | Monorepo (Yarn Workspaces) |
| 包管理器 | Yarn 4.4.1 |
| Node.js 版本 | 22 或 24 |

### 1.2 核心组件

```
┌─────────────────────────────────────────────────────────────────┐
│                    Backstage 开发者门户                          │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │   前端 App  │  │  后端 API   │  │   数据库    │              │
│  │  (React)    │  │  (Node.js)  │  │ (PostgreSQL)│              │
│  └─────────────┘  └─────────────┘  └─────────────┘              │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    插件系统                              │    │
│  │  Catalog | TechDocs | Scaffolder | Search | Kubernetes  │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. 整体架构图

### 2.1 系统层次架构

```mermaid
graph TB
    subgraph "用户层"
        USER[用户/开发者]
        BROWSER[浏览器]
    end

    subgraph "前端层 - packages/app"
        REACT[React 应用]
        CORE_COMP[核心组件库<br/>@backstage/core-components]
        CORE_API[核心 API<br/>@backstage/core-app-api]
        PLUGIN_API[插件 API<br/>@backstage/core-plugin-api]
        MUI[Material-UI v4]
    end

    subgraph "插件层 - Frontend Plugins"
        CATALOG_FE[Catalog 插件]
        TECHDOCS_FE[TechDocs 插件]
        SCAFFOLDER_FE[Scaffolder 插件]
        SEARCH_FE[Search 插件]
        K8S_FE[Kubernetes 插件]
        NOTIF_FE[Notifications 插件]
        ORG_FE[Org 插件]
        API_DOCS_FE[API Docs 插件]
    end

    subgraph "后端层 - packages/backend"
        NODE[Node.js 服务]
        EXPRESS[HTTP 服务]
        WS[WebSocket/Signals]
    end

    subgraph "插件层 - Backend Plugins"
        CATALOG_BE[Catalog 后端]
        TECHDOCS_BE[TechDocs 后端]
        SCAFFOLDER_BE[Scaffolder 后端]
        SEARCH_BE[Search 后端]
        AUTH_BE[Auth 后端]
        PERM_BE[Permission 后端]
        K8S_BE[Kubernetes 后端]
        NOTIF_BE[Notifications 后端]
        PROXY_BE[Proxy 后端]
    end

    subgraph "数据层"
        PG[(PostgreSQL)]
        SQLITE[(SQLite<br/>开发模式)]
    end

    subgraph "外部集成"
        GITHUB[GitHub API]
        K8S_CLUSTER[Kubernetes 集群]
        DOCS_STORAGE[文档存储]
    end

    USER --> BROWSER
    BROWSER --> REACT
    REACT --> CORE_COMP
    REACT --> CORE_API
    REACT --> PLUGIN_API
    CORE_COMP --> MUI

    REACT --> CATALOG_FE
    REACT --> TECHDOCS_FE
    REACT --> SCAFFOLDER_FE
    REACT --> SEARCH_FE
    REACT --> K8S_FE
    REACT --> NOTIF_FE
    REACT --> ORG_FE
    REACT --> API_DOCS_FE

    CATALOG_FE --> EXPRESS
    TECHDOCS_FE --> EXPRESS
    SCAFFOLDER_FE --> EXPRESS
    SEARCH_FE --> EXPRESS
    K8S_FE --> EXPRESS
    NOTIF_FE --> WS

    EXPRESS --> CATALOG_BE
    EXPRESS --> TECHDOCS_BE
    EXPRESS --> SCAFFOLDER_BE
    EXPRESS --> SEARCH_BE
    EXPRESS --> AUTH_BE
    EXPRESS --> PERM_BE
    EXPRESS --> K8S_BE
    EXPRESS --> NOTIF_BE
    EXPRESS --> PROXY_BE

    CATALOG_BE --> PG
    CATALOG_BE --> SQLITE
    SEARCH_BE --> PG
    AUTH_BE --> PG
    PERM_BE --> PG
    NOTIF_BE --> PG

    CATALOG_BE --> GITHUB
    SCAFFOLDER_BE --> GITHUB
    K8S_BE --> K8S_CLUSTER
    TECHDOCS_BE --> DOCS_STORAGE
```

---

## 3. 前端架构

### 3.1 前端模块架构

```mermaid
graph TB
    subgraph "应用入口"
        APP_TSX[App.tsx<br/>应用配置]
        INDEX_TSX[index.tsx<br/>渲染入口]
        ROOT[Root.tsx<br/>布局组件]
    end

    subgraph "核心框架"
        CREATE_APP[createApp<br/>应用工厂]
        APP_ROUTER[AppRouter<br/>路由容器]
        FLAT_ROUTES[FlatRoutes<br/>路由配置]
    end

    subgraph "API 层"
        APIS[apis.ts<br/>API 配置]
        API_HOLDER[ApiHolder<br/>API 容器]
    end

    subgraph "页面组件"
        CATALOG_PAGE[CatalogIndexPage<br/>目录首页]
        ENTITY_PAGE[CatalogEntityPage<br/>实体详情]
        DOCS_INDEX[TechDocsIndexPage<br/>文档首页]
        DOCS_READER[TechDocsReaderPage<br/>文档阅读]
        SCAFFOLDER_PAGE[ScaffolderPage<br/>模板向导]
        SEARCH_PAGE[SearchPage<br/>搜索页面]
        SETTINGS[UserSettingsPage<br/>用户设置]
        NOTIF_PAGE[NotificationsPage<br/>通知页面]
        CATALOG_GRAPH[CatalogGraphPage<br/>关系图]
        API_EXPLORER[ApiExplorerPage<br/>API 浏览]
    end

    subgraph "通用组件"
        SIGN_IN[SignInPage<br/>登录页面]
        ALERT[AlertDisplay<br/>告警显示]
        OAUTH[OAuthRequestDialog<br/>OAuth 对话框]
        SIGNALS[SignalsDisplay<br/>信号显示]
    end

    subgraph "路由绑定"
        BIND_ROUTES[bindRoutes<br/>插件间路由绑定]
    end

    APP_TSX --> CREATE_APP
    CREATE_APP --> APP_ROUTER
    APP_ROUTER --> FLAT_ROUTES
    CREATE_APP --> APIS
    APIS --> API_HOLDER

    FLAT_ROUTES --> CATALOG_PAGE
    FLAT_ROUTES --> ENTITY_PAGE
    FLAT_ROUTES --> DOCS_INDEX
    FLAT_ROUTES --> DOCS_READER
    FLAT_ROUTES --> SCAFFOLDER_PAGE
    FLAT_ROUTES --> SEARCH_PAGE
    FLAT_ROUTES --> SETTINGS
    FLAT_ROUTES --> NOTIF_PAGE
    FLAT_ROUTES --> CATALOG_GRAPH
    FLAT_ROUTES --> API_EXPLORER

    CREATE_APP --> SIGN_IN
    INDEX_TSX --> ALERT
    INDEX_TSX --> OAUTH
    INDEX_TSX --> SIGNALS

    CREATE_APP --> BIND_ROUTES
```

### 3.2 前端路由结构

```mermaid
graph LR
    subgraph "路由配置"
        ROOT_ROUTE["/"]
        CATALOG_ROUTE["/catalog"]
        CATALOG_ENTITY["/catalog/:namespace/:kind/:name"]
        DOCS_ROUTE["/docs"]
        DOCS_ENTITY["/docs/:namespace/:kind/:name/*"]
        CREATE_ROUTE["/create"]
        API_DOCS_ROUTE["/api-docs"]
        IMPORT_ROUTE["/catalog-import"]
        SEARCH_ROUTE["/search"]
        SETTINGS_ROUTE["/settings"]
        GRAPH_ROUTE["/catalog-graph"]
        NOTIF_ROUTE["/notifications"]
    end

    ROOT_ROUTE -->|"重定向"| CATALOG_ROUTE

    subgraph "页面映射"
        P1[目录列表页]
        P2[实体详情页]
        P3[文档列表页]
        P4[文档阅读页]
        P5[模板创建页]
        P6[API 文档页]
        P7[目录导入页]
        P8[搜索页]
        P9[设置页]
        P10[关系图页]
        P11[通知页]
    end

    CATALOG_ROUTE --> P1
    CATALOG_ENTITY --> P2
    DOCS_ROUTE --> P3
    DOCS_ENTITY --> P4
    CREATE_ROUTE --> P5
    API_DOCS_ROUTE --> P6
    IMPORT_ROUTE --> P7
    SEARCH_ROUTE --> P8
    SETTINGS_ROUTE --> P9
    GRAPH_ROUTE --> P10
    NOTIF_ROUTE --> P11
```

### 3.3 前端插件依赖关系

```mermaid
graph BT
    subgraph "核心依赖"
        CORE_APP_API[core-app-api]
        CORE_COMP[core-components]
        CORE_PLUGIN_API[core-plugin-api]
        APP_DEFAULTS[app-defaults]
        THEME[theme]
        UI[ui]
    end

    subgraph "前端插件"
        CATALOG[catalog]
        CATALOG_REACT[catalog-react]
        CATALOG_GRAPH[catalog-graph]
        CATALOG_IMPORT[catalog-import]
        TECHDOCS[techdocs]
        TECHDOCS_REACT[techdocs-react]
        TECHDOCS_ADDONS[techdocs-module-addons-contrib]
        SCAFFOLDER[scaffolder]
        SEARCH[search]
        SEARCH_REACT[search-react]
        K8S[kubernetes]
        NOTIFICATIONS[notifications]
        SIGNALS[signals]
        ORG[org]
        API_DOCS[api-docs]
        USER_SETTINGS[user-settings]
        PERM_REACT[permission-react]
    end

    subgraph "外部依赖"
        REACT[React 18]
        ROUTER[React Router v6]
        MUI[Material-UI v4]
    end

    CATALOG --> CATALOG_REACT
    CATALOG --> CORE_APP_API
    CATALOG_GRAPH --> CATALOG_REACT
    CATALOG_IMPORT --> CATALOG_REACT

    TECHDOCS --> TECHDOCS_REACT
    TECHDOCS --> CORE_COMP
    TECHDOCS_ADDONS --> TECHDOCS_REACT

    SCAFFOLDER --> CATALOG_REACT
    SCAFFOLDER --> CORE_COMP

    SEARCH --> SEARCH_REACT
    SEARCH --> CORE_COMP

    K8S --> CORE_COMP
    NOTIFICATIONS --> CORE_COMP
    SIGNALS --> CORE_COMP
    ORG --> CATALOG_REACT
    API_DOCS --> CORE_COMP
    USER_SETTINGS --> CORE_COMP

    PERM_REACT --> CORE_PLUGIN_API

    CORE_COMP --> MUI
    CORE_COMP --> REACT
    CORE_APP_API --> ROUTER
    CATALOG_REACT --> CORE_COMP
```

---

## 4. 后端架构

### 4.1 后端服务架构

```mermaid
graph TB
    subgraph "后端入口"
        INDEX_TS[index.ts]
        CREATE_BACKEND[createBackend]
        BACKEND[Backend 实例]
    end

    subgraph "核心插件"
        APP_BE[App Backend<br/>前端托管]
        PROXY_BE[Proxy Backend<br/>API 代理]
    end

    subgraph "认证模块"
        AUTH_BE[Auth Backend]
        GUEST_PROVIDER[Guest Provider<br/>访客认证]
        GITHUB_PROVIDER[GitHub Provider<br/>GitHub 认证]
    end

    subgraph "目录模块"
        CATALOG_BE[Catalog Backend]
        SCAFFOLDER_MODEL[Scaffolder Entity Model]
        CATALOG_LOGS[Catalog Logs Module]
    end

    subgraph "文档模块"
        TECHDOCS_BE[TechDocs Backend]
        DOCS_BUILDER[Local Builder]
        DOCS_GENERATOR[Docker Generator]
        DOCS_PUBLISHER[Local Publisher]
    end

    subgraph "模板模块"
        SCAFFOLDER_BE[Scaffolder Backend]
        GITHUB_MODULE[GitHub Module]
        NOTIF_MODULE[Notifications Module]
    end

    subgraph "搜索模块"
        SEARCH_BE[Search Backend]
        PG_ENGINE[PostgreSQL Engine]
        CATALOG_COLLATOR[Catalog Collator]
        TECHDOCS_COLLATOR[TechDocs Collator]
    end

    subgraph "权限模块"
        PERM_BE[Permission Backend]
        ALLOW_ALL[Allow All Policy]
    end

    subgraph "Kubernetes模块"
        K8S_BE[Kubernetes Backend]
    end

    subgraph "通知模块"
        NOTIF_BE[Notifications Backend]
        SIGNALS_BE[Signals Backend]
    end

    INDEX_TS --> CREATE_BACKEND
    CREATE_BACKEND --> BACKEND

    BACKEND --> APP_BE
    BACKEND --> PROXY_BE
    BACKEND --> AUTH_BE
    AUTH_BE --> GUEST_PROVIDER
    AUTH_BE --> GITHUB_PROVIDER

    BACKEND --> CATALOG_BE
    CATALOG_BE --> SCAFFOLDER_MODEL
    CATALOG_BE --> CATALOG_LOGS

    BACKEND --> TECHDOCS_BE
    TECHDOCS_BE --> DOCS_BUILDER
    DOCS_BUILDER --> DOCS_GENERATOR
    DOCS_BUILDER --> DOCS_PUBLISHER

    BACKEND --> SCAFFOLDER_BE
    SCAFFOLDER_BE --> GITHUB_MODULE
    SCAFFOLDER_BE --> NOTIF_MODULE

    BACKEND --> SEARCH_BE
    SEARCH_BE --> PG_ENGINE
    SEARCH_BE --> CATALOG_COLLATOR
    SEARCH_BE --> TECHDOCS_COLLATOR

    BACKEND --> PERM_BE
    PERM_BE --> ALLOW_ALL

    BACKEND --> K8S_BE

    BACKEND --> NOTIF_BE
    BACKEND --> SIGNALS_BE
```

### 4.2 后端插件加载顺序

```mermaid
sequenceDiagram
    participant Main as index.ts
    participant Backend as Backend Instance
    participant App as App Backend
    participant Auth as Auth Backend
    participant Catalog as Catalog Backend
    participant Scaffolder as Scaffolder Backend
    participant TechDocs as TechDocs Backend
    participant Search as Search Backend
    participant Perm as Permission Backend
    participant K8S as Kubernetes Backend
    participant Notif as Notifications Backend
    participant Signals as Signals Backend
    participant Proxy as Proxy Backend

    Main->>Backend: createBackend()

    rect rgb(200, 220, 240)
        Note over Main,Proxy: 插件注册阶段
    end

    Main->>Backend: add(App Backend)
    Main->>Backend: add(Proxy Backend)
    Main->>Backend: add(Scaffolder Backend + Modules)
    Main->>Backend: add(TechDocs Backend)
    Main->>Backend: add(Auth Backend + Guest Provider)
    Main->>Backend: add(Catalog Backend + Modules)
    Main->>Backend: add(Permission Backend + Policy)
    Main->>Backend: add(Search Backend + Engine + Collators)
    Main->>Backend: add(Kubernetes Backend)
    Main->>Backend: add(Notifications Backend)
    Main->>Backend: add(Signals Backend)

    Main->>Backend: start()

    rect rgb(220, 240, 200)
        Note over Backend: 服务启动阶段
    end

    Backend->>App: 初始化
    Backend->>Auth: 初始化
    Backend->>Catalog: 初始化
    Backend->>Scaffolder: 初始化
    Backend->>TechDocs: 初始化
    Backend->>Search: 初始化
    Backend->>Perm: 初始化
    Backend->>K8S: 初始化
    Backend->>Notif: 初始化
    Backend->>Signals: 初始化

    Backend-->>Main: 服务就绪 (Port 7007)
```

---

## 5. 插件系统

### 5.1 插件分类总览

```mermaid
mindmap
  root((Backstage 插件))
    核心功能插件
      Catalog
        软件目录
        实体管理
        关系图
      TechDocs
        技术文档
        MkDocs 构建
        文档搜索
      Scaffolder
        软件模板
        项目脚手架
        工作流引擎
      Search
        全文搜索
        多源索引
        PostgreSQL 引擎
    集成插件
      Kubernetes
        集群管理
        资源查看
        日志监控
      GitHub
        代码仓库
        PR 管理
        Issue 跟踪
    基础设施插件
      Auth
        身份认证
        Guest Provider
        GitHub OAuth
      Permission
        权限管理
        策略引擎
        访问控制
      Proxy
        API 代理
        CORS 处理
    通信插件
      Notifications
        通知系统
        多渠道推送
      Signals
        实时通信
        WebSocket
```

### 5.2 插件前后端对应关系

```mermaid
graph LR
    subgraph "前端插件"
        FE1[plugin-catalog]
        FE2[plugin-techdocs]
        FE3[plugin-scaffolder]
        FE4[plugin-search]
        FE5[plugin-kubernetes]
        FE6[plugin-notifications]
        FE7[plugin-signals]
        FE8[plugin-org]
        FE9[plugin-api-docs]
        FE10[plugin-catalog-import]
        FE11[plugin-user-settings]
        FE12[plugin-catalog-graph]
        FE13[plugin-permission-react]
    end

    subgraph "后端插件"
        BE1[plugin-catalog-backend]
        BE2[plugin-techdocs-backend]
        BE3[plugin-scaffolder-backend]
        BE4[plugin-search-backend]
        BE5[plugin-kubernetes-backend]
        BE6[plugin-notifications-backend]
        BE7[plugin-signals-backend]
        BE8[plugin-auth-backend]
        BE9[plugin-permission-backend]
        BE10[plugin-proxy-backend]
        BE11[plugin-app-backend]
    end

    FE1 <--> BE1
    FE2 <--> BE2
    FE3 <--> BE3
    FE4 <--> BE4
    FE5 <--> BE5
    FE6 <--> BE6
    FE7 <--> BE7
    FE8 <--> BE1
    FE9 <--> BE1
    FE10 <--> BE1
    FE11 <--> BE8
    FE12 <--> BE1
    FE13 <--> BE9
```

### 5.3 插件间路由绑定

```mermaid
graph TB
    subgraph "路由绑定配置"
        BIND[bindRoutes]
    end

    subgraph "Catalog 插件"
        CATALOG_EXT[catalogPlugin.externalRoutes]
    end

    subgraph "Scaffolder 插件"
        SCAFFOLDER_EXT[scaffolderPlugin.externalRoutes]
        SCAFFOLDER_ROUTES[scaffolderPlugin.routes]
    end

    subgraph "TechDocs 插件"
        TECHDOCS_ROUTES[techdocsPlugin.routes]
    end

    subgraph "API Docs 插件"
        API_DOCS_EXT[apiDocsPlugin.externalRoutes]
    end

    subgraph "Catalog Import 插件"
        IMPORT_ROUTES[catalogImportPlugin.routes]
    end

    subgraph "Org 插件"
        ORG_EXT[orgPlugin.externalRoutes]
    end

    BIND --> CATALOG_EXT
    BIND --> SCAFFOLDER_EXT
    BIND --> API_DOCS_EXT
    BIND --> ORG_EXT

    CATALOG_EXT -->|"createComponent"| SCAFFOLDER_ROUTES
    CATALOG_EXT -->|"viewTechDoc"| TECHDOCS_ROUTES
    CATALOG_EXT -->|"createFromTemplate"| SCAFFOLDER_ROUTES

    API_DOCS_EXT -->|"registerApi"| IMPORT_ROUTES

    SCAFFOLDER_EXT -->|"registerComponent"| IMPORT_ROUTES
    SCAFFOLDER_EXT -->|"viewTechDoc"| TECHDOCS_ROUTES

    ORG_EXT -->|"catalogIndex"| CATALOG_EXT
```

---

## 6. 数据流架构

### 6.1 请求处理流程

```mermaid
sequenceDiagram
    participant User as 用户
    participant Browser as 浏览器
    participant FE as 前端 React
    participant API as API Client
    participant BE as 后端服务
    participant Plugin as 插件处理
    participant DB as 数据库
    participant Ext as 外部服务

    User->>Browser: 访问页面
    Browser->>FE: 加载 React 应用
    FE->>API: 发起 API 请求
    API->>BE: HTTP 请求 (localhost:7007)

    alt 认证检查
        BE->>BE: 验证 Session/Token
    end

    alt 权限检查
        BE->>Plugin: Permission Plugin
        Plugin->>DB: 查询权限策略
        DB-->>Plugin: 返回策略结果
    end

    BE->>Plugin: 路由到对应插件
    Plugin->>DB: 数据操作
    Plugin->>Ext: 外部 API 调用 (可选)
    Ext-->>Plugin: 返回外部数据
    DB-->>Plugin: 返回数据
    Plugin-->>BE: 处理结果
    BE-->>API: HTTP 响应 (JSON)
    API-->>FE: 数据更新
    FE-->>Browser: UI 渲染
    Browser-->>User: 显示结果
```

### 6.2 Catalog 数据流

```mermaid
flowchart TB
    subgraph "数据源"
        LOCAL[本地文件<br/>entities.yaml]
        GITHUB_YAML[GitHub<br/>catalog-info.yaml]
        API_REG[API 注册]
    end

    subgraph "Catalog 后端"
        INGEST[数据摄取]
        PROCESSOR[实体处理器]
        VALIDATOR[模型验证]
        STORE[实体存储]
    end

    subgraph "数据库"
        PG[(PostgreSQL)]
    end

    subgraph "前端展示"
        CATALOG_UI[Catalog UI]
        ENTITY_CARD[实体卡片]
        RELATION_GRAPH[关系图]
    end

    LOCAL --> INGEST
    GITHUB_YAML --> INGEST
    API_REG --> INGEST

    INGEST --> PROCESSOR
    PROCESSOR --> VALIDATOR
    VALIDATOR --> STORE
    STORE --> PG

    PG --> CATALOG_UI
    PG --> ENTITY_CARD
    PG --> RELATION_GRAPH
```

### 6.3 Scaffolder 工作流

```mermaid
flowchart TB
    subgraph "模板选择"
        TEMPLATE_LIST[模板列表]
        TEMPLATE_SELECT[选择模板]
        TEMPLATE_INPUT[输入参数]
    end

    subgraph "Scaffolder 后端"
        DRY_RUN[干运行验证]
        WORKFLOW[工作流引擎]
        TASKS[任务执行器]
    end

    subgraph "GitHub 集成"
        GITHUB_API[GitHub API]
        REPO_CREATE[创建仓库]
        PR_CREATE[创建 PR]
    end

    subgraph "通知"
        NOTIF[Notifications]
    end

    TEMPLATE_LIST --> TEMPLATE_SELECT
    TEMPLATE_SELECT --> TEMPLATE_INPUT
    TEMPLATE_INPUT --> DRY_RUN
    DRY_RUN --> WORKFLOW
    WORKFLOW --> TASKS

    TASKS --> GITHUB_API
    GITHUB_API --> REPO_CREATE
    REPO_CREATE --> PR_CREATE

    TASKS --> NOTIF
    PR_CREATE --> NOTIF
```

### 6.4 TechDocs 生成流程

```mermaid
flowchart LR
    subgraph "文档源"
        MKDOCS[mkdocs.yml<br/>docs/*.md]
    end

    subgraph "TechDocs 后端"
        BUILDER[Local Builder]
        GENERATOR[Docker Generator]
        PUBLISHER[Local Publisher]
    end

    subgraph "存储"
        CACHE[文档缓存]
    end

    subgraph "前端"
        READER[Reader Page]
        SEARCH_IDX[搜索索引]
    end

    MKDOCS --> BUILDER
    BUILDER --> GENERATOR
    GENERATOR -->|生成 HTML| PUBLISHER
    PUBLISHER --> CACHE
    CACHE --> READER

    PUBLISHER --> SEARCH_IDX
```

---

## 7. 数据库设计

### 7.1 数据库架构

```mermaid
erDiagram
    BACKSTAGE_DB {
        string host PK "localhost"
        int port "5432"
        string database "backstage_db"
    }

    CATALOG {
        string id PK
        string entity_ref
        jsonb data
        timestamp created_at
        timestamp updated_at
    }

    SEARCH {
        string id PK
        string type
        string document
        jsonb text
        timestamp indexed_at
    }

    NOTIFICATIONS {
        string id PK
        string user
        string message
        boolean read
        timestamp created_at
    }

    PERMISSION {
        string id PK
        string policy
        jsonb rules
    }

    AUTH {
        string id PK
        string provider
        string user_ref
        jsonb tokens
    }

    BACKSTAGE_DB ||--o{ CATALOG : "stores"
    BACKSTAGE_DB ||--o{ SEARCH : "indexes"
    BACKSTAGE_DB ||--o{ NOTIFICATIONS : "manages"
    BACKSTAGE_DB ||--o{ PERMISSION : "enforces"
    BACKSTAGE_DB ||--o{ AUTH : "handles"
```

### 7.2 数据库配置

| 环境 | 客户端 | 连接方式 | Schema 模式 |
|------|--------|----------|-------------|
| 开发 | better-sqlite3 | :memory: | 单文件 |
| 生产 | pg (PostgreSQL) | localhost:5432 | pluginDivisionMode: schema |

```yaml
# 数据库配置 (app-config.yaml)
backend:
  database:
    client: pg
    pluginDivisionMode: schema  # 每个插件使用独立 schema
    connection:
      host: localhost
      port: 5432
      user: postgres
      password: '123456'
      database: backstage_db
```

---

## 8. 认证与权限

### 8.1 认证流程

```mermaid
sequenceDiagram
    participant User as 用户
    participant FE as 前端
    participant Auth as Auth Backend
    participant Provider as Auth Provider
    participant DB as 数据库

    alt Guest 认证 (开发模式)
        User->>FE: 访问应用
        FE->>Auth: 请求认证
        Auth->>Provider: Guest Provider
        Provider-->>Auth: 生成 Guest Token
        Auth-->>FE: 返回 Token
        FE-->>User: 自动登录成功
    else GitHub 认证
        User->>FE: 点击 GitHub 登录
        FE->>Auth: 发起 OAuth 流程
        Auth->>Provider: 重定向到 GitHub
        Provider->>User: GitHub 授权页面
        User->>Provider: 授权
        Provider->>Auth: 回调带 code
        Auth->>Provider: 交换 token
        Provider-->>Auth: 返回 access token
        Auth->>DB: 存储用户信息
        Auth-->>FE: 返回 Session
        FE-->>User: 登录成功
    end
```

### 8.2 权限系统架构

```mermaid
flowchart TB
    subgraph "前端"
        PERM_REACT[permission-react]
        REQUIRE_PERM[RequirePermission 组件]
    end

    subgraph "后端"
        PERM_BE[Permission Backend]
        POLICY[Permission Policy]
        RULES[Permission Rules]
    end

    subgraph "数据库"
        PERM_DB[(Permission Store)]
    end

    subgraph "决策流程"
        REQUEST[权限请求]
        EVALUATE[策略评估]
        RESULT[决策结果]
    end

    PERM_REACT --> REQUIRE_PERM
    REQUIRE_PERM --> PERM_BE

    PERM_BE --> REQUEST
    REQUEST --> POLICY
    POLICY --> RULES
    RULES --> EVALUATE
    EVALUATE --> PERM_DB
    PERM_DB --> RESULT
    RESULT --> PERM_BE
```

### 8.3 当前权限配置

```yaml
# app-config.yaml
permission:
  enabled: true  # 权限系统已启用
```

当前使用的策略: `AllowAllPolicy` (允许所有操作，适用于开发环境)

---

## 9. 部署架构

### 9.1 开发环境部署

```mermaid
graph TB
    subgraph "开发机器"
        subgraph "Yarn Workspaces"
            APP[packages/app<br/>Port: 3000]
            BACKEND[packages/backend<br/>Port: 7007]
        end

        subgraph "本地服务"
            POSTGRES[(PostgreSQL<br/>Port: 5432)]
        end
    end

    subgraph "外部服务"
        GITHUB[GitHub API]
        DOCKER[Docker<br/>TechDocs Generator]
    end

    APP -->|"API 请求"| BACKEND
    BACKEND -->|"数据存储"| POSTGRES
    BACKEND -->|"仓库集成"| GITHUB
    BACKEND -->|"文档生成"| DOCKER
```

### 9.2 生产环境部署

```mermaid
graph TB
    subgraph "负载均衡层"
        LB[Load Balancer]
    end

    subgraph "应用层"
        subgraph "前端容器"
            APP1[Backstage App 1]
            APP2[Backstage App 2]
        end

        subgraph "后端容器"
            BE1[Backend 1]
            BE2[Backend 2]
        end
    end

    subgraph "数据层"
        subgraph "数据库集群"
            PG_MASTER[(PostgreSQL<br/>Master)]
            PG_SLAVE[(PostgreSQL<br/>Slave)]
        end

        subgraph "存储"
            S3[S3/GCS<br/>TechDocs Storage]
        end
    end

    subgraph "外部集成"
        GITHUB[GitHub Enterprise]
        K8S[Kubernetes Clusters]
        IDP[Identity Provider<br/>OAuth/OIDC]
    end

    LB --> APP1
    LB --> APP2
    APP1 --> BE1
    APP2 --> BE2

    BE1 --> PG_MASTER
    BE2 --> PG_MASTER
    PG_MASTER --> PG_SLAVE

    BE1 --> S3
    BE2 --> S3

    BE1 --> GITHUB
    BE1 --> K8S
    BE1 --> IDP
```

### 9.3 Docker 部署

```dockerfile
# 简化的 Dockerfile 结构
FROM node:22 AS builder
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build:backend

FROM node:22-slim
WORKDIR /app
COPY --from=builder /app/packages/backend/dist ./dist
COPY --from=builder /app/packages/backend/node_modules ./node_modules
EXPOSE 7007
CMD ["node", "dist/index.cjs.js"]
```

---

## 10. 技术栈详情

### 10.1 前端技术栈

| 类别 | 技术 | 版本 | 用途 |
|------|------|------|------|
| 框架 | React | ^18.0.2 | UI 框架 |
| 路由 | React Router | ^6.3.0 | 路由管理 |
| UI 库 | Material-UI | ^4.12.2 | 组件库 |
| 语言 | TypeScript | ~5.8.0 | 类型安全 |
| 构建工具 | Backstage CLI | ^0.35.2 | 打包构建 |
| 测试 | Jest | ^30.2.0 | 单元测试 |
| E2E 测试 | Playwright | ^1.32.3 | 端到端测试 |

### 10.2 后端技术栈

| 类别 | 技术 | 版本 | 用途 |
|------|------|------|------|
| 运行时 | Node.js | 22/24 | JavaScript 运行环境 |
| 框架 | Express | (via backend-defaults) | HTTP 服务 |
| 语言 | TypeScript | ~5.8.0 | 类型安全 |
| 数据库 | PostgreSQL | - | 主数据库 |
| 数据库客户端 | pg | ^8.11.3 | PostgreSQL 客户端 |
| SQLite | better-sqlite3 | ^12.0.0 | 开发数据库 |

### 10.3 Backstage 核心包版本

| 包名 | 版本 | 角色 |
|------|------|------|
| @backstage/app-defaults | ^1.7.4 | 前端 |
| @backstage/core-app-api | ^1.19.3 | 前端 |
| @backstage/core-components | ^0.18.5 | 前端 |
| @backstage/core-plugin-api | ^1.12.1 | 前端 |
| @backstage/backend-defaults | ^0.15.0 | 后端 |
| @backstage/cli | ^0.35.2 | 工具 |
| @backstage/catalog-model | ^1.7.6 | 共享 |

### 10.4 项目目录结构

```
backstage-demo/
├── app-config.yaml              # 开发环境配置
├── app-config.production.yaml   # 生产环境配置
├── backstage.json               # Backstage 版本信息
├── catalog-info.yaml            # 项目 Catalog 定义
├── package.json                 # 根 package.json
├── tsconfig.json                # TypeScript 配置
├── playwright.config.ts         # E2E 测试配置
│
├── packages/
│   ├── app/                     # 前端应用
│   │   ├── src/
│   │   │   ├── App.tsx          # 应用入口
│   │   │   ├── apis.ts          # API 配置
│   │   │   ├── index.tsx        # 渲染入口
│   │   │   └── components/      # UI 组件
│   │   │       ├── Root.tsx     # 根布局
│   │   │       ├── catalog/     # Catalog 组件
│   │   │       └── search/      # Search 组件
│   │   └── package.json
│   │
│   └── backend/                 # 后端服务
│       ├── src/
│       │   └── index.ts         # 后端入口
│       ├── Dockerfile           # Docker 构建文件
│       └── package.json
│
├── plugins/                     # 自定义插件目录
│
├── examples/                    # 示例数据
│   ├── entities.yaml            # 示例实体
│   ├── org.yaml                 # 组织结构
│   └── template/                # 软件模板
│       └── template.yaml
│
└── docs/                        # 文档目录
    └── architecture.md          # 本文档
```

---

## 附录

### A. 常用命令

| 命令 | 描述 |
|------|------|
| `yarn start` | 启动开发服务器 |
| `yarn build:all` | 构建所有包 |
| `yarn build:backend` | 仅构建后端 |
| `yarn build-image` | 构建 Docker 镜像 |
| `yarn test` | 运行单元测试 |
| `yarn test:e2e` | 运行 E2E 测试 |
| `yarn lint` | 代码检查 |
| `yarn tsc` | TypeScript 类型检查 |
| `yarn new` | 创建新插件/组件 |

### B. 端口配置

| 服务 | 端口 | 说明 |
|------|------|------|
| 前端 | 3000 | React 开发服务器 |
| 后端 | 7007 | Node.js API 服务 |
| PostgreSQL | 5432 | 数据库服务 |

### C. 环境变量

| 变量 | 必需 | 说明 |
|------|------|------|
| `GITHUB_TOKEN` | 是 | GitHub 集成令牌 |
| `BACKEND_SECRET` | 生产 | 后端认证密钥 |

---

*文档生成时间: 2026-03-02*
*Backstage 版本: 1.47.0*
