import React from 'react';
import PropTypes from 'prop-types';

import {
  DateInput,
  DateTimeInput,
  DisabledInput,
  FormTab,
  ImageField,
  ImageInput,
  LongTextInput,
  NumberInput,
  ReferenceInput,
  SelectInput,
  TabbedForm,
  TextInput,
  required,
} from 'react-admin';

import { withStyles } from '@material-ui/core/styles'; // eslint-disable-line import/no-extraneous-dependencies

import { RES_VIEWPOINT } from '../../ra-modules';
import MapPointInput from '../../../../components/react-admin/MapPointInput';
import compose from '../../../../utils/compose';
import { withMapConfig } from '../../../../hoc/withAppSettings';

const styles = {
  inline: {
    display: 'inline-block',
    marginRight: '1em',
  },
};

const Br = () => <br />;

const PictureFields = ({ edit, classes, mapConfig, ...props }) => (
  <TabbedForm {...props}>
    <FormTab label="resources.picture.tabs.metadata">
      <ReferenceInput
        source="viewpoint"
        reference={RES_VIEWPOINT}
        formClassName={classes.inline}
      >
        <SelectInput optionText="label" />
      </ReferenceInput>
      <TextInput source="properties.index" formClassName={classes.inline} />
      <DateTimeInput source="date" showTime />
      <DateInput source="date" />

      <Br />

      {edit && (
        <DisabledInput
          source="owner.properties.name"
          formClassName={classes.inline}
        />
      )}

      <Br />

      <TextInput
        source="properties.camera_brand"
        formClassName={classes.inline}
      />
      <TextInput
        source="properties.camera_model"
        formClassName={classes.inline}
      />
      <TextInput
        source="properties.focale_35mm"
        formClassName={classes.inline}
      />
      <TextInput source="properties.meteo" />

      <Br />

      <TextInput source="remarks" validate={required()} />
      <LongTextInput source="properties.observations" />

      <Br />
      <ImageInput source="file" accept="image/*">
        <ImageField source="thumbnail" />
      </ImageInput>
    </FormTab>

    <FormTab label="resources.picture.tabs.repeat" path="repeat">
      <Br />

      <TextInput source="properties.altitude" formClassName={classes.inline} />
      <TextInput source="properties.hauteur" formClassName={classes.inline} />
      <TextInput
        source="properties.orientation"
        formClassName={classes.inline}
      />

      <Br />

      <TextInput
        source="properties.focale_35mm"
        formClassName={classes.inline}
      />
      <TextInput
        source="properties.focale_objectif"
        formClassName={classes.inline}
      />

      <Br />

      <NumberInput
        source="geometry.coordinates[1]"
        formClassName={classes.inline}
      />
      <NumberInput
        source="geometry.coordinates[0]"
        formClassName={classes.inline}
      />

      <MapPointInput source="geometry.coordinates" center={mapConfig.center} />
    </FormTab>
  </TabbedForm>
);

PictureFields.propTypes = {
  edit: PropTypes.bool,
};

PictureFields.defaultProps = {
  edit: false,
};

export default compose(
  withMapConfig,
  withStyles(styles)
)(PictureFields);
