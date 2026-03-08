import { Content, Header, Page } from '@backstage/core-components';
import { Box, Typography, makeStyles } from '@material-ui/core';
import ShowChartIcon from '@material-ui/icons/ShowChart';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 400,
    textAlign: 'center',
    padding: theme.spacing(4),
  },
  icon: {
    fontSize: 80,
    color: '#0052CC',
    marginBottom: theme.spacing(3),
  },
  title: {
    fontSize: '2rem',
    fontWeight: 700,
    marginBottom: theme.spacing(2),
    color: theme.palette.text.primary,
  },
  subtitle: {
    fontSize: '1.1rem',
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(3),
    maxWidth: 500,
  },
  comingSoon: {
    display: 'inline-block',
    backgroundColor: '#0052CC',
    color: '#fff',
    padding: theme.spacing(1, 3),
    borderRadius: 20,
    fontSize: '0.9rem',
    fontWeight: 600,
  },
}));

export const Observability = () => {
  const classes = useStyles();

  return (
    <Page themeId="tool">
      <Header title="Observability" subtitle="Monitor your services" />
      <Content>
        <Box className={classes.container}>
          <ShowChartIcon className={classes.icon} />
          <Typography className={classes.title}>Monitoring & Observability</Typography>
          <Typography className={classes.subtitle}>
            Monitor the health and performance of your services in real-time.
            View metrics, traces, logs, and set up alerts for your applications.
          </Typography>
          <span className={classes.comingSoon}>Coming Soon</span>
        </Box>
      </Content>
    </Page>
  );
};
