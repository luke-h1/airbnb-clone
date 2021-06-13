import React, { InputHTMLAttributes } from 'react';
import { useField } from 'formik';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  textarea?: boolean;
};

// '' => false
// 'error message stuff' => true

export const InputField: React.FC<InputFieldProps> = ({ label, ...props }) => {
  const [field, { error }] = useField(props);
  return (
    <div className="form-wrapper">
      <label htmlFor={field.name} hidden>{label}</label>
      <input {...field} {...props} id={field.name} className="inputStyles" />
      {error ? <h1>{error}</h1> : null}
    </div>
  );
};
