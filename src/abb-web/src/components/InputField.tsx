import React, { InputHTMLAttributes } from 'react';
import { useField } from 'formik';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  textarea?: boolean;
};

// '' => false
// 'error message stuff' => true

export const InputField: React.FC<InputFieldProps> = ({
  label,
  ...props
}) => {
  const [field, { error }] = useField(props);
  return (
    <>
      <label htmlFor={field.name}>{label}</label>
      <input {...field} {...props} id={field.name} />
      {error ? <h1>{error}</h1> : null}
    </>
  );
};
