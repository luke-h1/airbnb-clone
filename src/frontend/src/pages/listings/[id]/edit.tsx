import { GetServerSideProps, NextApiRequest } from 'next';
import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';
import { loadIdToken } from 'src/auth/firebaseAdmin';
import Layout from 'src/components/layout';
import { useAuth } from 'src/auth/useAuth';
import {
  EditListingQuery,
  EditListingQueryVariables,
} from 'src/generated/EditListingQuery';
import ListingForm from 'src/components/listingForm';

const EDIT_LISTING_QUERY = gql`
  query EditListingQuery($id: String!) {
    listing(id: $id) {
      id
      userId
      address
      image
      publicId
      bedrooms
      latitude
      longitude
    }
  }
`;

export default function EditHouse() {
  const {
    query: { id },
  } = useRouter();

  if (!id) return null;

  return <HouseData id={id as string} />;
}

function HouseData({ id }: { id: string }) {
  const { user } = useAuth();
  const { data, loading } = useQuery<
    EditListingQuery,
    EditListingQueryVariables
  >(EDIT_LISTING_QUERY, { variables: { id } });

  if (!user) return <Layout main={<div>Please login</div>} />;
  if (loading) return <Layout main={<div>Loading...</div>} />;
  if (data && !data.listing) return <Layout main={<div>Unable to load listing</div>} />;
  if (user.uid !== data?.listing?.userId) return <Layout main={<div>Forbidden</div>} />;

  return <Layout main={<ListingForm listing={data.listing} />} />;
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const uid = await loadIdToken(req as NextApiRequest);

  if (!uid) {
    res.setHeader('location', '/auth');
    res.statusCode = 302;
    res.end();
  }
  return {
    props: {},
  };
};
