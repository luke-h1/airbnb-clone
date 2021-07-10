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
import { Flex, Button, Box } from '@chakra-ui/react';

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  image: '';
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
        {({ isSubmitting }) => (
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
            <Flex
              mt={5}
              mb={5}
              direction="column"
              justifyContent="center"
              alignItems="center"
            />
            <Flex
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                width="30%"
                as={Button}
                isLoading={isSubmitting}
                spinnerPlacement="start"
                loadingText="Loading"
                disabled={isSubmitting}
                type="submit"
                colorScheme="teal"
              >
                Register
              </Box>
            </Flex>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default RegisterPage;
