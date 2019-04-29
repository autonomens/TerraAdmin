import React from 'react';
import classnames from 'classnames';
import { Button } from '@blueprintjs/core';
import { getBounds } from '../../services/features';

import Read from './Read';
import Update from './Update';
import './styles.scss';

class Details extends React.Component {
  state = {
    schema: {},
  }

  actionComponents = {
    read: Read,
    update: Update,
  };

  componentDidMount () {
    this.getData();
    this.setSchema();
  }

  componentDidUpdate ({
    paramLayer: prevParamlayer, paramId: prevParamId,
    feature: { geom: { coordinates: prevCoordinates = [] } = {}, properties: prevProperties } = {},
  }) {
    const {
      paramLayer, paramId,
      feature: { geom: { coordinates = [] } = {}, properties } = {},
      map,
    } = this.props;
    if (prevParamlayer !== paramLayer || prevParamId !== paramId) {
      this.getData();
    }

    if (properties !== prevProperties) {
      this.setSchema();
    }
    if (prevCoordinates.join() !== coordinates.join()) {
      const bounds = getBounds(coordinates);
      map.fitBounds(bounds, { padding: 20 });
    }
  }

  getData () {
    const { layer, paramId, getFeature } = this.props;
    if (layer && paramId) {
      const { id: layerId } = layer;
      getFeature(layerId, paramId);
    }
  }

  setSchema = () => {
    const {
      feature: { properties } = {},
      layer: { schema } = {},
    } = this.props;
    if (properties && schema) {
      this.setState({
        schema: {
          type: 'object',
          ...schema,
          properties: Object.keys(schema.properties).reduce((list, prop) => ({
            ...list,
            [prop]: {
              ...schema.properties[prop],
              default: properties[prop] || '',
            },
          }), {}),
        },
      });
    }
  }

  render () {
    const {
      feature,
      visible,
      history: { push },
      paramLayer,
      paramAction,
    } = this.props;
    const { schema } = this.state;
    const ComponentAction = this.actionComponents[paramAction] || false;
    if (!ComponentAction) {
      return null;
    }
    return (
      <div className={classnames('rando-details', { 'rando-details--visible': visible })}>
        <div className="rando-details__close">
          <Button
            type="button"
            className="rando-details__close-button"
            onClick={() => push(`/rando/map/layer/${paramLayer}`)}
            icon="cross"
            minimal
          />
        </div>
        <div className="rando-details__content">
          {!feature ? (
            <div>Loading...</div>
          ) : (
            <ComponentAction schema={schema} />
          )}
        </div>
      </div>
    );
  }
}

export default Details;
