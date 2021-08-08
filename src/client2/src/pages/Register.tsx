import React, { useEffect } from 'react';
import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import { InputField } from 'src/components/InputField';
import { Loader } from 'src/components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { register } from 'src/actions/userActions';
/* eslint-disable */

interface FormValues {
  name: string;
  email: string;
  password: string;
}

interface RegisterProps {
  location: any;
  history: any;
}

const Register: React.FC<RegisterProps> = ({ location, history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state: any) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  return (
    <>
      <Formik<FormValues>
        initialValues={{
          email: '',
          name: '',
          password: '',
        }}
        onSubmit={async (values, { setErrors }) => {
          const res = dispatch(
            register(values.name, values.email, values.password),
          );
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            {isSubmitting && <Loader />}
            <InputField name="name" placeholder="name" label="name" />
            <InputField name="email" placeholder="email" label="email" />

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
                  Register
                </button>
              </a>
              <h3>have an account?</h3>
              <Link to="/login">
                <a>
                  <button
                    className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                    type="button"
                  >
                    Login
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
export default Register;
