import { Box, Stepper, Step, StepLabel, makeStyles } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const useStyles = makeStyles(theme => ({
  stepper: {
    backgroundColor: 'transparent',
    padding: theme.spacing(3, 0),
    marginBottom: theme.spacing(2),
  },
  stepLabel: {
    cursor: 'pointer',
  },
  stepIcon: {
    '&$active': {
      color: theme.palette.primary.main,
    },
    '&$completed': {
      color: theme.palette.success.main,
    },
  },
  active: {},
  completed: {},
}));

const steps = [
  'Select Template',
  'Configure App',
  'Configure Infrastructure',
  'Review & Deploy',
  'Deployment Status',
];

interface DeployStepperProps {
  activeStep: number;
  onStepClick?: (step: number) => void;
  completed?: boolean;
}

export const DeployStepper = ({ activeStep, onStepClick, completed }: DeployStepperProps) => {
  const classes = useStyles();

  return (
    <Box className={classes.stepper}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => {
          const isCompleted = completed || index < activeStep;
          return (
            <Step key={label} completed={isCompleted}>
              <StepLabel
                className={classes.stepLabel}
                onClick={() => onStepClick?.(index)}
                StepIconProps={{
                  classes: {
                    root: classes.stepIcon,
                    active: classes.active,
                    completed: classes.completed,
                  },
                  icon: isCompleted ? <CheckCircleIcon /> : index + 1,
                }}
              >
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
};
