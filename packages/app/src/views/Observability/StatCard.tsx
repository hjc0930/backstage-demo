import { Box, Card, CardContent, Typography, makeStyles } from '@material-ui/core';
import AppsIcon from '@material-ui/icons/Apps';
import HttpIcon from '@material-ui/icons/Http';
import SettingsIcon from '@material-ui/icons/Settings';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import { StatCard as StatCardType } from './mockData';

const useStyles = makeStyles(theme => ({
  card: {
    height: '100%',
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(0, 82, 204, 0.15)',
    },
  },
  cardContent: {
    padding: theme.spacing(2),
    '&:last-child': {
      paddingBottom: theme.spacing(2),
    },
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(1),
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  title: {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  valueContainer: {
    display: 'flex',
    alignItems: 'baseline',
    gap: theme.spacing(1),
  },
  value: {
    fontSize: '2rem',
    fontWeight: 700,
  },
  trend: {
    fontSize: '0.75rem',
    fontWeight: 600,
    padding: '2px 6px',
    borderRadius: 4,
    backgroundColor: '#E3FCEF',
    color: '#36B37E',
  },
}));

const iconMap: Record<string, React.ComponentType<{ style?: React.CSSProperties }>> = {
  Applications: AppsIcon,
  APIs: HttpIcon,
  Services: SettingsIcon,
  Uptime: TrendingUpIcon,
};

interface StatCardProps {
  stat: StatCardType;
}

export const StatCard = ({ stat }: StatCardProps) => {
  const classes = useStyles();
  const IconComponent = iconMap[stat.title] || AppsIcon;

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Box className={classes.header}>
          <Typography className={classes.title}>{stat.title}</Typography>
          <Box
            className={classes.iconWrapper}
            style={{ backgroundColor: `${stat.color}20` }}
          >
            <IconComponent style={{ color: stat.color }} />
          </Box>
        </Box>
        <Box className={classes.valueContainer}>
          <Typography className={classes.value} style={{ color: stat.color }}>
            {stat.value}
          </Typography>
          {stat.trend && <span className={classes.trend}>{stat.trend}</span>}
        </Box>
      </CardContent>
    </Card>
  );
};
