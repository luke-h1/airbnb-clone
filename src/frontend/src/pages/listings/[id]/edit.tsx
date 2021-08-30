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
      propertyType
      publicId
      bedrooms
      latitude
      longitude
    }
  }
`;

const EditListingPage = () => {
  const {
    query: { id },
  } = useRouter();

  if (!id) return null;

  return <ListingData id={id as string} />;
};

function ListingData({ id }: { id: string }) {
  const { user } = useAuth();
  const { data, loading } = useQuery<
    EditListingQuery,
    EditListingQueryVariables
  >(EDIT_LISTING_QUERY, { variables: { id } });

  if (!user) {
    return (
      <Layout>
        {' '}
        <div>Please login</div>
      </Layout>
    );
  }
  if (loading) {
    return (
      <Layout>
        {' '}
        <div>Loading...</div>
        {' '}
      </Layout>
    );
  }
  if (data && !data.listing) {
    return (
      <Layout>
        {' '}
        <div>Unable to load listing</div>
        {' '}
      </Layout>
    );
  }
  if (user.uid !== data?.listing?.userId) {
    return (
      <Layout>
        {' '}
        <div>Forbidden</div>
        {' '}
      </Layout>
    );
  }

  return (
    <Layout>
      <ListingForm listing={data.listing} />
      {' '}
    </Layout>
  );
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
export default EditListingPage;
