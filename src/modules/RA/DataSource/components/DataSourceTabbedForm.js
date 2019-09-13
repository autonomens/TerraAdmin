import React from 'react';
import {
  TabbedForm,
  TextInput,
  BooleanInput,
  SelectInput,
  ArrayInput,
  SimpleFormIterator,
  FormTab,
  DisabledInput,
  FormDataConsumer,
  translate,
} from 'react-admin';

import DataSourceMainFields from './DataSourceMainFields';
import DataSourceFileFields from './DataSourceFileFields';
import DataSourceWMTSField from './DataSourceWMTSField';
import FieldSample from '../../../../components/react-admin/FieldSample';
import AttributeMessage from './AttributeMessage';
import DataSourceDbFields from './DataSourceDbFields';
import {
  SQL,
  GEOJSON,
  SHP,
  WMTS,
  fieldTypeChoices,
} from '..';

const DataSourceTabbedForm = ({ translate: t, ...props }) => (
  <TabbedForm {...props}>
    <FormTab label="datasource.form.definition">

      <DataSourceMainFields />

      <FormDataConsumer>
        {({ formData: { _type: type } = {}, ...rest }) =>
          type === WMTS && <DataSourceWMTSField {...rest} />}
      </FormDataConsumer>

      <FormDataConsumer>
        {({ formData: { _type: type } = {}, ...rest }) =>
          [SHP, GEOJSON].includes(type) && <DataSourceFileFields {...rest} type={type} />}
      </FormDataConsumer>

      <FormDataConsumer>
        {({ formData: { _type: type } = {}, ...rest }) =>
          type === SQL && <DataSourceDbFields {...rest} />}
      </FormDataConsumer>
    </FormTab>

    {/* Fields */}
    <FormTab label="datasource.form.data">
      <AttributeMessage />

      <ArrayInput source="fields" label="datasource.form.fields" fullWidth>
        <SimpleFormIterator disableRemove disableAdd>
          <DisabledInput source="name" label="datasource.form.name" />
          <TextInput source="label" label="datasource.form.label" />
          <SelectInput
            source="data_type"
            choices={fieldTypeChoices}
            label="datasource.form.type"
            format={v => `${v}`}
            parse={v => +v}
          />
          <FieldSample source="sample" />
          <BooleanInput source="level" label="datasource.form.include-field-tiles" parse={v => (v ? 1 : 0)} />
        </SimpleFormIterator>
      </ArrayInput>
    </FormTab>

  </TabbedForm>
);

export default translate(DataSourceTabbedForm);