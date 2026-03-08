import React, { useState, useCallback } from 'react';
import {
  Drawer,
  IconButton,
  Typography,
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Chip,
  Paper,
  makeStyles,
  Theme,
  Switch,
  FormControlLabel,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import SendIcon from '@material-ui/icons/Send';
import type { ApiDebugDrawerProps, KeyValueItem, SimulatedResponse } from './types';
import type { ApiEndpoint } from '../shared/apiData/types';

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: 600,
    maxWidth: '100vw',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.default,
  },
  drawerTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  drawerContent: {
    padding: theme.spacing(2),
    overflowY: 'auto',
    height: 'calc(100vh - 64px)',
  },
  methodChip: {
    fontFamily: 'monospace',
    fontWeight: 600,
    minWidth: 70,
  },
  get: { backgroundColor: '#61affe', color: 'white' },
  post: { backgroundColor: '#49cc90', color: 'white' },
  put: { backgroundColor: '#fca130', color: 'white' },
  patch: { backgroundColor: '#50e3c2', color: 'white' },
  delete: { backgroundColor: '#f93e3e', color: 'white' },
  urlBar: {
    display: 'flex',
    gap: theme.spacing(1),
    marginBottom: theme.spacing(2),
    alignItems: 'center',
  },
  methodSelect: {
    width: 100,
  },
  pathField: {
    flex: 1,
    fontFamily: 'monospace',
  },
  sendButton: {
    minWidth: 80,
  },
  section: {
    marginBottom: theme.spacing(3),
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(1),
  },
  sectionTitle: {
    fontWeight: 600,
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  keyValueRow: {
    display: 'flex',
    gap: theme.spacing(1),
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
  keyValueField: {
    flex: 1,
  },
  addButton: {
    marginTop: theme.spacing(1),
  },
  bodyEditor: {
    fontFamily: 'monospace',
    fontSize: '0.875rem',
    '& .MuiInputBase-input': {
      fontFamily: 'monospace',
    },
  },
  responseSection: {
    marginTop: theme.spacing(3),
  },
  responseHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  statusChip: {
    fontWeight: 600,
  },
  statusOk: {
    backgroundColor: '#E8F5E9',
    color: '#2E7D32',
  },
  statusError: {
    backgroundColor: '#FFEBEE',
    color: '#D32F2F',
  },
  responseTime: {
    color: theme.palette.text.secondary,
    fontSize: '0.875rem',
  },
  responsePaper: {
    backgroundColor: theme.palette.type === 'dark' ? '#1E1E1E' : '#F5F5F5',
    padding: theme.spacing(2),
    fontFamily: 'monospace',
    fontSize: '0.875rem',
    overflow: 'auto',
    maxHeight: 300,
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  },
  baseUrl: {
    color: theme.palette.text.secondary,
    fontSize: '0.75rem',
    marginBottom: theme.spacing(1),
  },
  noEndpoint: {
    textAlign: 'center',
    padding: theme.spacing(4),
    color: theme.palette.text.secondary,
  },
}));

const METHOD_COLORS: Record<ApiEndpoint['method'], string> = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete',
};

const generateMockResponse = (
  endpoint: ApiEndpoint,
  params: KeyValueItem[],
  _requestBody: string,
): SimulatedResponse => {
  const method = endpoint.method;
  const path = endpoint.path.toLowerCase();

  // Simulate network delay
  const duration = Math.floor(Math.random() * 100) + 20;

  // Generate mock responses based on endpoint
  let mockData: Record<string, unknown>;
  let status = 200;
  let statusText = 'OK';

  if (method === 'GET') {
    if (path.includes('/users')) {
      if (path.includes(':id') || path.includes('{id}')) {
        mockData = {
          id: 'usr_123456',
          email: 'john.doe@example.com',
          name: 'John Doe',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      } else {
        mockData = {
          data: [
            { id: 'usr_001', name: 'Alice Johnson', email: 'alice@example.com' },
            { id: 'usr_002', name: 'Bob Smith', email: 'bob@example.com' },
            { id: 'usr_003', name: 'Charlie Brown', email: 'charlie@example.com' },
          ],
          total: 100,
          page: parseInt(params.find(p => p.key === 'page')?.value || '1', 10),
          limit: parseInt(params.find(p => p.key === 'limit')?.value || '20', 10),
        };
      }
    } else if (path.includes('/orders')) {
      mockData = {
        data: [
          { id: 'ord_001', status: 'completed', total: 99.99 },
          { id: 'ord_002', status: 'pending', total: 149.99 },
        ],
        total: 50,
      };
    } else if (path.includes('/payments')) {
      mockData = {
        id: 'pay_123456',
        status: 'completed',
        amount: 100.00,
        currency: 'USD',
      };
    } else if (path.includes('/inventory')) {
      mockData = {
        items: [
          { id: 'inv_001', name: 'Product A', quantity: 150 },
          { id: 'inv_002', name: 'Product B', quantity: 75 },
        ],
        total: 2,
      };
    } else if (path.includes('/notifications')) {
      mockData = {
        notifications: [
          { id: 'notif_001', type: 'email', status: 'sent' },
          { id: 'notif_002', type: 'sms', status: 'delivered' },
        ],
      };
    } else if (path.includes('/analytics')) {
      mockData = {
        events: [],
        reports: {
          daily: { views: 1234, clicks: 567 },
          weekly: { views: 8765, clicks: 4321 },
        },
      };
    } else {
      mockData = {
        message: 'Mock response',
        endpoint: path,
        timestamp: new Date().toISOString(),
      };
    }
  } else if (method === 'POST') {
    status = 201;
    statusText = 'Created';
    if (path.includes('/users')) {
      mockData = {
        id: 'usr_new_' + Date.now(),
        success: true,
        message: 'User created successfully',
      };
    } else if (path.includes('/orders')) {
      mockData = {
        id: 'ord_new_' + Date.now(),
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
    } else if (path.includes('/payments')) {
      mockData = {
        id: 'pay_new_' + Date.now(),
        status: 'processing',
        message: 'Payment initiated',
      };
    } else {
      mockData = {
        id: 'item_' + Date.now(),
        success: true,
        message: 'Resource created successfully',
      };
    }
  } else if (method === 'PUT' || method === 'PATCH') {
    mockData = {
      success: true,
      message: 'Resource updated successfully',
      updatedAt: new Date().toISOString(),
    };
  } else if (method === 'DELETE') {
    status = 204;
    statusText = 'No Content';
    mockData = {
      success: true,
      message: 'Resource deleted successfully',
    };
  } else {
    mockData = {
      message: 'Unknown method',
    };
  }

  return {
    status,
    statusText,
    headers: {
      'Content-Type': 'application/json',
      'X-Request-Id': `req_${Date.now()}`,
      'X-Response-Time': `${duration}ms`,
    },
    body: JSON.stringify(mockData, null, 2),
    duration,
  };
};

export const ApiDebugDrawer: React.FC<ApiDebugDrawerProps> = ({
  open,
  onClose,
  endpoint,
  baseUrl,
  authConfig,
}) => {
  const classes = useStyles();

  const [method, setMethod] = useState<ApiEndpoint['method']>('GET');
  const [path, setPath] = useState('');
  const [params, setParams] = useState<KeyValueItem[]>([]);
  const [headers, setHeaders] = useState<KeyValueItem[]>([
    { key: 'Content-Type', value: 'application/json', enabled: true },
  ]);
  const [requestBody, setRequestBody] = useState('{\n  \n}');
  const [response, setResponse] = useState<SimulatedResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize when endpoint changes
  React.useEffect(() => {
    if (endpoint) {
      setMethod(endpoint.method);
      setPath(endpoint.path);
      setResponse(null);

      // Initialize default headers based on auth config
      const defaultHeaders: KeyValueItem[] = [
        { key: 'Content-Type', value: 'application/json', enabled: true },
      ];

      if (authConfig && authConfig.type !== 'None') {
        if (authConfig.type === 'OAuth2' || authConfig.type === 'JWT') {
          defaultHeaders.push({
            key: 'Authorization',
            value: 'Bearer <your_token_here>',
            enabled: true,
          });
        } else if (authConfig.type === 'API-Key') {
          defaultHeaders.push({
            key: 'X-API-Key',
            value: '<your_api_key_here>',
            enabled: true,
          });
        }
      }

      setHeaders(defaultHeaders);

      // Parse path parameters
      const pathParams = endpoint.path.match(/:([^/]+)/g) || [];
      const paramItems = pathParams.map(p => ({
        key: p.replace(':', ''),
        value: '',
        enabled: true,
      }));
      setParams(paramItems);

      // Set default request body for POST/PUT/PATCH
      if (['POST', 'PUT', 'PATCH'].includes(endpoint.method)) {
        setRequestBody('{\n  "name": "example"\n}');
      } else {
        setRequestBody('{\n  \n}');
      }
    }
  }, [endpoint, authConfig]);

  const handleAddParam = () => {
    setParams([...params, { key: '', value: '', enabled: true }]);
  };

  const handleRemoveParam = (index: number) => {
    setParams(params.filter((_, i) => i !== index));
  };

  const handleUpdateParam = (
    index: number,
    field: keyof KeyValueItem,
    value: string | boolean,
  ) => {
    const newParams = [...params];
    newParams[index] = { ...newParams[index], [field]: value };
    setParams(newParams);
  };

  const handleAddHeader = () => {
    setHeaders([...headers, { key: '', value: '', enabled: true }]);
  };

  const handleRemoveHeader = (index: number) => {
    setHeaders(headers.filter((_, i) => i !== index));
  };

  const handleUpdateHeader = (
    index: number,
    field: keyof KeyValueItem,
    value: string | boolean,
  ) => {
    const newHeaders = [...headers];
    newHeaders[index] = { ...newHeaders[index], [field]: value };
    setHeaders(newHeaders);
  };

  const handleSend = useCallback(() => {
    if (!endpoint) return;

    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const mockResponse = generateMockResponse(endpoint, params, requestBody);
      setResponse(mockResponse);
      setIsLoading(false);
    }, 500);
  }, [endpoint, params, requestBody]);

  const showBodyEditor = ['POST', 'PUT', 'PATCH'].includes(method);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      classes={{ paper: classes.drawer }}
    >
      <Box className={classes.drawerHeader}>
        <Box className={classes.drawerTitle}>
          <Typography variant="h6">API Debugger</Typography>
          {endpoint && (
            <Chip
              label={endpoint.method}
              size="small"
              className={`${classes.methodChip} ${
                classes[METHOD_COLORS[endpoint.method] as 'get' | 'post' | 'put' | 'patch' | 'delete']
              }`}
            />
          )}
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      <Box className={classes.drawerContent}>
        {endpoint ? (
          <>
            {/* URL Bar */}
            <Typography className={classes.baseUrl}>Base URL: {baseUrl}</Typography>
            <Box className={classes.urlBar}>
              <FormControl className={classes.methodSelect}>
                <Select
                  value={method}
                  onChange={e => setMethod(e.target.value as ApiEndpoint['method'])}
                  disabled
                >
                  <MenuItem value="GET">GET</MenuItem>
                  <MenuItem value="POST">POST</MenuItem>
                  <MenuItem value="PUT">PUT</MenuItem>
                  <MenuItem value="PATCH">PATCH</MenuItem>
                  <MenuItem value="DELETE">DELETE</MenuItem>
                </Select>
              </FormControl>
              <TextField
                className={classes.pathField}
                value={path}
                onChange={e => setPath(e.target.value)}
                variant="outlined"
                size="small"
                InputProps={{
                  style: { fontFamily: 'monospace' },
                }}
              />
              <Button
                className={classes.sendButton}
                variant="contained"
                color="primary"
                startIcon={<SendIcon />}
                onClick={handleSend}
                disabled={isLoading}
              >
                Send
              </Button>
            </Box>

            {/* Parameters Section */}
            <Box className={classes.section}>
              <Box className={classes.sectionHeader}>
                <Typography className={classes.sectionTitle}>Parameters</Typography>
                <Button
                  size="small"
                  startIcon={<AddIcon />}
                  onClick={handleAddParam}
                >
                  Add
                </Button>
              </Box>
              {params.length === 0 ? (
                <Typography variant="body2" color="textSecondary">
                  No parameters
                </Typography>
              ) : (
                params.map((param, index) => (
                  <Box key={index} className={classes.keyValueRow}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={param.enabled}
                          onChange={e =>
                            handleUpdateParam(index, 'enabled', e.target.checked)
                          }
                          size="small"
                        />
                      }
                      label=""
                    />
                    <TextField
                      className={classes.keyValueField}
                      placeholder="Key"
                      value={param.key}
                      onChange={e => handleUpdateParam(index, 'key', e.target.value)}
                      size="small"
                    />
                    <TextField
                      className={classes.keyValueField}
                      placeholder="Value"
                      value={param.value}
                      onChange={e => handleUpdateParam(index, 'value', e.target.value)}
                      size="small"
                    />
                    <IconButton size="small" onClick={() => handleRemoveParam(index)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))
              )}
            </Box>

            {/* Headers Section */}
            <Box className={classes.section}>
              <Box className={classes.sectionHeader}>
                <Typography className={classes.sectionTitle}>Headers</Typography>
                <Button
                  size="small"
                  startIcon={<AddIcon />}
                  onClick={handleAddHeader}
                >
                  Add
                </Button>
              </Box>
              {headers.map((header, index) => (
                <Box key={index} className={classes.keyValueRow}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={header.enabled}
                        onChange={e =>
                          handleUpdateHeader(index, 'enabled', e.target.checked)
                        }
                        size="small"
                      />
                    }
                    label=""
                  />
                  <TextField
                    className={classes.keyValueField}
                    placeholder="Key"
                    value={header.key}
                    onChange={e => handleUpdateHeader(index, 'key', e.target.value)}
                    size="small"
                  />
                  <TextField
                    className={classes.keyValueField}
                    placeholder="Value"
                    value={header.value}
                    onChange={e => handleUpdateHeader(index, 'value', e.target.value)}
                    size="small"
                  />
                  <IconButton size="small" onClick={() => handleRemoveHeader(index)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Box>

            {/* Request Body Section */}
            {showBodyEditor && (
              <Box className={classes.section}>
                <Typography className={classes.sectionTitle} gutterBottom>
                  Request Body (JSON)
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  value={requestBody}
                  onChange={e => setRequestBody(e.target.value)}
                  variant="outlined"
                  className={classes.bodyEditor}
                  InputProps={{
                    className: classes.bodyEditor,
                  }}
                />
              </Box>
            )}

            {/* Response Section */}
            {response && (
              <Box className={classes.responseSection}>
                <Box className={classes.sectionHeader}>
                  <Typography className={classes.sectionTitle}>Response</Typography>
                </Box>
                <Box className={classes.responseHeader}>
                  <Chip
                    label={`${response.status} ${response.statusText}`}
                    size="small"
                    className={`${classes.statusChip} ${
                      response.status < 400 ? classes.statusOk : classes.statusError
                    }`}
                  />
                  <Typography className={classes.responseTime}>
                    {response.duration}ms
                  </Typography>
                </Box>
                <Paper className={classes.responsePaper}>{response.body}</Paper>
              </Box>
            )}
          </>
        ) : (
          <Box className={classes.noEndpoint}>
            <Typography variant="body1">
              Select an endpoint to start debugging
            </Typography>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default ApiDebugDrawer;
