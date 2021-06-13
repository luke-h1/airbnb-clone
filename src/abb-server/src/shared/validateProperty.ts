import { CreatePropertyInput } from '../resolvers/property/CreatePropertyInput';

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
  if (!options.mainImage) {
    return [
      {
        field: 'mainImage',
        message: 'mainImage is a required field',
      },
    ];
  }
  if (!options.latitude) {
    return [
      {
        field: 'latitude',
        message: 'latitude is a required field',
      },
    ];
  }
  if (!options.longitude) {
    return [
      {
        field: 'longitude',
        message: 'longitude is a required field',
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
