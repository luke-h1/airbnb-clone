import { CreateListingInput } from '../resolvers/listing/CreateListingInput';

export const validateListing = (options: CreateListingInput) => {
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
  if (!options.city) {
    return [
      {
        field: 'city',
        message: 'city is a required field',
      },
    ];
  }
  if (!options.country) {
    return [
      {
        field: 'country',
        message: 'country is a required field',
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
