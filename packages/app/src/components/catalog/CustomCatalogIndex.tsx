import {
  Content,
  ContentHeader,
  SupportButton,
} from '@backstage/core-components';
import { CatalogTable } from '@backstage/plugin-catalog';
import {
  EntityListProvider,
  CatalogFilterLayout,
  EntityKindPicker,
  EntityLifecyclePicker,
  EntityNamespacePicker,
  EntityOwnerPicker,
  EntityProcessingStatusPicker,
  EntityTagPicker,
  EntityTypePicker,
  UserListPicker,
} from '@backstage/plugin-catalog-react';

export const CustomCatalogIndexPage = () => {
  return (
    <Content>
      <ContentHeader title="">
        <SupportButton>All your software catalog entities</SupportButton>
      </ContentHeader>
      <EntityListProvider pagination>
        <CatalogFilterLayout>
          <CatalogFilterLayout.Filters>
            <EntityKindPicker />
            <EntityTypePicker />
            <UserListPicker />
            <EntityOwnerPicker />
            <EntityLifecyclePicker />
            <EntityTagPicker />
            <EntityProcessingStatusPicker />
            <EntityNamespacePicker />
          </CatalogFilterLayout.Filters>
          <CatalogFilterLayout.Content>
            <CatalogTable />
          </CatalogFilterLayout.Content>
        </CatalogFilterLayout>
      </EntityListProvider>
    </Content>
  );
};
