import { AppTemplate } from '../AppTemplates/mockData';

export type DeploymentTarget = 'kubernetes' | 'docker' | 'vm';

export interface AppConfig {
  name: string;
  description: string;
  version: string;
  environmentVariables: { key: string; value: string }[];
}

export interface InfrastructureConfig {
  deploymentTarget: DeploymentTarget;
  replicas: number;
  cpuLimit: string;
  memoryLimit: string;
  autoScaling: boolean;
  minReplicas: number;
  maxReplicas: number;
}

export interface DeploymentStatus {
  step: number;
  stepName: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  message: string;
}

export interface DeployState {
  selectedTemplate: AppTemplate | null;
  appConfig: AppConfig;
  infrastructureConfig: InfrastructureConfig;
  deploymentStatus: 'idle' | 'deploying' | 'success' | 'failed';
  deploymentLogs: string[];
  deploymentSteps: DeploymentStatus[];
}

export const defaultAppConfig: AppConfig = {
  name: '',
  description: '',
  version: '1.0.0',
  environmentVariables: [],
};

export const defaultInfrastructureConfig: InfrastructureConfig = {
  deploymentTarget: 'kubernetes',
  replicas: 2,
  cpuLimit: '500m',
  memoryLimit: '512Mi',
  autoScaling: false,
  minReplicas: 2,
  maxReplicas: 10,
};

export const deploymentSteps: DeploymentStatus[] = [
  { step: 1, stepName: 'Validating Configuration', status: 'pending', message: '' },
  { step: 2, stepName: 'Building Container Image', status: 'pending', message: '' },
  { step: 3, stepName: 'Pushing to Registry', status: 'pending', message: '' },
  { step: 4, stepName: 'Deploying to Cluster', status: 'pending', message: '' },
  { step: 5, stepName: 'Running Health Checks', status: 'pending', message: '' },
];
