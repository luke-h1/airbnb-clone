import { usePropertiesQuery } from '@src/generated/graphql';
import { createUrqlClient } from '@src/utils/createUrqlClient';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import Card from '@src/components/Card';

interface indexProps {}

const index: React.FC<indexProps> = () => {
  const [{ data, error, fetching }] = usePropertiesQuery();
  return (
    <>
      {error && <h1>error</h1>}

      {!data && fetching ? (
        <p>loading...</p>
      ) : (
        <>
          {data?.properties.map((p) =>
            !p ? null : (
              <Card
                key={p.id}
                id={p.id}
                title={p.title}
                propertyType={p.propertyType}
                mainImage={p.mainImage}
                amenities={p.amenities}
                propertyCreator={p.propertyCreator}
              />
            )
          )}
        </>
      )}
    </>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: false })(index);
