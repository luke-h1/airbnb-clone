import { usePropertiesQuery } from '@src/generated/graphql';
import React from 'react';
import Card from '@src/components/Card/Card';
import { Loader } from '@src/components/Loader';
import {
  Box, Flex, Button, GridItem, SimpleGrid,
} from '@chakra-ui/react';

const index: React.FC<{}> = () => {
  const {
    data, error, loading, fetchMore, variables,
  } = usePropertiesQuery({
    variables: {
      limit: 15,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });
  return (
    <>
      {error ? error.message : null}
      {!data && loading ? (
        <>
          <Loader />
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
                image={p.image && p.image}
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
                    fetchMore({
                      variables: {
                        limit: variables?.limit,
                        cursor:
                          data.properties.properties[
                            data.properties.properties.length - 1
                          ].createdAt,
                      },
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
export default index;
