import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Card,
  CardContent,
  makeStyles,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { AppConfig } from '../types';

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2),
  },
  sectionTitle: {
    fontSize: '1rem',
    fontWeight: 600,
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  formField: {
    marginBottom: theme.spacing(2),
  },
  envCard: {
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
  },
  envRow: {
    display: 'flex',
    gap: theme.spacing(2),
    alignItems: 'center',
  },
  envKey: {
    flex: 1,
  },
  envValue: {
    flex: 2,
  },
  addButton: {
    marginTop: theme.spacing(1),
  },
  helperText: {
    color: theme.palette.text.secondary,
    fontSize: '0.85rem',
    marginTop: theme.spacing(0.5),
  },
}));

interface ConfigureAppStepProps {
  config: AppConfig;
  onChange: (config: AppConfig) => void;
}

export const ConfigureAppStep = ({ config, onChange }: ConfigureAppStepProps) => {
  const classes = useStyles();
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');

  const handleNameChange = (name: string) => {
    onChange({ ...config, name });
  };

  const handleDescriptionChange = (description: string) => {
    onChange({ ...config, description });
  };

  const handleVersionChange = (version: string) => {
    onChange({ ...config, version });
  };

  const handleAddEnvVar = () => {
    if (newKey.trim() && newValue.trim()) {
      onChange({
        ...config,
        environmentVariables: [
          ...config.environmentVariables,
          { key: newKey.trim(), value: newValue.trim() },
        ],
      });
      setNewKey('');
      setNewValue('');
    }
  };

  const handleRemoveEnvVar = (index: number) => {
    const newEnvVars = config.environmentVariables.filter((_, i) => i !== index);
    onChange({ ...config, environmentVariables: newEnvVars });
  };

  return (
    <Box className={classes.container}>
      <Typography className={classes.sectionTitle}>Application Configuration</Typography>

      <TextField
        label="App Name"
        variant="outlined"
        fullWidth
        required
        value={config.name}
        onChange={e => handleNameChange(e.target.value)}
        className={classes.formField}
        placeholder="my-awesome-app"
        error={!config.name.trim()}
        helperText={!config.name.trim() ? 'App name is required' : 'Unique identifier for your application'}
      />

      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        multiline
        rows={3}
        value={config.description}
        onChange={e => handleDescriptionChange(e.target.value)}
        className={classes.formField}
        placeholder="A brief description of your application..."
      />

      <TextField
        label="Version"
        variant="outlined"
        fullWidth
        value={config.version}
        onChange={e => handleVersionChange(e.target.value)}
        className={classes.formField}
        placeholder="1.0.0"
      />

      <Typography className={classes.sectionTitle}>Environment Variables</Typography>
      <Typography className={classes.helperText}>
        Add environment variables that will be available in your application.
      </Typography>

      {config.environmentVariables.map((envVar, index) => (
        <Card key={index} className={classes.envCard}>
          <CardContent>
            <Box className={classes.envRow}>
              <TextField
                label="Key"
                variant="outlined"
                size="small"
                value={envVar.key}
                className={classes.envKey}
                disabled
              />
              <TextField
                label="Value"
                variant="outlined"
                size="small"
                value={envVar.value}
                className={classes.envValue}
                disabled
              />
              <IconButton onClick={() => handleRemoveEnvVar(index)} color="secondary">
                <DeleteIcon />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      ))}

      <Card className={classes.envCard}>
        <CardContent>
          <Box className={classes.envRow}>
            <TextField
              label="New Key"
              variant="outlined"
              size="small"
              value={newKey}
              onChange={e => setNewKey(e.target.value)}
              className={classes.envKey}
              placeholder="API_KEY"
            />
            <TextField
              label="New Value"
              variant="outlined"
              size="small"
              value={newValue}
              onChange={e => setNewValue(e.target.value)}
              className={classes.envValue}
              placeholder="your-api-key"
            />
            <IconButton
              onClick={handleAddEnvVar}
              color="primary"
              disabled={!newKey.trim() || !newValue.trim()}
            >
              <AddIcon />
            </IconButton>
          </Box>
        </CardContent>
      </Card>

      <Button
        variant="outlined"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleAddEnvVar}
        disabled={!newKey.trim() || !newValue.trim()}
        className={classes.addButton}
      >
        Add Environment Variable
      </Button>
    </Box>
  );
};
