/**
 * Shared Mock API Data
 * Used across Dashboard, ApiDetail, and PublishApi views
 */

import type { ApiRecord, ApiEndpoint } from './types';

// Sample OpenAPI spec for Swagger UI demo
const sampleOpenApiSpec = JSON.stringify({
  openapi: '3.0.0',
  info: {
    title: 'User Service API',
    version: '2.1.0',
    description: 'API for managing user data and authentication',
  },
  servers: [
    { url: 'https://api.example.com/v2', description: 'Production Server' },
    { url: 'https://staging-api.example.com/v2', description: 'Staging Server' },
  ],
  paths: {
    '/users': {
      get: {
        summary: 'List all users',
        operationId: 'getUsers',
        tags: ['Users'],
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 20 } },
        ],
        responses: {
          '200': {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/User' },
                    },
                    total: { type: 'integer' },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: 'Create a new user',
        operationId: 'createUser',
        tags: ['Users'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateUserInput' },
            },
          },
        },
        responses: {
          '201': {
            description: 'User created successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/User' },
              },
            },
          },
        },
      },
    },
    '/users/{id}': {
      get: {
        summary: 'Get user by ID',
        operationId: 'getUserById',
        tags: ['Users'],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
        ],
        responses: {
          '200': {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/User' },
              },
            },
          },
          '404': { description: 'User not found' },
        },
      },
      put: {
        summary: 'Update user',
        operationId: 'updateUser',
        tags: ['Users'],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UpdateUserInput' },
            },
          },
        },
        responses: {
          '200': {
            description: 'User updated successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/User' },
              },
            },
          },
        },
      },
      delete: {
        summary: 'Delete user',
        operationId: 'deleteUser',
        tags: ['Users'],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
        ],
        responses: {
          '204': { description: 'User deleted successfully' },
          '404': { description: 'User not found' },
        },
      },
    },
  },
  components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          email: { type: 'string', format: 'email' },
          name: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      CreateUserInput: {
        type: 'object',
        required: ['email', 'name'],
        properties: {
          email: { type: 'string', format: 'email' },
          name: { type: 'string' },
        },
      },
      UpdateUserInput: {
        type: 'object',
        properties: {
          email: { type: 'string', format: 'email' },
          name: { type: 'string' },
        },
      },
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      apiKey: {
        type: 'apiKey',
        in: 'header',
        name: 'X-API-Key',
      },
    },
  },
  security: [{ bearerAuth: [] }],
}, null, 2);

// User Service API endpoints
const userServiceEndpoints: ApiEndpoint[] = [
  { path: '/api/users', method: 'GET', description: 'List all users with pagination' },
  { path: '/api/users', method: 'POST', description: 'Create a new user' },
  { path: '/api/users/:id', method: 'GET', description: 'Get user by ID' },
  { path: '/api/users/:id', method: 'PUT', description: 'Update user information' },
  { path: '/api/users/:id', method: 'DELETE', description: 'Delete user by ID' },
];

// Order Service API endpoints
const orderServiceEndpoints: ApiEndpoint[] = [
  { path: '/api/orders', method: 'GET', description: 'List all orders' },
  { path: '/api/orders', method: 'POST', description: 'Create a new order' },
  { path: '/api/orders/:id', method: 'GET', description: 'Get order by ID' },
  { path: '/api/orders/:id/status', method: 'PATCH', description: 'Update order status' },
];

// Payment Service API endpoints
const paymentServiceEndpoints: ApiEndpoint[] = [
  { path: '/api/payments', method: 'POST', description: 'Process a payment' },
  { path: '/api/payments/:id', method: 'GET', description: 'Get payment details' },
  { path: '/api/payments/:id/refund', method: 'POST', description: 'Refund a payment' },
];

// Inventory Service API endpoints
const inventoryServiceEndpoints: ApiEndpoint[] = [
  { path: '/api/inventory', method: 'GET', description: 'List all inventory items' },
  { path: '/api/inventory/:id', method: 'GET', description: 'Get inventory item by ID' },
  { path: '/api/inventory/:id', method: 'PUT', description: 'Update inventory quantity' },
  { path: '/api/inventory/adjust', method: 'POST', description: 'Adjust inventory levels' },
];

// Notification Service API endpoints
const notificationServiceEndpoints: ApiEndpoint[] = [
  { path: '/api/notifications', method: 'GET', description: 'List notifications' },
  { path: '/api/notifications', method: 'POST', description: 'Send notification' },
  { path: '/api/notifications/:id/read', method: 'POST', description: 'Mark as read' },
  { path: '/api/notifications/templates', method: 'GET', description: 'List templates' },
];

// Analytics Service API endpoints
const analyticsServiceEndpoints: ApiEndpoint[] = [
  { path: '/api/analytics/events', method: 'POST', description: 'Track event' },
  { path: '/api/analytics/reports', method: 'GET', description: 'Get analytics reports' },
  { path: '/api/analytics/dashboard', method: 'GET', description: 'Get dashboard data' },
];

// Partner Data API endpoints
const partnerDataEndpoints: ApiEndpoint[] = [
  { path: '/api/partners/data', method: 'GET', description: 'Get partner data' },
  { path: '/api/partners/:id', method: 'GET', description: 'Get partner info by ID' },
  { path: '/api/partners/sync', method: 'POST', description: 'Sync partner data' },
  { path: '/api/partners/stats', method: 'GET', description: 'Get partner statistics' },
];

// Legacy Notification API endpoints (GraphQL)
const legacyNotificationEndpoints: ApiEndpoint[] = [
  { path: '/graphql', method: 'POST', description: 'GraphQL Query - Get notification list' },
  { path: '/graphql', method: 'POST', description: 'GraphQL Mutation - Send notification' },
  { path: '/graphql', method: 'POST', description: 'GraphQL Mutation - Mark as read' },
];

// gRPC Service endpoints (for example-grpc-api)
const grpcServiceEndpoints: ApiEndpoint[] = [
  { path: 'GetUser', method: 'POST', description: 'gRPC - Get user info' },
  { path: 'CreateUser', method: 'POST', description: 'gRPC - Create user' },
  { path: 'UpdateUser', method: 'POST', description: 'gRPC - Update user' },
  { path: 'DeleteUser', method: 'POST', description: 'gRPC - Delete user' },
  { path: 'ListUsers', method: 'POST', description: 'gRPC - List users' },
];

// Mock API Records
export const mockApiRecords: ApiRecord[] = [
  // ============================================
  // APIs from examples/apis.yaml
  // ============================================

  // 1. User Service API
  {
    id: 'user-service-api',
    name: 'User Service API',
    description: 'User management and authentication API. Provides user registration, login, profile management, and authentication features.',
    owner: 'team-platform',
    team: 'Platform',
    status: 'Active',
    version: '2.1.0',
    type: 'REST',
    gateway: {
      endpoint: 'https://api.example.com/users',
      rateLimit: '1000 req/min',
      corsEnabled: true,
      cachingEnabled: true,
    },
    auth: {
      type: 'OAuth2',
      provider: 'Kong',
    },
    updatedAt: '2026-02-15T10:30:00Z',
    openApiSpec: sampleOpenApiSpec,
    endpoints: userServiceEndpoints,
    visibility: 'internal',
    tags: ['core-services', 'rest-api', 'stable', 'openapi'],
    category: 'core-services',
  },

  // 2. Payment Processing API
  {
    id: 'payment-api',
    name: 'Payment Processing API',
    description: 'Payment gateway integration API. Supports multiple payment channels, handles transactions, refunds, and payment method management.',
    owner: 'team-payments',
    team: 'Payments',
    status: 'Active',
    version: '1.5.2',
    type: 'REST',
    gateway: {
      endpoint: 'https://api.example.com/payments',
      rateLimit: '200 req/min',
      corsEnabled: false,
      cachingEnabled: false,
    },
    auth: {
      type: 'API-Key',
      provider: 'Apigee',
    },
    updatedAt: '2026-03-01T14:20:00Z',
    endpoints: paymentServiceEndpoints,
    visibility: 'internal',
    tags: ['core-services', 'rest-api', 'experimental'],
    category: 'core-services',
  },

  // 3. Legacy Notification API
  {
    id: 'legacy-notification-api',
    name: 'Legacy Notification API',
    description: 'Legacy notification service API (deprecated). Migrating to new notification service, please use Notification Service API instead.',
    owner: 'team-communications',
    team: 'Communications',
    status: 'Deprecated',
    version: '0.9.1',
    type: 'GraphQL',
    gateway: {
      endpoint: 'https://legacy-api.example.com/notifications',
      rateLimit: '100 req/min',
      corsEnabled: false,
      cachingEnabled: false,
    },
    auth: {
      type: 'JWT',
      provider: 'AWS API Gateway',
    },
    updatedAt: '2025-11-20T08:15:00Z',
    endpoints: legacyNotificationEndpoints,
    visibility: 'internal',
    tags: ['deprecated', 'graphql', 'legacy'],
    category: 'utilities',
  },

  // 4. Partner Data API
  {
    id: 'partner-data-api',
    name: 'Partner Data API',
    description: 'Public API for partner integrations. Provides data sharing, synchronization, and statistics features for external partner systems.',
    owner: 'team-partnerships',
    team: 'Partnerships',
    status: 'Active',
    version: '3.0.0',
    type: 'REST',
    gateway: {
      endpoint: 'https://api.example.com/partners',
      rateLimit: '500 req/min',
      corsEnabled: true,
      cachingEnabled: true,
    },
    auth: {
      type: 'None',
    },
    updatedAt: '2026-03-05T16:45:00Z',
    endpoints: partnerDataEndpoints,
    visibility: 'public',
    tags: ['partner', 'rest-api', 'stable', 'openapi'],
    category: 'integration',
  },

  // 5. Example gRPC API
  {
    id: 'example-grpc-api',
    name: 'Example gRPC API',
    description: 'gRPC example service demonstrating high-performance RPC communication with bidirectional streaming and strongly-typed messaging.',
    owner: 'team-platform',
    team: 'Platform',
    status: 'Active',
    version: '1.0.0',
    type: 'gRPC',
    gateway: {
      endpoint: 'grpc://api.example.com:9000',
      rateLimit: '2000 req/min',
      corsEnabled: false,
      cachingEnabled: false,
    },
    auth: {
      type: 'JWT',
      provider: 'Internal IAM',
    },
    updatedAt: '2026-03-07T09:00:00Z',
    endpoints: grpcServiceEndpoints,
    visibility: 'internal',
    tags: ['grpc', 'internal', 'stable'],
    category: 'core-services',
  },

  // ============================================
  // Additional APIs (kept for compatibility)
  // ============================================

  {
    id: 'order-service-api',
    name: 'Order Service API',
    description: 'Order processing and management service. Handles order creation, tracking, and fulfillment workflows.',
    owner: 'backend-team',
    team: 'Backend',
    status: 'Active',
    version: '1.5.0',
    type: 'REST',
    gateway: {
      endpoint: 'https://api.example.com/orders',
      rateLimit: '500 req/min',
      corsEnabled: true,
      cachingEnabled: false,
    },
    auth: {
      type: 'JWT',
      provider: 'Internal IAM',
    },
    updatedAt: '2024-01-14T15:45:00Z',
    endpoints: orderServiceEndpoints,
    visibility: 'internal',
    tags: ['business-logic', 'rest-api', 'stable'],
    category: 'business-logic',
  },

  {
    id: 'inventory-api',
    name: 'Inventory Service API',
    description: 'Inventory management and tracking service. Provides real-time stock levels, reservations, and warehouse management.',
    owner: 'data-team',
    team: 'Data',
    status: 'Active',
    version: '1.2.0',
    type: 'REST',
    gateway: {
      endpoint: 'https://api.example.com/inventory',
      rateLimit: '800 req/min',
      corsEnabled: true,
      cachingEnabled: true,
    },
    auth: {
      type: 'OAuth2',
      provider: 'Okta',
    },
    updatedAt: '2024-01-12T14:10:00Z',
    endpoints: inventoryServiceEndpoints,
    visibility: 'internal',
    tags: ['data-services', 'rest-api', 'beta'],
    category: 'data-services',
  },

  {
    id: 'notification-api',
    name: 'Notification Service API',
    description: 'Multi-channel notification service supporting email, SMS, push notifications, and in-app messaging.',
    owner: 'platform-team',
    team: 'Platform',
    status: 'Active',
    version: '2.0.0',
    type: 'REST',
    gateway: {
      endpoint: 'https://api.example.com/notifications',
      rateLimit: '2000 req/min',
      corsEnabled: true,
      cachingEnabled: false,
    },
    auth: {
      type: 'JWT',
      provider: 'Internal IAM',
    },
    updatedAt: '2024-01-11T11:30:00Z',
    endpoints: notificationServiceEndpoints,
    visibility: 'public',
    tags: ['utilities', 'rest-api', 'stable'],
    category: 'utilities',
  },

  {
    id: 'analytics-api',
    name: 'Analytics Service API',
    description: 'Real-time analytics and reporting service. Provides event tracking, dashboards, and custom reports.',
    owner: 'data-team',
    team: 'Data',
    status: 'Draft',
    version: '0.9.0',
    type: 'GraphQL',
    gateway: {
      endpoint: 'https://api.example.com/analytics',
      rateLimit: '500 req/min',
      corsEnabled: true,
      cachingEnabled: true,
    },
    auth: {
      type: 'OAuth2',
      provider: 'Auth0',
    },
    updatedAt: '2024-01-10T16:00:00Z',
    endpoints: analyticsServiceEndpoints,
    visibility: 'internal',
    tags: ['data-services', 'graphql', 'beta'],
    category: 'data-services',
  },
];

// Helper function to get API by ID
export const getApiById = (id: string): ApiRecord | undefined => {
  return mockApiRecords.find(api => api.id === id);
};

// Helper function to get recently updated APIs
export const getRecentlyUpdatedApis = (limit: number = 5): ApiRecord[] => {
  return [...mockApiRecords]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, limit);
};

// Helper function to get APIs by status
export const getApisByStatus = (status: ApiRecord['status']): ApiRecord[] => {
  return mockApiRecords.filter(api => api.status === status);
};

// Helper function to get APIs by team
export const getApisByTeam = (team: string): ApiRecord[] => {
  return mockApiRecords.filter(api => api.team.toLowerCase() === team.toLowerCase());
};
