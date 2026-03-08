import { Box, Typography, Card, CardContent, Button, Chip, Grid, makeStyles } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { AppTemplate } from '../../AppTemplates/mockData';
import { AppConfig, InfrastructureConfig } from '../types';

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2),
  },
  sectionTitle: {
    fontSize: '1.1rem',
    fontWeight: 600,
    marginBottom: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  sectionIcon: {
    color: theme.palette.primary.main,
  },
  reviewCard: {
    marginBottom: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
  },
  cardTitle: {
    fontSize: '1rem',
    fontWeight: 600,
    marginBottom: theme.spacing(1.5),
    color: theme.palette.primary.main,
  },
  detailRow: {
    display: 'flex',
    marginBottom: theme.spacing(1),
  },
  detailLabel: {
    fontWeight: 500,
    width: 150,
    color: theme.palette.text.secondary,
  },
  detailValue: {
    flex: 1,
  },
  envList: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
  },
  envChip: {
    justifyContent: 'flex-start',
    fontFamily: 'monospace',
  },
  deployButton: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(1.5, 4),
  },
  warningText: {
    color: theme.palette.warning.dark,
    marginTop: theme.spacing(2),
    fontSize: '0.9rem',
  },
}));

interface ReviewDeployStepProps {
  template: AppTemplate;
  appConfig: AppConfig;
  infraConfig: InfrastructureConfig;
  onDeploy: () => void;
}

export const ReviewDeployStep = ({
  template,
  appConfig,
  infraConfig,
  onDeploy,
}: ReviewDeployStepProps) => {
  const classes = useStyles();

  const getDeploymentTargetLabel = (target: string) => {
    const labels: Record<string, string> = {
      kubernetes: 'Kubernetes Cluster',
      docker: 'Docker Container',
      vm: 'Virtual Machine',
    };
    return labels[target] || target;
  };

  return (
    <Box className={classes.container}>
      <Typography className={classes.sectionTitle}>
        <PlayArrowIcon className={classes.sectionIcon} />
        Review Your Configuration
      </Typography>

      <Typography color="textSecondary" paragraph>
        Please review all the configuration details below before deploying your application.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card className={classes.reviewCard}>
            <CardContent>
              <Typography className={classes.cardTitle}>Template</Typography>
              <Box className={classes.detailRow}>
                <Typography className={classes.detailLabel}>Name:</Typography>
                <Typography className={classes.detailValue}>{template.name}</Typography>
              </Box>
              <Box className={classes.detailRow}>
                <Typography className={classes.detailLabel}>Category:</Typography>
                <Chip
                  label={template.category}
                  size="small"
                  color="primary"
                  style={{ textTransform: 'capitalize' }}
                />
              </Box>
              <Box className={classes.detailRow}>
                <Typography className={classes.detailLabel}>Tech Stack:</Typography>
                <Box display="flex" flexWrap="wrap">
                  {template.techStack.map(tech => (
                    <Chip key={tech} label={tech} size="small" variant="outlined" />
                  ))}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card className={classes.reviewCard}>
            <CardContent>
              <Typography className={classes.cardTitle}>Application</Typography>
              <Box className={classes.detailRow}>
                <Typography className={classes.detailLabel}>Name:</Typography>
                <Typography className={classes.detailValue}>
                  {appConfig.name || <em style={{ color: '#999' }}>Not specified</em>}
                </Typography>
              </Box>
              <Box className={classes.detailRow}>
                <Typography className={classes.detailLabel}>Version:</Typography>
                <Typography className={classes.detailValue}>{appConfig.version}</Typography>
              </Box>
              <Box className={classes.detailRow}>
                <Typography className={classes.detailLabel}>Description:</Typography>
                <Typography className={classes.detailValue}>
                  {appConfig.description || <em style={{ color: '#999' }}>None</em>}
                </Typography>
              </Box>
              {appConfig.environmentVariables.length > 0 && (
                <Box mt={1}>
                  <Typography className={classes.detailLabel}>Environment Variables:</Typography>
                  <Box className={classes.envList} mt={0.5}>
                    {appConfig.environmentVariables.map((env, index) => (
                      <Chip
                        key={index}
                        label={`${env.key} = ${env.value}`}
                        size="small"
                        className={classes.envChip}
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card className={classes.reviewCard}>
            <CardContent>
              <Typography className={classes.cardTitle}>Infrastructure</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Box className={classes.detailRow}>
                    <Typography className={classes.detailLabel}>Target:</Typography>
                    <Typography className={classes.detailValue}>
                      {getDeploymentTargetLabel(infraConfig.deploymentTarget)}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box className={classes.detailRow}>
                    <Typography className={classes.detailLabel}>Replicas:</Typography>
                    <Typography className={classes.detailValue}>{infraConfig.replicas}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box className={classes.detailRow}>
                    <Typography className={classes.detailLabel}>CPU:</Typography>
                    <Typography className={classes.detailValue}>{infraConfig.cpuLimit}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box className={classes.detailRow}>
                    <Typography className={classes.detailLabel}>Memory:</Typography>
                    <Typography className={classes.detailValue}>{infraConfig.memoryLimit}</Typography>
                  </Box>
                </Grid>
              </Grid>
              {infraConfig.autoScaling && (
                <Box mt={2}>
                  <Chip
                    label={`Auto Scaling: ${infraConfig.minReplicas} - ${infraConfig.maxReplicas} replicas`}
                    color="secondary"
                    size="small"
                  />
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {!appConfig.name.trim() && (
        <Typography className={classes.warningText}>
          Warning: App name is required. Please go back to Configure App step and provide a name.
        </Typography>
      )}

      <Box display="flex" justifyContent="center" mt={3}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<PlayArrowIcon />}
          onClick={onDeploy}
          disabled={!appConfig.name.trim()}
          className={classes.deployButton}
        >
          Deploy Application
        </Button>
      </Box>
    </Box>
  );
};
