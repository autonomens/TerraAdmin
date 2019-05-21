import React from 'react';
import {
  TextInput,
  LongTextInput,
  SelectInput,
  translate as translateRA,
} from 'react-admin';

import { geomTypeChoices } from '../DataSource';
import FieldGroup from '../../../components/react-admin/FieldGroup';

const required = (message = 'Required') => value => (value ? undefined : message);
const defaultRequired = required();

const DataSourceMainFields = ({ translate, ...props }) => (
  <FieldGroup {...props}>
    <TextInput
      source="name"
      validate={defaultRequired}
      type="text"
      label="datasource.form.name"
    />
    <LongTextInput source="description" defaultValue="" label="datasource.form.description" />

    <SelectInput
      source="geom_type"
      label="datasource.form.geometry"
      validate={defaultRequired}
      choices={geomTypeChoices}
      format={v => `${v}`}
    />
  </FieldGroup>
);

export default translateRA(DataSourceMainFields);
