import { Form, Formik } from 'formik';
import React, { useContext } from 'react';
import { InputField } from '../components/InputField';
import { AuthContext } from '../context/AuthContext';

interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    image: string;
  }

const Register: React.FC = () => {
  const { register } = useContext(AuthContext);
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
          const res = register({ options: values });
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <InputField
              name="firstName"
              placeholder="First Name"
              label="First Name"
            />
            <InputField
              name="lastName"
              placeholder="Last Name"
              label="Last Name"
            />
            <InputField name="email" placeholder="Email" label="email" />
            <InputField
              name="password"
              placeholder="Password"
              label="password"
              type="password"
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
            <button type="submit" disabled={isSubmitting}>Register</button>
          </Form>
        )}

      </Formik>
    </>

  );
};
export default Register;
