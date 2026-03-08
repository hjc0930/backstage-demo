export type StandardCategory = 'coding' | 'security' | 'api-design' | 'testing';

export interface StandardDocument {
  id: string;
  title: string;
  category: StandardCategory;
  description: string;
  preview: string;
  downloadUrl: string;
  lastUpdated: string;
  version: string;
}

export const categories = [
  { value: 'all', label: 'All Standards' },
  { value: 'coding', label: 'Coding Standards' },
  { value: 'security', label: 'Security' },
  { value: 'api-design', label: 'API Design' },
  { value: 'testing', label: 'Testing' },
] as const;

export const standardDocuments: StandardDocument[] = [
  // Coding Standards
  {
    id: 'ts-style-guide',
    title: 'TypeScript Style Guide',
    category: 'coding',
    description: 'Official TypeScript coding conventions and best practices for the team.',
    preview: 'This guide covers naming conventions, type definitions, module organization, and code formatting standards for TypeScript projects...',
    downloadUrl: '/standards/ts-style-guide.pdf',
    lastUpdated: '2024-01-15',
    version: '2.1.0',
  },
  {
    id: 'react-patterns',
    title: 'React Patterns',
    category: 'coding',
    description: 'Recommended React patterns and component architecture guidelines.',
    preview: 'Learn the best practices for React component design, state management, hooks usage, and performance optimization...',
    downloadUrl: '/standards/react-patterns.pdf',
    lastUpdated: '2024-02-20',
    version: '1.5.0',
  },
  {
    id: 'nodejs-best-practices',
    title: 'Node.js Best Practices',
    category: 'coding',
    description: 'Node.js development standards including error handling and project structure.',
    preview: 'Comprehensive guide covering project structure, error handling, logging, security practices, and performance optimization...',
    downloadUrl: '/standards/nodejs-best-practices.pdf',
    lastUpdated: '2024-01-30',
    version: '3.0.0',
  },
  {
    id: 'python-style-guide',
    title: 'Python Style Guide',
    category: 'coding',
    description: 'Python coding standards based on PEP 8 with team-specific extensions.',
    preview: 'Follow our enhanced PEP 8 guidelines, including type hints, docstring conventions, and project structure recommendations...',
    downloadUrl: '/standards/python-style-guide.pdf',
    lastUpdated: '2024-03-01',
    version: '1.2.0',
  },

  // Security
  {
    id: 'security-guidelines',
    title: 'Security Guidelines',
    category: 'security',
    description: 'Comprehensive security standards for application development.',
    preview: 'Security-first development practices including input validation, authentication, authorization, and data protection...',
    downloadUrl: '/standards/security-guidelines.pdf',
    lastUpdated: '2024-02-10',
    version: '2.0.0',
  },
  {
    id: 'owasp-checklist',
    title: 'OWASP Checklist',
    category: 'security',
    description: 'OWASP Top 10 security checklist for code review and deployment.',
    preview: 'A comprehensive checklist based on OWASP Top 10 vulnerabilities, ensuring your applications are protected against common attacks...',
    downloadUrl: '/standards/owasp-checklist.pdf',
    lastUpdated: '2024-01-25',
    version: '1.0.0',
  },
  {
    id: 'secrets-management',
    title: 'Secrets Management',
    category: 'security',
    description: 'Best practices for managing secrets and credentials in applications.',
    preview: 'Learn how to securely manage API keys, database credentials, and other sensitive information using vault solutions...',
    downloadUrl: '/standards/secrets-management.pdf',
    lastUpdated: '2024-02-28',
    version: '1.3.0',
  },

  // API Design
  {
    id: 'rest-api-design',
    title: 'REST API Design',
    category: 'api-design',
    description: 'RESTful API design standards and conventions.',
    preview: 'Guidelines for designing RESTful APIs including URL conventions, HTTP methods, status codes, and response formats...',
    downloadUrl: '/standards/rest-api-design.pdf',
    lastUpdated: '2024-02-15',
    version: '2.2.0',
  },
  {
    id: 'graphql-schema',
    title: 'GraphQL Schema Design',
    category: 'api-design',
    description: 'GraphQL schema design principles and naming conventions.',
    preview: 'Best practices for GraphQL schema design including type definitions, mutations, queries, and subscription patterns...',
    downloadUrl: '/standards/graphql-schema.pdf',
    lastUpdated: '2024-01-20',
    version: '1.1.0',
  },
  {
    id: 'api-versioning',
    title: 'API Versioning Strategy',
    category: 'api-design',
    description: 'Standards for API versioning and deprecation policies.',
    preview: 'Learn our approach to API versioning, backward compatibility requirements, and deprecation timelines...',
    downloadUrl: '/standards/api-versioning.pdf',
    lastUpdated: '2024-03-05',
    version: '1.0.0',
  },

  // Testing
  {
    id: 'unit-testing',
    title: 'Unit Testing Standards',
    category: 'testing',
    description: 'Unit testing conventions and coverage requirements.',
    preview: 'Standards for writing effective unit tests, including naming conventions, test organization, and coverage requirements...',
    downloadUrl: '/standards/unit-testing.pdf',
    lastUpdated: '2024-02-05',
    version: '1.4.0',
  },
  {
    id: 'e2e-testing',
    title: 'E2E Testing Guide',
    category: 'testing',
    description: 'End-to-end testing strategy and implementation guide.',
    preview: 'Comprehensive guide for E2E testing including test scenarios, environment setup, and CI/CD integration...',
    downloadUrl: '/standards/e2e-testing.pdf',
    lastUpdated: '2024-01-18',
    version: '1.2.0',
  },
  {
    id: 'integration-testing',
    title: 'Integration Testing',
    category: 'testing',
    description: 'Integration testing patterns for microservices architecture.',
    preview: 'Learn how to test service interactions, database integrations, and external API dependencies...',
    downloadUrl: '/standards/integration-testing.pdf',
    lastUpdated: '2024-02-22',
    version: '1.0.0',
  },
];
