import { Box, Card, CardContent, Typography, makeStyles } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { Application } from './mockData';

const useStyles = makeStyles(theme => ({
  card: {
    height: '100%',
  },
  cardContent: {
    padding: theme.spacing(2),
    '&:last-child': {
      paddingBottom: theme.spacing(2),
    },
  },
  title: {
    fontSize: '1rem',
    fontWeight: 600,
    marginBottom: theme.spacing(2),
    color: theme.palette.text.primary,
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1.5),
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(1),
    borderRadius: 4,
    backgroundColor: theme.palette.background.default,
    transition: 'background-color 0.2s',
    '&:hover': {
      backgroundColor: theme.palette.grey[100],
    },
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  statusIcon: {
    fontSize: 12,
  },
  appName: {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: theme.palette.text.primary,
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
  status: {
    fontSize: '0.75rem',
    fontWeight: 500,
    textTransform: 'capitalize',
    minWidth: 60,
    textAlign: 'center',
  },
  uptime: {
    fontSize: '0.75rem',
    fontWeight: 600,
    color: theme.palette.text.secondary,
    minWidth: 45,
    textAlign: 'right',
  },
  instances: {
    fontSize: '0.7rem',
    color: theme.palette.text.hint,
    backgroundColor: theme.palette.grey[200],
    padding: '2px 6px',
    borderRadius: 4,
  },
}));

const getStatusColor = (status: Application['status']): string => {
  const colors: Record<Application['status'], string> = {
    healthy: '#36B37E',
    warning: '#FFAB00',
    error: '#FF5630',
  };
  return colors[status];
};

const getStatusLabel = (status: Application['status']): string => {
  const labels: Record<Application['status'], string> = {
    healthy: 'Healthy',
    warning: 'Warning',
    error: 'Error',
  };
  return labels[status];
};

interface ApplicationListProps {
  applications: Application[];
}

export const ApplicationList = ({ applications }: ApplicationListProps) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography className={classes.title}>Application Status</Typography>
        <Box className={classes.list}>
          {applications.map(app => (
            <Box key={app.name} className={classes.listItem}>
              <Box className={classes.leftSection}>
                <FiberManualRecordIcon
                  className={classes.statusIcon}
                  style={{ color: getStatusColor(app.status) }}
                />
                <Typography className={classes.appName}>{app.name}</Typography>
                <span className={classes.instances}>
                  {app.instances} instance{app.instances > 1 ? 's' : ''}
                </span>
              </Box>
              <Box className={classes.rightSection}>
                <Typography
                  className={classes.status}
                  style={{ color: getStatusColor(app.status) }}
                >
                  {getStatusLabel(app.status)}
                </Typography>
                <Typography className={classes.uptime}>
                  {app.uptime}%
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
