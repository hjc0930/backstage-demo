/**
 * Shared API Data Types
 * Used across Dashboard, ApiDetail, and PublishApi views
 */

export interface ApiEndpoint {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  description: string;
}

export interface GatewayConfig {
  endpoint: string;
  rateLimit: string;
  corsEnabled: boolean;
  cachingEnabled: boolean;
}

export interface AuthConfig {
  type: 'OAuth2' | 'API-Key' | 'JWT' | 'None';
  provider?: string;
}

export interface ApiRecord {
  id: string;
  name: string;
  description: string;
  owner: string;
  team: string;
  status: 'Active' | 'Deprecated' | 'Draft';
  version: string;
  type: 'REST' | 'GraphQL' | 'gRPC';
  gateway: GatewayConfig;
  auth: AuthConfig;
  updatedAt: string;
  openApiSpec?: string;
  endpoints: ApiEndpoint[];
  visibility: 'public' | 'internal' | 'private';
  tags: string[];
  category: string;
}

// Gateway Plugin Configuration for Publish API
export interface RateLimitConfig {
  enabled: boolean;
  requests: number;
  window: '1m' | '5m' | '15m' | '1h';
}

export interface CorsConfig {
  enabled: boolean;
  origins: string[];
}

export interface CachingConfig {
  enabled: boolean;
  ttl: number; // in seconds
}

export interface GatewayPluginsConfig {
  rateLimit: RateLimitConfig;
  authentication: {
    enabled: boolean;
    type: 'OAuth2' | 'API-Key' | 'JWT' | 'None';
    provider?: string;
  };
  cors: CorsConfig;
  caching: CachingConfig;
}

// Publish API Form Data
export interface PublishApiFormData {
  // Step 1: Service Definition
  serviceName: string;
  description: string;
  owner: string;
  team: string;
  version: string;

  // Step 2: API Specification
  specFile: File | null;
  specContent: string;
  specType: 'yaml' | 'json';

  // Step 3: Gateway Plugins
  gatewayPlugins: GatewayPluginsConfig;

  // Step 4: Portal Settings
  visibility: 'public' | 'internal' | 'private';
  documentation: string;
  tags: string[];
  category: string;
}

// Default form values
export const DEFAULT_PUBLISH_FORM: PublishApiFormData = {
  serviceName: '',
  description: '',
  owner: '',
  team: '',
  version: '1.0.0',

  specFile: null,
  specContent: '',
  specType: 'yaml',

  gatewayPlugins: {
    rateLimit: {
      enabled: false,
      requests: 100,
      window: '1m',
    },
    authentication: {
      enabled: false,
      type: 'None',
    },
    cors: {
      enabled: false,
      origins: ['*'],
    },
    caching: {
      enabled: false,
      ttl: 300,
    },
  },

  visibility: 'internal',
  documentation: '',
  tags: [],
  category: '',
};

// Select options
export const OWNER_OPTIONS = [
  { value: 'platform-team', label: 'Platform Team' },
  { value: 'backend-team', label: 'Backend Team' },
  { value: 'frontend-team', label: 'Frontend Team' },
  { value: 'data-team', label: 'Data Team' },
  { value: 'devops-team', label: 'DevOps Team' },
];

export const TEAM_OPTIONS = [
  { value: 'platform', label: 'Platform' },
  { value: 'backend', label: 'Backend' },
  { value: 'frontend', label: 'Frontend' },
  { value: 'data', label: 'Data' },
  { value: 'devops', label: 'DevOps' },
];

export const CATEGORY_OPTIONS = [
  { value: 'core-services', label: 'Core Services' },
  { value: 'business-logic', label: 'Business Logic' },
  { value: 'data-services', label: 'Data Services' },
  { value: 'integration', label: 'Integration' },
  { value: 'utilities', label: 'Utilities' },
];

export const TAG_OPTIONS = [
  { value: 'internal', label: 'Internal' },
  { value: 'external', label: 'External' },
  { value: 'beta', label: 'Beta' },
  { value: 'stable', label: 'Stable' },
  { value: 'deprecated', label: 'Deprecated' },
  { value: 'microservice', label: 'Microservice' },
  { value: 'rest-api', label: 'REST API' },
  { value: 'graphql', label: 'GraphQL' },
];
