import React from 'react';
import Link from 'next/link';
import { useDeletePropertyMutation, useMeQuery } from '@src/generated/graphql';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Text } from '@chakra-ui/react';

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
    <Box>
      <Link href={`/property/edit/${id}`}>
        <Text mr={2}>
          <EditIcon fontSize="23px" color="green" />
        </Text>
      </Link>
      <DeleteIcon
        onClick={() => {
          deleteProperty({
            id,
          });
        }}
      />
    </Box>
  );
};
export default EditDeleteButtons;
