import { usePropertiesQuery } from '@src/generated/graphql';
import { createUrqlClient } from '@src/utils/createUrqlClient';
import { withUrqlClient } from 'next-urql';
import React, { useState } from 'react';
import Card from '@src/components/Card';
import styled from '@emotion/styled';
import { Loader } from '@src/components/Loader';
import { Box, Flex, Button } from '@chakra-ui/react';

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
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  });

  const [{ data, error, fetching }] = usePropertiesQuery({ variables });
  return (
    <IndexWrapper>
      {error ? error.message : null}

      {!data && fetching ? (
        <>
          <Loader size="xl" />
        </>
      ) : (
        <>
          {data?.properties.properties.map((p) => (!p ? null : (
            <Card
              key={p.id}
              id={p.id}
              title={p.title}
              propertyType={p.propertyType}
              mainImage={p.mainImage}
              amenities={p.amenities}
              creator={p.creator}
              creatorId={p.creator.id}
              pricePerNight={p.pricePerNight}
            />
          )))}
          {data?.properties.hasMore ? (
            <Flex direction="column" justify="left" alignItems="center">
              <Box
                as={Button}
                type="submit"
                colorScheme="teal"
                onClick={() => {
                  setVariables({
                    limit: variables.limit,
                    cursor:
                      data.properties.properties[
                        data.properties.properties.length - 1
                      ].createdAt,
                  });
                }}
              >
                Load More
              </Box>
            </Flex>
          ) : (
            ''
          )}
        </>
      )}
    </IndexWrapper>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(index);
