import React, { useState, useCallback } from 'react';
import {
  Content,
  Header,
  Page,
  HeaderLabel,
} from '@backstage/core-components';
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  makeStyles,
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

import { PublishApiStepper } from './PublishApiStepper';
import {
  ServiceDefinitionStep,
  ApiSpecificationStep,
  GatewayPluginsStep,
  PortalSettingsStep,
  ReviewPublishStep,
} from './steps';
import type { PublishApiFormData, StepProps } from './types';
import { DEFAULT_FORM_DATA } from './types';

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2),
  },
  stepperContainer: {
    marginBottom: theme.spacing(2),
  },
  stepContent: {
    padding: theme.spacing(3),
    minHeight: 400,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(3),
    paddingTop: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.divider}`,
  },
  button: {
    minWidth: 120,
  },
}));

const STEPS = [
  { label: 'Service Definition', shortLabel: 'Service' },
  { label: 'API Specification', shortLabel: 'Spec' },
  { label: 'Gateway Plugins', shortLabel: 'Gateway' },
  { label: 'Portal Settings', shortLabel: 'Portal' },
  { label: 'Review & Deploy', shortLabel: 'Review' },
];

type PublishStatus = 'idle' | 'publishing' | 'success' | 'error';

export const PublishApi: React.FC = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<PublishApiFormData>(DEFAULT_FORM_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [publishStatus, setPublishStatus] = useState<PublishStatus>('idle');
  const [publishedApiId, setPublishedApiId] = useState<string | undefined>();

  const updateFormData = useCallback((updates: Partial<PublishApiFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
    // Clear errors for updated fields
    const updatedKeys = Object.keys(updates);
    setErrors(prev => {
      const newErrors = { ...prev };
      updatedKeys.forEach(key => delete newErrors[key]);
      return newErrors;
    });
  }, []);

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 0: // Service Definition
        if (!formData.serviceName.trim()) {
          newErrors.serviceName = 'Service name is required';
        }
        if (!formData.owner) {
          newErrors.owner = 'Owner is required';
        }
        if (!formData.team) {
          newErrors.team = 'Team is required';
        }
        if (!formData.version.trim()) {
          newErrors.version = 'Version is required';
        }
        break;
      case 1: // API Specification
        if (!formData.specContent) {
          newErrors.specContent = 'API specification file is required';
        }
        break;
      case 3: // Portal Settings
        if (!formData.category) {
          newErrors.category = 'Category is required';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep(prev => Math.min(prev + 1, STEPS.length - 1));
    }
  };

  const handleBack = () => {
    setActiveStep(prev => Math.max(prev - 1, 0));
  };

  const handleStepClick = (step: number) => {
    // Only allow going back to completed steps or the current step
    if (step <= activeStep || validateStep(activeStep)) {
      setActiveStep(step);
    }
  };

  const handlePublish = async () => {
    setPublishStatus('publishing');
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate a mock API ID
      const newApiId = String(Date.now());
      setPublishedApiId(newApiId);
      setPublishStatus('success');
    } catch (error) {
      setPublishStatus('error');
    }
  };

  const renderStepContent = () => {
    const stepProps: StepProps = {
      formData,
      updateFormData,
      errors,
    };

    switch (activeStep) {
      case 0:
        return <ServiceDefinitionStep {...stepProps} />;
      case 1:
        return <ApiSpecificationStep {...stepProps} />;
      case 2:
        return <GatewayPluginsStep {...stepProps} />;
      case 3:
        return <PortalSettingsStep {...stepProps} />;
      case 4:
        return (
          <ReviewPublishStep
            {...stepProps}
            onPublish={handlePublish}
            publishStatus={publishStatus}
            publishedApiId={publishedApiId}
          />
        );
      default:
        return null;
    }
  };

  const isLastStep = activeStep === STEPS.length - 1;
  const showNavigation = !isLastStep || publishStatus === 'idle';

  return (
    <Page themeId="tool">
      <Header
        title="Publish API"
        subtitle="Register and publish new APIs to the developer portal"
      >
        <HeaderLabel label="Step" value={`${activeStep + 1} of ${STEPS.length}`} />
      </Header>

      <Content>
        <Container maxWidth="lg" className={classes.container}>
          <Box className={classes.stepperContainer}>
            <PublishApiStepper
              steps={STEPS}
              activeStep={activeStep}
              onStepClick={handleStepClick}
            />
          </Box>

          <Paper>
            <Box className={classes.stepContent}>
              <Typography variant="h5" gutterBottom>
                {STEPS[activeStep].label}
              </Typography>
              {renderStepContent()}
            </Box>

            {showNavigation && (
              <Box className={classes.buttonContainer} px={3} pb={3}>
                <Button
                  variant="outlined"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                  startIcon={<NavigateBeforeIcon />}
                  className={classes.button}
                >
                  Back
                </Button>
                {!isLastStep && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    endIcon={<NavigateNextIcon />}
                    className={classes.button}
                  >
                    Next
                  </Button>
                )}
              </Box>
            )}
          </Paper>
        </Container>
      </Content>
    </Page>
  );
};

export default PublishApi;
