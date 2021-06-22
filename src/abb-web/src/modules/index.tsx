import { usePropertiesQuery } from '@src/generated/graphql';
import { createUrqlClient } from '@src/utils/createUrqlClient';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import Card from '@src/components/Card';
import { Wrapper } from '@src/components/Wrapper';
// import dynamic from 'next/dynamic';

// const MapBlockInternal = dynamic(() => import('@src/components/Map'), {
//   ssr: false,
// });

const index: React.FC<{}> = () => {
  const [{ data, error, fetching }] = usePropertiesQuery();
  return (
    <Wrapper>
      {error && <h1>error</h1>}

      {!data && fetching ? (
        <p>loading...</p>
      ) : (
        <>
          {data?.properties.map((p) => (!p ? null : (
            <Card
              key={p.id}
              id={p.id}
              title={p.title}
              propertyType={p.propertyType}
              mainImage={p.mainImage}
              amenities={p.amenities}
              propertyCreator={p.propertyCreator}
            />
          )))}
        </>
      )}
    </Wrapper>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: false })(index);
