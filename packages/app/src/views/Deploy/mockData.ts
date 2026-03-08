import { DeploymentStatus } from './types';

export const mockDeploymentLogs = [
  '[INFO] Starting deployment process...',
  '[INFO] Validating application configuration...',
  '[INFO] Configuration validated successfully',
  '[INFO] Building container image...',
  '[INFO] Step 1/5: Fetching base image',
  '[INFO] Step 2/5: Installing dependencies',
  '[INFO] Step 3/5: Copying application files',
  '[INFO] Step 4/5: Building application',
  '[INFO] Step 5/5: Finalizing image',
  '[INFO] Container image built successfully',
  '[INFO] Pushing image to registry...',
  '[INFO] Image pushed: my-registry.example.com/app:v1.0.0',
  '[INFO] Creating Kubernetes deployment...',
  '[INFO] Deployment created: my-app-deployment',
  '[INFO] Creating Kubernetes service...',
  '[INFO] Service created: my-app-service',
  '[INFO] Waiting for pods to be ready...',
  '[INFO] Pod 1/2: Running',
  '[INFO] Pod 2/2: Running',
  '[INFO] Running health checks...',
  '[INFO] Health check passed: /health -> 200 OK',
  '[INFO] Health check passed: /ready -> 200 OK',
  '[SUCCESS] Deployment completed successfully!',
];

export const getMockDeploymentSteps = (): DeploymentStatus[] => [
  { step: 1, stepName: 'Validating Configuration', status: 'completed', message: 'Configuration is valid' },
  { step: 2, stepName: 'Building Container Image', status: 'completed', message: 'Image built: app:v1.0.0' },
  { step: 3, stepName: 'Pushing to Registry', status: 'completed', message: 'Pushed to registry' },
  { step: 4, stepName: 'Deploying to Cluster', status: 'completed', message: 'Deployed 2 replicas' },
  { step: 5, stepName: 'Running Health Checks', status: 'completed', message: 'All health checks passed' },
];
