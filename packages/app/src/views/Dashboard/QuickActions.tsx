import { Grid, Box, Typography, Card, CardActionArea, makeStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import GavelIcon from '@material-ui/icons/Gavel';
import BarChartIcon from '@material-ui/icons/BarChart';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(3),
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: 600,
    marginBottom: theme.spacing(2),
    color: theme.palette.text.primary,
  },
  actionCard: {
    height: '100%',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      borderColor: '#0052CC',
      boxShadow: '0 2px 8px rgba(0, 82, 204, 0.15)',
    },
  },
  actionArea: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(3),
    minHeight: 120,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: '50%',
    backgroundColor: '#E3F2FD',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(1.5),
    color: '#0052CC',
  },
  actionLabel: {
    fontSize: '0.95rem',
    fontWeight: 500,
    color: theme.palette.text.primary,
    textAlign: 'center',
  },
  actionDescription: {
    fontSize: '0.75rem',
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(0.5),
    textAlign: 'center',
  },
}));

interface QuickActionItem {
  icon: React.ReactElement;
  label: string;
  description: string;
  path: string;
}

const quickActions: QuickActionItem[] = [
  {
    icon: <SearchIcon />,
    label: 'Search API',
    description: 'Find and explore APIs',
    path: '/search',
  },
  {
    icon: <CloudUploadIcon />,
    label: 'Publish New API',
    description: 'Register a new API',
    path: '/create',
  },
  {
    icon: <GavelIcon />,
    label: 'View Standards',
    description: 'API design guidelines',
    path: '/docs',
  },
  {
    icon: <BarChartIcon />,
    label: 'API Analytics',
    description: 'Monitor API usage',
    path: '/observability',
  },
];

export const QuickActions = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Box className={classes.root}>
      <Typography className={classes.title}>Quick Actions</Typography>
      <Grid container spacing={2}>
        {quickActions.map((action, index) => (
          <Grid item xs={6} sm={3} key={index}>
            <Card className={classes.actionCard}>
              <CardActionArea
                className={classes.actionArea}
                onClick={() => navigate(action.path)}
              >
                <Box className={classes.iconWrapper}>{action.icon}</Box>
                <Typography className={classes.actionLabel}>
                  {action.label}
                </Typography>
                <Typography className={classes.actionDescription}>
                  {action.description}
                </Typography>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default QuickActions;
