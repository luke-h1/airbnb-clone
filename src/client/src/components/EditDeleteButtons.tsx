import React from 'react';
import Link from 'next/link';
import { useDeletePropertyMutation, useMeQuery } from '@src/generated/graphql';
import { AiFillEdit, AiTwotoneDelete } from 'react-icons/ai';
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
    <div className="my-2 flex justify-center align-center items-baseline">
      <Link href={`/property/edit/${id}`}>
        <a className="mr-4">
          <AiFillEdit fontSize="23px" color="green" />
        </a>
      </Link>
      {loading ? (
        <div className="ml-5">
          <Loader />
        </div>
      ) : (
        <AiTwotoneDelete
          color="red"
          fontSize="23px"
          onClick={() => {
            deleteProperty({
              variables: { id },
              update: (cache) => {
                // Property:23
                cache.evict({ id: `Property:${id}` });
              },
            });
          }}
        />
      )}
    </div>
  );
};
export default EditDeleteButtons;
