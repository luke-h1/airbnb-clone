import React from 'react';
import Link from 'next/link';
import { useDeletePropertyMutation, useMeQuery } from '@src/generated/graphql';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Flex, Text } from '@chakra-ui/react';

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
    <Flex
      flexDirection="row"
      justifyContent="space-around"
      alignItems="center"
      mb={3}
      mt={3}
    >
      <Link href={`/property/edit/${id}`}>
        <Text>
          <EditIcon fontSize="23px" color="green" />
        </Text>
      </Link>

      <DeleteIcon
        fontSize="23px"
        color="red"
        data-testid={`delete-property-${id}`}
        onClick={() => {
          deleteProperty({
            id,
          });
        }}
      />
    </Flex>
  );
};
export default EditDeleteButtons;
