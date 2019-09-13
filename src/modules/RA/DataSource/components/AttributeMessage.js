import React from 'react';

import { withNamespaces } from 'react-i18next';

/* eslint-disable import/no-extraneous-dependencies */
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
/* eslint-enable */

export const AttributeMessage = ({ t }) => (
  <Card style={{ marginTop: '1em' }}>
    <CardContent>
      <Typography color="textSecondary">
        {t('datasource.edit.message')}
      </Typography>
    </CardContent>
  </Card>
);

export default withNamespaces()(AttributeMessage);