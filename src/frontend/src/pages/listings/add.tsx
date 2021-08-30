import { GetServerSideProps, NextApiRequest } from 'next';
import { loadIdToken } from 'src/auth/firebaseAdmin';
import Layout from 'src/components/layout';
import ListingForm from 'src/components/listingForm';

const AddListingPage = () => {
  return (
    <Layout>
      <ListingForm />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const uid = await loadIdToken(req as NextApiRequest);
  if (!uid) {
    res.setHeader('location', '/auth');
    res.statusCode = 302;
    res.end();
  }
  return { props: {} };
};

export default AddListingPage;
