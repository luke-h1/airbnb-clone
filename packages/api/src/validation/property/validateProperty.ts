import { CreatePropertyInput } from '../../resolvers/property/inputs/CreatePropertyInput';

export const validateProperty = (options: CreatePropertyInput) => {
  if (!options.title) {
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
  if (!options.address) {
    return [
      {
        field: 'address',
        message: 'address is a required field',
      },
    ];
  }
  if (!options.amenities) {
    return [
      {
        field: 'amenities',
        message: 'amenities is a required field',
      },
    ];
  }
  return null;
};