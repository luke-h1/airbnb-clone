import { usePropertiesQuery } from '@src/generated/graphql';
import React, { useState } from 'react';
import Link from 'next/link';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '@src/utils/createUrqlClient';
import { Loader } from '@src/components/Loader';
import PropertyCard from '@src/components/PropertyCard';
import { Box, Button } from '@chakra-ui/react';

const IndexPage = () => {
  const [variables, setVariables] = useState({
    limit: 25,
    cursor: null as null | string,
  });

  const [{ data, error, fetching }] = usePropertiesQuery({
    variables,
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
          </>
        )}
      </div>
    </>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: false })(IndexPage);
