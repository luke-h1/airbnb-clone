/* eslint-disable no-alert */
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from 'src/auth/useAuth';
import {
  DeleteListing,
  DeleteListingVariables,
} from 'src/generated/DeleteListing';

const DELETE_MUTATION = gql`
  mutation DeleteListing($id: String!) {
    deleteListing(id: $id)
  }
`;

interface IProps {
  listing: {
    id: string;
    userId: string;
  };
}

export default function HouseNav({ listing }: IProps) {
  const router = useRouter();
  const { user } = useAuth();
  const canManage = !!user && user.uid === listing.userId;

  const [deleteListing, { loading }] = useMutation<
    DeleteListing,
    DeleteListingVariables
  >(DELETE_MUTATION);

  return (
    <>
      <Link href="/">
        <a>map</a>
      </Link>
      {canManage && (
        <>
          {' | '}
          <Link href={`/listings/${listing.id}/edit`}>
            <a>Edit</a>
          </Link>
          {' | '}
          <button
            disabled={loading}
            type="button"
            onClick={async () => {
              // eslint-disable-next-line no-restricted-globals
              if (confirm('Are you sure?')) {
                await deleteListing({ variables: { id: listing.id } });
                router.push('/');
              }
            }}
          >
            Delete
          </button>
        </>
      )}
    </>
  );
}
