import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Chip,
  Typography,
  Box,
  Grid,
  makeStyles,
} from '@material-ui/core';
import {
  StatusOK,
  StatusWarning,
  StatusError,
} from '@backstage/core-components';
import type { ApiInfoCardProps } from './types';

const useStyles = makeStyles(theme => ({
  card: {
    marginBottom: theme.spacing(2),
  },
  chip: {
    marginRight: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
  },
  label: {
    fontWeight: 600,
    color: theme.palette.text.secondary,
  },
  value: {
    color: theme.palette.text.primary,
  },
  infoRow: {
    marginBottom: theme.spacing(1.5),
  },
}));

export const ApiInfoCard: React.FC<ApiInfoCardProps> = ({ api }) => {
  const classes = useStyles();

  const renderStatus = () => {
    switch (api.status) {
      case 'Active':
        return <StatusOK>{api.status}</StatusOK>;
      case 'Deprecated':
        return <StatusError>{api.status}</StatusError>;
      case 'Draft':
        return <StatusWarning>{api.status}</StatusWarning>;
      default:
        return null;
    }
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        title={api.name}
        subheader={
          <Box display="flex" alignItems="center" mt={0.5}>
            <Typography variant="body2" color="textSecondary">
              Version {api.version}
            </Typography>
            <Box ml={2}>{renderStatus()}</Box>
          </Box>
        }
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" paragraph>
          {api.description}
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <div className={classes.infoRow}>
              <Typography variant="caption" className={classes.label}>
                Owner
              </Typography>
              <Typography variant="body2" className={classes.value}>
                {api.owner}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.infoRow}>
              <Typography variant="caption" className={classes.label}>
                Team
              </Typography>
              <Typography variant="body2" className={classes.value}>
                {api.team}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.infoRow}>
              <Typography variant="caption" className={classes.label}>
                Type
              </Typography>
              <Typography variant="body2" className={classes.value}>
                {api.type}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.infoRow}>
              <Typography variant="caption" className={classes.label}>
                Visibility
              </Typography>
              <Typography variant="body2" className={classes.value}>
                {api.visibility.charAt(0).toUpperCase() + api.visibility.slice(1)}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.infoRow}>
              <Typography variant="caption" className={classes.label}>
                Category
              </Typography>
              <Typography variant="body2" className={classes.value}>
                {api.category}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.infoRow}>
              <Typography variant="caption" className={classes.label}>
                Last Updated
              </Typography>
              <Typography variant="body2" className={classes.value}>
                {new Date(api.updatedAt).toLocaleDateString()}
              </Typography>
            </div>
          </Grid>
        </Grid>

        <Box mt={2}>
          <Typography variant="caption" className={classes.label}>
            Tags
          </Typography>
          <Box mt={0.5}>
            {api.tags.map(tag => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                className={classes.chip}
              />
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
