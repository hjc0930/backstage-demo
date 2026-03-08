import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Content } from '@backstage/core-components';
import { Box, Button, makeStyles } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { DeployStepper } from './DeployStepper';
import { SelectTemplateStep } from './steps/SelectTemplateStep';
import { ConfigureAppStep } from './steps/ConfigureAppStep';
import { ConfigureInfraStep } from './steps/ConfigureInfraStep';
import { ReviewDeployStep } from './steps/ReviewDeployStep';
import { DeploymentStatusStep } from './steps/DeploymentStatusStep';
import { appTemplates, AppTemplate } from '../AppTemplates/mockData';
import {
  AppConfig,
  InfrastructureConfig,
  defaultAppConfig,
  defaultInfrastructureConfig,
} from './types';

const useStyles = makeStyles(theme => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  stepContent: {
    flex: 1,
    overflow: 'auto',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    minWidth: 120,
  },
}));

export const Deploy = () => {
  const classes = useStyles();
  const { templateId } = useParams() as { templateId?: string };
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState<AppTemplate | null>(null);
  const [appConfig, setAppConfig] = useState<AppConfig>(defaultAppConfig);
  const [infraConfig, setInfraConfig] = useState<InfrastructureConfig>(defaultInfrastructureConfig);
  const [deploymentCompleted, setDeploymentCompleted] = useState(false);

  useEffect(() => {
    if (templateId) {
      const template = appTemplates.find(t => t.id === templateId);
      if (template) {
        setSelectedTemplate(template);
        setAppConfig(prev => ({ ...prev, name: template.name.toLowerCase().replace(/\s+/g, '-') }));
      }
    }
  }, [templateId]);

  const handleNext = () => {
    if (activeStep < 4) {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(prev => prev - 1);
    }
  };

  const handleDeploy = () => {
    setActiveStep(4);
  };

  const handleDeploymentComplete = () => {
    setDeploymentCompleted(true);
  };

  const handleStepClick = (step: number) => {
    // Only allow going back to previous steps
    if (step < activeStep) {
      setActiveStep(step);
    }
  };

  const canProceed = () => {
    switch (activeStep) {
      case 0:
        return selectedTemplate !== null;
      case 1:
        return appConfig.name.trim().length > 0;
      case 2:
        return true;
      case 3:
        return appConfig.name.trim().length > 0;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        if (selectedTemplate) {
          return <SelectTemplateStep template={selectedTemplate} />;
        }
        return (
          <Box p={2}>
            <p>No template selected. Please select a template from the App Templates page.</p>
            <Button variant="contained" color="primary" onClick={() => navigate('/app-templates')}>
              Go to App Templates
            </Button>
          </Box>
        );
      case 1:
        return (
          <ConfigureAppStep
            config={appConfig}
            onChange={setAppConfig}
          />
        );
      case 2:
        return (
          <ConfigureInfraStep
            config={infraConfig}
            onChange={setInfraConfig}
          />
        );
      case 3:
        if (!selectedTemplate) {
          return <Box p={2}>No template selected.</Box>;
        }
        return (
          <ReviewDeployStep
            template={selectedTemplate}
            appConfig={appConfig}
            infraConfig={infraConfig}
            onDeploy={handleDeploy}
          />
        );
      case 4:
        return (
          <DeploymentStatusStep
            appName={appConfig.name}
            onComplete={handleDeploymentComplete}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Content className={classes.content}>
      <DeployStepper
        activeStep={activeStep}
        onStepClick={handleStepClick}
        completed={deploymentCompleted}
      />
      <Box className={classes.stepContent}>
        {renderStepContent()}
      </Box>
      {activeStep < 4 && (
        <Box className={classes.footer}>
          <Button
            variant="outlined"
            onClick={handleBack}
            disabled={activeStep === 0}
            startIcon={<ArrowBackIcon />}
            className={classes.button}
          >
            Back
          </Button>
          {activeStep < 3 && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              disabled={!canProceed()}
              endIcon={<ArrowForwardIcon />}
              className={classes.button}
            >
              Next
            </Button>
          )}
        </Box>
      )}
    </Content>
  );
};
