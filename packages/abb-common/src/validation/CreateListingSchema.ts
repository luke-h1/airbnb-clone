import * as yup from 'yup';

export const minLengthError = 'must be at least 3 characters';
export const maxLengthError = 'cannot be longer than 30 characters';

export const minPrice = 'Minimum listing price is $50';
export const maxPrice = 'Max listing price is $5000';

export const minBeds = 'Minimum beds is 1';
export const maxBeds = 'Maximum amount of beds is 15 (you renting out a mansion lmao ?)';

export const minGuests = 'Minimum amount of guests is 1';
export const maxGuests = 'Maximum amount of guests is 15';

export const minAmenities = 'Minimum amount of amenities is 3';
export const maxAmenities = 'Maximum amount of amenities is 25';

export const CreateListingSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, `Name ${minLengthError}`)
    .max(30, `Name ${maxLengthError}`),
  category: yup
    .string()
    .min(3, `Category ${minLengthError}`)
    .max(30, `category ${maxLengthError}`),

  image: yup.string().required('image is required!'),

  description: yup
    .string()
    .min(3, `description ${minLengthError}`)
    .max(30, `description ${maxLengthError}`),

  price: yup
    .number()
    .min(30, `price ${minLengthError}`)
    .max(30, `price ${maxLengthError}`),

  beds: yup.number().min(1, minBeds).max(15, maxLengthError),

  guests: yup.number().min(1, minGuests).max(15, maxGuests),

  amenities: yup.string().min(3, minAmenities).max(25, maxAmenities),
});
