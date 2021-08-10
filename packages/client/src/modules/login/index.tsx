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
import { Button, Flex } from '@chakra-ui/react';

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
            {isSubmitting && <p>submitting</p>}
            <InputField name="email" placeholder="Email" label="email" />
            <InputField
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

            <h3>Don't have an account ?</h3>
            <Link href="/register">
              <a>
                <Button colorScheme="blue" mt={3} type="submit">
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
export default withUrqlClient(createUrqlClient, { ssr: false })(RegisterPage);
