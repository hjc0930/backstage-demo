export interface StatCard {
  title: string;
  value: string | number;
  trend?: string;
  color: string;
}

export interface Application {
  name: string;
  status: 'healthy' | 'warning' | 'error';
  uptime: number;
  instances: number;
}

export interface ApiEndpoint {
  path: string;
  status: 'operational' | 'degraded' | 'down';
  latency: number;
}

export interface SystemMetric {
  name: string;
  value: number;
  unit: string;
}

export const statsData: StatCard[] = [
  { title: 'Applications', value: 24, trend: '+2', color: '#0052CC' },
  { title: 'APIs', value: 156, trend: '+12', color: '#36B37E' },
  { title: 'Services', value: 38, trend: '+3', color: '#FFAB00' },
  { title: 'Uptime', value: '99.9%', trend: '+0.2%', color: '#6554C0' },
];

export const applicationsData: Application[] = [
  { name: 'user-service', status: 'healthy', uptime: 99.9, instances: 3 },
  { name: 'order-service', status: 'healthy', uptime: 99.8, instances: 2 },
  { name: 'payment-service', status: 'warning', uptime: 98.5, instances: 2 },
  { name: 'inventory-service', status: 'healthy', uptime: 99.7, instances: 3 },
  { name: 'notification-service', status: 'error', uptime: 95.2, instances: 1 },
  { name: 'auth-service', status: 'healthy', uptime: 99.9, instances: 2 },
  { name: 'search-service', status: 'healthy', uptime: 99.6, instances: 2 },
  { name: 'analytics-service', status: 'warning', uptime: 97.8, instances: 1 },
];

export const apiEndpointsData: ApiEndpoint[] = [
  { path: '/api/users', status: 'operational', latency: 45 },
  { path: '/api/orders', status: 'operational', latency: 62 },
  { path: '/api/payments', status: 'degraded', latency: 180 },
  { path: '/api/inventory', status: 'operational', latency: 38 },
  { path: '/api/notifications', status: 'down', latency: 0 },
  { path: '/api/auth', status: 'operational', latency: 55 },
  { path: '/api/search', status: 'operational', latency: 72 },
  { path: '/api/analytics', status: 'degraded', latency: 250 },
];

export const systemMetricsData: SystemMetric[] = [
  { name: 'CPU Usage', value: 78, unit: '%' },
  { name: 'Memory', value: 62, unit: '%' },
  { name: 'Disk', value: 45, unit: '%' },
  { name: 'Network I/O', value: 71, unit: '%' },
];
