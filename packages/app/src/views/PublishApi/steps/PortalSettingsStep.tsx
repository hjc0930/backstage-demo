import React from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Chip,
  MenuItem,
  Grid,
  makeStyles,
} from '@material-ui/core';
import PublicIcon from '@material-ui/icons/Public';
import BusinessIcon from '@material-ui/icons/Business';
import LockIcon from '@material-ui/icons/Lock';
import type { StepProps } from '../types';
import { CATEGORY_OPTIONS, TAG_OPTIONS, VISIBILITY_OPTIONS } from '../types';

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
  visibilityCard: {
    padding: theme.spacing(2),
    border: `2px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    height: '100%',
    '&:hover': {
      borderColor: '#0052CC',
    },
  },
  visibilityCardSelected: {
    borderColor: '#0052CC',
    backgroundColor: '#f5f9ff',
  },
  visibilityIcon: {
    marginBottom: theme.spacing(1),
  },
  chipContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(0.5),
    marginTop: theme.spacing(1),
  },
  tagChip: {
    marginBottom: theme.spacing(0.5),
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
}));

export const PortalSettingsStep: React.FC<StepProps> = ({
  formData,
  updateFormData,
  errors,
}) => {
  const classes = useStyles();

  const handleTagToggle = (tag: string) => {
    const newTags = formData.tags.includes(tag)
      ? formData.tags.filter(t => t !== tag)
      : [...formData.tags, tag];
    updateFormData({ tags: newTags });
  };

  const getVisibilityIcon = (visibility: string) => {
    switch (visibility) {
      case 'public':
        return <PublicIcon color="primary" />;
      case 'internal':
        return <BusinessIcon color="action" />;
      case 'private':
        return <LockIcon color="error" />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Typography variant="h6" className={classes.sectionTitle}>
        Portal Settings
      </Typography>
      <Typography variant="body2" className={classes.helperText}>
        Configure how your API appears in the developer portal.
      </Typography>

      {/* Visibility */}
      <Typography variant="subtitle2" gutterBottom style={{ marginTop: 16 }}>
        Visibility
      </Typography>
      <Grid container spacing={2}>
        {VISIBILITY_OPTIONS.map(option => (
          <Grid item xs={12} sm={4} key={option.value}>
            <Paper
              className={`${classes.visibilityCard} ${
                formData.visibility === option.value ? classes.visibilityCardSelected : ''
              }`}
              onClick={() =>
                updateFormData({
                  visibility: option.value as typeof formData.visibility,
                })
              }
            >
              <Box textAlign="center">
                <Box className={classes.visibilityIcon}>
                  {getVisibilityIcon(option.value)}
                </Box>
                <Typography variant="subtitle1" style={{ fontWeight: 500 }}>
                  {option.label}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {option.description}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Category */}
      <Box mt={3}>
        <Typography variant="subtitle2" gutterBottom>
          Category
        </Typography>
        <TextField
          select
          fullWidth
          value={formData.category}
          onChange={e => updateFormData({ category: e.target.value })}
          error={!!errors.category}
          helperText={errors.category || 'Select a category for your API'}
        >
          {CATEGORY_OPTIONS.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* Tags */}
      <Box mt={3}>
        <Typography variant="subtitle2" gutterBottom>
          Tags
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Select tags to help users discover your API
        </Typography>
        <Box className={classes.chipContainer}>
          {TAG_OPTIONS.map(option => (
            <Chip
              key={option.value}
              label={option.label}
              onClick={() => handleTagToggle(option.value)}
              color={formData.tags.includes(option.value) ? 'primary' : 'default'}
              variant={formData.tags.includes(option.value) ? 'default' : 'outlined'}
              className={classes.tagChip}
            />
          ))}
        </Box>
        {formData.tags.length > 0 && (
          <Typography variant="caption" color="textSecondary" style={{ marginTop: 8 }}>
            {formData.tags.length} tag(s) selected
          </Typography>
        )}
      </Box>

      {/* Documentation */}
      <Box mt={3}>
        <Typography variant="subtitle2" gutterBottom>
          Additional Documentation
        </Typography>
        <TextField
          multiline
          rows={6}
          fullWidth
          placeholder="Add any additional documentation, usage notes, or examples in Markdown format..."
          value={formData.documentation}
          onChange={e => updateFormData({ documentation: e.target.value })}
          helperText="Supports Markdown formatting"
          className={classes.textField}
        />
      </Box>
    </div>
  );
};

export default PortalSettingsStep;
