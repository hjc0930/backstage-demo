import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
  Grid,
  makeStyles,
} from '@material-ui/core';
import { InfrastructureConfig, DeploymentTarget } from '../types';

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2),
  },
  sectionTitle: {
    fontSize: '1rem',
    fontWeight: 600,
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  formControl: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  switchContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  autoScalingOptions: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
    borderRadius: 8,
  },
  helperText: {
    color: theme.palette.text.secondary,
    fontSize: '0.85rem',
    marginTop: theme.spacing(0.5),
  },
}));

interface ConfigureInfraStepProps {
  config: InfrastructureConfig;
  onChange: (config: InfrastructureConfig) => void;
}

export const ConfigureInfraStep = ({ config, onChange }: ConfigureInfraStepProps) => {
  const classes = useStyles();

  const handleDeploymentTargetChange = (target: DeploymentTarget) => {
    onChange({ ...config, deploymentTarget: target });
  };

  const handleReplicasChange = (replicas: number) => {
    onChange({ ...config, replicas });
  };

  const handleCpuLimitChange = (cpuLimit: string) => {
    onChange({ ...config, cpuLimit });
  };

  const handleMemoryLimitChange = (memoryLimit: string) => {
    onChange({ ...config, memoryLimit });
  };

  const handleAutoScalingChange = (autoScaling: boolean) => {
    onChange({ ...config, autoScaling });
  };

  const handleMinReplicasChange = (minReplicas: number) => {
    onChange({ ...config, minReplicas });
  };

  const handleMaxReplicasChange = (maxReplicas: number) => {
    onChange({ ...config, maxReplicas });
  };

  return (
    <Box className={classes.container}>
      <Typography className={classes.sectionTitle}>Infrastructure Configuration</Typography>

      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel>Deployment Target</InputLabel>
        <Select
          value={config.deploymentTarget}
          onChange={e => handleDeploymentTargetChange(e.target.value as DeploymentTarget)}
          label="Deployment Target"
        >
          <MenuItem value="kubernetes">Kubernetes</MenuItem>
          <MenuItem value="docker">Docker</MenuItem>
          <MenuItem value="vm">Virtual Machine</MenuItem>
        </Select>
      </FormControl>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Replicas"
            variant="outlined"
            type="number"
            fullWidth
            value={config.replicas}
            onChange={e => handleReplicasChange(parseInt(e.target.value, 10) || 1)}
            inputProps={{ min: 1, max: 100 }}
            className={classes.textField}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="CPU Limit"
            variant="outlined"
            fullWidth
            value={config.cpuLimit}
            onChange={e => handleCpuLimitChange(e.target.value)}
            placeholder="500m"
            className={classes.textField}
            helperText="e.g., 500m, 1, 2"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Memory Limit"
            variant="outlined"
            fullWidth
            value={config.memoryLimit}
            onChange={e => handleMemoryLimitChange(e.target.value)}
            placeholder="512Mi"
            className={classes.textField}
            helperText="e.g., 256Mi, 1Gi"
          />
        </Grid>
      </Grid>

      <Box className={classes.switchContainer}>
        <FormControlLabel
          control={
            <Switch
              checked={config.autoScaling}
              onChange={e => handleAutoScalingChange(e.target.checked)}
              color="primary"
            />
          }
          label="Enable Auto Scaling"
        />
        <Typography className={classes.helperText}>
          Automatically scale the number of replicas based on CPU/memory usage.
        </Typography>
      </Box>

      {config.autoScaling && (
        <Box className={classes.autoScalingOptions}>
          <Typography className={classes.sectionTitle}>Auto Scaling Configuration</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Min Replicas"
                variant="outlined"
                type="number"
                fullWidth
                value={config.minReplicas}
                onChange={e => handleMinReplicasChange(parseInt(e.target.value, 10) || 1)}
                inputProps={{ min: 1, max: config.maxReplicas }}
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Max Replicas"
                variant="outlined"
                type="number"
                fullWidth
                value={config.maxReplicas}
                onChange={e => handleMaxReplicasChange(parseInt(e.target.value, 10) || 10)}
                inputProps={{ min: config.minReplicas, max: 100 }}
                className={classes.textField}
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};
