/**
 * Publish API Form Types
 */

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
  ttl: number;
}

export interface AuthenticationConfig {
  enabled: boolean;
  type: 'OAuth2' | 'API-Key' | 'JWT' | 'None';
  provider?: string;
}

export interface GatewayPluginsConfig {
  rateLimit: RateLimitConfig;
  authentication: AuthenticationConfig;
  cors: CorsConfig;
  caching: CachingConfig;
}

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
  detectedEndpoints: DetectedEndpoint[];

  // Step 3: Gateway Plugins
  gatewayPlugins: GatewayPluginsConfig;

  // Step 4: Portal Settings
  visibility: 'public' | 'internal' | 'private';
  documentation: string;
  tags: string[];
  category: string;
}

export interface DetectedEndpoint {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  summary?: string;
}

// Default form values
export const DEFAULT_FORM_DATA: PublishApiFormData = {
  serviceName: '',
  description: '',
  owner: '',
  team: '',
  version: '1.0.0',

  specFile: null,
  specContent: '',
  specType: 'yaml',
  detectedEndpoints: [],

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
  { value: 'Platform', label: 'Platform' },
  { value: 'Backend', label: 'Backend' },
  { value: 'Frontend', label: 'Frontend' },
  { value: 'Data', label: 'Data' },
  { value: 'DevOps', label: 'DevOps' },
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
  { value: 'microservice', label: 'Microservice' },
  { value: 'rest-api', label: 'REST API' },
  { value: 'graphql', label: 'GraphQL' },
];

export const AUTH_TYPE_OPTIONS = [
  { value: 'None', label: 'None' },
  { value: 'OAuth2', label: 'OAuth 2.0' },
  { value: 'API-Key', label: 'API Key' },
  { value: 'JWT', label: 'JWT' },
];

export const AUTH_PROVIDER_OPTIONS = [
  { value: 'Auth0', label: 'Auth0' },
  { value: 'Okta', label: 'Okta' },
  { value: 'AWS Cognito', label: 'AWS Cognito' },
  { value: 'Internal IAM', label: 'Internal IAM' },
];

export const RATE_WINDOW_OPTIONS = [
  { value: '1m', label: '1 minute' },
  { value: '5m', label: '5 minutes' },
  { value: '15m', label: '15 minutes' },
  { value: '1h', label: '1 hour' },
];

export const VISIBILITY_OPTIONS = [
  { value: 'public', label: 'Public', description: 'Visible to all users' },
  { value: 'internal', label: 'Internal', description: 'Visible to organization members only' },
  { value: 'private', label: 'Private', description: 'Visible to team members only' },
];

export interface StepProps {
  formData: PublishApiFormData;
  updateFormData: (updates: Partial<PublishApiFormData>) => void;
  errors: Record<string, string>;
}

export interface StepConfig {
  label: string;
  shortLabel: string;
  component: React.ComponentType<StepProps>;
}
