import { Box, Button, Flex } from '@chakra-ui/react';
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
import { withApollo } from 'src/utils/withApollo';

interface indexProps {}

const index: React.FC<indexProps> = () => {
  const router = useRouter();
  const [register] = useRegisterMutation();
  return (
    <Box as={Flex} minH="50vh" flexDirection="column" display="flex" justifyContent="center" alignItems="center">
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const res = await register({
            variables: { options: values },
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
          } else if (res.data?.register.user) {
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
            <Button type="submit" bg="#F93458" textColor="#fff" minW="500px">
              Agree and continue
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
export default withApollo({ ssr: false })(index);
