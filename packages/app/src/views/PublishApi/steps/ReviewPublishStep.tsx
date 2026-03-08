import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Chip,
  Divider,
  CircularProgress,
  makeStyles,
} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import type { StepProps } from '../types';

const useStyles = makeStyles(theme => ({
  sectionTitle: {
    fontWeight: 600,
    marginBottom: theme.spacing(2),
  },
  summaryCard: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
  },
  summaryTitle: {
    fontWeight: 500,
    marginBottom: theme.spacing(1),
    color: '#0052CC',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0.5, 0),
    '&:not(:last-child)': {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
  },
  summaryLabel: {
    color: theme.palette.text.secondary,
  },
  summaryValue: {
    fontWeight: 500,
  },
  chip: {
    marginRight: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
  },
  publishButton: {
    minWidth: 150,
    height: 48,
  },
  successContainer: {
    textAlign: 'center',
    padding: theme.spacing(4),
  },
  successIcon: {
    fontSize: 80,
    color: '#4caf50',
    marginBottom: theme.spacing(2),
  },
  errorContainer: {
    textAlign: 'center',
    padding: theme.spacing(4),
  },
  errorIcon: {
    fontSize: 80,
    color: '#f44336',
    marginBottom: theme.spacing(2),
  },
}));

interface ReviewPublishStepProps extends StepProps {
  onPublish: () => Promise<void>;
  publishStatus: 'idle' | 'publishing' | 'success' | 'error';
  publishedApiId?: string;
}

export const ReviewPublishStep: React.FC<ReviewPublishStepProps> = ({
  formData,
  onPublish,
  publishStatus,
  publishedApiId,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const renderPluginStatus = (enabled: boolean) => (
    <Chip
      size="small"
      label={enabled ? 'Enabled' : 'Disabled'}
      color={enabled ? 'primary' : 'default'}
    />
  );

  if (publishStatus === 'success') {
    return (
      <Box className={classes.successContainer}>
        <CheckCircleIcon className={classes.successIcon} />
        <Typography variant="h5" gutterBottom>
          API Published Successfully!
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Your API has been registered and is now available in the catalog.
        </Typography>
        <Box mt={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/api-detail/${publishedApiId || 'new'}`)}
            style={{ marginRight: 8 }}
          >
            View API Details
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate('/')}
          >
            Go to Dashboard
          </Button>
        </Box>
      </Box>
    );
  }

  if (publishStatus === 'error') {
    return (
      <Box className={classes.errorContainer}>
        <ErrorIcon className={classes.errorIcon} />
        <Typography variant="h5" gutterBottom>
          Publication Failed
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          There was an error publishing your API. Please try again.
        </Typography>
        <Box mt={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={onPublish}
          >
            Try Again
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <div>
      <Typography variant="h6" className={classes.sectionTitle}>
        Review & Publish
      </Typography>
      <Typography variant="body2" color="textSecondary" paragraph>
        Review your API configuration before publishing.
      </Typography>

      <Grid container spacing={3}>
        {/* Service Definition Summary */}
        <Grid item xs={12} md={6}>
          <Paper className={classes.summaryCard}>
            <Typography className={classes.summaryTitle}>Service Definition</Typography>
            <Box className={classes.summaryRow}>
              <span className={classes.summaryLabel}>Service Name</span>
              <span className={classes.summaryValue}>{formData.serviceName || '-'}</span>
            </Box>
            <Box className={classes.summaryRow}>
              <span className={classes.summaryLabel}>Version</span>
              <span className={classes.summaryValue}>v{formData.version}</span>
            </Box>
            <Box className={classes.summaryRow}>
              <span className={classes.summaryLabel}>Owner</span>
              <span className={classes.summaryValue}>{formData.owner || '-'}</span>
            </Box>
            <Box className={classes.summaryRow}>
              <span className={classes.summaryLabel}>Team</span>
              <span className={classes.summaryValue}>{formData.team || '-'}</span>
            </Box>
            {formData.description && (
              <Box mt={1}>
                <Typography variant="caption" color="textSecondary">
                  Description
                </Typography>
                <Typography variant="body2">{formData.description}</Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* API Specification Summary */}
        <Grid item xs={12} md={6}>
          <Paper className={classes.summaryCard}>
            <Typography className={classes.summaryTitle}>API Specification</Typography>
            <Box className={classes.summaryRow}>
              <span className={classes.summaryLabel}>File</span>
              <span className={classes.summaryValue}>
                {formData.specFile ? formData.specFile.name : 'Not uploaded'}
              </span>
            </Box>
            <Box className={classes.summaryRow}>
              <span className={classes.summaryLabel}>Format</span>
              <span className={classes.summaryValue}>
                {formData.specContent ? formData.specType.toUpperCase() : '-'}
              </span>
            </Box>
            <Box className={classes.summaryRow}>
              <span className={classes.summaryLabel}>Detected Endpoints</span>
              <span className={classes.summaryValue}>
                {formData.detectedEndpoints.length} endpoints
              </span>
            </Box>
          </Paper>
        </Grid>

        {/* Gateway Plugins Summary */}
        <Grid item xs={12} md={6}>
          <Paper className={classes.summaryCard}>
            <Typography className={classes.summaryTitle}>Gateway Plugins</Typography>
            <Box className={classes.summaryRow}>
              <span className={classes.summaryLabel}>Rate Limiting</span>
              {renderPluginStatus(formData.gatewayPlugins.rateLimit.enabled)}
              {formData.gatewayPlugins.rateLimit.enabled && (
                <span style={{ marginLeft: 8, fontSize: '0.85rem' }}>
                  {formData.gatewayPlugins.rateLimit.requests} req/{formData.gatewayPlugins.rateLimit.window}
                </span>
              )}
            </Box>
            <Box className={classes.summaryRow}>
              <span className={classes.summaryLabel}>Authentication</span>
              {renderPluginStatus(formData.gatewayPlugins.authentication.enabled)}
              {formData.gatewayPlugins.authentication.enabled && (
                <span style={{ marginLeft: 8, fontSize: '0.85rem' }}>
                  {formData.gatewayPlugins.authentication.type}
                </span>
              )}
            </Box>
            <Box className={classes.summaryRow}>
              <span className={classes.summaryLabel}>CORS</span>
              {renderPluginStatus(formData.gatewayPlugins.cors.enabled)}
            </Box>
            <Box className={classes.summaryRow}>
              <span className={classes.summaryLabel}>Caching</span>
              {renderPluginStatus(formData.gatewayPlugins.caching.enabled)}
              {formData.gatewayPlugins.caching.enabled && (
                <span style={{ marginLeft: 8, fontSize: '0.85rem' }}>
                  {formData.gatewayPlugins.caching.ttl}s TTL
                </span>
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Portal Settings Summary */}
        <Grid item xs={12} md={6}>
          <Paper className={classes.summaryCard}>
            <Typography className={classes.summaryTitle}>Portal Settings</Typography>
            <Box className={classes.summaryRow}>
              <span className={classes.summaryLabel}>Visibility</span>
              <Chip
                size="small"
                label={formData.visibility.charAt(0).toUpperCase() + formData.visibility.slice(1)}
                color={formData.visibility === 'public' ? 'primary' : 'default'}
              />
            </Box>
            <Box className={classes.summaryRow}>
              <span className={classes.summaryLabel}>Category</span>
              <span className={classes.summaryValue}>{formData.category || '-'}</span>
            </Box>
            <Box mt={1}>
              <Typography variant="caption" color="textSecondary">
                Tags
              </Typography>
              <Box mt={0.5}>
                {formData.tags.length > 0 ? (
                  formData.tags.map(tag => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      className={classes.chip}
                    />
                  ))
                ) : (
                  <Typography variant="body2" color="textSecondary">
                    No tags selected
                  </Typography>
                )}
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Divider style={{ margin: '24px 0' }} />

      <Box display="flex" justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.publishButton}
          onClick={onPublish}
          disabled={publishStatus === 'publishing'}
          startIcon={
            publishStatus === 'publishing' ? (
              <CircularProgress size={20} color="inherit" />
            ) : null
          }
        >
          {publishStatus === 'publishing' ? 'Publishing...' : 'Publish API'}
        </Button>
      </Box>
    </div>
  );
};

export default ReviewPublishStep;
