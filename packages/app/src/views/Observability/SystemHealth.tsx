import {
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  withStyles,
  makeStyles,
} from '@material-ui/core';
import { SystemMetric } from './mockData';

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
  metricsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  metricItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(0.5),
  },
  metricHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricName: {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: theme.palette.text.primary,
  },
  metricValue: {
    fontSize: '0.875rem',
    fontWeight: 600,
  },
}));

const getProgressColor = (value: number): string => {
  if (value < 50) return '#36B37E';
  if (value < 75) return '#FFAB00';
  return '#FF5630';
};

const ColoredLinearProgress = withStyles({
  root: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#f0f0f0',
  },
})(LinearProgress);

interface SystemHealthProps {
  metrics: SystemMetric[];
}

export const SystemHealth = ({ metrics }: SystemHealthProps) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography className={classes.title}>System Health</Typography>
        <Box className={classes.metricsContainer}>
          {metrics.map(metric => (
            <Box key={metric.name} className={classes.metricItem}>
              <Box className={classes.metricHeader}>
                <Typography className={classes.metricName}>
                  {metric.name}
                </Typography>
                <Typography
                  className={classes.metricValue}
                  style={{ color: getProgressColor(metric.value) }}
                >
                  {metric.value}
                  {metric.unit}
                </Typography>
              </Box>
              <ColoredLinearProgress
                variant="determinate"
                value={metric.value}
                style={{
                  // @ts-expect-error - MUI v4 allows custom color on bar
                  barColorPrimary: getProgressColor(metric.value),
                }}
              />
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
