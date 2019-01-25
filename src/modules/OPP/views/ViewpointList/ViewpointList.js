import React from 'react';
import {
  H2,
} from '@blueprintjs/core';
import { withNamespaces } from 'react-i18next';

import ViewpointListItem from './ViewpointListItem';
import AddViewpoint from './AddViewpoint/ViewpointAddItem';
import './viewpoint-list.scss';

export class ViewpointList extends React.Component {
  componentDidMount () {
    const { getAllViewpointsAction } = this.props;
    getAllViewpointsAction();
  }

  render () {
    const { viewpointsList, t } = this.props;
    return (
      <>
        <div className="page--title">
          <H2>{t('opp.viewpoints.title')}</H2>
        </div>
        <div className="viewpoint-list">
          <AddViewpoint />
          {
            viewpointsList.map(viewpoint => (
              <ViewpointListItem
                key={viewpoint.id}
                {...viewpoint}
              />
            ))
          }
        </div>
      </>
    );
  }
}

export default withNamespaces()(ViewpointList);
