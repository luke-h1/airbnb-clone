import {
  Box, Button, Flex, Text,
} from '@chakra-ui/react';
import { InputField } from '@src/components/InputField';
import { Formik, Form } from 'formik';
import React from 'react';
import { useCreateListingMutation } from '@src/generated/graphql';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '@src/utils/createUrqlClient';
import { toErrorMap } from '@src/utils/toErrorMap';

interface FormValues {
  name: string;
  category: string;
  description: string;
  price: number;
  beds: number;
  guests: number;
  city: string;
  country: string;
  address: string;
  amenities: string;
}

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

        <Formik<FormValues>
          initialValues={{
            name: '',
            category: '',
            description: '',
            price: 0,
            beds: 0,
            guests: 0,
            city: '',
            country: '',
            address: '',
            amenities: '',
          }}
          onSubmit={async (values, { setErrors }) => {
            const res = await createListing({ options: values });
            console.log(res.data);
          }}
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
              <InputField name="city" placeholder="city" label="city" />
              <InputField
                name="country"
                placeholder="country"
                label="country"
              />
              <InputField
                name="address"
                placeholder="address"
                label="address"
              />
              <InputField
                name="amenities"
                placeholder="amenities"
                label="amenities"
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
