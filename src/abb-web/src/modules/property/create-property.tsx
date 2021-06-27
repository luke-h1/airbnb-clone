/* eslint-disable */
import { Box, GridItem, SimpleGrid } from '@chakra-ui/react';
import { InputField } from '@src/components/InputField';
import { useCreatePropertyMutation } from '@src/generated/graphql';
import { createUrqlClient } from '@src/utils/createUrqlClient';
import { useIsAuth } from '@src/utils/useIsAuth';
import { Formik, Form } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import dynamic from 'next/dynamic';

const CreateMap = dynamic(() => import('./components/CreateMap2'), {
  ssr: false,
});

const CreatePropertyPage = () => {
  useIsAuth();
  const router = useRouter();
  const [, createProperty] = useCreatePropertyMutation();
  return (
    <>
      <h1>Create Property</h1>
      <SimpleGrid minChildWidth="120px" spacing="40px">
        <Formik
          initialValues={{
            title: '',
            propertyType: '',
            mainImage: '',
            pricePerNight: 0,
            description: '',
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
            <Box minW="840px">
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
                  name="description"
                  placeholder="Description of property"
                  label="description"
                  type="text"
                />
                <InputField
                  name="mainImage"
                  placeholder="A catchy image for your property"
                  label="mainImage"
                  type="text"
                />
                <InputField
                  name="pricePerNight"
                  placeholder="Price per night"
                  label="pricePerNight"
                  type="number"
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
            </Box>
          )}
        </Formik>
        <GridItem colSpan={1} colStart={2}>
          <Box minW="840px">
            <CreateMap />
          </Box>
        </GridItem>
      </SimpleGrid>
    </>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: false })(
  CreatePropertyPage
);
