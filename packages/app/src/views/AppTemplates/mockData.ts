export type TemplateCategory = 'frontend' | 'backend' | 'fullstack' | 'mobile' | 'infrastructure';

export interface AppTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: TemplateCategory;
  techStack: string[];
  features: string[];
}

export const categories = [
  { value: 'all', label: 'All' },
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend' },
  { value: 'fullstack', label: 'Full Stack' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'infrastructure', label: 'Infrastructure' },
] as const;

export const appTemplates: AppTemplate[] = [
  // Frontend
  {
    id: 'react-spa',
    name: 'React SPA',
    description: 'Modern React single-page application with TypeScript, featuring hot module replacement and optimized production builds.',
    icon: 'React',
    category: 'frontend',
    techStack: ['React 18', 'TypeScript', 'Vite', 'React Router'],
    features: ['Hot Reload', 'TypeScript Support', 'CSS Modules', 'Testing Setup'],
  },
  {
    id: 'vue-app',
    name: 'Vue.js App',
    description: 'Vue 3 application with Composition API and Vite for lightning-fast development experience.',
    icon: 'Vue',
    category: 'frontend',
    techStack: ['Vue 3', 'TypeScript', 'Vite', 'Pinia'],
    features: ['Composition API', 'Hot Reload', 'Vuex/Pinia', 'Vue Router'],
  },
  {
    id: 'angular-app',
    name: 'Angular App',
    description: 'Enterprise-grade Angular application with comprehensive tooling and best practices built-in.',
    icon: 'Angular',
    category: 'frontend',
    techStack: ['Angular 17', 'TypeScript', 'RxJS', 'NgRx'],
    features: ['CLI Tools', 'Dependency Injection', 'Reactive Forms', 'Lazy Loading'],
  },
  // Backend
  {
    id: 'spring-boot',
    name: 'Spring Boot',
    description: 'Production-ready Java microservice with Spring Boot, including actuator endpoints and metrics.',
    icon: 'Java',
    category: 'backend',
    techStack: ['Java 21', 'Spring Boot 3', 'Maven', 'PostgreSQL'],
    features: ['Auto-configuration', 'Actuator', 'Security', 'JPA/Hibernate'],
  },
  {
    id: 'nodejs-api',
    name: 'Node.js API',
    description: 'RESTful API service built with Node.js and Express/Fastify, ready for containerization.',
    icon: 'Nodejs',
    category: 'backend',
    techStack: ['Node.js 20', 'Express', 'TypeScript', 'Prisma'],
    features: ['REST API', 'JWT Auth', 'Swagger Docs', 'Docker Ready'],
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    description: 'High-performance Python async API with automatic OpenAPI documentation.',
    icon: 'Python',
    category: 'backend',
    techStack: ['Python 3.12', 'FastAPI', 'Pydantic', 'SQLAlchemy'],
    features: ['Async Support', 'Auto Docs', 'Type Safety', 'ORM Integration'],
  },
  // Full Stack
  {
    id: 'nextjs-app',
    name: 'Next.js App',
    description: 'Full-stack React framework with SSR, SSG, and API routes for modern web applications.',
    icon: 'Nextjs',
    category: 'fullstack',
    techStack: ['Next.js 14', 'React 18', 'TypeScript', 'Tailwind CSS'],
    features: ['SSR/SSG', 'API Routes', 'Image Optimization', 'Middleware'],
  },
  {
    id: 'nuxtjs-app',
    name: 'Nuxt.js App',
    description: 'Full-stack Vue framework with server-side rendering and file-based routing.',
    icon: 'Nuxt',
    category: 'fullstack',
    techStack: ['Nuxt 3', 'Vue 3', 'TypeScript', 'Nitro'],
    features: ['SSR', 'File-based Routing', 'Auto Imports', 'Server API'],
  },
  // Mobile
  {
    id: 'react-native',
    name: 'React Native',
    description: 'Cross-platform mobile application for iOS and Android with shared JavaScript codebase.',
    icon: 'React',
    category: 'mobile',
    techStack: ['React Native', 'TypeScript', 'Expo', 'React Navigation'],
    features: ['Cross-platform', 'Hot Reload', 'Native Modules', 'Push Notifications'],
  },
  // Infrastructure
  {
    id: 'docker-service',
    name: 'Docker Service',
    description: 'Containerized service template with Docker Compose and Kubernetes deployment configs.',
    icon: 'Docker',
    category: 'infrastructure',
    techStack: ['Docker', 'Docker Compose', 'Nginx', 'Alpine Linux'],
    features: ['Multi-stage Build', 'Health Checks', 'K8s Ready', 'CI/CD Templates'],
  },
];
