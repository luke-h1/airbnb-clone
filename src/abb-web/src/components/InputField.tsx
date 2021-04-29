/* eslint-disable react/jsx-props-no-spreading */
import React, { InputHTMLAttributes } from 'react';
import { useField } from 'formik';
import toast from 'react-hot-toast';
import {
  Box, Flex, FormControl, Input,
} from '@chakra-ui/react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};

export const InputField: React.FC<Props> = ({ size: _, ...props }) => {
  const [field, { error }] = useField(props);

  return (
    <Box as={Flex} w={500}>
      <FormControl isInvalid={!!error}>
        <Input {...field} {...props} id={field.name} py={8} maxW="100%" />
        {error && toast.error(error)}
      </FormControl>
    </Box>
  );
};
