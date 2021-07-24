import React, { useContext, useEffect } from 'react';
import { Form, Formik } from 'formik';

import { useRouter } from 'next/router';
import { InputField } from '../components/InputField';
import { AuthContext } from '../context/AuthContext';

interface LoginProps {

}

interface FormValues {
  email: string;
  password: string;
}

const Login: React.FC<LoginProps> = () => {
  const { login, user } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (user !== null) {
      router.push('/');
    }
  }, [user]);
  return (
    <>
      <h1 className="title">Welcome to Airbnb</h1>
      <Formik<FormValues>
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={async (values, { setErrors }) => {
          login({ options: values });
        }}
      >
        {({ setFieldValue }) => (
          <Form>
            <InputField
              name="email"
              placeholder="Email"
              label="email"
              required
            />
            <InputField
              name="password"
              placeholder="Password"
              label="password"
              type="password"
              required
            />
            <button type="submit">
              Login
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default Login;
