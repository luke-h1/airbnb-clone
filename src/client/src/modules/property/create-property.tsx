import { InputField } from '@src/components/InputField';
import { useCreatePropertyMutation } from '@src/generated/graphql';
import { useIsAuth } from '@src/utils/useIsAuth';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import { toPropertyErrorMap } from '@src/utils/toErrorMap';

interface FormValues {
  title: string;
  propertyType: string;
  image: string;
  pricePerNight: number;
  beds: number;
  bedrooms: number;
  description: string;
  address: string;
  amenities: string[];
}

const CreatePropertyPage = () => {
  useIsAuth();
  const router = useRouter();
  const [createProperty] = useCreatePropertyMutation();

  return (
    <>
      <h1>Create Property</h1>
      <Formik<FormValues>
        initialValues={{
          title: '',
          propertyType: '',
          image: '',
          pricePerNight: 0,
          beds: 0,
          bedrooms: 0,
          description: '',
          address: '',
          amenities: [],
        }}
        onSubmit={async (values, { setErrors }) => {
          const res = await createProperty({
            variables: {
              options: {
                title: values.title,
                propertyType: values.propertyType,
                pricePerNight: values.pricePerNight,
                description: values.description,
                beds: values.beds,
                bedrooms: values.bedrooms,
                address: values.address,
                amenities: values.amenities,
              },
              image: values.image,
            },
            update: (cache) => {
              cache.evict({ fieldName: 'properties:{}' });
            },
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
              <InputField
                name="image"
                placeholder="image"
                label="image"
                type="file"
                id="image"
                value={undefined}
                onChange={(e) => {
                  // @ts-ignore
                  setFieldValue('image', e.currentTarget.files[0]);
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
    </>
  );
};
export default CreatePropertyPage;