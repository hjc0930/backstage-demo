import { useState, useEffect } from 'react';
import { Content, Header, Page } from '@backstage/core-components';
import { Grid, Box, Typography, Button, makeStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useApi } from '@backstage/core-plugin-api';
import { catalogApiRef } from '@backstage/plugin-catalog-react';
import { useNavigate } from 'react-router-dom';
import AiChatModule from './AiChatModule';
import ExploreFeatures from './ExploreFeatures';
import QuickActions from './QuickActions';
import RecentlyUpdatedApis from './RecentlyUpdatedApis';

const useWelcomeCardStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#0052CC',
    color: '#fff',
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
  },
  title: {
    color: '#fff',
    fontWeight: 700,
    marginBottom: theme.spacing(1.5),
    fontSize: '1.5rem',
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '0.9rem',
    marginBottom: theme.spacing(2),
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    height: '100%',
  },
  button: {
    backgroundColor: '#fff',
    color: '#0052CC',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },
  },
  statsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  statsTitle: {
    color: '#fff',
    fontWeight: 600,
    marginBottom: theme.spacing(1.5),
    fontSize: '1rem',
  },
  statItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0.5, 0),
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    '&:last-child': {
      borderBottom: 'none',
    },
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: '0.85rem',
  },
  statValue: {
    color: '#fff',
    fontWeight: 600,
    fontSize: '1rem',
  },
}));

const StatItem = ({
  label,
  value,
  classes,
}: {
  label: string;
  value: number;
  classes: ReturnType<typeof useWelcomeCardStyles>;
}) => (
  <Box className={classes.statItem}>
    <Typography className={classes.statLabel}>{label}</Typography>
    <Typography className={classes.statValue}>{value}</Typography>
  </Box>
);

export const CustomDashboard = () => {
  const classes = useWelcomeCardStyles();
  const catalogApi = useApi(catalogApiRef);
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalApis: 0,
    activeServices: 0,
    teams: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      catalogApi.getEntities({ filter: { kind: 'api' } }),
      catalogApi.getEntities({ filter: { kind: 'component' } }),
      catalogApi.getEntities({ filter: { kind: 'group' } }),
    ]).then(([apis, components, groups]) => {
      const activeServices = components.items.filter(
        item => item.spec?.type === 'service',
      ).length;

      setStats({
        totalApis: apis.items.length,
        activeServices,
        teams: groups.items.length,
      });
      setLoading(false);
    });
  }, [catalogApi]);

  return (
    <Page themeId="tool">
      <Header title="Dashboard" subtitle="Internal Developer Portal" />
      <Content>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box className={classes.root}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={7}>
                  <Box className={classes.leftColumn}>
                    <Box>
                      <Typography variant="h5" className={classes.title}>
                        Welcome to the Internal Developer Portal
                      </Typography>
                      <Typography className={classes.subtitle}>
                        Your one-stop platform for APIs, documentation, and
                        engineering standards. Build faster with our
                        comprehensive catalog of services and resources.
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      className={classes.button}
                      startIcon={<SearchIcon />}
                      onClick={() => navigate('/api-docs')}
                    >
                      Browse APIs
                    </Button>
                  </Box>
                </Grid>
                <Grid item xs={12} md={5}>
                  <Box className={classes.statsContainer}>
                    <Typography className={classes.statsTitle}>
                      Platform Stats
                    </Typography>
                    {loading ? (
                      <Typography className={classes.statLabel}>
                        Loading...
                      </Typography>
                    ) : (
                      <>
                        <StatItem
                          label="Total APIs"
                          value={stats.totalApis}
                          classes={classes}
                        />
                        <StatItem
                          label="Active Services"
                          value={stats.activeServices}
                          classes={classes}
                        />
                        <StatItem
                          label="Teams"
                          value={stats.teams}
                          classes={classes}
                        />
                      </>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <AiChatModule />
          </Grid>
          <Grid item xs={12}>
            <QuickActions />
          </Grid>
          <Grid item xs={12}>
            <RecentlyUpdatedApis />
          </Grid>
          <Grid item xs={12}>
            <ExploreFeatures />
          </Grid>
        </Grid>
      </Content>
    </Page>
  );
};
