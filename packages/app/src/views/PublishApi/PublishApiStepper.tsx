import React from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  makeStyles,
  withStyles,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  stepper: {
    backgroundColor: 'transparent',
    padding: theme.spacing(2, 0),
  },
  stepLabel: {
    cursor: 'pointer',
  },
}));

const CustomConnector = withStyles({
  alternativeLabel: {
    top: 12,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: '#0052CC',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#0052CC',
    },
  },
  line: {
    borderColor: '#eaeaea',
    borderTopWidth: 2,
    borderRadius: 1,
  },
})(StepConnector);

const useStepIconStyles = makeStyles({
  root: {
    color: '#eaeaea',
    display: 'flex',
    height: 28,
    alignItems: 'center',
  },
  active: {
    color: '#0052CC',
  },
  completed: {
    color: '#0052CC',
  },
  circle: {
    width: 28,
    height: 28,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.85rem',
    fontWeight: 600,
    color: '#fff',
  },
  completedCircle: {
    backgroundColor: '#0052CC',
  },
});

interface StepIconProps {
  active: boolean;
  completed: boolean;
  icon: number;
}

const StepIcon: React.FC<StepIconProps> = ({ active, completed, icon }) => {
  const classes = useStepIconStyles();

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {completed ? (
        <div className={`${classes.circle} ${classes.completedCircle}`}>
          <CheckIcon style={{ fontSize: 18 }} />
        </div>
      ) : (
        <div
          className={classes.circle}
          style={{ backgroundColor: active ? '#0052CC' : '#e0e0e0' }}
        >
          {icon}
        </div>
      )}
    </div>
  );
};

interface PublishApiStepperProps {
  steps: { label: string; shortLabel: string }[];
  activeStep: number;
  onStepClick?: (step: number) => void;
}

export const PublishApiStepper: React.FC<PublishApiStepperProps> = ({
  steps,
  activeStep,
  onStepClick,
}) => {
  const classes = useStyles();

  return (
    <Stepper
      activeStep={activeStep}
      connector={<CustomConnector />}
      className={classes.stepper}
      alternativeLabel
    >
      {steps.map((step, index) => (
        <Step key={step.label}>
          <StepLabel
            StepIconComponent={StepIcon}
            className={classes.stepLabel}
            onClick={() => onStepClick?.(index)}
          >
            {step.shortLabel}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default PublishApiStepper;
