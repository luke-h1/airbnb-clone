/* eslint-disable */
import { Button, Flex, Text, Box, SimpleGrid } from '@chakra-ui/react';
import { InputField } from '@src/components/InputField';
import {
  usePropertyQuery,
  useUpdatePropertyMutation,
} from '@src/generated/graphql';
import { createUrqlClient } from '@src/utils/createUrqlClient';
import { useGetIntId } from '@src/utils/useGetIntId';
import { Formik, Form } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import { Loader } from '@src/components/Loader';

const EditPropertyPage = () => {
  const router = useRouter();
  const intId = useGetIntId();
  const [, updateProperty] = useUpdatePropertyMutation();
  const [{ data, fetching }] = usePropertyQuery({
    /**
     * If id =-1 we know we're on server side
     * pause until id is not -1
     * lookup id in DB
     * if is present, fetch property, prefill form with fields
     * else not found
     */
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });

  if (fetching) {
    return (
      <Flex direction="column" alignItems="center" justifyContent="center">
        <Loader size="md" />
      </Flex>
    );
  }

  if (!data?.property) {
    <Flex direction="column" alignItems="center" justifyContent="center">
      <Text as="h1" fontSize="30px">
        404 - Could not find property
      </Text>
    </Flex>;
  }
  if (!data) {
    return null;
  }
  return (
    <>
      <h1>Update Property</h1>
      <SimpleGrid columns={2} spacingX="40px" spacingY="20px">
        <Formik
          initialValues={{
            title: data.property.title,
            propertyType: data.property.propertyType,
            mainImage: data.property.mainImage,
            pricePerNight: data.property.pricePerNight,
            description: data.property.description,
            latitude: data.property.latitude,
            longitude: data.property.longitude,
            amenities: data.property.amenities,
          }}
          onSubmit={async (values, { setErrors }) => {
            await updateProperty({
              options: { ...values },
              id: intId,
            });
            router.push(`/property/${intId}`);
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
              <Flex direction='column' justifyContent='center' alignItems='center'>
              <Box 
                mt={4}
                mb={6}
                as={Button}
                isLoading={isSubmitting}
                spinnerPlacement="start"
                loadingText="Loading"
                disabled={isSubmitting}
                type="submit"
                colorScheme="teal"
              >
                Update Property
              </Box>
              </Flex>
            </Form>
          )}
        </Formik>
        <Box bg="tomato" height="80px">
          Map goes here
        </Box>
      </SimpleGrid>
    </>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(
  EditPropertyPage
);
