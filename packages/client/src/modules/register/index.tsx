import { Button } from '@chakra-ui/react';
import { Wrapper } from '@src/components/Wrapper';
import { createUrqlClient } from '@src/utils/createUrqlClient';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import { InputField } from 'src/components/InputField';
import { useRegisterMutation } from 'src/generated/graphql';
import { toErrorMap } from 'src/utils/toErrorMap';

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  image: string;
}

const RegisterPage = () => {
  const [, register] = useRegisterMutation();
  const router = useRouter();
  return (
    <Wrapper>
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
            <input
              type="file"
              accept="image/*"
              style={{ marginBottom: '1rem' }}
              onChange={({ target: { validity, files } }) => {
                if (validity.valid && files) {
                  setFieldValue('image', files[0]);
                  // set 'file' of the form data as files[0]
                }
              }}
            />
            <Button type="submit" colorScheme="blue" disabled={isSubmitting}>
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: false })(RegisterPage);
