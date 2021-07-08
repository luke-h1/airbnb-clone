import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import { InputField } from 'src/components/InputField';
import { useLoginMutation } from 'src/generated/graphql';
import { createUrqlClient } from 'src/utils/createUrqlClient';
import { toErrorMap } from 'src/utils/toErrorMap';
import Link from 'next/link';
import {
  Flex, Text, Button, Box,
} from '@chakra-ui/react';

interface FormValues {
  email: string;
  password: string;
}

const RegisterPage = () => {
  const [, login] = useLoginMutation();
  const router = useRouter();
  return (
    <>
      <h1 className="title">Welcome to AirBnb</h1>
      <Formik<FormValues>
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={async (values, { setErrors }) => {
          const res = await login({ options: values });
          if (res.data?.login.errors) {
            setErrors(toErrorMap(res.data.login.errors));
          } else {
            router.push('/');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="email" placeholder="Email" label="email" />
            <InputField
              name="password"
              placeholder="Password"
              label="password"
              type="password"
            />
            <Flex
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Text as="h3" fontSize="17px" mb={4} mt={4}>
                Don't have an account ?
              </Text>
              <Link href="/register">
                <Box
                  mb={6}
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
              </Link>
              <Box
                mt={4}
                mb={6}
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
            </Flex>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: false })(RegisterPage);
