import {
  Button, Flex, Text, Box, SimpleGrid,
} from '@chakra-ui/react';
import { InputField } from '@src/components/InputField';
import {
  usePropertyQuery,
  useUpdatePropertyMutation,
} from '@src/generated/graphql';
import { useGetIntId } from '@src/utils/useGetIntId';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import { Loader } from '@src/components/Loader';
import { useIsAuth } from '@src/utils/useIsAuth';

const EditPropertyPage = () => {
  useIsAuth();
  const router = useRouter();
  const intId = useGetIntId();
  const [updateProperty] = useUpdatePropertyMutation();
  const { data, loading } = usePropertyQuery({
    /**
     * If id =-1 we know we're on server side
     * pause until id is not -1
     * lookup id in DB
     * if is present, fetch property, prefill form with fields
     * else not found
     */
    skip: intId === -1,
    variables: {
      id: intId,
    },
  });

  if (loading) {
    return (
      <Flex direction="column" alignItems="center" justifyContent="center">
        <Loader />
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
            image: data.property.image,
            pricePerNight: data.property.pricePerNight,
            description: data.property.description,
            address: data.property.address,
            amenities: data.property.amenities,
          }}
          onSubmit={async (values) => {
            await updateProperty({
              variables: {
                options: {
                  title: values.title,
                  propertyType: values.propertyType,
                  pricePerNight: values.pricePerNight,
                  description: values.description,
                  address: values.address,
                  amenities: values.amenities,
                },
                // image: values.image,
                id: intId,
              },
            });

            router.push(`/property/${intId}`);
          }}
        >
          {({ isSubmitting, setFieldValue }) => (
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
                placeholder="image"
                label="image"
                type="file"
                id="image"
                value={undefined}
                required
                onChange={(e) => {
                  // @ts-ignore
                  setFieldValue('image', e.currentTarget.files[0]);
                }}
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
                type="number"
              />
              <InputField
                name="amenities"
                placeholder="amenities"
                label="amenities"
                type="text"
              />
              <Flex
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
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
export default EditPropertyPage;
