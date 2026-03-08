import { Content } from '@backstage/core-components';
import { Box, Grid, makeStyles } from '@material-ui/core';
import { StatCard } from './StatCard';
import { ApplicationList } from './ApplicationList';
import { ApiStatusList } from './ApiStatusList';
import { SystemHealth } from './SystemHealth';
import {
  statsData,
  applicationsData,
  apiEndpointsData,
  systemMetricsData,
} from './mockData';

const useStyles = makeStyles(theme => ({
  statsRow: {
    marginBottom: theme.spacing(3),
  },
  contentRow: {
    marginBottom: theme.spacing(3),
  },
}));

export const Observability = () => {
  const classes = useStyles();

  return (
    <Content>
      {/* Stats Row */}
      <Box className={classes.statsRow}>
        <Grid container spacing={3}>
          {statsData.map(stat => (
            <Grid item xs={6} sm={3} key={stat.title}>
              <StatCard stat={stat} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Application Status and API Status Row */}
      <Box className={classes.contentRow}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <ApplicationList applications={applicationsData} />
          </Grid>
          <Grid item xs={12} md={4}>
            <ApiStatusList endpoints={apiEndpointsData} />
          </Grid>
        </Grid>
      </Box>

      {/* System Health Row */}
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <SystemHealth metrics={systemMetricsData} />
          </Grid>
        </Grid>
      </Box>
    </Content>
  );
};
