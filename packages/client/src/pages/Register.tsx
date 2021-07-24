import React, { useContext, useEffect } from 'react';
import { Form, Formik } from 'formik';

import { useRouter } from 'next/router';
import { InputField } from '../components/InputField';
import { AuthContext } from '../context/AuthContext';

interface RegisterProps {

}

interface FormValues {
  firstName: string;
  lastName: string;
  image: string;
  email: string;
  password: string;
}

const Register: React.FC<RegisterProps> = () => {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (authContext.user !== null) {
      router.push('/');
    }
  }, [authContext.user]);
  return (
    <>
      <h1 className="title">Welcome to Airbnb</h1>
      <Formik<FormValues>
        initialValues={{
          firstName: '',
          lastName: '',
          image: '',
          email: '',
          password: '',
        }}
        onSubmit={async (values, { setErrors }) => {
          authContext.register({ options: values });
        }}
      >
        {({ setFieldValue }) => (
          <Form>
            <InputField
              name="firstName"
              placeholder="First Name"
              label="First Name"
              required
            />
            <InputField
              name="lastName"
              placeholder="Last Name"
              label="Last Name"
              required
            />
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
            <InputField
              name="image"
              placeholder="image"
              label="image"
              type="file"
              id="image"
              value={undefined}
              required
              onChange={(e) => {
                // @ts-ignore
                setFieldValue('image', e.currentTarget.files[0]);
              }}
            />
            <button type="submit">
              Register
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default Register;
