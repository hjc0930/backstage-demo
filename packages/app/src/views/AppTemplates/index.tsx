import { useState } from 'react';
import { Content } from '@backstage/core-components';
import { Box, Tabs, Tab, Grid, Typography, makeStyles } from '@material-ui/core';
import { TemplateCard } from './TemplateCard';
import { categories, appTemplates } from './mockData';

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
  emptyState: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
}));

export const AppTemplates = () => {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setCurrentTab(newValue);
  };

  const getCountForCategory = (index: number): number => {
    if (index === 0) return appTemplates.length;
    return appTemplates.filter(
      template => template.category === categories[index].value,
    ).length;
  };

  const filteredTemplates =
    currentTab === 0
      ? appTemplates
      : appTemplates.filter(
          template => template.category === categories[currentTab].value,
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
        {filteredTemplates.map(template => (
          <Grid item xs={12} sm={6} md={4} key={template.id}>
            <TemplateCard template={template} />
          </Grid>
        ))}
      </Grid>

      {filteredTemplates.length === 0 && (
        <Box className={classes.emptyState}>
          <Typography color="textSecondary">
            No templates found in this category.
          </Typography>
        </Box>
      )}
    </Content>
  );
};
