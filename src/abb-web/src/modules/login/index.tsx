import {
  Box, Button, Flex, Link, Text,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import { InputField } from 'src/components/InputField';
import { MeDocument, MeQuery, useLoginMutation } from 'src/generated/graphql';
import { toErrorMap } from 'src/utils/toErrorMap';
import { withApollo } from 'src/utils/withApollo';

interface indexProps {}

const index: React.FC<indexProps> = () => {
  const router = useRouter();
  const [login] = useLoginMutation();
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
            const res = await login({
              variables: { options: values },
              update: (cache, { data }) => {
                cache.writeQuery<MeQuery>({
                  query: MeDocument,
                  data: {
                    __typename: 'Query',
                    me: data?.login.user,
                  },
                });
              },
            });
            console.log(res);
            if (res.data?.login.errors) {
              console.log('res.data?.login.errors', res.data?.login.errors);
              setErrors(toErrorMap(res.data.login.errors));
            } else if (res.data?.login.user) {
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
export default withApollo({ ssr: false })(index);
