import { usePropertiesQuery } from '@src/generated/graphql';
import { createUrqlClient } from '@src/utils/createUrqlClient';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import Card from '@src/components/Card';
import styled from '@emotion/styled';

// import dynamic from 'next/dynamic';

// const MapBlockInternal = dynamic(() => import('@src/components/Map'), {
//   ssr: false,
// });

const IndexWrapper = styled.div`
  /* position: relative; */
  padding-top: 80px;
  min-height: calc(100vh - 80px);
  width: 840px;
  padding: 60px 24px 0;
  h1 {
    font-size: 34px;
    margin-top: 18px;
  }
`;

const index: React.FC<{}> = () => {
  const [{ data, error, fetching }] = usePropertiesQuery();
  return (
    <IndexWrapper>
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
              pricePerNight={p.pricePerNight}
            />
          )))}
        </>
      )}
    </IndexWrapper>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: false })(index);
