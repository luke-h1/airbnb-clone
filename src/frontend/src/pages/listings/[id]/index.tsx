import { Image } from 'cloudinary-react';
import { useQuery, gql } from '@apollo/client';
import Layout from 'src/components/layout';
import ListingNav from 'src/components/listingNav';
import SingleMap from 'src/components/singleMap';
import { useRouter } from 'next/router';
import {
  ShowListingQuery,
  ShowListingQueryVariables,
} from 'src/generated/ShowListingQuery';

const SHOW_LISTING_QUERY = gql`
  query ShowListingQuery($id: String!) {
    listing(id: $id) {
      id
      userId
      address
      publicId
      bedrooms
      propertyType
      latitude
      longitude
      nearby {
        id
        latitude
        longitude
      }
    }
  }
`;

const listingPage = () => {
  const {
    query: { id },
  } = useRouter(); // get int from URL
  if (!id) return null; // not initialized
  // at this point id is defined
  return <ListingData id={id as string} />;
};

function ListingData({ id }: { id: string }) {
  const { data, loading } = useQuery<
    ShowListingQuery,
    ShowListingQueryVariables
  >(SHOW_LISTING_QUERY, { variables: { id } });
  if (loading || !data) return <Layout main={<div>loading...</div>} />;
  if (!data.listing) {
    return (
      <Layout
        main={(
          <div>
            Unable to load listing
            {id}
          </div>
        )}
      />
    );
  }

  const { listing } = data;
  return (
    <Layout
      main={(
        <div className="sm:block md:flex">
          <div className="sm:w-full md:w-1/2 p-4">
            <ListingNav listing={listing} />
            <h1 className="text-3xl my-2">{listing.address}</h1>
            <Image
              className="pb-2"
              cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
              publicId={listing.publicId}
              alt={listing.address}
              secure
              dpr="auto" // pixel depth
              quality="auto"
              width={900}
              height={Math.floor(9 / 16) * 900} // 16:9
            />
            <p>
              {listing.bedrooms}
              {' '}
              bedroom listing
            </p>
            <p>
              Property Type:
              {listing.propertyType}
            </p>
          </div>
          <div className="sm:w-full md:w-1/2">
            <SingleMap listing={listing} nearby={listing.nearby} />
          </div>
        </div>
      )}
    />
  );
}
export default listingPage;
