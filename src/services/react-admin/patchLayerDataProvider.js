import Api from '@terralego/core/modules/Api';
import { GET_ONE  } from 'react-admin';
import { RES_DATALAYER } from '../../modules/RA/ra-modules';

// Patch legend from old standard to new one.
const patchLegend = ({ stackedCircles, content, source, items = [], ...rest }) => {
  const compatible = { ...rest };

  if (!rest.shape) {
    if (items.filter(Boolean).length) {
      compatible.shape = items[0].shape || 'square';
    }
  }

  if (stackedCircles) {
    compatible.shape = 'stackedCircle';
  }

  if (source && !compatible.comment) {
    compatible.comment = source;
  }

  compatible.items = items.filter(Boolean).filter(({ items: subItems }) => !subItems)
    .map(({ radius, diameter, size, shape, ...itemRest }) => {
      let newSize;
      if (radius) {
        newSize = radius; // I know, should be *2 but missused...
      }
      if (diameter) {
        newSize = diameter;
      }
      if (size) {
        newSize = size;
      }
      if (newSize) {
        return { size: newSize, ...itemRest };
      }
      return itemRest;
    });

  return compatible;
};


const patchLayerDataProvider = nextDataProvider => async (type, resource, params, meta = {}) => {
  const { endpoint = resource } = meta;

  if (resource === RES_DATALAYER && type === 'DUPLICATE_ONE') {
    return Api.request(`${endpoint}/${params.id}/duplicate/`, { method: 'POST' });
  }

  if (resource === RES_DATALAYER && type === GET_ONE) {
    return nextDataProvider(type, resource, params, meta).then(toBeModified => {
      // eslint-disable-next-line no-param-reassign
      toBeModified.data.legends = toBeModified.data.legends.map(patchLegend);
      return toBeModified;
    });
  }

  return nextDataProvider(type, resource, params, meta);
};

export default patchLayerDataProvider;
