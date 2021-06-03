import { ListingInput } from '@src/resolvers/listing/ListingInput';

export const validateListing = (options: ListingInput) => {
  if (!options.name) {
    return [
      {
        field: 'name',
        message: 'Name is a required field',
      },
    ];
  }
  if (!options.category) {
    return [
      {
        field: 'category',
        message: 'category is a required field',
      },
    ];
  }
  if (!options.picture) {
    return [
      {
        field: 'picture',
        message: 'picture is a required field',
      },
    ];
  }
  if (!options.description) {
    return [
      {
        field: 'description',
        message: 'description is a required field',
      },
    ];
  }
  if (!options.price) {
    return [
      {
        field: 'price',
        message: 'price is a required field',
      },
    ];
  }
  if (!options.beds) {
    return [
      {
        field: 'beds',
        message: 'beds is a required field',
      },
    ];
  }
  if (!options.guests) {
    return [
      {
        field: 'guests',
        message: 'guests is a required field',
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
