import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  Chip,
  makeStyles,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import type { GatewayInfoCardProps } from './types';

const useStyles = makeStyles(theme => ({
  card: {
    marginBottom: theme.spacing(2),
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(1, 0),
    borderBottom: `1px solid ${theme.palette.divider}`,
    '&:last-child': {
      borderBottom: 'none',
    },
  },
  label: {
    fontWeight: 500,
    color: theme.palette.text.secondary,
  },
  value: {
    color: theme.palette.text.primary,
  },
  enabledChip: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.contrastText,
  },
  disabledChip: {
    backgroundColor: theme.palette.grey[300],
    color: theme.palette.grey[700],
  },
  sectionTitle: {
    fontWeight: 600,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(0.5),
  },
}));

export const GatewayInfoCard: React.FC<GatewayInfoCardProps> = ({ gateway, auth }) => {
  const classes = useStyles();

  const renderBoolean = (value: boolean) => (
    <Chip
      size="small"
      icon={value ? <CheckIcon /> : <CloseIcon />}
      label={value ? 'Enabled' : 'Disabled'}
      className={value ? classes.enabledChip : classes.disabledChip}
    />
  );

  return (
    <Card className={classes.card}>
      <CardHeader title="Gateway Configuration" />
      <CardContent>
        <Typography className={classes.sectionTitle} variant="subtitle2">
          Gateway
        </Typography>
        <Box className={classes.infoRow}>
          <Typography variant="body2" className={classes.label}>
            Endpoint
          </Typography>
          <Typography variant="body2" className={classes.value}>
            {gateway.endpoint}
          </Typography>
        </Box>
        <Box className={classes.infoRow}>
          <Typography variant="body2" className={classes.label}>
            Rate Limit
          </Typography>
          <Typography variant="body2" className={classes.value}>
            {gateway.rateLimit}
          </Typography>
        </Box>
        <Box className={classes.infoRow}>
          <Typography variant="body2" className={classes.label}>
            CORS
          </Typography>
          {renderBoolean(gateway.corsEnabled)}
        </Box>
        <Box className={classes.infoRow}>
          <Typography variant="body2" className={classes.label}>
            Caching
          </Typography>
          {renderBoolean(gateway.cachingEnabled)}
        </Box>

        <Typography className={classes.sectionTitle} variant="subtitle2" style={{ marginTop: 16 }}>
          Authentication
        </Typography>
        <Box className={classes.infoRow}>
          <Typography variant="body2" className={classes.label}>
            Type
          </Typography>
          <Chip
            size="small"
            label={auth.type}
            color={auth.type === 'None' ? 'default' : 'primary'}
          />
        </Box>
        {auth.provider && (
          <Box className={classes.infoRow}>
            <Typography variant="body2" className={classes.label}>
              Provider
            </Typography>
            <Typography variant="body2" className={classes.value}>
              {auth.provider}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
