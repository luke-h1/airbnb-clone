import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import { InputField } from '@src/components/InputField';
import { useLoginMutation } from '@src/generated/graphql';
import { toErrorMap } from '@src/utils/toErrorMap';
import Link from 'next/link';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '@src/utils/createUrqlClient';
import Wrapper from '@src/components/Wrapper';

interface FormValues {
  email: string;
  password: string;
}
const RegisterPage = () => {
  const [, login] = useLoginMutation();
  const router = useRouter();
  return (
    <Wrapper>
      <h1 className="title">Welcome to AirBnb</h1>
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
            <div className="flex flex-col align-center">
              <a>
                <button
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                  type="submit"
                >
                  Login
                </button>
              </a>
              <h3>Don't have an account ?</h3>
              <Link href="/register">
                <a>
                  <button
                    className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                    type="button"
                  >
                    Register
                  </button>
                </a>
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: false })(RegisterPage);
