import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Entity } from '@backstage/catalog-model';
import {
  Table,
  TableColumn,
  Progress,
  InfoCard,
} from '@backstage/core-components';
import {
  IconButton,
  Chip,
  makeStyles,
  Theme,
  Tooltip,
  MenuItem,
  Paper,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
} from '@material-ui/core';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { useApi } from '@backstage/core-plugin-api';
import { catalogApiRef } from '@backstage/plugin-catalog-react';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: '100%',
  },
  layout: {
    display: 'flex',
    gap: theme.spacing(3),
    minHeight: '600px',
  },
  filters: {
    width: '250px',
    flexShrink: 0,
  },
  filterPaper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  filterTitle: {
    marginBottom: theme.spacing(2),
    fontWeight: 600,
  },
  filterControl: {
    marginBottom: theme.spacing(2),
    width: '100%',
  },
  tableContainer: {
    flex: 1,
    minWidth: 0,
  },
  actionColumn: {
    position: 'sticky',
    right: 0,
    background: theme.palette.background.paper,
    boxShadow: '-2px 0 5px rgba(0,0,0,0.1)',
    zIndex: 10,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    fontWeight: 500,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  chip: {
    margin: theme.spacing(0.5),
    fontSize: '0.75rem',
    height: '24px',
  },
  statusProduction: {
    backgroundColor: '#E8F5E9',
    color: '#2E7D32',
  },
  statusExperimental: {
    backgroundColor: '#FFF3E0',
    color: '#F57C00',
  },
  statusDeprecated: {
    backgroundColor: '#FFEBEE',
    color: '#D32F2F',
  },
  authOauth2: {
    backgroundColor: '#E3F2FD',
    color: '#1976D2',
  },
  authApiKey: {
    backgroundColor: '#F3E5F5',
    color: '#7B1FA2',
  },
  authJwt: {
    backgroundColor: '#E8F5E9',
    color: '#388E3C',
  },
  authNone: {
    backgroundColor: '#F5F5F5',
    color: '#757575',
  },
  lastUpdated: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(0.5),
    color: theme.palette.text.secondary,
    fontSize: '0.875rem',
  },
}));

interface ApiRowData {
  id: string;
  name: string;
  namespace: string;
  entity: Entity;
  annotations: Record<string, string>;
}

const formatLastUpdated = (timestamp?: string): string => {
  if (!timestamp) return '-';

  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours === 0) {
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
    }
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  } else if (diffDays < 7) {
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} month${months !== 1 ? 's' : ''} ago`;
  }
  const years = Math.floor(diffDays / 365);
  return `${years} year${years !== 1 ? 's' : ''} ago`;
};

export const ApiCatalogTable: React.FC = () => {
  const classes = useStyles();
  const catalogApi = useApi(catalogApiRef);
  const [entities, setEntities] = useState<Entity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | undefined>();

  // Filter states
  const [ownerFilter, setOwnerFilter] = useState<string>('');
  const [lifecycleFilter, setLifecycleFilter] = useState<string>('');
  const [tagFilter, setTagFilter] = useState<string>('');

  useEffect(() => {
    const fetchApis = async () => {
      try {
        setLoading(true);
        const response = await catalogApi.getEntities({
          filter: {
            kind: 'api',
          },
        });
        setEntities(response.items);
        setError(undefined);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchApis();
  }, [catalogApi]);

  // Get unique values for filters
  const uniqueOwners = Array.from(new Set(entities.map(e => e.spec?.owner).filter(Boolean))) as string[];
  const uniqueLifecycles = Array.from(new Set(entities.map(e => e.spec?.lifecycle).filter(Boolean))) as string[];
  const uniqueTags = Array.from(new Set(entities.flatMap(e => e.metadata.tags || [])));

  // Apply filters
  const filteredEntities = entities.filter(entity => {
    if (ownerFilter && entity.spec?.owner !== ownerFilter) return false;
    if (lifecycleFilter && entity.spec?.lifecycle !== lifecycleFilter) return false;
    if (tagFilter && !entity.metadata.tags?.includes(tagFilter)) return false;
    return true;
  });

  const tableData: ApiRowData[] = filteredEntities.map(entity => ({
    id: entity.metadata.uid || entity.metadata.name,
    name: entity.metadata.name,
    namespace: entity.metadata.namespace || 'default',
    entity: entity,
    annotations: entity.metadata.annotations || {},
  }));

  const getStatusChipClass = (lifecycle?: string): string => {
    switch (lifecycle) {
      case 'production':
        return classes.statusProduction;
      case 'experimental':
        return classes.statusExperimental;
      case 'deprecated':
        return classes.statusDeprecated;
      default:
        return classes.statusExperimental;
    }
  };

  const getAuthChipClass = (authType?: string): string => {
    switch (authType?.toLowerCase()) {
      case 'oauth2':
        return classes.authOauth2;
      case 'api-key':
        return classes.authApiKey;
      case 'jwt':
        return classes.authJwt;
      case 'none':
      default:
        return classes.authNone;
    }
  };

  const getStatusLabel = (lifecycle?: string): string => {
    switch (lifecycle) {
      case 'production':
        return 'Active';
      case 'experimental':
        return 'Experimental';
      case 'deprecated':
        return 'Deprecated';
      default:
        return lifecycle || 'Unknown';
    }
  };

  const getAuthLabel = (authType?: string): string => {
    if (!authType) return 'None';
    return authType.charAt(0).toUpperCase() + authType.slice(1).toLowerCase();
  };

  const columns: TableColumn<ApiRowData>[] = [
    {
      title: 'API Name',
      field: 'name',
      highlight: true,
      render: row => (
        <Link
          to={`/catalog/${row.namespace}/api/${row.name}`}
          className={classes.link}
        >
          {row.entity.metadata.title || row.name}
        </Link>
      ),
    },
    {
      title: 'Version',
      field: 'version',
      render: row => row.annotations['backstage.io/api-version'] || '-',
    },
    {
      title: 'Status',
      field: 'status',
      render: row => {
        const lifecycle = row.entity.spec?.lifecycle as string | undefined;
        return (
          <Chip
            label={getStatusLabel(lifecycle)}
            size="small"
            className={`${classes.chip} ${getStatusChipClass(lifecycle)}`}
          />
        );
      },
    },
    {
      title: 'Category',
      field: 'category',
      render: row => row.annotations['backstage.io/api-category'] || '-',
    },
    {
      title: 'Owner',
      field: 'owner',
      render: row => row.entity.spec?.owner || '-',
    },
    {
      title: 'Team',
      field: 'team',
      render: row => {
        const owner = (row.entity.spec?.owner as string) || '';
        return owner.replace(/^group:/, '').replace(/^user:/, '') || '-';
      },
    },
    {
      title: 'Gateway',
      field: 'gateway',
      render: row => row.annotations['backstage.io/api-gateway'] || '-',
    },
    {
      title: 'Auth',
      field: 'auth',
      render: row => {
        const authType = row.annotations['backstage.io/auth-type'] || 'none';
        return (
          <Chip
            label={getAuthLabel(authType)}
            size="small"
            className={`${classes.chip} ${getAuthChipClass(authType)}`}
          />
        );
      },
    },
    {
      title: 'Last Updated',
      field: 'lastUpdated',
      render: row => {
        const timestamp =
          row.entity.metadata.annotations?.['backstage.io/last-updated'] ||
          (row.entity as any).status?.items?.[0]?.timestamp;
        return (
          <Tooltip
            title={timestamp ? new Date(timestamp).toLocaleString() : 'Unknown'}
          >
            <span className={classes.lastUpdated}>
              <AccessTimeIcon style={{ fontSize: 16 }} />
              {formatLastUpdated(timestamp)}
            </span>
          </Tooltip>
        );
      },
    },
    {
      title: 'Action',
      field: 'action',
      sorting: false,
      render: row => (
        <IconButton
          component={Link}
          to={`/catalog/${row.namespace}/api/${row.name}`}
          size="small"
          className={classes.actionColumn}
        >
          <OpenInNewIcon fontSize="small" />
        </IconButton>
      ),
    },
  ];

  if (error) {
    return (
      <InfoCard title="Error">
        <p>Error loading API catalog: {error.message}</p>
      </InfoCard>
    );
  }

  if (loading) {
    return <Progress />;
  }

  return (
    <div className={classes.layout}>
      {/* Filters Sidebar */}
      <div className={classes.filters}>
        <Paper className={classes.filterPaper}>
          <Typography variant="subtitle1" className={classes.filterTitle}>
            Filters
          </Typography>

          {/* Owner Filter */}
          <FormControl className={classes.filterControl}>
            <InputLabel shrink>Owner</InputLabel>
            <Select
              value={ownerFilter}
              onChange={(e) => setOwnerFilter(e.target.value as string)}
              displayEmpty
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {uniqueOwners.map(owner => (
                <MenuItem key={owner} value={owner}>
                  {owner}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Lifecycle Filter */}
          <FormControl className={classes.filterControl}>
            <InputLabel shrink>Lifecycle</InputLabel>
            <Select
              value={lifecycleFilter}
              onChange={(e) => setLifecycleFilter(e.target.value as string)}
              displayEmpty
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {uniqueLifecycles.map(lifecycle => (
                <MenuItem key={lifecycle} value={lifecycle}>
                  {lifecycle}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Tag Filter */}
          <FormControl className={classes.filterControl}>
            <InputLabel shrink>Tag</InputLabel>
            <Select
              value={tagFilter}
              onChange={(e) => setTagFilter(e.target.value as string)}
              displayEmpty
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {uniqueTags.map(tag => (
                <MenuItem key={tag} value={tag}>
                  {tag}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Clear Filters Button */}
          {(ownerFilter || lifecycleFilter || tagFilter) && (
            <Box mt={2}>
              <Chip
                label="Clear filters"
                onClick={() => {
                  setOwnerFilter('');
                  setLifecycleFilter('');
                  setTagFilter('');
                }}
                color="primary"
                variant="outlined"
                size="small"
              />
            </Box>
          )}
        </Paper>

        {/* Results Count */}
        <Typography variant="body2" color="textSecondary">
          Showing {filteredEntities.length} of {entities.length} APIs
        </Typography>
      </div>

      {/* Table */}
      <div className={classes.tableContainer}>
        <Table
          title="APIs"
          options={{
            search: true,
            paging: true,
            padding: 'dense',
            pageSize: 10,
            sorting: true,
            draggable: false,
          }}
          columns={columns}
          data={tableData}
        />
      </div>
    </div>
  );
};

export default ApiCatalogTable;
