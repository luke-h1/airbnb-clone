import React from 'react';
import { FiDelete, FiEdit3 } from 'react-icons/fi';
import Link from 'next/link';
import { useDeletePropertyMutation, useMeQuery } from '@src/generated/graphql';
import { Box, Button } from '@chakra-ui/react';
import router from 'next/router';

interface EditDeleteButtonProps {
  id: number;
  creatorId: number;
}

const EditDeleteButtons: React.FC<EditDeleteButtonProps> = ({
  id,
  creatorId,
}) => {
  const [, deleteProperty] = useDeletePropertyMutation();
  const [{ data: meData }] = useMeQuery();

  if (meData?.me?.id !== creatorId) {
    return null;
  }
  return (
    <Box my={2}>
      <Link href={`/property/edit/${id}`}>
        <Box as={Button} type="button" colorScheme="teal">
          Edit
        </Box>
      </Link>
      <Box
        ml={5}
        as={Button}
        type="button"
        colorScheme="teal"
        onClick={() => {
          deleteProperty({ id });
        }}
      >
        Delete
      </Box>
    </Box>
  );
};
export default EditDeleteButtons;
