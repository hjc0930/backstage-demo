# Backstage System Architecture Documentation

> This document provides a detailed description of the Backstage Developer Portal system architecture

## Table of Contents

1. [System Overview](#1-system-overview)
2. [Overall Architecture](#2-overall-architecture)
3. [Frontend Architecture](#3-frontend-architecture)
4. [Backend Architecture](#4-backend-architecture)
5. [Plugin System](#5-plugin-system)
6. [Data Flow Architecture](#6-data-flow-architecture)
7. [Database Design](#7-database-design)
8. [Authentication & Permissions](#8-authentication--permissions)
9. [Deployment Architecture](#9-deployment-architecture)
10. [Technology Stack Details](#10-technology-stack-details)

---

## 1. System Overview

### 1.1 Project Information

| Item                 | Value                      |
| -------------------- | -------------------------- |
| Project Name         | Backstage Demo             |
| Version              | 1.47.0                     |
| Architecture Pattern | Monorepo (Yarn Workspaces) |
| Package Manager      | Yarn 4.4.1                 |
| Node.js Version      | 22 or 24                   |

### 1.2 Core Components

```
┌─────────────────────────────────────────────────────────────────┐
│                  Backstage Developer Portal                     │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │  Frontend   │  │  Backend    │  │  Database   │              │
│  │  (React)    │  │  (Node.js)  │  │ (PostgreSQL)│              │
│  └─────────────┘  └─────────────┘  └─────────────┘              │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    Plugin System                         │    │
│  │  Catalog | TechDocs | Scaffolder | Search | Kubernetes  │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Overall Architecture

### 2.1 System Layer Architecture

```mermaid
graph TB
    subgraph "User Layer"
        USER[User/Developer]
        BROWSER[Browser]
    end

    subgraph "Frontend Layer - packages/app"
        REACT[React Application]
        CORE_COMP[Core Components<br/>@backstage/core-components]
        CORE_API[Core API<br/>@backstage/core-app-api]
        PLUGIN_API[Plugin API<br/>@backstage/core-plugin-api]
        MUI[Material-UI v4]
    end

    subgraph "Plugin Layer - Frontend Plugins"
        CATALOG_FE[Catalog Plugin]
        TECHDOCS_FE[TechDocs Plugin]
        SCAFFOLDER_FE[Scaffolder Plugin]
        SEARCH_FE[Search Plugin]
        K8S_FE[Kubernetes Plugin]
        NOTIF_FE[Notifications Plugin]
        ORG_FE[Org Plugin]
        API_DOCS_FE[API Docs Plugin]
    end

    subgraph "Backend Layer - packages/backend"
        NODE[Node.js Service]
        EXPRESS[HTTP Service]
        WS[WebSocket/Signals]
    end

    subgraph "Plugin Layer - Backend Plugins"
        CATALOG_BE[Catalog Backend]
        TECHDOCS_BE[TechDocs Backend]
        SCAFFOLDER_BE[Scaffolder Backend]
        SEARCH_BE[Search Backend]
        AUTH_BE[Auth Backend]
        PERM_BE[Permission Backend]
        K8S_BE[Kubernetes Backend]
        NOTIF_BE[Notifications Backend]
        PROXY_BE[Proxy Backend]
    end

    subgraph "Data Layer"
        PG[(PostgreSQL)]
        SQLITE[(SQLite<br/>Dev Mode)]
    end

    subgraph "External Integrations"
        GITHUB[GitHub API]
        K8S_CLUSTER[Kubernetes Cluster]
        DOCS_STORAGE[Docs Storage]
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

## 3. Frontend Architecture

### 3.1 Frontend Module Architecture

```mermaid
graph TB
    subgraph "Application Entry"
        APP_TSX[App.tsx<br/>App Configuration]
        INDEX_TSX[index.tsx<br/>Render Entry]
        ROOT[Root.tsx<br/>Layout Component]
    end

    subgraph "Core Framework"
        CREATE_APP[createApp<br/>App Factory]
        APP_ROUTER[AppRouter<br/>Router Container]
        FLAT_ROUTES[FlatRoutes<br/>Route Configuration]
    end

    subgraph "API Layer"
        APIS[apis.ts<br/>API Configuration]
        API_HOLDER[ApiHolder<br/>API Container]
    end

    subgraph "Page Components"
        CATALOG_PAGE[CatalogIndexPage<br/>Catalog Home]
        ENTITY_PAGE[CatalogEntityPage<br/>Entity Details]
        DOCS_INDEX[TechDocsIndexPage<br/>Docs Home]
        DOCS_READER[TechDocsReaderPage<br/>Docs Reader]
        SCAFFOLDER_PAGE[ScaffolderPage<br/>Template Wizard]
        SEARCH_PAGE[SearchPage<br/>Search Page]
        SETTINGS[UserSettingsPage<br/>User Settings]
        NOTIF_PAGE[NotificationsPage<br/>Notifications]
        CATALOG_GRAPH[CatalogGraphPage<br/>Relation Graph]
        API_EXPLORER[ApiExplorerPage<br/>API Explorer]
    end

    subgraph "Common Components"
        SIGN_IN[SignInPage<br/>Sign In Page]
        ALERT[AlertDisplay<br/>Alert Display]
        OAUTH[OAuthRequestDialog<br/>OAuth Dialog]
        SIGNALS[SignalsDisplay<br/>Signals Display]
    end

    subgraph "Route Binding"
        BIND_ROUTES[bindRoutes<br/>Inter-plugin Route Binding]
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

### 3.2 Frontend Route Structure

```mermaid
graph LR
    subgraph "Route Configuration"
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

    ROOT_ROUTE -->|"Redirect"| CATALOG_ROUTE

    subgraph "Page Mapping"
        P1[Catalog List Page]
        P2[Entity Detail Page]
        P3[Docs List Page]
        P4[Docs Reader Page]
        P5[Template Create Page]
        P6[API Docs Page]
        P7[Catalog Import Page]
        P8[Search Page]
        P9[Settings Page]
        P10[Graph Page]
        P11[Notifications Page]
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

### 3.3 Frontend Plugin Dependencies

```mermaid
graph BT
    subgraph "Core Dependencies"
        CORE_APP_API[core-app-api]
        CORE_COMP[core-components]
        CORE_PLUGIN_API[core-plugin-api]
        APP_DEFAULTS[app-defaults]
        THEME[theme]
        UI[ui]
    end

    subgraph "Frontend Plugins"
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

    subgraph "External Dependencies"
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

## 4. Backend Architecture

### 4.1 Backend Service Architecture

```mermaid
graph TB
    subgraph "Backend Entry"
        INDEX_TS[index.ts]
        CREATE_BACKEND[createBackend]
        BACKEND[Backend Instance]
    end

    subgraph "Core Plugins"
        APP_BE[App Backend<br/>Frontend Hosting]
        PROXY_BE[Proxy Backend<br/>API Proxy]
    end

    subgraph "Authentication Module"
        AUTH_BE[Auth Backend]
        GUEST_PROVIDER[Guest Provider<br/>Guest Auth]
        GITHUB_PROVIDER[GitHub Provider<br/>GitHub Auth]
    end

    subgraph "Catalog Module"
        CATALOG_BE[Catalog Backend]
        SCAFFOLDER_MODEL[Scaffolder Entity Model]
        CATALOG_LOGS[Catalog Logs Module]
    end

    subgraph "Documentation Module"
        TECHDOCS_BE[TechDocs Backend]
        DOCS_BUILDER[Local Builder]
        DOCS_GENERATOR[Docker Generator]
        DOCS_PUBLISHER[Local Publisher]
    end

    subgraph "Scaffolder Module"
        SCAFFOLDER_BE[Scaffolder Backend]
        GITHUB_MODULE[GitHub Module]
        NOTIF_MODULE[Notifications Module]
    end

    subgraph "Search Module"
        SEARCH_BE[Search Backend]
        PG_ENGINE[PostgreSQL Engine]
        CATALOG_COLLATOR[Catalog Collator]
        TECHDOCS_COLLATOR[TechDocs Collator]
    end

    subgraph "Permission Module"
        PERM_BE[Permission Backend]
        ALLOW_ALL[Allow All Policy]
    end

    subgraph "Kubernetes Module"
        K8S_BE[Kubernetes Backend]
    end

    subgraph "Notification Module"
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

### 4.2 Backend Plugin Loading Sequence

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
        Note over Main,Proxy: Plugin Registration Phase
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
        Note over Backend: Service Startup Phase
    end

    Backend->>App: Initialize
    Backend->>Auth: Initialize
    Backend->>Catalog: Initialize
    Backend->>Scaffolder: Initialize
    Backend->>TechDocs: Initialize
    Backend->>Search: Initialize
    Backend->>Perm: Initialize
    Backend->>K8S: Initialize
    Backend->>Notif: Initialize
    Backend->>Signals: Initialize

    Backend-->>Main: Service Ready (Port 7007)
```

---

## 5. Plugin System

### 5.1 Plugin Classification Overview

```mermaid
mindmap
  root((Backstage Plugins))
    Core Feature Plugins
      Catalog
        Software Catalog
        Entity Management
        Relation Graph
      TechDocs
        Technical Docs
        MkDocs Build
        Doc Search
      Scaffolder
        Software Templates
        Project Scaffolding
        Workflow Engine
      Search
        Full-text Search
        Multi-source Index
        PostgreSQL Engine
    Integration Plugins
      Kubernetes
        Cluster Management
        Resource View
        Log Monitoring
      GitHub
        Code Repository
        PR Management
        Issue Tracking
    Infrastructure Plugins
      Auth
        Authentication
        Guest Provider
        GitHub OAuth
      Permission
        Permission Management
        Policy Engine
        Access Control
      Proxy
        API Proxy
        CORS Handling
    Communication Plugins
      Notifications
        Notification System
        Multi-channel Push
      Signals
        Real-time Communication
        WebSocket
```

### 5.2 Frontend-Backend Plugin Mapping

```mermaid
graph LR
    subgraph "Frontend Plugins"
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

    subgraph "Backend Plugins"
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

### 5.3 Inter-Plugin Route Binding

```mermaid
graph TB
    subgraph "Route Binding Configuration"
        BIND[bindRoutes]
    end

    subgraph "Catalog Plugin"
        CATALOG_EXT[catalogPlugin.externalRoutes]
    end

    subgraph "Scaffolder Plugin"
        SCAFFOLDER_EXT[scaffolderPlugin.externalRoutes]
        SCAFFOLDER_ROUTES[scaffolderPlugin.routes]
    end

    subgraph "TechDocs Plugin"
        TECHDOCS_ROUTES[techdocsPlugin.routes]
    end

    subgraph "API Docs Plugin"
        API_DOCS_EXT[apiDocsPlugin.externalRoutes]
    end

    subgraph "Catalog Import Plugin"
        IMPORT_ROUTES[catalogImportPlugin.routes]
    end

    subgraph "Org Plugin"
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

## 6. Data Flow Architecture

### 6.1 Request Processing Flow

```mermaid
sequenceDiagram
    participant User as User
    participant Browser as Browser
    participant FE as Frontend React
    participant API as API Client
    participant BE as Backend Service
    participant Plugin as Plugin Handler
    participant DB as Database
    participant Ext as External Service

    User->>Browser: Visit Page
    Browser->>FE: Load React App
    FE->>API: Make API Request
    API->>BE: HTTP Request (localhost:7007)

    alt Auth Check
        BE->>BE: Validate Session/Token
    end

    alt Permission Check
        BE->>Plugin: Permission Plugin
        Plugin->>DB: Query Permission Policy
        DB-->>Plugin: Return Policy Result
    end

    BE->>Plugin: Route to Plugin
    Plugin->>DB: Data Operation
    Plugin->>Ext: External API Call (optional)
    Ext-->>Plugin: Return External Data
    DB-->>Plugin: Return Data
    Plugin-->>BE: Processing Result
    BE-->>API: HTTP Response (JSON)
    API-->>FE: Data Update
    FE-->>Browser: UI Render
    Browser-->>User: Display Result
```

### 6.2 Catalog Data Flow

```mermaid
flowchart TB
    subgraph "Data Sources"
        LOCAL[Local Files<br/>entities.yaml]
        GITHUB_YAML[GitHub<br/>catalog-info.yaml]
        API_REG[API Registration]
    end

    subgraph "Catalog Backend"
        INGEST[Data Ingestion]
        PROCESSOR[Entity Processor]
        VALIDATOR[Model Validation]
        STORE[Entity Storage]
    end

    subgraph "Database"
        PG[(PostgreSQL)]
    end

    subgraph "Frontend Display"
        CATALOG_UI[Catalog UI]
        ENTITY_CARD[Entity Cards]
        RELATION_GRAPH[Relation Graph]
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

### 6.3 Scaffolder Workflow

```mermaid
flowchart TB
    subgraph "Template Selection"
        TEMPLATE_LIST[Template List]
        TEMPLATE_SELECT[Select Template]
        TEMPLATE_INPUT[Input Parameters]
    end

    subgraph "Scaffolder Backend"
        DRY_RUN[Dry Run Validation]
        WORKFLOW[Workflow Engine]
        TASKS[Task Executors]
    end

    subgraph "GitHub Integration"
        GITHUB_API[GitHub API]
        REPO_CREATE[Create Repository]
        PR_CREATE[Create PR]
    end

    subgraph "Notifications"
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

### 6.4 TechDocs Generation Flow

```mermaid
flowchart LR
    subgraph "Documentation Source"
        MKDOCS[mkdocs.yml<br/>docs/*.md]
    end

    subgraph "TechDocs Backend"
        BUILDER[Local Builder]
        GENERATOR[Docker Generator]
        PUBLISHER[Local Publisher]
    end

    subgraph "Storage"
        CACHE[Docs Cache]
    end

    subgraph "Frontend"
        READER[Reader Page]
        SEARCH_IDX[Search Index]
    end

    MKDOCS --> BUILDER
    BUILDER --> GENERATOR
    GENERATOR -->|Generate HTML| PUBLISHER
    PUBLISHER --> CACHE
    CACHE --> READER

    PUBLISHER --> SEARCH_IDX
```

---

## 7. Database Design

### 7.1 Database Architecture

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

### 7.2 Database Configuration

| Environment | Client          | Connection     | Schema Mode                |
| ----------- | --------------- | -------------- | -------------------------- |
| Development | better-sqlite3  | :memory:       | Single File                |
| Production  | pg (PostgreSQL) | localhost:5432 | pluginDivisionMode: schema |

```yaml
# Database Configuration (app-config.yaml)
backend:
  database:
    client: pg
    pluginDivisionMode: schema # Each plugin uses separate schema
    connection:
      host: localhost
      port: 5432
      user: postgres
      password: '123456'
      database: backstage_db
```

---

## 8. Authentication & Permissions

### 8.1 Authentication Flow

```mermaid
sequenceDiagram
    participant User as User
    participant FE as Frontend
    participant Auth as Auth Backend
    participant Provider as Auth Provider
    participant DB as Database

    alt Guest Authentication (Dev Mode)
        User->>FE: Access Application
        FE->>Auth: Request Authentication
        Auth->>Provider: Guest Provider
        Provider-->>Auth: Generate Guest Token
        Auth-->>FE: Return Token
        FE-->>User: Auto Login Success
    else GitHub Authentication
        User->>FE: Click GitHub Login
        FE->>Auth: Initiate OAuth Flow
        Auth->>Provider: Redirect to GitHub
        Provider->>User: GitHub Authorization Page
        User->>Provider: Authorize
        Provider->>Auth: Callback with Code
        Auth->>Provider: Exchange Token
        Provider-->>Auth: Return Access Token
        Auth->>DB: Store User Info
        Auth-->>FE: Return Session
        FE-->>User: Login Success
    end
```

### 8.2 Permission System Architecture

```mermaid
flowchart TB
    subgraph "Frontend"
        PERM_REACT[permission-react]
        REQUIRE_PERM[RequirePermission Component]
    end

    subgraph "Backend"
        PERM_BE[Permission Backend]
        POLICY[Permission Policy]
        RULES[Permission Rules]
    end

    subgraph "Database"
        PERM_DB[(Permission Store)]
    end

    subgraph "Decision Flow"
        REQUEST[Permission Request]
        EVALUATE[Policy Evaluation]
        RESULT[Decision Result]
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

### 8.3 Current Permission Configuration

```yaml
# app-config.yaml
permission:
  enabled: true # Permission system is enabled
```

Current Policy: `AllowAllPolicy` (Allows all operations, suitable for development environment)

---

## 9. Deployment Architecture

### 9.1 Development Environment Deployment

```mermaid
graph TB
    subgraph "Development Machine"
        subgraph "Yarn Workspaces"
            APP[packages/app<br/>Port: 3000]
            BACKEND[packages/backend<br/>Port: 7007]
        end

        subgraph "Local Services"
            POSTGRES[(PostgreSQL<br/>Port: 5432)]
        end
    end

    subgraph "External Services"
        GITHUB[GitHub API]
        DOCKER[Docker<br/>TechDocs Generator]
    end

    APP -->|"API Request"| BACKEND
    BACKEND -->|"Data Storage"| POSTGRES
    BACKEND -->|"Repository Integration"| GITHUB
    BACKEND -->|"Doc Generation"| DOCKER
```

### 9.2 Production Environment Deployment

```mermaid
graph TB
    subgraph "Load Balancer Layer"
        LB[Load Balancer]
    end

    subgraph "Application Layer"
        subgraph "Frontend Containers"
            APP1[Backstage App 1]
            APP2[Backstage App 2]
        end

        subgraph "Backend Containers"
            BE1[Backend 1]
            BE2[Backend 2]
        end
    end

    subgraph "Data Layer"
        subgraph "Database Cluster"
            PG_MASTER[(PostgreSQL<br/>Master)]
            PG_SLAVE[(PostgreSQL<br/>Slave)]
        end

        subgraph "Storage"
            S3[S3/GCS<br/>TechDocs Storage]
        end
    end

    subgraph "External Integrations"
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

### 9.3 Docker Deployment

```dockerfile
# Simplified Dockerfile Structure
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

## 10. Technology Stack Details

### 10.1 Frontend Technology Stack

| Category    | Technology    | Version | Purpose            |
| ----------- | ------------- | ------- | ------------------ |
| Framework   | React         | ^18.0.2 | UI Framework       |
| Router      | React Router  | ^6.3.0  | Route Management   |
| UI Library  | Material-UI   | ^4.12.2 | Component Library  |
| Language    | TypeScript    | ~5.8.0  | Type Safety        |
| Build Tool  | Backstage CLI | ^0.35.2 | Bundling           |
| Testing     | Jest          | ^30.2.0 | Unit Testing       |
| E2E Testing | Playwright    | ^1.32.3 | End-to-End Testing |

### 10.2 Backend Technology Stack

| Category  | Technology     | Version                | Purpose            |
| --------- | -------------- | ---------------------- | ------------------ |
| Runtime   | Node.js        | 22/24                  | JavaScript Runtime |
| Framework | Express        | (via backend-defaults) | HTTP Service       |
| Language  | TypeScript     | ~5.8.0                 | Type Safety        |
| Database  | PostgreSQL     | -                      | Primary Database   |
| DB Client | pg             | ^8.11.3                | PostgreSQL Client  |
| SQLite    | better-sqlite3 | ^12.0.0                | Dev Database       |

### 10.3 Backstage Core Package Versions

| Package                     | Version | Role     |
| --------------------------- | ------- | -------- |
| @backstage/app-defaults     | ^1.7.4  | Frontend |
| @backstage/core-app-api     | ^1.19.3 | Frontend |
| @backstage/core-components  | ^0.18.5 | Frontend |
| @backstage/core-plugin-api  | ^1.12.1 | Frontend |
| @backstage/backend-defaults | ^0.15.0 | Backend  |
| @backstage/cli              | ^0.35.2 | Tooling  |
| @backstage/catalog-model    | ^1.7.6  | Shared   |

### 10.4 Project Directory Structure

```
backstage-demo/
├── app-config.yaml              # Development environment config
├── app-config.production.yaml   # Production environment config
├── backstage.json               # Backstage version info
├── catalog-info.yaml            # Project Catalog definition
├── package.json                 # Root package.json
├── tsconfig.json                # TypeScript config
├── playwright.config.ts         # E2E test config
│
├── packages/
│   ├── app/                     # Frontend application
│   │   ├── src/
│   │   │   ├── App.tsx          # App entry
│   │   │   ├── apis.ts          # API config
│   │   │   ├── index.tsx        # Render entry
│   │   │   └── components/      # UI components
│   │   │       ├── Root.tsx     # Root layout
│   │   │       ├── catalog/     # Catalog components
│   │   │       └── search/      # Search components
│   │   └── package.json
│   │
│   └── backend/                 # Backend service
│       ├── src/
│       │   └── index.ts         # Backend entry
│       ├── Dockerfile           # Docker build file
│       └── package.json
│
├── plugins/                     # Custom plugins directory
│
├── examples/                    # Sample data
    ├── entities.yaml            # Sample entities
    ├── org.yaml                 # Organization structure
    └── template/                # Software templates
        └── template.yaml

```

---

## Appendix

### A. Common Commands

| Command              | Description                 |
| -------------------- | --------------------------- |
| `yarn start`         | Start development server    |
| `yarn build:all`     | Build all packages          |
| `yarn build:backend` | Build backend only          |
| `yarn build-image`   | Build Docker image          |
| `yarn test`          | Run unit tests              |
| `yarn test:e2e`      | Run E2E tests               |
| `yarn lint`          | Code linting                |
| `yarn tsc`           | TypeScript type check       |
| `yarn new`           | Create new plugin/component |

### B. Port Configuration

| Service    | Port | Description         |
| ---------- | ---- | ------------------- |
| Frontend   | 3000 | React dev server    |
| Backend    | 7007 | Node.js API service |
| PostgreSQL | 5432 | Database service    |

### C. Environment Variables

| Variable         | Required   | Description              |
| ---------------- | ---------- | ------------------------ |
| `GITHUB_TOKEN`   | Yes        | GitHub integration token |
| `BACKEND_SECRET` | Production | Backend auth secret      |
