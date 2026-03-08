import { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Button, LinearProgress, Chip, makeStyles } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { useNavigate } from 'react-router-dom';
import { DeploymentStatus } from '../types';
import { mockDeploymentLogs, getMockDeploymentSteps } from '../mockData';

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2),
  },
  statusCard: {
    marginBottom: theme.spacing(3),
    textAlign: 'center',
    padding: theme.spacing(4),
  },
  successIcon: {
    fontSize: 64,
    color: theme.palette.success.main,
    marginBottom: theme.spacing(2),
  },
  errorIcon: {
    fontSize: 64,
    color: theme.palette.error.main,
    marginBottom: theme.spacing(2),
  },
  progressIcon: {
    fontSize: 64,
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
    animation: '$spin 2s linear infinite',
  },
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
  statusTitle: {
    fontSize: '1.5rem',
    fontWeight: 600,
    marginBottom: theme.spacing(1),
  },
  statusMessage: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(2),
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: theme.spacing(3),
  },
  stepsContainer: {
    marginBottom: theme.spacing(3),
  },
  stepItem: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    padding: theme.spacing(1.5),
    marginBottom: theme.spacing(1),
    backgroundColor: theme.palette.background.default,
    borderRadius: 8,
  },
  stepIcon: {
    fontSize: 24,
  },
  stepCompleted: {
    color: theme.palette.success.main,
  },
  stepInProgress: {
    color: theme.palette.primary.main,
  },
  stepPending: {
    color: theme.palette.text.disabled,
  },
  stepName: {
    flex: 1,
  },
  logsContainer: {
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    padding: theme.spacing(2),
    maxHeight: 300,
    overflow: 'auto',
    fontFamily: 'monospace',
    fontSize: '0.85rem',
    marginBottom: theme.spacing(3),
  },
  logLine: {
    color: '#d4d4d4',
    marginBottom: theme.spacing(0.5),
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-all',
  },
  logSuccess: {
    color: '#4caf50',
  },
  logError: {
    color: '#f44336',
  },
  logInfo: {
    color: '#2196f3',
  },
  actionButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing(2),
    marginTop: theme.spacing(3),
  },
}));

interface DeploymentStatusStepProps {
  appName: string;
  onComplete: () => void;
}

export const DeploymentStatusStep = ({ appName, onComplete }: DeploymentStatusStepProps) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'deploying' | 'success' | 'failed'>('deploying');
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [steps, setSteps] = useState<DeploymentStatus[]>(getMockDeploymentSteps().map(s => ({ ...s, status: 'pending' as const })));

  useEffect(() => {
    const simulateDeployment = async () => {
      for (let i = 0; i < mockDeploymentLogs.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 300));
        setLogs(prev => [...prev, mockDeploymentLogs[i]]);
        setProgress(((i + 1) / mockDeploymentLogs.length) * 100);

        // Update steps
        const stepIndex = Math.floor((i / mockDeploymentLogs.length) * steps.length);
        setSteps(prev => prev.map((step, idx) => {
          if (idx < stepIndex) {
            return { ...step, status: 'completed' as const };
          } else if (idx === stepIndex) {
            return { ...step, status: 'in_progress' as const };
          }
          return step;
        }));
      }

      // Complete all steps
      setSteps(prev => prev.map(step => ({ ...step, status: 'completed' as const })));
      setStatus('success');
      onComplete();
    };

    simulateDeployment();
  }, [onComplete]);

  const getLogClassName = (log: string) => {
    if (log.startsWith('[SUCCESS]')) return classes.logSuccess;
    if (log.startsWith('[ERROR]')) return classes.logError;
    if (log.startsWith('[INFO]')) return classes.logInfo;
    return classes.logLine;
  };

  const getStepIcon = (stepStatus: string) => {
    switch (stepStatus) {
      case 'completed':
        return <CheckCircleIcon className={`${classes.stepIcon} ${classes.stepCompleted}`} />;
      case 'in_progress':
        return <HourglassEmptyIcon className={`${classes.stepIcon} ${classes.stepInProgress}`} />;
      default:
        return <HourglassEmptyIcon className={`${classes.stepIcon} ${classes.stepPending}`} />;
    }
  };

  const handleViewApplication = () => {
    window.open(`https://apps.example.com/${appName}`, '_blank');
  };

  const handleBackToTemplates = () => {
    navigate('/app-templates');
  };

  return (
    <Box className={classes.container}>
      <Card className={classes.statusCard}>
        <CardContent>
          {status === 'deploying' && (
            <>
              <HourglassEmptyIcon className={classes.progressIcon} />
              <Typography className={classes.statusTitle}>Deploying {appName}...</Typography>
              <Typography className={classes.statusMessage}>
                Please wait while we deploy your application.
              </Typography>
            </>
          )}
          {status === 'success' && (
            <>
              <CheckCircleIcon className={classes.successIcon} />
              <Typography className={classes.statusTitle}>Deployment Successful!</Typography>
              <Typography className={classes.statusMessage}>
                Your application has been deployed successfully and is now live.
              </Typography>
            </>
          )}
          {status === 'failed' && (
            <>
              <ErrorIcon className={classes.errorIcon} />
              <Typography className={classes.statusTitle}>Deployment Failed</Typography>
              <Typography className={classes.statusMessage}>
                There was an error during deployment. Please check the logs below.
              </Typography>
            </>
          )}
          <LinearProgress
            variant="determinate"
            value={progress}
            className={classes.progressBar}
          />
          <Chip label={`${Math.round(progress)}% Complete`} color="primary" />
        </CardContent>
      </Card>

      <Typography variant="h6" gutterBottom>
        Deployment Steps
      </Typography>
      <Box className={classes.stepsContainer}>
        {steps.map(step => (
          <Box key={step.step} className={classes.stepItem}>
            {getStepIcon(step.status)}
            <Typography className={classes.stepName}>{step.stepName}</Typography>
            {step.status === 'completed' && (
              <Chip label="Completed" size="small" color="primary" />
            )}
            {step.status === 'in_progress' && (
              <Chip label="In Progress" size="small" color="secondary" />
            )}
            {step.status === 'pending' && (
              <Chip label="Pending" size="small" />
            )}
          </Box>
        ))}
      </Box>

      <Typography variant="h6" gutterBottom>
        Deployment Logs
      </Typography>
      <Box className={classes.logsContainer}>
        {logs.map((log, index) => (
          <Typography key={index} className={getLogClassName(log)}>
            {log}
          </Typography>
        ))}
      </Box>

      {status === 'success' && (
        <Box className={classes.actionButtons}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<OpenInNewIcon />}
            onClick={handleViewApplication}
          >
            View Application
          </Button>
          <Button
            variant="outlined"
            onClick={handleBackToTemplates}
          >
            Back to Templates
          </Button>
        </Box>
      )}
    </Box>
  );
};
