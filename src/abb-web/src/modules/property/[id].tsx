import React from 'react';
import { createUrqlClient } from '@src/utils/createUrqlClient';
import { useGetPropertyFromUrl } from '@src/utils/useGetPropertyFromUrl';
import { withUrqlClient } from 'next-urql';

const SingleProperty: React.FC<{}> = () => {
  const [{ data, error, fetching }] = useGetPropertyFromUrl();
  if (fetching) {
    return (
      <p>loading..</p>
    );
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  if (!data?.property) {
    return (
      <p>no property found with that id </p>
    );
  }

  return (
    <>
      <div>
        {JSON.stringify(data, null, 2)}
        Single Property
      </div>
    </>

  );
};
export default withUrqlClient(createUrqlClient, { ssr: false })(SingleProperty);
