import { usePropertiesQuery } from '@src/generated/graphql';
import React from 'react';
import Card from '@src/components/Card/Card';

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
    <div>
      {error ? <p className="text-4xl">{error.message}</p> : null}
      {!data && loading && (
        <p className="text-3xl text-center">No Properties available</p>
      )}
      <div>
        {data?.properties.properties.map((p) => (!p ? (
          <p className="text-4xl">No properties</p>
        ) : (
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
        <div>
          {data?.properties.hasMore ? (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
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
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default index;
