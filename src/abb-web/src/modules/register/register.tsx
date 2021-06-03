import {
  Box, Button, Flex, Link, Text,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import { InputField } from 'src/components/InputField';
import { useRegisterMutation } from 'src/generated/graphql';
import { createUrqlClient } from 'src/utils/createUrqlClient';
import { toErrorMap } from 'src/utils/toErrorMap';

interface RegisterPageProps {}

interface FormValues {
  email: string;
  password: string;
}

const RegisterPage: React.FC<RegisterPageProps> = () => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  return (
    <Box
      as={Flex}
      minH="50vh"
      flexDirection="column"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Formik<FormValues>
        initialValues={{ email: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({ options: values });
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data?.register.user) {
            // worked
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
              Agree and continue
            </Button>
            <Box>
              <Text fontSize="15px">
                Already have an account?{' '}
                <Text
                  m={0}
                  p={0}
                  textDecoration="underline"
                  as={Link}
                  disabled={isSubmitting}
                  href="/login"
                >
                  Login
                </Text>
              </Text>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: false })(RegisterPage);
