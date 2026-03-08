import React from 'react';
import {
  TextField,
  MenuItem,
  Grid,
  Typography,
  makeStyles,
} from '@material-ui/core';
import type { StepProps } from '../types';
import { OWNER_OPTIONS, TEAM_OPTIONS } from '../types';

const useStyles = makeStyles(theme => ({
  sectionTitle: {
    fontWeight: 600,
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
  helperText: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
}));

export const ServiceDefinitionStep: React.FC<StepProps> = ({
  formData,
  updateFormData,
  errors,
}) => {
  const classes = useStyles();

  const handleChange = (field: string) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    updateFormData({ [field]: event.target.value });
  };

  return (
    <div>
      <Typography variant="h6" className={classes.sectionTitle}>
        Service Definition
      </Typography>
      <Typography variant="body2" className={classes.helperText}>
        Provide basic information about your API service.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label="Service Name"
            fullWidth
            required
            value={formData.serviceName}
            onChange={handleChange('serviceName')}
            error={!!errors.serviceName}
            helperText={errors.serviceName || 'A unique name for your API service'}
            placeholder="e.g., User Service API"
            className={classes.textField}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={formData.description}
            onChange={handleChange('description')}
            error={!!errors.description}
            helperText={errors.description || 'Brief description of what this API does'}
            placeholder="Describe the purpose and functionality of your API..."
            className={classes.textField}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Owner"
            fullWidth
            required
            value={formData.owner}
            onChange={handleChange('owner')}
            error={!!errors.owner}
            helperText={errors.owner}
            className={classes.textField}
          >
            {OWNER_OPTIONS.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Team"
            fullWidth
            required
            value={formData.team}
            onChange={handleChange('team')}
            error={!!errors.team}
            helperText={errors.team}
            className={classes.textField}
          >
            {TEAM_OPTIONS.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Version"
            fullWidth
            required
            value={formData.version}
            onChange={handleChange('version')}
            error={!!errors.version}
            helperText={errors.version || 'Semantic version (e.g., 1.0.0)'}
            placeholder="1.0.0"
            className={classes.textField}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default ServiceDefinitionStep;
