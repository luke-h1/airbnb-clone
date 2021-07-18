import { Form, Formik } from 'formik';
import React from 'react';
import { InputField } from 'src/components/InputField';
import { useRegisterMutation } from 'src/generated/graphql';
import { toErrorMap } from 'src/utils/toErrorMap';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '@src/utils/createUrqlClient';
import Link from 'next/link';

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  image: string;
}

const RegisterPage = () => {
  const [, register] = useRegisterMutation();
  return (
    <>
      <h1 className="title">Welcome to AirBnb</h1>
      <Formik<FormValues>
        initialValues={{
          firstName: '',
          lastName: '',
          image: '',
          email: '',
          password: '',
        }}
        onSubmit={async (values, { setErrors }) => {
          const res = await register({
            options: {
              firstName: values.firstName,
              lastName: values.lastName,
              email: values.email,
              password: values.password,
            },
            image: values.image,
          });
          if (res.data?.register.errors) {
            setErrors(toErrorMap(res.data.register.errors));
          } else {
            // router.push('/');
          }
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
            <div className="flex flex-col align-center">
              <a>
                <button
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Register
                </button>
              </a>
            </div>
            <div>
              <h3>Already have an account?</h3>
              <Link href="/login">
                <a>
                  <button
                    className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                    type="button"
                  >
                    login
                  </button>
                </a>
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: false })(RegisterPage);
