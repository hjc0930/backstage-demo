import { Box, Typography, Card, CardContent, Chip, makeStyles } from '@material-ui/core';
import CodeIcon from '@material-ui/icons/Code';
import { AppTemplate } from '../../AppTemplates/mockData';

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2),
  },
  selectedCard: {
    border: `2px solid ${theme.palette.primary.main}`,
    marginBottom: theme.spacing(3),
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
  titleSection: {
    flex: 1,
  },
  templateName: {
    fontSize: '1.5rem',
    fontWeight: 600,
    marginBottom: theme.spacing(0.5),
  },
  categoryChip: {
    textTransform: 'capitalize',
  },
  description: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(2),
    lineHeight: 1.6,
  },
  sectionTitle: {
    fontSize: '1rem',
    fontWeight: 600,
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
  techStack: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  techChip: {
    backgroundColor: theme.palette.background.default,
  },
  featuresList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1),
  },
  featureChip: {
    backgroundColor: theme.palette.success.light,
    color: theme.palette.success.dark,
  },
}));

interface SelectTemplateStepProps {
  template: AppTemplate;
}

export const SelectTemplateStep = ({ template }: SelectTemplateStepProps) => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Typography variant="h6" gutterBottom>
        Selected Template
      </Typography>
      <Card className={classes.selectedCard}>
        <CardContent>
          <Box className={classes.cardHeader}>
            <Box className={classes.iconWrapper}>
              <CodeIcon style={{ fontSize: 32 }} />
            </Box>
            <Box className={classes.titleSection}>
              <Typography className={classes.templateName}>{template.name}</Typography>
              <Chip
                label={template.category}
                size="small"
                color="primary"
                className={classes.categoryChip}
              />
            </Box>
          </Box>
          <Typography className={classes.description}>{template.description}</Typography>
          <Typography className={classes.sectionTitle}>Tech Stack</Typography>
          <Box className={classes.techStack}>
            {template.techStack.map(tech => (
              <Chip key={tech} label={tech} size="small" className={classes.techChip} />
            ))}
          </Box>
          <Typography className={classes.sectionTitle}>Features</Typography>
          <Box className={classes.featuresList}>
            {template.features.map(feature => (
              <Chip key={feature} label={feature} size="small" className={classes.featureChip} />
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
