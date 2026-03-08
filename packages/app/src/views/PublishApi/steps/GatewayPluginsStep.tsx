import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Switch,
  FormControlLabel,
  TextField,
  MenuItem,
  Slider,
  Grid,
  Chip,
  makeStyles,
} from '@material-ui/core';
import type { StepProps } from '../types';
import { AUTH_TYPE_OPTIONS, AUTH_PROVIDER_OPTIONS, RATE_WINDOW_OPTIONS } from '../types';

const useStyles = makeStyles(theme => ({
  sectionTitle: {
    fontWeight: 600,
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
  helperText: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(2),
  },
  pluginCard: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
  },
  pluginHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(1),
  },
  pluginTitle: {
    fontWeight: 500,
  },
  pluginContent: {
    marginTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
  sliderContainer: {
    marginTop: theme.spacing(1),
    paddingRight: theme.spacing(2),
  },
  chipContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(0.5),
    marginTop: theme.spacing(1),
  },
}));

export const GatewayPluginsStep: React.FC<StepProps> = ({
  formData,
  updateFormData,
}) => {
  const classes = useStyles();

  const updateGatewayPlugins = (
    key: keyof typeof formData.gatewayPlugins,
    updates: Partial<typeof formData.gatewayPlugins[typeof key]>,
  ) => {
    updateFormData({
      gatewayPlugins: {
        ...formData.gatewayPlugins,
        [key]: {
          ...formData.gatewayPlugins[key],
          ...updates,
        },
      },
    });
  };

  const { gatewayPlugins } = formData;

  return (
    <div>
      <Typography variant="h6" className={classes.sectionTitle}>
        Gateway Plugins
      </Typography>
      <Typography variant="body2" className={classes.helperText}>
        Configure gateway plugins for your API including rate limiting, authentication, CORS, and caching.
      </Typography>

      {/* Rate Limiting */}
      <Paper className={classes.pluginCard}>
        <Box className={classes.pluginHeader}>
          <Typography className={classes.pluginTitle}>Rate Limiting</Typography>
          <FormControlLabel
            control={
              <Switch
                checked={gatewayPlugins.rateLimit.enabled}
                onChange={e =>
                  updateGatewayPlugins('rateLimit', { enabled: e.target.checked })
                }
                color="primary"
              />
            }
            label={gatewayPlugins.rateLimit.enabled ? 'Enabled' : 'Disabled'}
          />
        </Box>
        {gatewayPlugins.rateLimit.enabled && (
          <Box className={classes.pluginContent}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} sm={8}>
                <Typography gutterBottom>
                  Requests per window: {gatewayPlugins.rateLimit.requests}
                </Typography>
                <Box className={classes.sliderContainer}>
                  <Slider
                    value={gatewayPlugins.rateLimit.requests}
                    onChange={(_, value) =>
                      updateGatewayPlugins('rateLimit', { requests: value as number })
                    }
                    min={10}
                    max={10000}
                    step={10}
                    marks={[
                      { value: 100, label: '100' },
                      { value: 1000, label: '1000' },
                      { value: 5000, label: '5000' },
                      { value: 10000, label: '10000' },
                    ]}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  select
                  label="Time Window"
                  fullWidth
                  value={gatewayPlugins.rateLimit.window}
                  onChange={e =>
                    updateGatewayPlugins('rateLimit', {
                      window: e.target.value as typeof gatewayPlugins.rateLimit.window,
                    })
                  }
                >
                  {RATE_WINDOW_OPTIONS.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>

      {/* Authentication */}
      <Paper className={classes.pluginCard}>
        <Box className={classes.pluginHeader}>
          <Typography className={classes.pluginTitle}>Authentication</Typography>
          <FormControlLabel
            control={
              <Switch
                checked={gatewayPlugins.authentication.enabled}
                onChange={e =>
                  updateGatewayPlugins('authentication', { enabled: e.target.checked })
                }
                color="primary"
              />
            }
            label={gatewayPlugins.authentication.enabled ? 'Enabled' : 'Disabled'}
          />
        </Box>
        {gatewayPlugins.authentication.enabled && (
          <Box className={classes.pluginContent}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Authentication Type"
                  fullWidth
                  value={gatewayPlugins.authentication.type}
                  onChange={e =>
                    updateGatewayPlugins('authentication', {
                      type: e.target.value as typeof gatewayPlugins.authentication.type,
                    })
                  }
                >
                  {AUTH_TYPE_OPTIONS.filter(o => o.value !== 'None').map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Provider"
                  fullWidth
                  value={gatewayPlugins.authentication.provider || ''}
                  onChange={e =>
                    updateGatewayPlugins('authentication', { provider: e.target.value })
                  }
                >
                  {AUTH_PROVIDER_OPTIONS.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>

      {/* CORS */}
      <Paper className={classes.pluginCard}>
        <Box className={classes.pluginHeader}>
          <Typography className={classes.pluginTitle}>CORS (Cross-Origin Resource Sharing)</Typography>
          <FormControlLabel
            control={
              <Switch
                checked={gatewayPlugins.cors.enabled}
                onChange={e =>
                  updateGatewayPlugins('cors', { enabled: e.target.checked })
                }
                color="primary"
              />
            }
            label={gatewayPlugins.cors.enabled ? 'Enabled' : 'Disabled'}
          />
        </Box>
        {gatewayPlugins.cors.enabled && (
          <Box className={classes.pluginContent}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Allowed Origins
            </Typography>
            <Box className={classes.chipContainer}>
              {gatewayPlugins.cors.origins.map(origin => (
                <Chip
                  key={origin}
                  label={origin}
                  onDelete={() =>
                    updateGatewayPlugins('cors', {
                      origins: gatewayPlugins.cors.origins.filter(o => o !== origin),
                    })
                  }
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>
            <Box mt={2}>
              <TextField
                placeholder="Add origin (e.g., https://example.com)"
                fullWidth
                size="small"
                onKeyPress={e => {
                  if (e.key === 'Enter') {
                    const target = e.target as HTMLInputElement;
                    if (target.value && !gatewayPlugins.cors.origins.includes(target.value)) {
                      updateGatewayPlugins('cors', {
                        origins: [...gatewayPlugins.cors.origins, target.value],
                      });
                      target.value = '';
                    }
                  }
                }}
              />
            </Box>
          </Box>
        )}
      </Paper>

      {/* Caching */}
      <Paper className={classes.pluginCard}>
        <Box className={classes.pluginHeader}>
          <Typography className={classes.pluginTitle}>Response Caching</Typography>
          <FormControlLabel
            control={
              <Switch
                checked={gatewayPlugins.caching.enabled}
                onChange={e =>
                  updateGatewayPlugins('caching', { enabled: e.target.checked })
                }
                color="primary"
              />
            }
            label={gatewayPlugins.caching.enabled ? 'Enabled' : 'Disabled'}
          />
        </Box>
        {gatewayPlugins.caching.enabled && (
          <Box className={classes.pluginContent}>
            <Typography gutterBottom>
              Cache TTL (Time to Live): {gatewayPlugins.caching.ttl} seconds
            </Typography>
            <Box className={classes.sliderContainer}>
              <Slider
                value={gatewayPlugins.caching.ttl}
                onChange={(_, value) =>
                  updateGatewayPlugins('caching', { ttl: value as number })
                }
                min={0}
                max={3600}
                step={60}
                marks={[
                  { value: 0, label: '0s' },
                  { value: 300, label: '5m' },
                  { value: 900, label: '15m' },
                  { value: 1800, label: '30m' },
                  { value: 3600, label: '1h' },
                ]}
              />
            </Box>
          </Box>
        )}
      </Paper>
    </div>
  );
};

export default GatewayPluginsStep;
