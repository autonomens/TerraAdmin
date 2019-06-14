import React from 'react';
import {
  List, Datagrid,
  TextField,
  TextInput,
  EditButton,
  ReferenceInput,
  SelectInput,
  Filter,
  ReferenceField,
  Pagination,
} from 'react-admin';

import CommonBulkActionButtons from '../../../components/react-admin/CommonBulkActionButtons';

const ListFilters = props => (
  <Filter {...props}>
    <TextInput label="ra.action.search" source="q" alwaysOn />

    <ReferenceInput source="source" reference="geosource" label="datalayer.form.data-source">
      <SelectInput />
    </ReferenceInput>
  </Filter>
);

const DataLayerListPagination = props =>
  <Pagination rowsPerPageOptions={[]} {...props} />;

export const DataLayerList = props => (
  <List
    sort={{
      field: 'name',
      order: 'ASC',
    }}
    exporter={false}
    filters={<ListFilters />}
    bulkActionButtons={<CommonBulkActionButtons />}
    perPage={100}
    pagination={<DataLayerListPagination />}
    {...props}
  >
    <Datagrid rowClick="edit">
      <TextField source="name" label="datalayer.form.name" />
      <ReferenceField source="source" reference="geosource" label="datalayer.form.data-source" linkType={false}>
        <TextField source="name" />
      </ReferenceField>
      <EditButton />
    </Datagrid>
  </List>
);

export default DataLayerList;