import { usePropertiesQuery } from '@src/generated/graphql';
import { createUrqlClient } from '@src/utils/createUrqlClient';
import { withUrqlClient } from 'next-urql';
import React, { useState } from 'react';
import Card from '@src/components/Card/Card';
import { Loader } from '@src/components/Loader';
import {
  Box, Flex, Button, GridItem, SimpleGrid,
} from '@chakra-ui/react';

const index: React.FC<{}> = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  });

  const [{ data, error, fetching }] = usePropertiesQuery({ variables });
  return (
    <>
      {error ? error.message : null}
      {!data && fetching ? (
        <>
          <Loader size="xl" />
        </>
      ) : (
        <SimpleGrid minChildWidth="120px" spacing="40px">
          <Box minW="840px">
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
          </Box>
          <></>
          <GridItem colSpan={1} colStart={2}>
            <Box minW="840px" />
          </GridItem>
        </SimpleGrid>
      )}
    </>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: false })(index);
