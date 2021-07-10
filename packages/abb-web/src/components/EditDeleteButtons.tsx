import React from 'react';
import Link from 'next/link';
import { useDeletePropertyMutation, useMeQuery } from '@src/generated/graphql';
import { Box, Button } from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';
import { FaUserEdit } from 'react-icons/fa';
import { Loader } from './Loader';

interface EditDeleteButtonProps {
  id: number;
  creatorId: number;
}

const EditDeleteButtons: React.FC<EditDeleteButtonProps> = ({
  id,
  creatorId,
}) => {
  const [deleteProperty, { loading }] = useDeletePropertyMutation();
  const { data: meData } = useMeQuery();

  if (meData?.me?.id !== creatorId) {
    return null;
  }
  return (
    <Box my={2}>
      <Link href={`/property/edit/${id}`}>
        <Box as={Button} type="button" colorScheme="teal">
          <FaUserEdit fontSize="15px" />
        </Box>
      </Link>
      {loading ? (
        <Box ml={5} type="button" as={Button}>
          <Loader size="md" />
        </Box>
      ) : (
        <Box
          ml={5}
          as={Button}
          type="button"
          colorScheme="teal"
          onClick={() => {
            deleteProperty({
              variables: { id },
              update: (cache) => {
                // Property:23
                cache.evict({ id: `Property:${id}` });
              },
            });
          }}
        >
          <MdDelete fontSize="15px" />
        </Box>
      )}
    </Box>
  );
};
export default EditDeleteButtons;
