import React, { useEffect, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  makeStyles,
  Typography,
  Box,
  Chip,
} from '@material-ui/core';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import type { SwaggerUiModalProps } from './types';

const useStyles = makeStyles(theme => ({
  dialog: {
    '& .MuiDialog-paper': {
      maxWidth: '90vw',
      maxHeight: '90vh',
      width: '1200px',
    },
  },
  dialogContent: {
    padding: 0,
    height: '70vh',
    overflow: 'hidden',
    '& .swagger-ui': {
      height: '100%',
      overflow: 'auto',
    },
    '& .swagger-ui .wrapper': {
      maxWidth: 'none',
      padding: theme.spacing(2),
    },
    '& .swagger-ui .information-container': {
      padding: theme.spacing(0, 2),
    },
    '& .swagger-ui .base-url': {
      display: 'none',
    },
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    padding: theme.spacing(1, 3),
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  methodChip: {
    fontFamily: 'monospace',
    fontWeight: 600,
    minWidth: 60,
  },
  get: {
    backgroundColor: '#61affe',
    color: 'white',
  },
  post: {
    backgroundColor: '#49cc90',
    color: 'white',
  },
  put: {
    backgroundColor: '#fca130',
    color: 'white',
  },
  patch: {
    backgroundColor: '#50e3c2',
    color: 'white',
  },
  delete: {
    backgroundColor: '#f93e3e',
    color: 'white',
  },
  path: {
    fontFamily: 'monospace',
    fontSize: '1rem',
    fontWeight: 500,
  },
}));

const METHOD_CLASSES: Record<string, string> = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete',
};

export const SwaggerUiModal: React.FC<SwaggerUiModalProps> = ({
  open,
  onClose,
  spec,
  endpoint,
}) => {
  const classes = useStyles();
  const swaggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && endpoint && swaggerRef.current) {
      // Scroll to the specific endpoint after Swagger UI renders
      const timer = setTimeout(() => {
        const operations = swaggerRef.current?.querySelectorAll('.opblock-tag-section');
        if (operations && operations.length > 0) {
          // Try to find and expand the endpoint
          const endpointId = endpoint.path.replace(/\//g, '_').replace(/:/g, '-');
          const targetElement = swaggerRef.current?.querySelector(`#operations-${endpointId}`);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }, 500);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [open, endpoint]);

  const parseSpec = () => {
    try {
      return JSON.parse(spec);
    } catch {
      // Try to parse as YAML (simplified - in production use a YAML parser)
      return spec;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className={classes.dialog}
      scroll="paper"
    >
      <DialogTitle>
        <Typography variant="h6">API Explorer</Typography>
      </DialogTitle>

      {endpoint && (
        <Box className={classes.header}>
          <Chip
            label={endpoint.method}
            size="small"
            className={`${classes.methodChip} ${classes[METHOD_CLASSES[endpoint.method] as keyof typeof classes]}`}
          />
          <Typography className={classes.path}>{endpoint.path}</Typography>
        </Box>
      )}

      <DialogContent className={classes.dialogContent}>
        <div ref={swaggerRef}>
          <SwaggerUI
            spec={parseSpec()}
            defaultModelExpandDepth={1}
            docExpansion="list"
            filter
            deepLinking
            displayOperationId={false}
            displayRequestDuration
            tryItOutEnabled
          />
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
