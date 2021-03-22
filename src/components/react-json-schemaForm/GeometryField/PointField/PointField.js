import React, { useEffect, useCallback, useRef } from 'react';
import { FormGroup, InputGroup } from '@blueprintjs/core';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const Label = ({ name, required }) => (
  <>
    <span>{name}</span>
    {required && <span>*</span>}
  </>
);

const Input = ({ name, id, t, ...props }) => {
  const { required } = props;
  return (
    <FormGroup
      label={<Label name={t(`jsonSchema.geometryField.${name}`)} required={required} />}
      labelFor={id}
    >
      <InputGroup
        id={id}
        inputMode="numeric"
        pattern="[+-]?([0-9]*[.])?[0-9]+"
        type="text"
        {...props}
      />
    </FormGroup>
  );
};

const PointField = ({
  idSchema: { coordinates: { $id } },
  formData: { geom },
  onChange,
  disabled,
  schema: { default: {
    coordinates: schemaCoordinates,
    type: schemaType,
  } },
  required,
}) => {
  const { t } = useTranslation();
  const { coordinates = schemaCoordinates, type = schemaType } = geom || {};

  const refLatitude = useRef(null);
  const refLongitude = useRef(null);

  const handleChange = useCallback(() => {
    const nextCoordinates = [
      Number(refLongitude.current.value),
      Number(refLatitude.current.value),
    ];
    onChange({ geom: { type, coordinates: nextCoordinates } });
  }, [onChange, type]);

  useEffect(() => {
    const [longitude = '', latitude = ''] = coordinates;
    refLongitude.current.value = longitude;
    refLatitude.current.value = latitude;
    refLatitude.current.focus();
  }, [coordinates]);

  return (
    <div>
      <p className="control-label">{t('jsonSchema.geometryField.label')}</p>
      {['longitude', 'latitude'].map((name, index) => {
        const ref = !index ? refLongitude : refLatitude;
        const { current } = ref;
        const { value = '' } = current || {};
        return (
          <Input
            key={name}
            defaultValue={value}
            disabled={disabled}
            id={`${$id}-${index}`}
            inputRef={ref}
            name={name}
            onFocus={handleChange}
            onChange={handleChange}
            required={required}
            t={t}
          />
        );
      })}
    </div>
  );
};

PointField.propTypes = {
  idSchema: PropTypes.shape({
    coordinates: PropTypes.shape({
      $ids: PropTypes.string,
    }),
  }),
  formData: PropTypes.shape({
    coordinates: PropTypes.arrayOf(PropTypes.number),
  }),
  onChange: PropTypes.func,
};

PointField.defaultProps = {
  idSchema: {
    coordinates: {
      $ids: 'root',
    },
  },
  formData: {
    coordinates: [],
  },
  onChange: () => {},
};

export default PointField;
