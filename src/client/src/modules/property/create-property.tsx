import { InputField } from '@src/components/InputField';
import { useCreatePropertyMutation } from '@src/generated/graphql';
import { useIsAuth } from '@src/utils/useIsAuth';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import { toPropertyErrorMap } from '@src/utils/toErrorMap';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '@src/utils/createUrqlClient';
import { Wrapper } from '@src/components/Wrapper';

interface FormValues {
  title: string;
  propertyType: string;
  image: string;
  pricePerNight: number;
  beds: number;
  baths: number;
  bedrooms: number;
  description: string;
  address: string;
  amenities: string[];
}

const CreatePropertyPage = () => {
  useIsAuth();
  const router = useRouter();
  const [, createProperty] = useCreatePropertyMutation();

  return (
    <Wrapper>
      <h1>Create Property</h1>
      <Formik<FormValues>
        initialValues={{
          title: '',
          propertyType: '',
          image: '',
          pricePerNight: 0,
          beds: 0,
          baths: 0,
          bedrooms: 0,
          description: '',
          address: '',
          amenities: [],
        }}
        onSubmit={async (values, { setErrors }) => {
          const res = await createProperty({
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
            image: values.image,
          });

          if (res.data?.createProperty.errors) {
            setErrors(toPropertyErrorMap(res.data.createProperty.errors));
          }
          router.push('/');
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <div>
            <Form>
              <InputField
                name="title"
                placeholder="title"
                label="title"
                type="text"
                data-testid="property-title"
              />
              <InputField
                name="propertyType"
                placeholder="Flat, House, Bungalow..."
                label="propertyType"
                type="text"
                data-testid="property-type"
              />
              <InputField
                textarea
                name="description"
                placeholder="Description of property"
                label="description"
                type="text"
                data-testid="property-description"
              />
              <input
                type="file"
                accept="image/*"
                onChange={({ target: { validity, files } }) => {
                  if (validity.valid && files) {
                    setFieldValue('image', files[0]);
                    // set 'file' of the form data as files[0]
                  }
                }}
                data-testid="property-image"
              />

              <InputField
                name="pricePerNight"
                placeholder="Price per night"
                label="pricePerNight"
                type="number"
                min="1"
                data-testid="property-price"
              />
              <InputField
                name="baths"
                placeholder="Number of baths"
                label="baths"
                type="number"
                min="1"
                data-testid="property-baths"
              />
              <InputField
                name="beds"
                placeholder="Number of beds"
                label="beds"
                type="number"
                min="1"
                data-testid="property-beds"
              />
              <InputField
                name="bedrooms"
                placeholder="Number of bedrooms"
                label="bedrooms"
                type="number"
                min="1"
                data-testid="property-bedrooms"
              />
              <InputField
                name="address"
                placeholder="address"
                label="address"
                type="text"
                data-testid="property-address"
              />

              <InputField
                name="amenities"
                placeholder="amenities"
                label="amenities"
                type="text"
                data-testid="property-amenities"
              />
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded"
                type="submit"
                disabled={isSubmitting}
              >
                Create
              </button>
            </Form>
          </div>
        )}
      </Formik>
    </Wrapper>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(
  CreatePropertyPage,
);
