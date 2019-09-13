import React from 'react';

import {
  TextInput,
  SimpleForm,
  BooleanInput,
  DisabledInput,
  ReferenceArrayInput,
  SelectArrayInput,
} from 'react-admin';

import JSONInput from '../../../../components/react-admin/JSONInput';
import UserFieldsHelp from './UserFieldsHelp';

import { RES_USERGROUP } from '../../ra-modules';

const UserFields = ({ edit = false, ...props }) => (
  <SimpleForm {...props}>
    {edit && <DisabledInput source="id" />}
    {edit && <DisabledInput source="uuid" />}

    <TextInput source="email" type="email" />
    {!edit && <TextInput source="password" type="password" />}
    <BooleanInput source="is_superuser" />
    <BooleanInput source="is_active" />

    <ReferenceArrayInput source="groups" reference={RES_USERGROUP}>
      <SelectArrayInput optionText="name" />
    </ReferenceArrayInput>

    <JSONInput source="properties" label="user.form.additional-information" fullWidth />
    <UserFieldsHelp />
  </SimpleForm>
);

export default UserFields;