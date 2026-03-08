import { Grid, Box, Typography, Card, CardActionArea, makeStyles } from '@material-ui/core';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import AppsIcon from '@material-ui/icons/Apps';
import DescriptionIcon from '@material-ui/icons/Description';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import AndroidIcon from '@material-ui/icons/Android';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import GavelIcon from '@material-ui/icons/Gavel';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: 600,
    marginBottom: theme.spacing(2),
    color: theme.palette.text.primary,
  },
  card: {
    height: '100%',
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      borderColor: '#0052CC',
      boxShadow: '0 4px 12px rgba(0, 82, 204, 0.15)',
    },
  },
  cardContent: {
    padding: theme.spacing(2.5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    minHeight: 140,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#0052CC',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(1.5),
  },
  icon: {
    color: '#fff',
    fontSize: 28,
  },
  cardTitle: {
    fontSize: '1rem',
    fontWeight: 600,
    marginBottom: theme.spacing(0.5),
    color: theme.palette.text.primary,
  },
  cardDescription: {
    fontSize: '0.85rem',
    color: theme.palette.text.secondary,
    lineHeight: 1.4,
  },
}));

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
}

const FeatureCard = ({ title, description, icon, to }: FeatureCardProps) => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={() => navigate(to)} className={classes.cardContent}>
        <Box className={classes.iconWrapper}>
          {icon}
        </Box>
        <Typography className={classes.cardTitle}>{title}</Typography>
        <Typography className={classes.cardDescription}>{description}</Typography>
      </CardActionArea>
    </Card>
  );
};

const ExploreFeatures = () => {
  const classes = useStyles();

  const features = [
    {
      title: 'API Catalog',
      description: 'Browse and manage all your APIs in one centralized location',
      icon: <SettingsEthernetIcon className={classes.icon} />,
      to: '/api-catalog',
    },
    {
      title: 'Application Catalog',
      description: 'Manage your applications and services across the organization',
      icon: <AppsIcon className={classes.icon} />,
      to: '/app-catalog',
    },
    {
      title: 'App Templates',
      description: 'Create new applications from pre-defined templates',
      icon: <DescriptionIcon className={classes.icon} />,
      to: '/app-templates',
    },
    {
      title: 'Monitoring & Observability',
      description: 'Monitor your services health and performance metrics',
      icon: <ShowChartIcon className={classes.icon} />,
      to: '/observability',
    },
    {
      title: 'Development Agents',
      description: 'AI-powered assistants to accelerate your development workflow',
      icon: <AndroidIcon className={classes.icon} />,
      to: '/dev-agents',
    },
    {
      title: 'Reference Implementation',
      description: 'Guides and examples for implementing best practices',
      icon: <MenuBookIcon className={classes.icon} />,
      to: '/reference',
    },
    {
      title: 'Development Standards',
      description: 'Coding standards and development guidelines for teams',
      icon: <GavelIcon className={classes.icon} />,
      to: '/standards',
    },
  ];

  return (
    <Box>
      <Typography className={classes.sectionTitle}>Explore Features</Typography>
      <Grid container spacing={2}>
        {features.map(feature => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={feature.to}>
            <FeatureCard {...feature} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ExploreFeatures;
