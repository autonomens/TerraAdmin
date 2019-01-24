import React from 'react';
import {
  Elevation,
  Card,
  H3,
} from '@blueprintjs/core';
import { withNamespaces } from 'react-i18next';

import EditMetadata from './EditMetadata';
import AddPicture from './AddPicture';
import { dateFormat } from '../../../../../utils/date';

import './formeditviewpoint.scss';

export const FormEditViewpoint = ({
  viewpoint,
  t,
  saveViewpoint,
  uploadPictureViewpoint,
}) => (
  <>
    <EditMetadata
      viewpoint={viewpoint}
      saveViewpoint={saveViewpoint}
    />
    <AddPicture
      viewpoint={viewpoint}
      uploadPictureViewpoint={uploadPictureViewpoint}
    />
    <H3>{t('opp.viewpoint.edit.visualization_pictures')}</H3>
    <div className="visu-edit">
      {viewpoint.pictures.map(picture => (
        <Card elevation={Elevation.TWO} key={picture.date}>
          <img src={picture.file.thumbnail} alt={viewpoint.label} />
          <p>{dateFormat(picture.date)}</p>
        </Card>
      ))}
    </div>
  </>
);

export default withNamespaces()(FormEditViewpoint);
