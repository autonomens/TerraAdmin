import React from 'react';
import {
  List, Datagrid,
  TextField,
  // TextInput,
  EditButton,
  CloneButton,
  // SelectInput,
  FunctionField,
  // Filter,
  Pagination,
} from 'react-admin';

import StatusChip from '../components/StatusChip';

import {
  sourceTypes,
  geomTypes,
  // sourceTypeChoices,
} from '../DataSource';
import CommonBulkActionButtons from '../../../components/react-admin/CommonBulkActionButtons';

// const ListFilters = props => (
//   <Filter {...props}>
//     <TextInput label="ra.action.search" source="q" alwaysOn />
//     <SelectInput
//       source="type"
//       label="datasource.form.type"
//       choices={sourceTypeChoices}
//     />
//   </Filter>
// );

const DataSourceListPagination = props =>
  <Pagination rowsPerPageOptions={[]} {...props} />;

export const DataSourceList = props => (
  <List
    sort={{
      field: 'name',
      order: 'ASC',
    }}
    exporter={false}
    // filters={<ListFilters />}
    bulkActionButtons={<CommonBulkActionButtons />}
    perPage={100}
    pagination={<DataSourceListPagination />}
    {...props}
  >
    <Datagrid rowClick="edit">
      <TextField source="name" label="datasource.form.name" />
      <FunctionField source="_type" label="datasource.form.type" render={({ _type: type }) => sourceTypes[type] || ''} />
      <FunctionField source="geom_type" label="datasource.form.geom-field" render={({ geom_type: geomType }) => geomTypes[geomType] || ''} />
      <FunctionField
        source="status.state"
        label="datasource.status"
        sortable={false}
        render={({ status }) => <StatusChip status={status} />}
      />
      <EditButton />
      <CloneButton />
    </Datagrid>
  </List>
);

export default DataSourceList;
