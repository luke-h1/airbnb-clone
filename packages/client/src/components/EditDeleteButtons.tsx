import React from 'react';
import Link from 'next/link';
import { useDeletePropertyMutation, useMeQuery } from '@src/generated/graphql';
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
    <div className="my-2 flex flex-col justify-left align-left items-baseline">
      <Link href={`/property/edit/${id}`}>
        <button
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-1 border-b-4 border-blue-700 hover:border-blue-500 rounded mb-3"
          type="button"
        >
          Edit property
        </button>
      </Link>
      {loading ? (
        <div className="ml-5">
          <Loader />
        </div>
      ) : (
        <button
          className="bg-red-500 hover:bg-red-400 text-white font-bold py-1 px-1 border-b-4 border-red-700 hover:border-blue-500 rounded"
          type="button"
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
          Delete property
        </button>
      )}
    </div>
  );
};
export default EditDeleteButtons;
