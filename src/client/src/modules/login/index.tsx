import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import { InputField } from '@src/components/InputField';
import { useLoginMutation } from '@src/generated/graphql';
import { toErrorMap } from '@src/utils/toErrorMap';
import Link from 'next/link';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '@src/utils/createUrqlClient';
import { Wrapper } from '@src/components/Wrapper';
import { Button, Flex, Text } from '@chakra-ui/react';
import { Loader } from '@src/components/Loader';

interface FormValues {
  email: string;
  password: string;
}
const RegisterPage = () => {
  const [, login] = useLoginMutation();
  const router = useRouter();
  return (
    <Wrapper>
      <Formik<FormValues>
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={async (values, { setErrors }) => {
          const res = await login({
            options: values,
          });
          if (res.data?.login.errors) {
            setErrors(toErrorMap(res.data.login.errors));
          } else {
            router.push('/');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            {isSubmitting && <Loader />}
            <InputField
              name="email"
              placeholder="Email"
              label="email"
              data-testid="email"
            />
            <InputField
              data-testid="password"
              name="password"
              placeholder="Password"
              label="password"
              type="password"
            />
            <Flex direction="column" justifyContent="center">
              <Button colorScheme="blue" mt={3} type="submit">
                Login
              </Button>
            </Flex>

            <Text as="h3">Don't have an account ?</Text>
            <Link href="/register">
              <a>
                <Button colorScheme="blue" mt={3} type="button">
                  Register
                </Button>
              </a>
            </Link>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(RegisterPage);
