import { Form, Formik } from 'formik';
import React from 'react';
import { InputField } from '../components/InputField';

interface FormValues {
    email: string;
    password: string;
  }

const Login: React.FC = () => {
  return (
    <>
      <h1 className="title">Welcome back to Airbnb</h1>
      <Formik<FormValues>
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={async (values, { setErrors }) => {
          console.log(values);
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <InputField name="email" placeholder="Email" label="email" />
            <InputField
              name="password"
              placeholder="Password"
              label="password"
              type="password"
            />
            <button type="submit" disabled={isSubmitting}>Login</button>
          </Form>
        )}

      </Formik>
    </>

  );
};
export default Login;
