/**
 * Mock data for Publish API logs
 */

export interface PublishLog {
  id: string;
  apiName: string;
  version: string;
  publishedBy: string;
  publishedAt: string;
  status: 'success' | 'failed' | 'pending';
}

export const mockPublishLogs: PublishLog[] = [
  {
    id: 'log-1',
    apiName: 'User Service API',
    version: '2.1.0',
    publishedBy: 'john.doe@example.com',
    publishedAt: '2024-01-15T10:30:00Z',
    status: 'success',
  },
  {
    id: 'log-2',
    apiName: 'Order Service API',
    version: '1.5.0',
    publishedBy: 'jane.smith@example.com',
    publishedAt: '2024-01-14T15:45:00Z',
    status: 'success',
  },
  {
    id: 'log-3',
    apiName: 'Payment Service API',
    version: '3.0.0',
    publishedBy: 'mike.wilson@example.com',
    publishedAt: '2024-01-13T09:20:00Z',
    status: 'failed',
  },
  {
    id: 'log-4',
    apiName: 'Inventory Service API',
    version: '1.2.0',
    publishedBy: 'sarah.jones@example.com',
    publishedAt: '2024-01-12T14:10:00Z',
    status: 'success',
  },
  {
    id: 'log-5',
    apiName: 'Notification Service API',
    version: '2.0.0',
    publishedBy: 'tom.brown@example.com',
    publishedAt: '2024-01-11T11:30:00Z',
    status: 'pending',
  },
];

// Sample OpenAPI spec for demo
export const sampleOpenApiYaml = `openapi: 3.0.0
info:
  title: Sample API
  version: 1.0.0
  description: A sample API for demonstration
servers:
  - url: https://api.example.com/v1
paths:
  /users:
    get:
      summary: List all users
      responses:
        '200':
          description: A list of users
    post:
      summary: Create a user
      responses:
        '201':
          description: User created
  /users/{id}:
    get:
      summary: Get user by ID
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: User details
`;
