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
  -webkit-box-direction: normal !important;
  -webkit-box-orient: vertical !important;
  background: rgb(255, 255, 255) !important;
  position: relative !important;
  width: 100vw !important;
  max-width: 100vw !important;
  max-height: 100% !important;
  display: flex !important;
  flex-direction: column !important;
  box-shadow: rgb(0 0 0 / 28%) 0px 8px 28px !important;
  border-top-left-radius: 12px !important;
  border-top-right-radius: 12px !important;
  animation-duration: 400ms !important;
  animation-iteration-count: 1 !important;
  animation-fill-mode: both !important;

  .title {
    font-size: 22px !important;
    line-height: 26px !important;
    color: rgb(34, 34, 34) !important;
    font-weight: 600 !important;
    margin-bottom: 8px !important;
  }
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
            <Flex>
              <Info>Don't have an account ?</Info>
              <Link href="/register">
                <a>Register</a>
              </Link>
            </Flex>
            <Button disabled={isSubmitting} type="submit">
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </IndexStyles>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: false })(LoginPage);
