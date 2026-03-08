import { Content, Header, Page } from '@backstage/core-components';
import { Box, Button, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useNavigate } from 'react-router-dom';
import { ApiCatalogTable } from './ApiCatalogTable';

const useStyles = makeStyles(theme => ({
  headerActions: {
    display: 'flex',
    gap: theme.spacing(1),
  },
  publishButton: {
    backgroundColor: '#0052CC',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#003F99',
    },
  },
}));

export const ApiCatalog = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Page themeId="tool">
      <Header
        title="API Catalog"
        subtitle="Browse and manage all your organization's APIs"
      >
        <Box className={classes.headerActions}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            className={classes.publishButton}
            onClick={() => navigate('/publish-api')}
          >
            Publish API
          </Button>
        </Box>
      </Header>
      <Content>
        <ApiCatalogTable />
      </Content>
    </Page>
  );
};

export default ApiCatalog;
