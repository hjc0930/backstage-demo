import {
  apiDocsPlugin,
  ApiExplorerPage,
} from '@backstage/plugin-api-docs';
import {
  CatalogEntityPage,
  CatalogIndexPage,
  catalogPlugin,
} from '@backstage/plugin-catalog';
import {
  CatalogImportPage,
  catalogImportPlugin,
} from '@backstage/plugin-catalog-import';
import { orgPlugin } from '@backstage/plugin-org';
import { ScaffolderPage, scaffolderPlugin } from '@backstage/plugin-scaffolder';
import { SearchPage } from '@backstage/plugin-search';
import {
  TechDocsIndexPage,
  techdocsPlugin,
  TechDocsReaderPage,
} from '@backstage/plugin-techdocs';
import { ReportIssue } from '@backstage/plugin-techdocs-module-addons-contrib';
import { TechDocsAddons } from '@backstage/plugin-techdocs-react';
import { UserSettingsPage } from '@backstage/plugin-user-settings';
import { UnifiedThemeProvider } from '@backstage/theme';
import { Route } from 'react-router-dom';
import { apis } from './apis';
import { entityPage } from './components/catalog/EntityPage';
import Layout from './layout';
import { searchPage } from './components/search/SearchPage';

import { createApp } from '@backstage/app-defaults';
import { AppRouter, FlatRoutes } from '@backstage/core-app-api';
import {
  AlertDisplay,
  OAuthRequestDialog,
  SignInPage,
} from '@backstage/core-components';
import { catalogEntityCreatePermission } from '@backstage/plugin-catalog-common/alpha';
import { CatalogGraphPage } from '@backstage/plugin-catalog-graph';
import { NotificationsPage } from '@backstage/plugin-notifications';
import { RequirePermission } from '@backstage/plugin-permission-react';
import { SignalsDisplay } from '@backstage/plugin-signals';
import { apertureTheme } from './theme/my-theme';
import { apertureThemeDark } from './theme/my-theme-dark';
import { CustomDashboard } from './views/Dashboard';
import { ApiCatalog } from './views/ApiCatalog';
import { PublishApi } from './views/PublishApi';
import { AppTemplates } from './views/AppTemplates';
import { DevAgents } from './views/DevAgents';
import { Observability } from './views/Observability';
import { Reference } from './views/Reference';
import { Standards } from './views/Standards';

const app = createApp({
  apis,
  themes: [
    {
      id: 'light',
      title: 'Light',
      variant: 'light',
      Provider: props => (
        <UnifiedThemeProvider theme={apertureTheme}>
          {props.children}
        </UnifiedThemeProvider>
      ),
    },
    {
      id: 'dark',
      title: 'Dark',
      variant: 'dark',
      Provider: props => (
        <UnifiedThemeProvider theme={apertureThemeDark}>
          {props.children}
        </UnifiedThemeProvider>
      ),
    },
  ],
  bindRoutes({ bind }) {
    bind(catalogPlugin.externalRoutes, {
      createComponent: scaffolderPlugin.routes.root,
      viewTechDoc: techdocsPlugin.routes.docRoot,
      createFromTemplate: scaffolderPlugin.routes.selectedTemplate,
    });
    bind(apiDocsPlugin.externalRoutes, {
      registerApi: catalogImportPlugin.routes.importPage,
    });
    bind(scaffolderPlugin.externalRoutes, {
      registerComponent: catalogImportPlugin.routes.importPage,
      viewTechDoc: techdocsPlugin.routes.docRoot,
    });
    bind(orgPlugin.externalRoutes, {
      catalogIndex: catalogPlugin.routes.catalogIndex,
    });
  },
  components: {
    SignInPage: props => <SignInPage {...props} auto providers={['guest']} />,
  },
});

const routes = (
  <FlatRoutes>
    <Route path="/" element={<CustomDashboard />} />
    <Route path="/catalog" element={<CatalogIndexPage />} />
    <Route
      path="/catalog/:namespace/:kind/:name"
      element={<CatalogEntityPage />}
    >
      {entityPage}
    </Route>
    <Route path="/docs" element={<TechDocsIndexPage />} />
    <Route
      path="/docs/:namespace/:kind/:name/*"
      element={<TechDocsReaderPage />}
    >
      <TechDocsAddons>
        <ReportIssue />
      </TechDocsAddons>
    </Route>
    <Route path="/create" element={<ScaffolderPage />} />
    <Route path="/api-catalog" element={<ApiCatalog />} />
    <Route path="/api-docs" element={<ApiExplorerPage />} />
    <Route
      path="/catalog-import"
      element={
        <RequirePermission permission={catalogEntityCreatePermission}>
          <CatalogImportPage />
        </RequirePermission>
      }
    />
    <Route path="/search" element={<SearchPage />}>
      {searchPage}
    </Route>
    <Route path="/settings" element={<UserSettingsPage />} />
    <Route path="/catalog-graph" element={<CatalogGraphPage />} />
    <Route path="/notifications" element={<NotificationsPage />} />

    <Route path="/publish-api" element={<PublishApi />} />
    <Route path="/app-catalog" element={<CatalogIndexPage />} />
    <Route path="/app-templates" element={<AppTemplates />} />
    <Route path="/dev-agents" element={<DevAgents />} />
    <Route path="/observability" element={<Observability />} />
    <Route path="/reference" element={<Reference />} />
    <Route path="/standards" element={<Standards />} />
  </FlatRoutes>
);

export default app.createRoot(
  <>
    <AlertDisplay />
    <OAuthRequestDialog />
    <SignalsDisplay />
    <AppRouter>
      <Layout>{routes}</Layout>
    </AppRouter>
  </>,
);
