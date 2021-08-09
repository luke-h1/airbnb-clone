import { usePropertiesQuery } from '@src/generated/graphql';
import React, { useState } from 'react';
import Link from 'next/link';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '@src/utils/createUrqlClient';
import { isServer } from '@src/hooks/isServer';
import { Loader } from '@src/components/Loader';
import PropertyCard from '@src/components/PropertyCard';
import { Box, Button } from '@chakra-ui/react';
import Banner from '@src/components/Banner';

const IndexPage = () => {
  const [variables, setVariables] = useState({
    limit: 15,
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
    <>
      <div className="flex flex-col align-center items-center justify-center place-items-center">
        <Box textAlign="center" fontSize="xl" w="100%">
          <Box pt={10} pb={10}>
            <Banner />
          </Box>
        </Box>
        {!data && fetching ? (
          <Loader />
        ) : (
          <>
            {data?.properties.properties.map((p) => (!p ? null : (
            // @TODO: Luke - fix this type error
              <Box>
                <Link href={`/property/${p.id}`}>
                  {/* @ts-ignore */}
                  <PropertyCard property={p} />
                </Link>
                {data?.properties.hasMore ? (
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
                ) : null}
              </Box>
            )))}
          </>
        )}
      </div>
    </>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(IndexPage);
