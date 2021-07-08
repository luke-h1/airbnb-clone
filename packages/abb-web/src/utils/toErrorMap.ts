import { FieldError, PropertyFieldError } from '../generated/graphql';

// export function toErroMap<T>(errors: T[]) {
//   const errorMap: Record<string, string> = {};
//   errors.forEach(({ field, message }) => {
//     errorMap[field] = message;
//   });
//   return errorMap;
// }

export const toErrorMap = (errors: FieldError[]) => {
  const errorMap: Record<string, string> = {};
  errors.forEach(({ field, message }) => {
    errorMap[field] = message;
  });
  return errorMap;
};

export const toPropertyErrorMap = (errors: PropertyFieldError[]) => {
  const errorMap: Record<string, string> = {};
  errors.forEach(({ field, message }) => {
    errorMap[field] = message;
  });
  return errorMap;
};
