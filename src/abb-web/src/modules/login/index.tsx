import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import { InputField } from 'src/components/InputField';
import { useLoginMutation } from 'src/generated/graphql';
import { createUrqlClient } from 'src/utils/createUrqlClient';
import { toErrorMap } from 'src/utils/toErrorMap';
import styled from '@emotion/styled';
import Button from '@src/components/Button';
import Link from 'next/link';
import { Flex } from '@src/components/Flex';

interface FormValues {
  email: string;
  password: string;
}

const IndexStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  .mb-2 {
    margin-bottom: 2;
  }

  .info {
    font-size: 16px;
  }
`;

const Info = styled.p`
  font-size: 16px;
`;

const LoginPage = () => {
  const [, login] = useLoginMutation();
  const router = useRouter();
  return (
    <IndexStyles>
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
            <Flex>
              <Info>Don't have an account ?</Info>
              <Link href="/register">
                <a>Register</a>
              </Link>
            </Flex>
            <Button disabled={isSubmitting} text="register"/>
          </Form>
        )}
      </Formik>
    </IndexStyles>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: false })(LoginPage);
