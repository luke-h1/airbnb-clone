import FirebaseAuth from 'src/components/firebaseAuth';
import { GetServerSideProps, NextApiRequest } from 'next';
import { loadIdToken } from 'src/auth/firebaseAdmin';

const Auth = () => {
  return <FirebaseAuth />;
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const uid = await loadIdToken(req as NextApiRequest);

  if (uid) {
    res.setHeader('location', '/');
    res.statusCode = 302;
    res.end();
  }

  console.log({ uid });
  return { props: {} };
};
export default Auth;
