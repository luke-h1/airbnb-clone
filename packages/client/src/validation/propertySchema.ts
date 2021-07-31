import * as yup from 'yup';

export const propertySchema = yup.object().shape({
  name: yup.string().required(),
  propertyType: yup.string().required(),
  description: yup.string().required(),
  pricePerNight: yup.number().required().min(25),
  beds: yup.number().required().min(1),
  bedrooms: yup.number().required().min(1),
  address: yup.string().required(),
  amenities: yup.string().required(),
});
