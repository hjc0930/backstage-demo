import { Box, Card, CardContent, Typography, makeStyles } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/Warning';
import CancelIcon from '@material-ui/icons/Cancel';
import { ApiEndpoint } from './mockData';

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
    gap: theme.spacing(1),
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
    fontSize: 18,
  },
  path: {
    fontSize: '0.875rem',
    fontFamily: 'monospace',
    fontWeight: 500,
    color: theme.palette.text.primary,
  },
  latency: {
    fontSize: '0.75rem',
    fontWeight: 600,
    padding: '4px 8px',
    borderRadius: 4,
    minWidth: 60,
    textAlign: 'center',
  },
}));

const getStatusIcon = (
  status: ApiEndpoint['status'],
): React.ReactElement => {
  const icons: Record<ApiEndpoint['status'], React.ReactElement> = {
    operational: <CheckCircleIcon style={{ color: '#36B37E' }} />,
    degraded: <WarningIcon style={{ color: '#FFAB00' }} />,
    down: <CancelIcon style={{ color: '#FF5630' }} />,
  };
  return icons[status];
};

const getLatencyStyle = (
  status: ApiEndpoint['status'],
): React.CSSProperties => {
  const styles: Record<ApiEndpoint['status'], React.CSSProperties> = {
    operational: {
      backgroundColor: '#E3FCEF',
      color: '#36B37E',
    },
    degraded: {
      backgroundColor: '#FFFAE6',
      color: '#FF991F',
    },
    down: {
      backgroundColor: '#FFEBE6',
      color: '#FF5630',
    },
  };
  return styles[status];
};

interface ApiStatusListProps {
  endpoints: ApiEndpoint[];
}

export const ApiStatusList = ({ endpoints }: ApiStatusListProps) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography className={classes.title}>API Status</Typography>
        <Box className={classes.list}>
          {endpoints.map(endpoint => (
            <Box key={endpoint.path} className={classes.listItem}>
              <Box className={classes.leftSection}>
                <span className={classes.statusIcon}>
                  {getStatusIcon(endpoint.status)}
                </span>
                <Typography className={classes.path}>{endpoint.path}</Typography>
              </Box>
              <Typography
                className={classes.latency}
                style={getLatencyStyle(endpoint.status)}
              >
                {endpoint.status === 'down'
                  ? 'DOWN'
                  : `${endpoint.latency}ms`}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
