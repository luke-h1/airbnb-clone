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
            <button type="submit">Agree and continue</button>
            <Box>
              <Text fontSize="15px">
                Already have an account? <Link href="/login">Login</Link>
              </Text>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: false })(RegisterPage);
