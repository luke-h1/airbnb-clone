import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import { InputField } from 'src/components/InputField';
import { useRegisterMutation } from 'src/generated/graphql';
import { createUrqlClient } from 'src/utils/createUrqlClient';
import { toErrorMap } from 'src/utils/toErrorMap';
import styled from '@emotion/styled';
import Button from '@src/components/Button';
import Link from 'next/link';
import { Flex } from '@src/components/Flex';

interface FormValues {
  firstName: string;
  lastName: string;
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

const RegisterPage = () => {
  const [, register] = useRegisterMutation();
  const router = useRouter();
  return (
    <IndexStyles>
      <Formik<FormValues>
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        }}
        onSubmit={async (values, { setErrors }) => {
          const res = await register({ options: values });
          if (res.data?.register.errors) {
            setErrors(toErrorMap(res.data.register.errors));
          } else {
            router.push('/');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="firstName"
              placeholder="First Name"
              label="First Name"
            />
            <InputField
              name="lastName"
              placeholder="Last Name"
              label="Last Name"
            />
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
            <Button disabled={isSubmitting} text="register" size="small" />
          </Form>
        )}
      </Formik>
    </IndexStyles>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: false })(RegisterPage);
