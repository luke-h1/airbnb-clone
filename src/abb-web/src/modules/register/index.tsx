import { Field, Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import { InputField } from 'src/components/InputField';
import { useRegisterMutation } from 'src/generated/graphql';
import { createUrqlClient } from 'src/utils/createUrqlClient';
import { toErrorMap } from 'src/utils/toErrorMap';
import Link from 'next/link';
import {
  Flex, Text, Button, Box,
} from '@chakra-ui/react';
import UploadImage from '@src/components/UploadImage';

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  picture: string;
}

const RegisterPage = () => {
  const [, register] = useRegisterMutation();
  const router = useRouter();
  return (
    <>
      <h1 className="title">Welcome to AirBnb</h1>
      <Formik<FormValues>
        initialValues={{
          firstName: '',
          lastName: '',
          picture: '',
          email: '',
          password: '',
        }}
        onSubmit={async (values, { setErrors }) => {
          const res = await register({ options: values });
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
            >
              <Field
                name="picture"
                placeholder="picture"
                label="picture"
                type="picture"
                component={UploadImage}
              />
            </Flex>
            <Flex
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Text as="h3" fontSize="17px" mb={4}>
                Already have an account ?
              </Text>
              <Link href="/login">
                <Box
                  mb={6}
                  width="30%"
                  as={Button}
                  isLoading={isSubmitting}
                  spinnerPlacement="start"
                  loadingText="Loading"
                  disabled={isSubmitting}
                  type="submit"
                  colorScheme="teal"
                >
                  Login
                </Box>
              </Link>
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
export default withUrqlClient(createUrqlClient, { ssr: false })(RegisterPage);
