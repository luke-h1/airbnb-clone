import { usePropertiesQuery } from '@src/generated/graphql';
import React, { useState } from 'react';
import Link from 'next/link';
import EditDeleteButtons from '@src/components/EditDeleteButtons';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '@src/utils/createUrqlClient';
import { isServer } from '@src/hooks/isServer';
import { Loader } from '@src/components/Loader';

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
    <div className="flex flex-col align-center items-center justify-center place-items-center">
      {!data && fetching ? (
        <Loader />
      ) : (
        <>
          {data?.properties.properties.map((p) => (!p ? null : (
            <Link href={`/property/${p.id}`}>
              <a>
                <div className="rounded overflow-hidden shadow-lg mb-4">
                  <img className="w-full" src={p.image} alt={p.title} />
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{p.title}</div>
                    <p className="text-gray-700 text-base">{p.description}</p>
                  </div>
                  <div className="px-6 pt-4 pb-2">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      #{p.amenities}
                    </span>
                    <EditDeleteButtons id={p.id} creatorId={p.creator.id} />
                  </div>
                </div>
                <div>
                  {data?.properties.hasMore ? (
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-6 rounded"
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
                      Load More properties
                    </button>
                  ) : null}
                </div>
              </a>
            </Link>
          )))}
        </>
      )}
    </div>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: false })(IndexPage);
