import { Property, usePropertiesQuery } from '@src/generated/graphql';
import React, { useState } from 'react';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '@src/utils/createUrqlClient';
import { Loader } from '@src/components/Loader';
import PropertyCard from '@src/components/PropertyCard';
import {
  Box, Button, Flex, Grid,
} from '@chakra-ui/react';
import { Wrapper } from '@src/components/Wrapper';
import { isServer } from '@src/utils/isServer';

const IndexPage = () => {
  const [variables, setVariables] = useState({
    limit: 25,
    cursor: null as null | string,
  });

  const [{ data, error, fetching }] = usePropertiesQuery({
    variables,
    pause: isServer(),
  });

  if (!fetching && !data && error) {
    return (
      <div>
        <h1>Query Failed</h1>
        <div>{error?.message}</div>
      </div>
    );
  }
  if (!fetching && !error && !data) {
    <p>no properties</p>;
  }
  return (
    <Wrapper>
      <Flex
        direction="column"
        alignItems="center"
        alignContent="center"
        justifyContent="center"
        placeItems="center"
      >
        {!data && fetching ? (
          <Loader />
        ) : (
          <Grid templateColumns="repeat(4, 1fr)" gap={4}>
            {data?.properties.properties.map((p) => (!p ? null : (
              <Box>
                <PropertyCard property={p as Property} />
                {data && data?.properties.hasMore ? (
                  <Box>
                    <Button
                      type="button"
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
                      More
                    </Button>
                  </Box>
                ) : null}
              </Box>
            )))}
          </Grid>
        )}
      </Flex>
    </Wrapper>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(IndexPage);
