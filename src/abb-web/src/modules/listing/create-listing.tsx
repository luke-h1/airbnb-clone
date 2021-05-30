/* eslint-disable */
import { Box, Button, Flex, Link, Text } from '@chakra-ui/react';
import { InputField } from '@src/components/InputField';
import { toErrorMap } from '@src/utils/toErrorMap';
import { Formik, Form } from 'formik';
import router from 'next/router';
import React from 'react';
import { CreateListingSchema } from '@common/validation/CreateListingSchema';
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
            image: '',
            description: '',
            price: '',
            beds: '',
            guests: '',
            amenities: '',
          }}
          validationSchema={CreateListingSchema}
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
              <InputField name="image" placeholder="image" label="image" />
              <InputField
                name="description"
                placeholder="description"
                label="description"
              />
              <InputField name="price" placeholder="price" label="price" type='number' />
              <InputField name="beds" placeholder="Number of beds" label="beds" type='number'/>
              <InputField name="guests" placeholder="Number of guests" label="guests" type='number'/>
              <InputField
                name="amentities"
                placeholder="Number of amentities"
                label="amentities"
                type='number'
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
export default index;
