import React, { InputHTMLAttributes } from 'react';
import { useField } from 'formik';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};

export const InputField: React.FC<InputFieldProps> = ({ label, ...props }) => {
  const [field, { error }] = useField(props);
  return (
    <>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor={field.name}
        >
          {label}
        </label>
        <input
          className="input border border-gray-400 appearance-none rounded w-full px-3 py-3 pt-5 pb-2 focus focus:border-indigo-600 focus:outline-none active:outline-none active:border-indigo-600"
          required
          id={field.name}
          {...field}
          {...props}
        />
        {error ? <p className="text-red-500 text-xs italic">{error}</p> : null}
      </div>
    </>
  );
};
