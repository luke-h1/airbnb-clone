import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import { InputField } from 'src/components/InputField';
import {
  MeDocument,
  MeQuery,
  useRegisterMutation,
} from 'src/generated/graphql';
import { toErrorMap } from 'src/utils/toErrorMap';
import { registerSchema } from '@src/validation/registerSchema';

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  image: string;
}

const RegisterPage = () => {
  const [register] = useRegisterMutation();
  const router = useRouter();
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
        validationSchema={registerSchema}
        onSubmit={async (values, { setErrors }) => {
          const res = await register({
            variables: {
              options: {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                password: values.password,
              },
              image: values.image,
            },
            update: (cache, { data }) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: 'Query',
                  me: data?.register.user,
                },
              });
            },
          });
          if (res.data?.register.errors) {
            setErrors(toErrorMap(res.data.register.errors));
          } else {
            router.push('/');
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
            <div className="flex flex-col mb-5">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded"
                type="submit"
                disabled={isSubmitting}
              >
                <a target="_blank" rel="noreferrer">
                  Register
                </a>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default RegisterPage;
