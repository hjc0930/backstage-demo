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

interface ApiItem {
  id: string;
  name: string;
  description: string;
  owner: string;
  status: 'Active' | 'Deprecated' | 'Draft';
  updatedAt: string;
  version: string;
  type: string;
}

const mockApiData: ApiItem[] = [
  {
    id: '1',
    name: 'User Service API',
    description: 'User management and authentication service',
    owner: 'Team Alpha',
    status: 'Active',
    updatedAt: '2 hours ago',
    version: 'v2.1.0',
    type: 'REST',
  },
  {
    id: '2',
    name: 'Payment API',
    description: 'Payment processing and billing service',
    owner: 'Team Beta',
    status: 'Active',
    updatedAt: '1 day ago',
    version: 'v1.5.2',
    type: 'REST',
  },
  {
    id: '3',
    name: 'Notification Service',
    description: 'Email and push notification service',
    owner: 'Team Gamma',
    status: 'Active',
    updatedAt: '3 days ago',
    version: 'v3.0.1',
    type: 'gRPC',
  },
  {
    id: '4',
    name: 'Inventory API',
    description: 'Product inventory management',
    owner: 'Team Delta',
    status: 'Draft',
    updatedAt: '5 days ago',
    version: 'v0.9.0',
    type: 'GraphQL',
  },
  {
    id: '5',
    name: 'Legacy Auth API',
    description: 'Deprecated authentication service',
    owner: 'Team Alpha',
    status: 'Deprecated',
    updatedAt: '1 week ago',
    version: 'v1.0.0',
    type: 'REST',
  },
  {
    id: '6',
    name: 'Analytics API',
    description: 'Business analytics and reporting',
    owner: 'Team Beta',
    status: 'Active',
    updatedAt: '2 weeks ago',
    version: 'v4.2.0',
    type: 'REST',
  },
];

const getStatusChipClass = (
  status: ApiItem['status'],
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

export const RecentlyUpdatedApis = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleApiClick = (apiId: string) => {
    navigate(`/catalog/default/api/${apiId}`);
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
            {mockApiData.map(api => (
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
                <TableCell className={classes.bodyCell}>{api.owner}</TableCell>
                <TableCell className={classes.bodyCell}>
                  <Chip
                    label={api.status}
                    size="small"
                    className={getStatusChipClass(api.status, classes)}
                  />
                </TableCell>
                <TableCell className={classes.bodyCell}>
                  {api.version}
                </TableCell>
                <TableCell className={classes.bodyCell}>
                  {api.updatedAt}
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
