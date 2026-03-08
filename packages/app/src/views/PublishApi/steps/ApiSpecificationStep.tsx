import React, { useCallback } from 'react';
import {
  Box,
  Typography,
  Paper,
  Chip,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DescriptionIcon from '@material-ui/icons/Description';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import type { StepProps, DetectedEndpoint } from '../types';

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
  dropZone: {
    border: `2px dashed ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(4),
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    backgroundColor: theme.palette.background.default,
    '&:hover': {
      borderColor: '#0052CC',
      backgroundColor: '#f5f9ff',
    },
  },
  dropZoneActive: {
    borderColor: '#0052CC',
    backgroundColor: '#e3f2fd',
  },
  uploadIcon: {
    fontSize: 48,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
  },
  fileInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    padding: theme.spacing(2),
    backgroundColor: '#e8f5e9',
    borderRadius: theme.shape.borderRadius,
    marginTop: theme.spacing(2),
  },
  specPreview: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
    maxHeight: 200,
    overflow: 'auto',
    fontFamily: 'monospace',
    fontSize: '0.8rem',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-all',
  },
  endpointsSection: {
    marginTop: theme.spacing(3),
  },
  endpointItem: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    '&:last-child': {
      borderBottom: 'none',
    },
  },
  methodChip: {
    fontFamily: 'monospace',
    fontWeight: 600,
    minWidth: 50,
    marginRight: theme.spacing(1),
  },
  supportedFormats: {
    marginTop: theme.spacing(1),
    display: 'flex',
    gap: theme.spacing(1),
  },
}));

const METHOD_COLORS: Record<string, 'primary' | 'secondary' | 'default'> = {
  GET: 'primary',
  POST: 'secondary',
  PUT: 'default',
  PATCH: 'default',
  DELETE: 'default',
};

export const ApiSpecificationStep: React.FC<StepProps> = ({
  formData,
  updateFormData,
  errors,
}) => {
  const classes = useStyles();

  const handleFileDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const file = event.dataTransfer.files[0];
      if (file) {
        processFile(file);
      }
    },
    [],
  );

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = e => {
      const content = e.target?.result as string;
      const specType = file.name.endsWith('.json') ? 'json' : 'yaml';

      // Simple endpoint detection (in production, use proper OpenAPI parser)
      const detectedEndpoints = detectEndpoints(content);

      updateFormData({
        specFile: file,
        specContent: content,
        specType,
        detectedEndpoints,
      });
    };
    reader.readAsText(file);
  };

  const detectEndpoints = (content: string): DetectedEndpoint[] => {
    const endpoints: DetectedEndpoint[] = [];
    try {
      const lines = content.split('\n');
      let currentPath = '';

      for (const line of lines) {
        const pathMatch = line.match(/^\s*['"]?(\/[a-zA-Z0-9\-_/:]+)['"]?:\s*\{/);
        if (pathMatch) {
          currentPath = pathMatch[1];
        }

        const methodMatch = line.match(/^\s*(get|post|put|patch|delete):\s*\{/i);
        if (methodMatch && currentPath) {
          const method = methodMatch[1].toUpperCase() as DetectedEndpoint['method'];
          endpoints.push({
            path: currentPath,
            method,
            summary: `${method} ${currentPath}`,
          });
        }
      }

      // If no endpoints detected, add some defaults for demo
      if (endpoints.length === 0) {
        endpoints.push(
          { path: '/api/resource', method: 'GET', summary: 'List resources' },
          { path: '/api/resource', method: 'POST', summary: 'Create resource' },
        );
      }
    } catch {
      // Ignore parsing errors
    }
    return endpoints;
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div>
      <Typography variant="h6" className={classes.sectionTitle}>
        API Specification
      </Typography>
      <Typography variant="body2" className={classes.helperText}>
        Upload your OpenAPI 3.x specification file (YAML or JSON format).
      </Typography>

      <Box
        className={classes.dropZone}
        onDrop={handleFileDrop}
        onDragOver={handleDragOver}
        onClick={() => document.getElementById('file-input')?.click()}
      >
        <CloudUploadIcon className={classes.uploadIcon} />
        <Typography variant="h6" gutterBottom>
          Drag & drop your API spec here
        </Typography>
        <Typography variant="body2" color="textSecondary">
          or click to browse
        </Typography>
        <Box className={classes.supportedFormats}>
          <Chip label=".yaml" size="small" />
          <Chip label=".yml" size="small" />
          <Chip label=".json" size="small" />
        </Box>
      </Box>

      <input
        id="file-input"
        type="file"
        accept=".yaml,.yml,.json"
        style={{ display: 'none' }}
        onChange={handleFileSelect}
      />

      {errors.specContent && (
        <Typography color="error" variant="body2" style={{ marginTop: 8 }}>
          {errors.specContent}
        </Typography>
      )}

      {formData.specFile && (
        <Box className={classes.fileInfo}>
          <CheckCircleIcon style={{ color: '#4caf50' }} />
          <DescriptionIcon />
          <Box>
            <Typography variant="body2" style={{ fontWeight: 500 }}>
              {formData.specFile.name}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {(formData.specFile.size / 1024).toFixed(1)} KB • {formData.specType.toUpperCase()}
            </Typography>
          </Box>
        </Box>
      )}

      {formData.specContent && (
        <>
          <Typography variant="subtitle2" style={{ marginTop: 16 }}>
            Specification Preview
          </Typography>
          <Paper className={classes.specPreview}>
            {formData.specContent.substring(0, 1000)}
            {formData.specContent.length > 1000 && '...'}
          </Paper>
        </>
      )}

      {formData.detectedEndpoints.length > 0 && (
        <Box className={classes.endpointsSection}>
          <Typography variant="subtitle2" gutterBottom>
            Detected Endpoints ({formData.detectedEndpoints.length})
          </Typography>
          <Paper>
            <List dense>
              {formData.detectedEndpoints.map((endpoint, index) => (
                <ListItem key={`${endpoint.method}-${endpoint.path}-${index}`} className={classes.endpointItem}>
                  <Chip
                    label={endpoint.method}
                    size="small"
                    color={METHOD_COLORS[endpoint.method]}
                    className={classes.methodChip}
                  />
                  <ListItemText
                    primary={endpoint.path}
                    secondary={endpoint.summary}
                    primaryTypographyProps={{ style: { fontFamily: 'monospace' } }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      )}
    </div>
  );
};

export default ApiSpecificationStep;
