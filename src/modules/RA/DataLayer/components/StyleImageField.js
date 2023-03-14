import React from 'react';
import { useTranslate } from 'ra-core';
import { Box, IconButton } from '@material-ui/core';
import BackupIcon from '@material-ui/icons/Backup';
import { Field } from 'react-final-form';
import { TextInput } from 'react-admin';

const readFile = file => new Promise((resolve, reject) => {
  const fr = new FileReader();
  fr.onload = () => { resolve(fr.result); };
  fr.onerror = reject;
  fr.readAsDataURL(file);
});

const StyleImageField = ({ source }) => (
  <Box>
    <TextInput
      source={`${source}.name`}
      label="field name"
    />

    <Field name={`${source}.file`}>
      {({ input: { value, onChange } }) => (
        <>
          {!value && (
          <IconButton variant="outlined" component="label">
            <BackupIcon />
            <Box
              component="input"
              type="file"
              accept="image/*"
              onChange={async event => {
                const [file] = event.target.files;

                if (file) {
                  const daraURI = await readFile(file);
                  onChange(daraURI);
                }
              }}
              hidden
            />
          </IconButton>
          )}

          <Box
            component="img"
            src={value}
          />
        </>
      )}
    </Field>
  </Box>
);

export default React.memo(StyleImageField);
