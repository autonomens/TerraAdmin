import { withRouter } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';

import { connectCRUDProvider } from '../../services/CRUDProvider';
import { getLayer } from '../../services/CRUD';

import Details from './Details';

export default withRouter(
  connectCRUDProvider(({
    settings,
    map,
    fetchFeature,
    feature,
    errors,
  }, {
    match: { params: { layer, id } },
  }) => ({
    map,
    fetchFeature,
    feature,
    layer: getLayer(settings, layer),
    hasError: errors[id],
    errorCode: errors.code,
  }))(
    withNamespaces()(Details),
  ),
);
