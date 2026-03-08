import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  makeStyles,
} from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import type { EndpointsListProps } from './types';

const useStyles = makeStyles(theme => ({
  card: {
    marginBottom: theme.spacing(2),
  },
  methodChip: {
    fontFamily: 'monospace',
    fontWeight: 600,
    minWidth: 60,
  },
  get: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  post: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.contrastText,
  },
  put: {
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.warning.contrastText,
  },
  patch: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
  delete: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
  },
  path: {
    fontFamily: 'monospace',
    fontSize: '0.9rem',
  },
  tryButton: {
    minWidth: 80,
  },
}));

const METHOD_CLASSES: Record<string, string> = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete',
};

export const EndpointsList: React.FC<EndpointsListProps> = ({ endpoints, onTryIt }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader title="Endpoints" subheader={`${endpoints.length} endpoints available`} />
      <CardContent>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Method</TableCell>
                <TableCell>Path</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {endpoints.map((endpoint, index) => (
                <TableRow key={`${endpoint.method}-${endpoint.path}-${index}`}>
                  <TableCell>
                    <Chip
                      label={endpoint.method}
                      size="small"
                      className={`${classes.methodChip} ${classes[METHOD_CLASSES[endpoint.method] as keyof typeof classes]}`}
                    />
                  </TableCell>
                  <TableCell>
                    <span className={classes.path}>{endpoint.path}</span>
                  </TableCell>
                  <TableCell>{endpoint.description}</TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      variant="outlined"
                      color="primary"
                      startIcon={<PlayArrowIcon />}
                      className={classes.tryButton}
                      onClick={() => onTryIt(endpoint)}
                    >
                      Try it
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};
