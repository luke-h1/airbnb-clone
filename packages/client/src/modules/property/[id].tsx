import React from 'react';
import { useGetPropertyFromUrl } from '@src/utils/useGetPropertyFromUrl';
import { Loader } from '@src/components/Loader';
import { useMeQuery } from '@src/generated/graphql';
import { useRouter } from 'next/router';

const SingleProperty: React.FC<{}> = () => {
  const router = useRouter();
  const { data: meData } = useMeQuery();
  const { data, error, loading } = useGetPropertyFromUrl();
  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <p className="text-4xl">{error.message}</p>;
  }

  if (meData?.me?.id !== data?.property.creator.id) {
    router.push('/');
  }

  return (
    <>
      <div className="flex flex-col align-center items-center justify-center">
        <img src={data?.property.image} className="max-w-md" alt="hello" />
        <div className="max-w-3xl mt-5">
          <ul className="mt-5">
            <li className="mb-2 text-2xl">Address:{data?.property.address}</li>
            <li className="mb-2 text-2xl">
              Amenities: {data?.property.amenities}
            </li>
            <li className="mb-2 text-2xl">
              Bedrooms: {data?.property.bedrooms}
            </li>
            <li className="mb-2 text-2xl">Beds: {data?.property.beds}</li>
            <li className="mb-2 text-2xl">
              Price per night: {data?.property.pricePerNight}
            </li>
            <li className="mb-2 text-2xl">
              Created By: {data?.property.creator.fullName}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default SingleProperty;
