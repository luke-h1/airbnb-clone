import React from 'react';
import Link from 'next/link';
import { useDeletePropertyMutation, useMeQuery } from '@src/generated/graphql';
import { AiFillEdit, AiTwotoneDelete } from 'react-icons/ai';

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
    <div className="my-2 flex justify-center align-center items-baseline">
      <Link href={`/property/edit/${id}`}>
        <a className="mr-4">
          <AiFillEdit fontSize="23px" color="green" />
        </a>
      </Link>
      <AiTwotoneDelete
        color="red"
        fontSize="23px"
        onClick={() => {
          deleteProperty({
            id,
          });
        }}
      />
    </div>
  );
};
export default EditDeleteButtons;
