import { Card, CardContent, CardActions, Button, Box, Typography, Chip, makeStyles } from '@material-ui/core';
import ReactJsIcon from '@material-ui/icons/Code';
import { useNavigate } from 'react-router-dom';
import { AppTemplate, TemplateCategory } from './mockData';

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
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing(1.5),
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
  title: {
    fontSize: '1.1rem',
    fontWeight: 600,
    marginBottom: theme.spacing(0.5),
  },
  categoryChip: {
    fontSize: '0.7rem',
    textTransform: 'capitalize',
  },
  description: {
    color: theme.palette.text.secondary,
    fontSize: '0.85rem',
    marginBottom: theme.spacing(1.5),
    lineHeight: 1.5,
  },
  techStack: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(0.5),
    marginBottom: theme.spacing(1.5),
  },
  techChip: {
    fontSize: '0.7rem',
    backgroundColor: theme.palette.background.default,
  },
  features: {
    marginTop: theme.spacing(1),
  },
  featureItem: {
    fontSize: '0.75rem',
    color: theme.palette.text.secondary,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
  },
  featureBullet: {
    width: 4,
    height: 4,
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
  },
}));

const getCategoryColor = (category: TemplateCategory): 'primary' | 'secondary' | 'default' => {
  const colors: Record<TemplateCategory, 'primary' | 'secondary' | 'default'> = {
    frontend: 'primary',
    backend: 'secondary',
    fullstack: 'primary',
    mobile: 'secondary',
    infrastructure: 'default',
  };
  return colors[category];
};

export const TemplateCard = ({ template }: { template: AppTemplate }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleViewDetail = () => {
    navigate(`/deploy/${template.id}`);
  };

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Box className={classes.cardHeader}>
          <Box className={classes.iconWrapper}>
            <ReactJsIcon />
          </Box>
          <Chip
            label={template.category}
            size="small"
            color={getCategoryColor(template.category)}
            className={classes.categoryChip}
          />
        </Box>
        <Typography className={classes.title}>{template.name}</Typography>
        <Typography className={classes.description}>{template.description}</Typography>
        <Box className={classes.techStack}>
          {template.techStack.slice(0, 3).map(tech => (
            <Chip key={tech} label={tech} size="small" className={classes.techChip} />
          ))}
          {template.techStack.length > 3 && (
            <Chip label={`+${template.techStack.length - 3}`} size="small" className={classes.techChip} />
          )}
        </Box>
        <Box className={classes.features}>
          {template.features.slice(0, 3).map(feature => (
            <Box key={feature} className={classes.featureItem}>
              <Box className={classes.featureBullet} />
              {feature}
            </Box>
          ))}
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" variant="contained" onClick={handleViewDetail}>
          View Detail
        </Button>
      </CardActions>
    </Card>
  );
};
