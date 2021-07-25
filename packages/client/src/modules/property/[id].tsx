import React, { useEffect } from 'react';
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

  if (!data?.property) {
    router.push('/');
  }

  useEffect(() => {
    if (meData?.me?.id !== data?.property.creator.id) {
      router.push('/');
    }
  }, []);
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
          <img
            className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
            alt="hero"
            src={data?.property.image}
          />
          <div className="text-center lg:w-2/3 w-full">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              {data?.property.title}
            </h1>
            <p className="mb-8 leading-relaxed">{data?.property.description}</p>
          </div>
        </div>
      </section>
    </>
  );
};
export default SingleProperty;
