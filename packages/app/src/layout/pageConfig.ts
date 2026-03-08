export interface PageConfig {
  title: string;
  subtitle: string;
}

export const pageConfigs: Record<string, PageConfig> = {
  '/': { title: 'Dashboard', subtitle: 'Internal Developer Portal' },
  '/api-catalog': { title: 'API Catalog', subtitle: "Browse and manage all your organization's APIs" },
  '/publish-api': { title: 'Publish API', subtitle: 'Register and publish new APIs to the developer portal' },
  '/api-detail': { title: 'API Detail', subtitle: 'View API details and endpoints' },
  '/app-catalog': { title: 'Application Catalog', subtitle: 'Browse and manage your applications' },
  '/app-templates': { title: 'App Templates', subtitle: 'Create and deploy applications from pre-configured templates' },
  '/dev-agents': { title: 'Development Agents', subtitle: 'AI-powered assistants to streamline your development workflow' },
  '/observability': { title: 'Observability', subtitle: 'Real-time monitoring and system health insights' },
  '/reference': { title: 'Reference Templates', subtitle: 'Ready-to-use project templates' },
  '/standards': { title: 'Development Standards', subtitle: 'Comprehensive guidelines for coding standards' },
  '/deploy': { title: 'Deploy Template', subtitle: 'Configure and deploy your application' },
};

export function getPageConfig(pathname: string): PageConfig {
  // Try exact match first
  if (pageConfigs[pathname]) {
    return pageConfigs[pathname];
  }

  // Try prefix match for dynamic routes like /api-detail/:apiId
  const matchingKey = Object.keys(pageConfigs).find(key => {
    if (pathname.startsWith(key) && key !== '/') {
      return true;
    }
    return false;
  });

  if (matchingKey) {
    return pageConfigs[matchingKey];
  }

  // Default fallback
  return { title: 'Backstage', subtitle: 'Developer Portal' };
}
