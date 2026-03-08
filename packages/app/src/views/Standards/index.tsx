import { useState } from 'react';
import { Content } from '@backstage/core-components';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Tabs,
  Tab,
  Grid,
  Typography,
  Chip,
  makeStyles,
} from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import {
  categories,
  standardDocuments,
  StandardDocument,
  StandardCategory,
} from './mockData';

const useStyles = makeStyles(theme => ({
  tabsContainer: {
    marginBottom: theme.spacing(3),
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  tab: {
    textTransform: 'none',
    minWidth: 120,
    fontWeight: 500,
  },
  tabLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  tabCount: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    fontSize: '0.7rem',
    fontWeight: 600,
    padding: '2px 6px',
    borderRadius: 10,
    minWidth: 20,
    textAlign: 'center',
  },
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
    marginBottom: theme.spacing(1),
  },
  title: {
    fontSize: '1.1rem',
    fontWeight: 600,
    marginBottom: theme.spacing(0.5),
  },
  chip: {
    fontSize: '0.7rem',
    textTransform: 'capitalize',
  },
  description: {
    color: theme.palette.text.secondary,
    fontSize: '0.85rem',
    marginBottom: theme.spacing(1.5),
  },
  preview: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(1.5),
    borderRadius: 4,
    fontSize: '0.8rem',
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1.5),
    maxHeight: 80,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical' as const,
  },
  meta: {
    display: 'flex',
    gap: theme.spacing(2),
    fontSize: '0.75rem',
    color: theme.palette.text.hint,
    marginBottom: theme.spacing(1),
  },
  downloadButton: {
    marginTop: 'auto',
  },
}));

const getCategoryColor = (
  category: StandardCategory,
): 'primary' | 'secondary' | 'default' => {
  const colors: Record<StandardCategory, 'primary' | 'secondary' | 'default'> =
    {
      coding: 'primary',
      security: 'secondary',
      'api-design': 'default',
      testing: 'primary',
    };
  return colors[category];
};

const StandardCard = ({ document }: { document: StandardDocument }) => {
  const classes = useStyles();

  const handleDownload = () => {
    // In a real app, this would trigger a file download
    window.open(document.downloadUrl, '_blank');
  };

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Box className={classes.cardHeader}>
          <Typography className={classes.title}>{document.title}</Typography>
          <Chip
            label={document.category.replace('-', ' ')}
            size="small"
            color={getCategoryColor(document.category)}
            className={classes.chip}
          />
        </Box>
        <Typography className={classes.description}>
          {document.description}
        </Typography>
        <Box className={classes.preview}>{document.preview}</Box>
        <Box className={classes.meta}>
          <span>v{document.version}</span>
          <span>Updated: {document.lastUpdated}</span>
        </Box>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          variant="contained"
          startIcon={<GetAppIcon />}
          onClick={handleDownload}
          className={classes.downloadButton}
        >
          Download PDF
        </Button>
      </CardActions>
    </Card>
  );
};

export const Standards = () => {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setCurrentTab(newValue);
  };

  const getCountForCategory = (index: number): number => {
    if (index === 0) return standardDocuments.length;
    return standardDocuments.filter(
      doc => doc.category === categories[index].value,
    ).length;
  };

  const filteredDocuments =
    currentTab === 0
      ? standardDocuments
      : standardDocuments.filter(
          doc => doc.category === categories[currentTab].value,
        );

  return (
    <Content>
      <Box className={classes.tabsContainer}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
        >
          {categories.map((category, index) => {
            const count = getCountForCategory(index);
            return (
              <Tab
                key={category.value}
                label={
                  <Box className={classes.tabLabel}>
                    {category.label}
                    {count > 0 && (
                      <span className={classes.tabCount}>{count}</span>
                    )}
                  </Box>
                }
                className={classes.tab}
              />
            );
          })}
        </Tabs>
      </Box>

      <Grid container spacing={3}>
        {filteredDocuments.map(document => (
          <Grid item xs={12} sm={6} md={4} key={document.id}>
            <StandardCard document={document} />
          </Grid>
        ))}
      </Grid>

      {filteredDocuments.length === 0 && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight={200}
        >
          <Typography color="textSecondary">
            No documents found in this category.
          </Typography>
        </Box>
      )}
    </Content>
  );
};
