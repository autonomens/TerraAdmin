import React, { useCallback, useMemo, useEffect } from 'react';
import debounce from 'lodash.debounce';

import {
  TextInput,
  BooleanInput,
  useTranslate,
} from 'react-admin';

import { Field, useField, useForm } from 'react-final-form';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';

import MiniSheetFieldTree from './MiniSheetFieldTree';

import Placeholder from '../../../../../../components/Placeholder';
import ColorPicker from '../../../../../../components/react-admin/ColorPicker';
import HelpContent from '../../../../../../components/react-admin/HelpContent';
import FieldGroup from '../../../../../../components/react-admin/FieldGroup';
import createTemplate from './minisheetTemplate';

const useStyles = makeStyles({
  colorPicker: {
    width: '25%',
  },
  placeholder: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    borderBottom: 'thin solid grey',
    marginBottom: '25px',
  },
});


const MinisheetTab = () => {
  const classes = useStyles();
  const translate = useTranslate();
  const form = useForm();
  const { input: { value: fields } } = useField('fields');
  const {
    input: {
      value: {
        advanced,
        enable,
        wizard: { tree = [], title } = {},
        wizard,
      },
    },
  } = useField('minisheet_config');

  const getAvailableFields = useCallback(() => {
    const wizardFieldIds =  tree.flatMap(({ group, sourceFieldId, children = [] }) =>
      (group ? children.map(({ sourceFieldId: id }) => id) : sourceFieldId));

    return fields.filter(field => !wizardFieldIds.find(id => id === field.sourceFieldId));
  }, [fields, tree]);

  const availableFields = useMemo(() => getAvailableFields(), [getAvailableFields]);

  const updateTemplate = useCallback(debounce(() => {
    const {
      values: {
        minisheet_config: {
          wizard: {
            title: titleField = {},
            tree: treeData = [],
          } = {},
        } = {},
        minisheet_config: minisheetConfig,
      },
    } = form.getState();

    const template = createTemplate(titleField, treeData, fields, translate);

    form.change('minisheet_config', {
      ...minisheetConfig,
      template,
    });
  }, 200), [fields, form, wizard, translate]);

  useEffect(() => {
    if (advanced !== true) {
      updateTemplate();
    }
  }, [advanced, updateTemplate, tree]);

  if (!enable) {
    return (
      <Placeholder>
        <div className={classes.placeholder}>
          <Typography variant="h5" component="h2" style={{ paddingBottom: '1em' }}>
            {translate('datalayer.form.minisheet.card-message')}
          </Typography>
          <BooleanInput source="minisheet_config.enable" label="datalayer.form.minisheet.enable" />
        </div>
      </Placeholder>
    );
  }

  return (
    <>
      <BooleanInput source="minisheet_config.enable" label="datalayer.form.minisheet.disable" />
      <FieldGroup>
        <div className={classes.title}>
          <h3>{translate('datalayer.form.minisheet.title')}</h3>
          <BooleanInput source="minisheet_config.advanced" label="datalayer.form.minisheet.advanced" />
        </div>
        <InputLabel>{translate('datalayer.form.minisheet.color-label')}</InputLabel>
        <Field name="minisheet_config.highlight_color" defaultValue="#cccccc">
          {({ input: { onChange, value } }) => (
            <ColorPicker onChange={onChange} value={value} />
          )}
        </Field>

        {advanced && (
        <>
          <TextInput
            multiline
            source="minisheet_config.template"
            label="datalayer.form.minisheet.template"
            fullWidth
          />
          <TextInput
            label="datalayer.form.compare-url.title"
            source="settings.compare"
          />
          <HelpContent
            title="datalayer.form.compare-url.help-title"
            content="datalayer.form.compare-url.help-text"
          />
        </>
        )}
        {!advanced && (
        <>
          <MiniSheetFieldTree
            treeData={tree}
            fields={availableFields}
            titleField={title}
          />
        </>
        )}
      </FieldGroup>
    </>
  );
};

export default MinisheetTab;
