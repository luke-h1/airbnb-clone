import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  email: yup.string().required(),
  firstName: yup.string().required(),
  image: yup.string().required(),
  lastName: yup.string().required(),
  password: yup.string().required().min(5),
});
