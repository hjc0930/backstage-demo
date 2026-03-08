export interface Agent {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  available: boolean;
  capabilities: string[];
}

export const availableAgents: Agent[] = [
  {
    id: 'code-assistant',
    name: 'Code Assistant',
    description: 'Intelligent code completion and generation powered by advanced AI models. Get context-aware suggestions as you type.',
    icon: 'Code',
    category: 'Development',
    available: true,
    capabilities: ['Code completion', 'Code generation', 'Syntax highlighting', 'Error detection'],
  },
  {
    id: 'debug-helper',
    name: 'Debug Helper',
    description: 'Automatically analyze errors and exceptions to identify root causes and suggest potential fixes.',
    icon: 'BugReport',
    category: 'Development',
    available: true,
    capabilities: ['Error analysis', 'Stack trace parsing', 'Fix suggestions', 'Log analysis'],
  },
  {
    id: 'api-designer',
    name: 'API Designer',
    description: 'Design and document RESTful and GraphQL APIs with automatic schema generation and validation.',
    icon: 'Api',
    category: 'Architecture',
    available: true,
    capabilities: ['API design', 'Schema generation', 'Documentation', 'Validation'],
  },
  {
    id: 'test-generator',
    name: 'Test Generator',
    description: 'Automatically generate comprehensive unit and integration tests based on your codebase and requirements.',
    icon: 'Science',
    category: 'Testing',
    available: true,
    capabilities: ['Unit test generation', 'Integration tests', 'Mock data creation', 'Coverage analysis'],
  },
  {
    id: 'doc-writer',
    name: 'Doc Writer',
    description: 'Automatically generate and maintain code documentation, README files, and API references.',
    icon: 'Description',
    category: 'Documentation',
    available: true,
    capabilities: ['Code documentation', 'README generation', 'API docs', 'JSDoc comments'],
  },
  {
    id: 'code-reviewer',
    name: 'Code Reviewer',
    description: 'AI-powered code review assistant that provides feedback on code quality, best practices, and potential issues.',
    icon: 'RateReview',
    category: 'Quality',
    available: true,
    capabilities: ['Code review', 'Best practices', 'Security checks', 'Performance analysis'],
  },
];

export const unavailableAgents: Agent[] = [
  {
    id: 'security-scanner',
    name: 'Security Scanner',
    description: 'Comprehensive security vulnerability scanning and penetration testing for your applications.',
    icon: 'Security',
    category: 'Security',
    available: false,
    capabilities: ['Vulnerability scanning', 'Penetration testing', 'Compliance checks', 'Security reports'],
  },
  {
    id: 'performance-optimizer',
    name: 'Performance Optimizer',
    description: 'Analyze and optimize application performance with intelligent suggestions and automated refactoring.',
    icon: 'Speed',
    category: 'Performance',
    available: false,
    capabilities: ['Performance analysis', 'Bottleneck detection', 'Optimization tips', 'Benchmarking'],
  },
  {
    id: 'data-analyst',
    name: 'Data Analyst',
    description: 'Advanced data analysis and visualization capabilities for understanding your application metrics.',
    icon: 'Analytics',
    category: 'Analytics',
    available: false,
    capabilities: ['Data analysis', 'Visualization', 'Report generation', 'Trend detection'],
  },
  {
    id: 'infrastructure-planner',
    name: 'Infrastructure Planner',
    description: 'Plan and design cloud infrastructure with cost optimization and scalability recommendations.',
    icon: 'Cloud',
    category: 'Infrastructure',
    available: false,
    capabilities: ['Infrastructure design', 'Cost estimation', 'Scalability planning', 'Resource optimization'],
  },
  {
    id: 'compliance-checker',
    name: 'Compliance Checker',
    description: 'Automated compliance checking against industry standards like SOC2, GDPR, HIPAA, and more.',
    icon: 'VerifiedUser',
    category: 'Compliance',
    available: false,
    capabilities: ['Compliance scanning', 'Policy validation', 'Audit reports', 'Remediation tips'],
  },
  {
    id: 'ml-pipeline-builder',
    name: 'ML Pipeline Builder',
    description: 'Design and build machine learning pipelines with automated model training and deployment.',
    icon: 'PrecisionManufacturing',
    category: 'Machine Learning',
    available: false,
    capabilities: ['Pipeline design', 'Model training', 'AutoML', 'Model deployment'],
  },
];
