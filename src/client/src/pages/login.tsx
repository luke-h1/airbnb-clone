import React from 'react';
import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import { InputField } from '../components/InputField';
import { Loader } from '../components/Loader';
/* eslint-disable */
interface FormValues {
  email: string;
  password: string;
}
const Login: React.FC<{}> = () => {
  return (
    <>
      <Formik<FormValues>
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={async (values, { setErrors }) => {}}
      >
        {({ isSubmitting }) => (
          <Form>
            {isSubmitting && <Loader />}
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
              <h3>Don't have an account?</h3>
              <Link to="/register">
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
    </>
  );
};
export default Login;
