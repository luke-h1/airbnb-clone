import { PropertyInput } from '../../resolvers/listing/inputs/PropertyInput';

export const validateProperty = (options: PropertyInput) => {
  if (!options.address) {
    return [
      {
        field: 'title',
        message: 'title is a required field',
      },
    ];
  }
  if (!options.propertyType) {
    return [
      {
        field: 'propertyType',
        message: 'propertyType is a required field',
      },
    ];
  }
  if (!options.bedrooms) {
    return [
      {
        field: 'bedrooms',
        message: 'bedrooms is a required field',
      },
    ];
  }
  if (!options.coordinates) {
    return [
      {
        field: 'coordinates',
        message: 'coordinates is a required field',
      },
    ];
  }
  if (!options.bedrooms) {
    return [
      {
        field: 'bedrooms',
        message: 'bedrooms is a required field',
      },
    ];
  }
  return null;
};
