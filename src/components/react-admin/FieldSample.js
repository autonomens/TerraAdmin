/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { withNamespaces } from 'react-i18next';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const FieldSample = ({ t, record: { sample } }) => (sample
  ? (
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>{t('datalayer.form.data-sample')}</Typography>
        {sample}
      </CardContent>
    </Card>
  )
  : <div />
);

export default withNamespaces()(FieldSample);
