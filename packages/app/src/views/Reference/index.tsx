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
import StarIcon from '@material-ui/icons/Star';
import VisibilityIcon from '@material-ui/icons/Visibility';
import FileCopyIcon from '@material-ui/icons/FileCopy';

const useStyles = makeStyles(theme => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: theme.shadows[8],
    },
  },
  cardContent: {
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing(1),
  },
  title: {
    fontSize: '1.1rem',
    fontWeight: 600,
  },
  starsContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(0.5),
    color: '#FFB400',
  },
  starsCount: {
    fontWeight: 600,
    color: theme.palette.text.primary,
  },
  description: {
    color: theme.palette.text.secondary,
    fontSize: '0.85rem',
    marginBottom: theme.spacing(1.5),
    lineHeight: 1.5,
  },
  metaRow: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(1.5),
  },
  language: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(0.5),
    fontSize: '0.8rem',
    color: theme.palette.text.secondary,
  },
  languageDot: {
    width: 10,
    height: 10,
    borderRadius: '50%',
  },
  lastUpdated: {
    fontSize: '0.75rem',
    color: theme.palette.text.hint,
  },
  tagsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(0.5),
    marginBottom: theme.spacing(1.5),
  },
  tag: {
    fontSize: '0.7rem',
    height: 22,
  },
  cardActions: {
    padding: theme.spacing(1, 2, 2),
    justifyContent: 'flex-start',
    gap: theme.spacing(1),
  },
  button: {
    textTransform: 'none',
    fontSize: '0.85rem',
  },
}));

interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  githubUrl: string;
  stars: number;
  language: string;
  tags: string[];
  lastUpdated: string;
}

const projectTemplates: ProjectTemplate[] = [
  {
    id: 'react-mui-starter',
    name: 'React + MUI Starter',
    description: 'A modern React starter template with Material-UI, TypeScript, and essential tooling pre-configured for rapid development.',
    githubUrl: 'https://github.com/company/react-mui-starter',
    stars: 128,
    language: 'TypeScript',
    tags: ['React', 'MUI', 'TypeScript', 'Vite'],
    lastUpdated: '2024-03-01',
  },
  {
    id: 'nodejs-api-gateway',
    name: 'Node.js API Gateway',
    description: 'Production-ready API gateway template with Express, authentication middleware, rate limiting, and request validation.',
    githubUrl: 'https://github.com/company/nodejs-api-gateway',
    stars: 95,
    language: 'TypeScript',
    tags: ['Node.js', 'Express', 'API Gateway', 'JWT'],
    lastUpdated: '2024-02-28',
  },
  {
    id: 'nextjs-saas-boilerplate',
    name: 'Next.js SaaS Boilerplate',
    description: 'Full-stack SaaS starter with Next.js 14, Prisma, NextAuth, Stripe integration, and Tailwind CSS.',
    githubUrl: 'https://github.com/company/nextjs-saas-boilerplate',
    stars: 256,
    language: 'TypeScript',
    tags: ['Next.js', 'Prisma', 'Stripe', 'Tailwind'],
    lastUpdated: '2024-03-05',
  },
  {
    id: 'python-fastapi-template',
    name: 'Python FastAPI Template',
    description: 'Modern Python API template with FastAPI, SQLAlchemy, Pydantic, Docker support, and comprehensive testing setup.',
    githubUrl: 'https://github.com/company/python-fastapi-template',
    stars: 73,
    language: 'Python',
    tags: ['FastAPI', 'SQLAlchemy', 'Docker', 'Pytest'],
    lastUpdated: '2024-02-20',
  },
  {
    id: 'microservices-go-template',
    name: 'Go Microservices Template',
    description: 'Go microservices template with gRPC, Kubernetes configs, observability stack, and event-driven architecture.',
    githubUrl: 'https://github.com/company/go-microservices-template',
    stars: 112,
    language: 'Go',
    tags: ['Go', 'gRPC', 'Kubernetes', 'Prometheus'],
    lastUpdated: '2024-02-25',
  },
  {
    id: 'react-native-starter',
    name: 'React Native Starter',
    description: 'Cross-platform mobile app template with React Native, Expo, navigation, and state management pre-configured.',
    githubUrl: 'https://github.com/company/react-native-starter',
    stars: 89,
    language: 'TypeScript',
    tags: ['React Native', 'Expo', 'Redux', 'Navigation'],
    lastUpdated: '2024-02-15',
  },
];

const getLanguageColor = (language: string): string => {
  const colors: Record<string, string> = {
    TypeScript: '#3178c6',
    JavaScript: '#f1e05a',
    Python: '#3572A5',
    Go: '#00ADD8',
    Java: '#b07219',
    Rust: '#dea584',
  };
  return colors[language] || '#6e7681';
};

const TemplateCard = ({ template }: { template: ProjectTemplate }) => {
  const classes = useStyles();

  const handleView = () => {
    window.open(template.githubUrl, '_blank');
  };

  const handleClone = () => {
    const cloneCommand = `git clone ${template.githubUrl}.git`;
    navigator.clipboard.writeText(cloneCommand);
  };

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Box className={classes.header}>
          <Typography className={classes.title}>{template.name}</Typography>
          <Box className={classes.starsContainer}>
            <StarIcon style={{ fontSize: 18 }} />
            <Typography className={classes.starsCount}>
              {template.stars}
            </Typography>
          </Box>
        </Box>

        <Typography className={classes.description}>
          {template.description}
        </Typography>

        <Box className={classes.metaRow}>
          <Box className={classes.language}>
            <Box
              className={classes.languageDot}
              style={{ backgroundColor: getLanguageColor(template.language) }}
            />
            {template.language}
          </Box>
          <Typography className={classes.lastUpdated}>
            Updated: {template.lastUpdated}
          </Typography>
        </Box>

        <Box className={classes.tagsContainer}>
          {template.tags.map(tag => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              variant="outlined"
              className={classes.tag}
            />
          ))}
        </Box>
      </CardContent>

      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          variant="contained"
          startIcon={<VisibilityIcon />}
          onClick={handleView}
          className={classes.button}
        >
          View
        </Button>
        <Button
          size="small"
          variant="outlined"
          startIcon={<FileCopyIcon />}
          onClick={handleClone}
          className={classes.button}
        >
          Clone
        </Button>
      </CardActions>
    </Card>
  );
};

export const Reference = () => {
  return (
    <Page themeId="tool">
      <Header
        title="Reference Templates"
        subtitle="Ready-to-use project templates"
      />
      <Content>
        <Grid container spacing={3}>
          {projectTemplates.map(template => (
            <Grid item xs={12} sm={6} md={4} key={template.id}>
              <TemplateCard template={template} />
            </Grid>
          ))}
        </Grid>
      </Content>
    </Page>
  );
};
