import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useDebounce } from 'use-debounce';
import Layout from 'src/components/layout';
import Map from 'src/components/map';
import ListingList from 'src/components/listingList';
import { useLastData } from 'src/utils/useLastData';
import { useLocalState } from 'src/utils/useLocalState';

const LISTING_QUERY = gql`
  query ListingsQuery($bounds: BoundsInput!) {
      listings(bounds: $bounds) {
          id
          latitude
          longitude
          address
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

const Home = () => {
  const [highlighted, setHighlightedId] = useState<string | null>(null);
  const [dataBounds, setDataBounds] = useLocalState<string>('bounds', '[[0, 0], [0, 0]]');
  const [debouncedDataBounds] = useDebounce(dataBounds, 500);
};
export default Home;
