import { Content, Header, Page } from '@backstage/core-components';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Typography,
  Chip,
  makeStyles,
} from '@material-ui/core';
import CodeIcon from '@material-ui/icons/Code';
import BugReportIcon from '@material-ui/icons/BugReport';
import HttpIcon from '@material-ui/icons/Http';
import TestIcon from '@material-ui/icons/Assignment';
import DescriptionIcon from '@material-ui/icons/Description';
import RateReviewIcon from '@material-ui/icons/RateReview';
import SecurityIcon from '@material-ui/icons/Security';
import SpeedIcon from '@material-ui/icons/Speed';
import BarChartIcon from '@material-ui/icons/BarChart';
import CloudIcon from '@material-ui/icons/Cloud';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import BuildIcon from '@material-ui/icons/Build';
import LaunchIcon from '@material-ui/icons/Launch';
import { availableAgents, unavailableAgents, Agent } from './mockData';

const useStyles = makeStyles(theme => ({
  section: {
    marginBottom: theme.spacing(4),
  },
  sectionTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    marginBottom: theme.spacing(2),
    fontSize: '1.25rem',
    fontWeight: 600,
    color: theme.palette.text.primary,
  },
  countBadge: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    fontSize: '0.75rem',
    fontWeight: 600,
    padding: '2px 8px',
    borderRadius: 12,
    marginLeft: theme.spacing(1),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 4px 12px rgba(0, 82, 204, 0.15)',
    },
  },
  unavailableCard: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    opacity: 0.6,
    backgroundColor: theme.palette.grey[100],
  },
  cardContent: {
    flexGrow: 1,
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#0052CC',
    color: '#fff',
    marginBottom: theme.spacing(2),
  },
  unavailableIconWrapper: {
    backgroundColor: theme.palette.grey[400],
  },
  agentName: {
    fontSize: '1.1rem',
    fontWeight: 600,
    marginBottom: theme.spacing(0.5),
    color: theme.palette.text.primary,
  },
  category: {
    fontSize: '0.75rem',
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  description: {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1.5),
    lineHeight: 1.5,
  },
  capabilities: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(0.5),
    marginBottom: theme.spacing(1),
  },
  capability: {
    fontSize: '0.7rem',
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.palette.divider}`,
  },
  launchButton: {
    marginTop: 'auto',
  },
  statusChip: {
    fontSize: '0.7rem',
    marginLeft: 'auto',
  },
}));

const iconMap: Record<string, React.ComponentType> = {
  Code: CodeIcon,
  BugReport: BugReportIcon,
  Api: HttpIcon,
  Science: TestIcon,
  Description: DescriptionIcon,
  RateReview: RateReviewIcon,
  Security: SecurityIcon,
  Speed: SpeedIcon,
  Analytics: BarChartIcon,
  Cloud: CloudIcon,
  VerifiedUser: VerifiedUserIcon,
  PrecisionManufacturing: BuildIcon,
};

const AgentCard = ({ agent }: { agent: Agent }) => {
  const classes = useStyles();
  const IconComponent = iconMap[agent.icon] || CodeIcon;

  const handleLaunch = () => {
    // In a real app, this would navigate to the agent or open a modal
    console.log(`Launching agent: ${agent.name}`);
  };

  return (
    <Card className={agent.available ? classes.card : classes.unavailableCard}>
      <CardContent className={classes.cardContent}>
        <Box display="flex" alignItems="flex-start" justifyContent="space-between">
          <Box
            className={`${classes.iconWrapper} ${
              !agent.available ? classes.unavailableIconWrapper : ''
            }`}
          >
            <IconComponent />
          </Box>
          <Chip
            label={agent.available ? 'Available' : 'Coming Soon'}
            size="small"
            color={agent.available ? 'primary' : 'default'}
            className={classes.statusChip}
          />
        </Box>
        <Typography className={classes.agentName}>{agent.name}</Typography>
        <Typography className={classes.category}>{agent.category}</Typography>
        <Typography className={classes.description}>{agent.description}</Typography>
        <Box className={classes.capabilities}>
          {agent.capabilities.slice(0, 3).map(capability => (
            <Chip
              key={capability}
              label={capability}
              size="small"
              className={classes.capability}
            />
          ))}
          {agent.capabilities.length > 3 && (
            <Chip
              label={`+${agent.capabilities.length - 3} more`}
              size="small"
              className={classes.capability}
            />
          )}
        </Box>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          variant={agent.available ? 'contained' : 'outlined'}
          startIcon={<LaunchIcon />}
          onClick={handleLaunch}
          className={classes.launchButton}
          disabled={!agent.available}
        >
          {agent.available ? 'Launch' : 'Coming Soon'}
        </Button>
      </CardActions>
    </Card>
  );
};

export const DevAgents = () => {
  const classes = useStyles();

  return (
    <Page themeId="tool">
      <Header
        title="Development Agents"
        subtitle="AI-powered assistants to streamline your development workflow"
      />
      <Content>
        {/* Available Agents Section */}
        <Box className={classes.section}>
          <Typography className={classes.sectionTitle}>
            Available Agents
            <span className={classes.countBadge}>{availableAgents.length}</span>
          </Typography>
          <Grid container spacing={3}>
            {availableAgents.map(agent => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={agent.id}>
                <AgentCard agent={agent} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Unavailable Agents Section */}
        <Box className={classes.section}>
          <Typography className={classes.sectionTitle}>
            Unavailable Agents
            <span className={classes.countBadge}>{unavailableAgents.length}</span>
          </Typography>
          <Grid container spacing={3}>
            {unavailableAgents.map(agent => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={agent.id}>
                <AgentCard agent={agent} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Content>
    </Page>
  );
};
