import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  makeStyles,
  Grid,
  Button,
  Typography,
  Box,
  IconButton,
} from '@material-ui/core';
import { Content, HeaderLabel } from '@backstage/core-components';
import EditIcon from '@material-ui/icons/Edit';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { ApiInfoCard } from './ApiInfoCard';
import { GatewayInfoCard } from './GatewayInfoCard';
import { EndpointsList } from './EndpointsList';
import { ApiDebugDrawer } from './ApiDebugDrawer';
import { getApiById } from '../shared/apiData';
import type { ApiEndpoint } from '../shared/apiData';

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2),
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh',
  },
  errorContainer: {
    textAlign: 'center',
    padding: theme.spacing(4),
  },
  headerLabels: {
    display: 'flex',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  actionRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
}));

export const ApiDetail: React.FC = () => {
  const classes = useStyles();
  const { apiId } = useParams<{ apiId: string }>();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint | undefined>();

  const api = getApiById(apiId || '');

  const handleTryIt = (endpoint: ApiEndpoint) => {
    setSelectedEndpoint(endpoint);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedEndpoint(undefined);
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (!api) {
    return (
      <Content>
        <Box className={classes.errorContainer}>
          <Typography variant="h5" gutterBottom>
            API not found
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            The API with ID "{apiId}" could not be found.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/')}
          >
            Go to Dashboard
          </Button>
        </Box>
      </Content>
    );
  }

  return (
    <Content>
      <Box className={classes.container}>
        <Box className={classes.headerLabels}>
          <HeaderLabel label="Owner" value={api.owner} />
          <HeaderLabel label="Status" value={api.status} />
          <HeaderLabel label="Version" value={api.version} />
        </Box>
        <Box className={classes.actionRow}>
          <IconButton
            className={classes.backButton}
            onClick={handleBack}
            size="small"
          >
            <ArrowBackIcon />
          </IconButton>
          <Button
            variant="outlined"
            size="small"
            startIcon={<EditIcon />}
            onClick={() => navigate(`/publish-api?edit=${apiId}`)}
          >
            Edit
          </Button>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <ApiInfoCard api={api} />
            <EndpointsList
              endpoints={api.endpoints}
              onTryIt={handleTryIt}
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            <GatewayInfoCard gateway={api.gateway} auth={api.auth} />
          </Grid>
        </Grid>
      </Box>

      <ApiDebugDrawer
        open={modalOpen}
        onClose={handleCloseModal}
        endpoint={selectedEndpoint}
        baseUrl={api.gateway.endpoint}
        authConfig={api.auth}
      />
    </Content>
  );
};

export default ApiDetail;
