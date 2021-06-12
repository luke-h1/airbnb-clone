/* eslint-disable */
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import React from 'react';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '@src/utils/createUrqlClient';

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
          Create a Property
        </Text>

        <Formik<{}>
          initialValues={{}}
          onSubmit={async (values, { setErrors }) => {}}
        >
          {({ isSubmitting }) => (
            <Form>
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
                Create property
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default index;
