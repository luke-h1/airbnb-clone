/* eslint-disable */
import { Box, Button, Flex, Link, Text } from '@chakra-ui/react';
import { InputField } from '@src/components/InputField';
import { toErrorMap } from '@src/utils/toErrorMap';
import { Formik, Form } from 'formik';
import router from 'next/router';
import React from 'react';
import { CreateListingSchema } from '@common/validation/CreateListingSchema';
import { useCreateListingMutation } from '@src/generated/graphql';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '@src/utils/createUrqlClient';
/*
Name
Category
image upload
description
price
beds
guests
google maps
amenities

*/

interface indexProps {}

const index: React.FC<indexProps> = () => {
  const [, createListing] = useCreateListingMutation();
  return (
    <>
      <Box
        as={Flex}
        minH="50vh"
        flexDirection="column"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Text as="h1" fontSize="40px">
          Create a listing
        </Text>

        <Formik
          initialValues={{
            name: '',
            category: '',
            pictureUrl: '',
            description: '',
            price: 0,
            beds: 0,
            guests: 0,
            latitude: 0,
            longitude: 0,
            amenities: ['test amenity'],
          }}
          onSubmit={async (values, { setErrors }) => {
            console.table(values);
            const res = await createListing({ options: values });
            if (res.error) {
              console.log(res.error.message);
            }
            console.log(res.data);
          }}
          // onSubmit={async (values, { setErrors }) => {
          //   const res = await login({ options: values });
          //   if (res.data?.login.errors) {
          //     setErrors(toErrorMap(res.data.login.errors));
          //   } else {
          //     router.push('/');
          //   }
          // }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField name="name" placeholder="name" label="name" />
              <InputField
                name="category"
                placeholder="category"
                label="category"
              />
              <InputField
                name="pictureUrl"
                placeholder="pictureUrl"
                label="pictureUrl"
                type="file"
              />
              <InputField
                name="description"
                placeholder="description"
                label="description"
              />
              <InputField
                name="price"
                placeholder="price"
                label="price"
                type="number"
              />
              <InputField
                name="beds"
                placeholder="beds"
                label="beds"
                type="number"
              />
              <InputField
                name="guests"
                placeholder="guests"
                label="guests"
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

              <Box mb={2} />
              <Button
                type="submit"
                bg="#F93458"
                textColor="#fff"
                minW="500px"
                disabled={isSubmitting}
                _hover={{
                  background: '#FE385C',
                  color: '#fff',
                }}
              >
                Create listing
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(index);
