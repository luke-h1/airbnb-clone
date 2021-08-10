import { InputField } from '@src/components/InputField';
import {
  useMeQuery,
  usePropertyQuery,
  useUpdatePropertyMutation,
} from '@src/generated/graphql';
import { useGetIntId } from '@src/utils/useGetIntId';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import { Loader } from '@src/components/Loader';
import { useIsAuth } from '@src/utils/useIsAuth';
import Link from 'next/link';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '@src/utils/createUrqlClient';
import { Wrapper } from '@src/components/Wrapper';
import { isServer } from '@src/utils/isServer';

const EditPropertyPage = () => {
  useIsAuth();

  const router = useRouter();
  const intId = useGetIntId();
  const [{ data: meData }] = useMeQuery({ pause: isServer() });
  const [, updateProperty] = useUpdatePropertyMutation();

  const [{ data, fetching }] = usePropertyQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });

  if (fetching) {
    return <Loader />;
  }

  if (!data?.property) {
    <>
      <p>no property found with that id</p>
      <Link href="/">
        <a>Go Home</a>
      </Link>
    </>;
  }
  if (!data) {
    return null;
  }
  if (meData?.me?.id !== data.property.creator.id) {
    router.push('/');
  }

  return (
    <Wrapper>
      <h1>Update Property</h1>
      <Formik
        initialValues={{
          title: data.property.title,
          propertyType: data.property.propertyType,
          image: data.property.image,
          pricePerNight: data.property.pricePerNight,
          beds: data.property.beds,
          baths: data.property.baths,
          bedrooms: data.property.bedrooms,
          description: data.property.description,
          address: data.property.address,
          amenities: data.property.amenities,
        }}
        onSubmit={async (values) => {
          await updateProperty({
            options: {
              title: values.title,
              propertyType: values.propertyType,
              pricePerNight: values.pricePerNight,
              description: values.description,
              beds: values.beds,
              baths: values.baths,
              bedrooms: values.bedrooms,
              address: values.address,
              amenities: values.amenities,
            },
            id: intId,
            image: values.image,
          });
          router.push(`/property/${intId}`);
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <InputField
              name="title"
              placeholder="title"
              label="title"
              type="text"
            />
            <InputField
              name="propertyType"
              placeholder="Flat, House, Bungalow..."
              label="propertyType"
              type="text"
            />
            <InputField
              name="description"
              placeholder="Description of property"
              label="description"
              type="text"
            />
            <br />
            <input
              style={{ marginBottom: '1rem' }}
              type="file"
              accept="image/*"
              onChange={({ target: { validity, files } }) => {
                if (validity.valid && files) {
                  setFieldValue('image', files[0]);
                  // set 'file' of the form data as files[0]
                }
              }}
            />

            <InputField
              name="pricePerNight"
              placeholder="Price per night"
              label="pricePerNight"
              type="number"
              min="1"
            />
            <InputField
              name="beds"
              placeholder="Number of beds"
              label="beds"
              type="number"
              min="1"
            />
            <InputField
              name="baths"
              placeholder="Number of baths"
              label="baths"
              type="number"
              min="1"
            />
            <InputField
              name="bedrooms"
              placeholder="Number of bedrooms"
              label="bedrooms"
              type="number"
              min="1"
            />
            <InputField
              name="address"
              placeholder="address"
              label="address"
              type="text"
            />
            <InputField
              name="amenities"
              placeholder="amenities"
              label="amenities"
              type="text"
            />

            <div className="flex flex-col align-center">
              <a>
                <button
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Update Property
                </button>
              </a>
            </div>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(
  EditPropertyPage,
);
