import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Paper,
  makeStyles,
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

import { getRecentlyUpdatedApis, type ApiRecord } from '../shared/apiData';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(3),
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: 600,
    marginBottom: theme.spacing(2),
    color: theme.palette.text.primary,
  },
  tableContainer: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
  },
  table: {
    minWidth: 650,
  },
  tableHead: {
    backgroundColor: '#F4F5F7',
  },
  headCell: {
    fontWeight: 600,
    color: theme.palette.text.primary,
    fontSize: '0.85rem',
  },
  bodyCell: {
    fontSize: '0.9rem',
    color: theme.palette.text.primary,
  },
  apiName: {
    fontWeight: 500,
    cursor: 'pointer',
    '&:hover': {
      color: '#0052CC',
    },
  },
  chipActive: {
    backgroundColor: '#E3F2FD',
    color: '#0052CC',
    fontSize: '0.75rem',
  },
  chipDeprecated: {
    backgroundColor: '#FFEBEE',
    color: '#D32F2F',
    fontSize: '0.75rem',
  },
  chipDraft: {
    backgroundColor: '#FFF3E0',
    color: '#F57C00',
    fontSize: '0.75rem',
  },
}));

const getStatusChipClass = (
  status: ApiRecord['status'],
  classes: ReturnType<typeof useStyles>,
) => {
  switch (status) {
    case 'Active':
      return classes.chipActive;
    case 'Deprecated':
      return classes.chipDeprecated;
    case 'Draft':
      return classes.chipDraft;
    default:
      return classes.chipActive;
  }
};

const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours === 0) {
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      return `${diffMinutes} minutes ago`;
    }
    return `${diffHours} hours ago`;
  } else if (diffDays === 1) {
    return '1 day ago';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
  } else {
    return date.toLocaleDateString();
  }
};

export const RecentlyUpdatedApis: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  // Get recently updated APIs from shared mock data
  const recentApis = getRecentlyUpdatedApis(6);

  const handleApiClick = (apiId: string) => {
    navigate(`/api-detail/${apiId}`);
  };

  return (
    <Box className={classes.root}>
      <Typography className={classes.title}>Recently Updated APIs</Typography>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table}>
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell className={classes.headCell}>API Name</TableCell>
              <TableCell className={classes.headCell}>Type</TableCell>
              <TableCell className={classes.headCell}>Owner</TableCell>
              <TableCell className={classes.headCell}>Status</TableCell>
              <TableCell className={classes.headCell}>Version</TableCell>
              <TableCell className={classes.headCell}>Updated</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentApis.map(api => (
              <TableRow key={api.id} hover>
                <TableCell className={classes.bodyCell}>
                  <Typography
                    className={classes.apiName}
                    onClick={() => handleApiClick(api.id)}
                  >
                    {api.name}
                  </Typography>
                </TableCell>
                <TableCell className={classes.bodyCell}>{api.type}</TableCell>
                <TableCell className={classes.bodyCell}>{api.team}</TableCell>
                <TableCell className={classes.bodyCell}>
                  <Chip
                    label={api.status}
                    size="small"
                    className={getStatusChipClass(api.status, classes)}
                  />
                </TableCell>
                <TableCell className={classes.bodyCell}>
                  v{api.version}
                </TableCell>
                <TableCell className={classes.bodyCell}>
                  {formatRelativeTime(api.updatedAt)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RecentlyUpdatedApis;
