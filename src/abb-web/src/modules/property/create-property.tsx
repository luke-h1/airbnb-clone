/* eslint-disable */
import { Flex } from '@src/components/Flex';
import { InputField } from '@src/components/InputField';
import { useCreatePropertyMutation } from '@src/generated/graphql';
import { createUrqlClient } from '@src/utils/createUrqlClient';
import { Formik, Form } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';

const CreatePropertyPage = () => {
  const router = useRouter();
  const [, createProperty] = useCreatePropertyMutation();
  return (
    <>
      <h1>Create Property</h1>
      <Flex>
        <Formik
          initialValues={{
            title: '',
            propertyType: '',
            mainImage: '',
            latitude: 0,
            longitude: 0,
            amenities: [],
          }}
          onSubmit={async (values, { setErrors }) => {
            const res = await createProperty({ options: values });
            if (res.data?.createProperty) {
              router.push('/');
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                name="title"
                placeholder="title"
                label="title"
                type="text"
              />
              <InputField
                name="propertyType"
                placeholder="Flat, House, Bungalow..."
                label="propertyType"
                type="text"
              />
              <InputField
                name="mainImage"
                placeholder="A catchy image for your property"
                label="mainImage"
                type="text"
              />
              <InputField
                name="latitude"
                placeholder="latitude"
                label="latitude"
                type="number"
              />
              <InputField
                name="longitude"
                placeholder="longitude"
                label="longitude"
                type="number"
              />
              <InputField
                name="amenities"
                placeholder="amenities"
                label="amenities"
                type="text"
              />
              <button type="submit" disabled={isSubmitting}>
                Create Property
              </button>
            </Form>
          )}
        </Formik>
      </Flex>
    </>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: false })(
  CreatePropertyPage
);
