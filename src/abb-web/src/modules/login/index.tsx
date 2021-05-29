import {
  Box, Button, Flex, Link, Text,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import { InputField } from 'src/components/InputField';
import { useLoginMutation } from 'src/generated/graphql';
import { createUrqlClient } from 'src/utils/createUrqlClient';
import { toErrorMap } from 'src/utils/toErrorMap';

interface indexProps {}

const index: React.FC<indexProps> = () => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  return (
    <>
      <Box
        as={Flex}
        minH="50vh"
        flexDirection="column"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Formik
          initialValues={{ email: '', password: '' }}
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
              <Box mb={2} />
              <Button
                type="submit"
                bg="#F93458"
                textColor="#fff"
                minW="500px"
                disabled={isSubmitting}
                _hover={{
                  background: '#FE385C',
                  color: '#fff',
                }}
              >
                Login
              </Button>
              <Box>
                <Text fontSize="15px">
                  Don't have an account?{' '}
                  <Text
                    m={0}
                    p={0}
                    textDecoration="underline"
                    as={Link}
                    href="/register"
                  >
                    Register
                  </Text>
                </Text>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>

    </>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: false })(index);
