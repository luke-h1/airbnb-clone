import { Box, GridItem, SimpleGrid } from '@chakra-ui/react';
import { InputField } from '@src/components/InputField';
import { useCreatePropertyMutation } from '@src/generated/graphql';
import { useIsAuth } from '@src/utils/useIsAuth';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import { toPropertyErrorMap } from '@src/utils/toErrorMap';

const CreatePropertyPage = () => {
  useIsAuth();
  const router = useRouter();
  const [createProperty] = useCreatePropertyMutation();

  return (
    <>
      <h1>Create Property</h1>
      <SimpleGrid minChildWidth="120px" spacing="40px">
        <Formik
          initialValues={{
            title: '',
            propertyType: '',
            image: '',
            pricePerNight: 0,
            description: '',
            address: '',
            amenities: [],
          }}
          onSubmit={async (values, { setErrors }) => {
            const res = await createProperty({
              variables: { options: values },
              update: (cache) => {
                cache.evict({ fieldName: 'properties:{}' });
              },
            });
            if (res.data?.createProperty.errors) {
              setErrors(toPropertyErrorMap(res.data.createProperty.errors));
            } else {
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
                  name="image"
                  placeholder="A catchy image for your property"
                  label="image"
                  type="text"
                />

                <InputField
                  name="pricePerNight"
                  placeholder="Price per night"
                  label="pricePerNight"
                  type="number"
                />
                <InputField
                  name="address"
                  placeholder="address"
                  label="address"
                  type="text"
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
          <Box minW="840px" />
        </GridItem>
      </SimpleGrid>
    </>
  );
};
export default CreatePropertyPage;
