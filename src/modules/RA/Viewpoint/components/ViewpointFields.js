import React from 'react';
import PropTypes from 'prop-types';
import Api from '@terralego/core/modules/Api';

import {
  minValue,
  number,
  ArrayInput,
  AutocompleteArrayInput,
  BooleanInput,
  FileField,
  FileInput as RAFileInput,
  FormTab,
  ImageField,
  ImageInput,
  Labeled,
  LinearProgress,
  LongTextInput,
  NumberField,
  NumberInput,
  ReferenceArrayField,
  SelectInput,
  SimpleFormIterator,
  TabbedForm,
  TextField,
  TextInput,
} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';

/* eslint-disable import/no-extraneous-dependencies */
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
/* eslint-enable */

import { RES_PICTURE } from '../../ra-modules';

import FreeAutocompleteInput
  from '../../../../components/react-admin/FreeAutocompleteInput';
import MapPointInput from '../../../../components/react-admin/MapPointInput';
import compose from '../../../../utils/compose';
import { withMapConfig } from '../../../../hoc/withAppSettings';
import GridListPictures from './GridListPictures';

const styles = {
  inline: {
    display: 'inline-block',
    marginRight: '1em',
  },
};

const Br = () => <br />;

const SmartFileInput = props => {
  const { record: { document } } = props;
  const isImage = document && document.split(':')[1].split('/')[0] === 'image';
  const InputComponent = isImage ? ImageInput : RAFileInput;
  const FieldComponent = isImage ? ImageField : FileField;
  return (
    <InputComponent {...props}>
      <FieldComponent source="document" title="voir le fichier" target="_blank" />
    </InputComponent>
  );
};

function PictureRephotography (props) {
  const { record, ...rest } = props;
  return record && record.pictures && record.pictures.length && (
    <>
      <Labeled label="resources.viewpoint.fields.properties.altitude">
        <TextField
          label="resources.viewpoint.fields.properties.altitude"
          source="pictures[0].properties.altitude"
          record={record}
          {...rest}
        />
      </Labeled>
      <Labeled label="resources.viewpoint.fields.properties.hauteur">
        <TextField
          source="pictures[0].properties.hauteur"
          record={record}
          {...rest}
        />
      </Labeled>
      <Labeled label="resources.viewpoint.fields.properties.orientation">
        <TextField
          record={record}
          source="pictures[0].properties.orientation"
          {...rest}
        />
      </Labeled>
      <Br />
      <Labeled label="resources.viewpoint.fields.properties.focale_35mm">
        <TextField
          record={record}
          source="pictures[0].properties.focale_35mm"
          {...rest}
        />
      </Labeled>
      <Labeled label="resources.viewpoint.fields.properties.focale_objectif">
        <TextField
          record={record}
          source="pictures[0].properties.focale_objectif"
          {...rest}
        />
      </Labeled>
    </>
  );
}

const ViewpointFields = ({
  edit,
  classes,
  mapConfig,
  record,
  ...props
}) => {
  const [remoteChoices, setRemoteChoices] = React.useState([]);
  const [waiting, setWaiting] = React.useState(false);

  const getRemoteData = async () => {
    setWaiting(true);

    const { themes, cities } = await Api.request('viewpoints/filters/');

    setRemoteChoices({
      themes: themes.map(theme => ({ id: theme, name: theme })),
      cities: cities.map(city => ({ id: city, name: city })),
    });

    setWaiting(false);
  };

  React.useEffect(() => {
    getRemoteData();
  }, []);

  return (
    <TabbedForm
      defaultValue={{
        point: {
          coordinates: undefined,
          type: 'Point',
        },
      }}
      record={record}
      {...props}
    >
      <FormTab label="resources.viewpoint.tabs.general">
        <TextInput source="label" formClassName={classes.inline} />
        <TextInput source="properties.index" formClassName={classes.inline} />

        <Br />

        <TextInput source="properties.voie" />

        {waiting && (
          <>
            <LinearProgress />
          </>
        )}
        {!waiting && (
          <SelectInput
            translateChoice={false}
            source="properties.commune"
            choices={remoteChoices.cities}
          />
        )}

        <Br />

        <NumberInput
          source="point.coordinates[1]"
          formClassName={classes.inline}
        />
        <NumberInput
          source="point.coordinates[0]"
          formClassName={classes.inline}
        />

        <MapPointInput source="point.coordinates" center={mapConfig.center} />
      </FormTab>

      {edit && (
        <FormTab label="resources.viewpoint.tabs.repeat" path="repeat">
          <NumberField
            source="point.coordinates[1]"
            options={{ maximumFractionDigits: 6 }}
            formClassName={classes.inline}
          />
          <NumberField
            source="point.coordinates[0]"
            options={{ maximumFractionDigits: 6 }}
            formClassName={classes.inline}
          />

          <Br />

          <PictureRephotography />

          <Br />

          <TextInput
            source="properties.frequence"
            validate={[
              number('Une valeur numérique est requise'),
              minValue(1, "La valeur doit être d'au moins 1 an"),
            ]}
            formClassName={classes.inline}
            options={{
              InputProps: {
                endAdornment: (
                  <InputAdornment position="end">années</InputAdornment>
                ),
              },
            }}
          />
          <BooleanInput
            source="properties.difficulte"
            formClassName={classes.inline}
          />
          <LongTextInput source="properties.rephotographie" rows={4} rowsMax={30} />

          <ArrayInput source="related" fullWidth>
            <SimpleFormIterator>
              <FreeAutocompleteInput
                label="resources.viewpoint.fields.related.key"
                source="key"
                choices={[
                  { id: 'croquis', name: 'croquis' },
                  { id: 'emplacement', name: 'emplacement' },
                ]}
                formClassName={classes.inline}
              />
              <TextInput
                label="resources.viewpoint.fields.related.label"
                source="properties.label"
                formClassName={classes.inline}
              />
              <SmartFileInput
                label="resources.viewpoint.fields.related.document"
              />
            </SimpleFormIterator>
          </ArrayInput>
        </FormTab>
      )}
      {edit && (
        <FormTab label="resources.viewpoint.tabs.landscape" path="landscape">
          <RichTextInput source="properties.paysage" />
          <RichTextInput source="properties.dynamiques" />
          <LongTextInput source="properties.issues" />
          <LongTextInput source="properties.observations" />
          <LongTextInput source="properties.historial-data" />
          <LongTextInput source="properties.cultural-references" />

          {waiting && <><LinearProgress /></>}
          {!waiting && (
            <AutocompleteArrayInput
              translateChoice={false}
              source="properties.themes"
              choices={remoteChoices.themes}
            />
          )}

          <TextInput source="properties.keywords" />
          <TextInput source="properties.landscape-entities" />
        </FormTab>
      )}

      {edit && (
        <FormTab label="resources.viewpoint.tabs.pictures" path="pictures">
          <ReferenceArrayField
            source="picture_ids"
            reference={RES_PICTURE}
            fullWidth
          >
            <GridListPictures viewpointId={record.id} />
          </ReferenceArrayField>
        </FormTab>
      )}
    </TabbedForm>
  );
};

ViewpointFields.propTypes = {
  edit: PropTypes.bool,
};

ViewpointFields.defaultProps = {
  edit: false,
};

export default compose(
  withMapConfig,
  withStyles(styles),
)(ViewpointFields);
