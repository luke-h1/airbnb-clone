import * as yup from 'yup';

export const emailNotLongEnough = 'Email must be at least 3 characters';
export const passwordNotLongEnough = 'Password must be at least 3 characters';
export const invalidEmail = 'email must be a valid email';

export const registerPasswordValidation = yup
  .string()
  .min(3, passwordNotLongEnough)
  .max(25)
  .required();

export const validUserSchema = yup.object().shape({
  email: yup
    .string()
    .min(3, emailNotLongEnough)
    .max(30)
    .email(invalidEmail)
    .required(),
  password: registerPasswordValidation,
});

const invalidLogin = 'Invalid login';

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .min(3, invalidLogin)
    .max(30, invalidLogin)
    .email(invalidLogin)
    .required(),
  password: yup
    .string()
    .min(3, invalidLogin)
    .max(25, invalidLogin)
    .email(invalidLogin)
    .required(),
});

export const changePasswordSchema = yup.object().shape({
  newPassword: registerPasswordValidation,
});
