/**
 * API Detail Page Types
 */

import type { ApiRecord, ApiEndpoint } from '../shared/apiData';

// Props for the main ApiDetail component
export interface ApiDetailProps {
  // No props needed - uses route params
}

// Props for ApiInfoCard
export interface ApiInfoCardProps {
  api: ApiRecord;
}

// Props for GatewayInfoCard
export interface GatewayInfoCardProps {
  gateway: ApiRecord['gateway'];
  auth: ApiRecord['auth'];
}

// Props for EndpointsList
export interface EndpointsListProps {
  endpoints: ApiEndpoint[];
  onTryIt: (endpoint: ApiEndpoint) => void;
}

// Props for SwaggerUiModal
export interface SwaggerUiModalProps {
  open: boolean;
  onClose: () => void;
  spec: string;
  endpoint?: ApiEndpoint;
}

// Key-Value item for parameters and headers
export interface KeyValueItem {
  key: string;
  value: string;
  enabled: boolean;
}

// Simulated API response
export interface SimulatedResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: string;
  duration: number;
}

// Props for ApiDebugDrawer
export interface ApiDebugDrawerProps {
  open: boolean;
  onClose: () => void;
  endpoint?: ApiEndpoint;
  baseUrl: string;
  authConfig?: import('../shared/apiData/types').AuthConfig;
}

// Method color mapping
export const METHOD_COLORS: Record<ApiEndpoint['method'], 'primary' | 'secondary' | 'success' | 'warning' | 'error'> = {
  GET: 'primary',
  POST: 'success',
  PUT: 'warning',
  PATCH: 'secondary',
  DELETE: 'error',
};

// Status color mapping
export const STATUS_COLORS: Record<ApiRecord['status'], 'success' | 'warning' | 'error'> = {
  Active: 'success',
  Deprecated: 'error',
  Draft: 'warning',
};

// Visibility labels
export const VISIBILITY_LABELS: Record<ApiRecord['visibility'], string> = {
  public: 'Public',
  internal: 'Internal',
  private: 'Private',
};
