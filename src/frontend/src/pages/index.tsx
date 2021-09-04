import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useDebounce } from 'use-debounce';
import ListingsList from 'src/components/listingList';
import { useLastData } from 'src/utils/useLastData';
import { useLocalState } from 'src/utils/useLocalState';
import dynamic from 'next/dynamic';
import Map from 'src/components/map';

import {
  ListingsQuery,
  ListingsQueryVariables,
} from 'src/generated/ListingsQuery';
import Spinner from 'src/components/spinner';

const LISTINGS_QUERY = gql`
  query ListingsQuery($bounds: BoundsInput!) {
    listings(bounds: $bounds) {
      id
      latitude
      longitude
      address
      propertyType
      publicId
      bedrooms
    }
  }
`;

type BoundsArray = [[number, number], [number, number]];

const parseBounds = (boundsString: string) => {
  const bounds = JSON.parse(boundsString) as BoundsArray;
  return {
    sw: {
      latitude: bounds[0][1],
      longitude: bounds[0][0],
    },
    ne: {
      latitude: bounds[1][1],
      longitude: bounds[1][0],
    },
  };
};

const IndexPage = () => {
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [dataBounds, setDataBounds] = useLocalState<string>(
    'bounds',
    '[[0, 0], [0, 0]]',
  );

  const [deboundedDataBounds] = useDebounce(dataBounds, 300);
  const { data, error, loading } = useQuery<
    ListingsQuery,
    ListingsQueryVariables
  >(LISTINGS_QUERY, {
    variables: { bounds: parseBounds(deboundedDataBounds) },
  });

  const lastData = useLastData(data);

  if (error) {
    return (
      <div>
        Error loading listings
        {' '}
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex">
      <div
        className="w-1/2 pb-4"
        style={{ maxHeight: 'calc(100vh) - 64px', overflowX: 'scroll' }}
      >
        <ListingsList
          listings={lastData ? lastData.listings : []}
          setHighlightedId={setHighlightedId}
        />
      </div>
      <div className="w-1/2">
        <Map
          setDataBounds={setDataBounds}
          listings={lastData ? lastData.listings : []}
          highlightedId={highlightedId}
        />
      </div>
    </div>
  );
};
export default IndexPage;
