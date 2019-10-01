import React from 'react';
import {
  Datagrid,
  DateField,
  EditButton,
  ImageField,
  List,
  ReferenceField,
  TextField,
} from 'react-admin';

import CommonBulkActionButtons from '../../../../components/react-admin/CommonBulkActionButtons';
import { RES_VIEWPOINT, RES_USER } from '../../ra-modules';

export const PictureList = props => (
  <List
    {...props}
    bulkActionButtons={<CommonBulkActionButtons />}
  >
    <Datagrid>
      <ReferenceField
        source="viewpoint"
        reference={RES_VIEWPOINT}
      >
        <TextField source="properties.index" />
      </ReferenceField>

      <TextField source="properties.index" />
      <DateField source="date" />

      <ReferenceField
        source="owner_id"
        reference={RES_USER}
      >
        <TextField source="email" />
      </ReferenceField>

      <ImageField source="file" />

      <EditButton />
    </Datagrid>
  </List>
);

export default PictureList;
