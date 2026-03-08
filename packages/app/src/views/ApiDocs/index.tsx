import { useState, useEffect, useMemo } from 'react';
import {
  Content,
  Header,
  Page,
  Table,
  TableColumn,
  Progress,
  StatusOK,
  StatusError,
  StatusWarning,
  Link,
} from '@backstage/core-components';
import { useApi } from '@backstage/core-plugin-api';
import { catalogApiRef } from '@backstage/plugin-catalog-react';
import {
  Box,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
  Typography,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import DescriptionIcon from '@material-ui/icons/Description';
import { ApiEntity } from '@backstage/catalog-model';

type ApiRowData = {
  id: string;
  name: string;
  namespace: string;
  type: string;
  lifecycle: string;
  owner: string;
  description: string;
  status: string;
  entity: ApiEntity;
};

export const CustomApiDocs = () => {
  const catalogApi = useApi(catalogApiRef);
  const [apis, setApis] = useState<ApiEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    catalogApi
      .getEntities({
        filter: { kind: 'api' },
      })
      .then(({ items }) => {
        setApis(items as ApiEntity[]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [catalogApi]);

  const filteredApis = useMemo(() => {
    if (!searchQuery) return apis;
    const query = searchQuery.toLowerCase();

    return apis.filter(
      api =>
        api.metadata.name.toLowerCase().includes(query) ||
        api.spec?.type?.toLowerCase().includes(query) ||
        api.metadata.namespace?.toLowerCase().includes(query) ||
        api.spec?.owner?.toLowerCase().includes(query) ||
        api.metadata.description?.toLowerCase().includes(query),
    );
  }, [apis, searchQuery]);

  const columns: TableColumn<ApiRowData>[] = [
    {
      title: 'API 名称',
      field: 'name',
      render: (row: ApiRowData) => (
        <Box display="flex" alignItems="center">
          <DescriptionIcon style={{ marginRight: 8, color: '#0052CC' }} />
          <Link to={`/catalog/${row.namespace}/api/${row.name}`}>
            {row.name}
          </Link>
        </Box>
      ),
    },
    {
      title: '命名空间',
      field: 'namespace',
      render: (row: ApiRowData) => (
        <Chip
          label={row.namespace}
          size="small"
          variant="outlined"
          style={{ fontSize: 12 }}
        />
      ),
    },
    {
      title: '类型',
      field: 'type',
      render: (row: ApiRowData) => {
        const typeColors: Record<string, string> = {
          openapi: '#6BA539',
          asyncapi: '#0052CC',
          graphql: '#E535AB',
          grpc: '#244C5A',
          rest: '#009688',
        };
        const color = typeColors[row.type?.toLowerCase()] || '#666';
        return (
          <Chip
            label={row.type || 'Unknown'}
            size="small"
            style={{
              backgroundColor: color,
              color: '#fff',
              fontSize: 11,
              fontWeight: 'bold',
            }}
          />
        );
      },
    },
    {
      title: '生命周期',
      field: 'lifecycle',
      render: (row: ApiRowData) => {
        const lifecycle = row.lifecycle || 'unknown';
        const lifecycleConfig: Record<string, { component: React.ReactNode }> =
          {
            production: {
              component: <StatusOK>Production </StatusOK>,
            },
            experimental: {
              component: <StatusWarning>Experimental </StatusWarning>,
            },
            deprecated: {
              component: <StatusError>Deprecated </StatusError>,
            },
          };
        return (
          lifecycleConfig[lifecycle]?.component || (
            <Chip label={lifecycle} size="small" variant="outlined" />
          )
        );
      },
    },
    {
      title: '负责人',
      field: 'owner',
      render: (row: ApiRowData) => (
        <Link
          to={`/catalog/default/group/${row.owner?.split('/')[1] || row.owner}`}
        >
          {row.owner}
        </Link>
      ),
    },
    {
      title: '描述',
      field: 'description',
      render: (row: ApiRowData) => (
        <Typography
          variant="body2"
          style={{
            maxWidth: 300,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {row.description || '-'}
        </Typography>
      ),
    },
    {
      title: '操作',
      field: 'actions',
      render: (row: ApiRowData) => (
        <Box display="flex">
          <Tooltip title="查看详情">
            <IconButton
              size="small"
              component={Link}
              to={`/catalog/${row.namespace}/api/${row.name}`}
            >
              <OpenInNewIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  const tableData: ApiRowData[] = filteredApis.map(api => ({
    id: api.metadata.uid || api.metadata.name,
    name: api.metadata.name,
    namespace: api.metadata.namespace || 'default',
    type: api.spec?.type || 'unknown',
    lifecycle: api.spec?.lifecycle || 'unknown',
    owner: api.spec?.owner || 'unknown',
    description: api.metadata.description || '',
    status: api.spec?.lifecycle || 'unknown',
    entity: api,
  }));

  const typeStats = useMemo(() => {
    const stats: Record<string, number> = {};
    apis.forEach(api => {
      const type = api.spec?.type || 'unknown';
      stats[type] = (stats[type] || 0) + 1;
    });
    return stats;
  }, [apis]);

  if (loading) {
    return (
      <Page themeId="tool">
        <Header title="API 文档" subtitle="加载中..." />
        <Content>
          <Progress />
        </Content>
      </Page>
    );
  }

  return (
    <Page themeId="tool">
      <Header title="API 文档" subtitle={`共 ${apis.length} 个 API`} />
      <Content>
        <Box mb={3}>
          <Box display="flex" alignItems="center" mb={2}>
            <TextField
              placeholder="搜索 API..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              style={{ width: 300, marginRight: 16 }}
              size="small"
              variant="outlined"
            />
            <Box display="flex">
              {Object.entries(typeStats).map(([type, count]) => (
                <Chip
                  key={type}
                  label={`${type}: ${count}`}
                  size="small"
                  variant="outlined"
                  style={{ marginRight: 8 }}
                />
              ))}
            </Box>
          </Box>
        </Box>

        <Table
          title="API 列表"
          options={{
            search: false,
            paging: true,
            pageSize: 10,
            padding: 'dense',
            sorting: true,
            filtering: false,
          }}
          columns={columns}
          data={tableData}
        />
      </Content>
    </Page>
  );
};
