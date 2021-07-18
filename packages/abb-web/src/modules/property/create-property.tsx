import { InputField } from '@src/components/InputField';
import { useCreatePropertyMutation } from '@src/generated/graphql';
import { useIsAuth } from '@src/utils/useIsAuth';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import { toPropertyErrorMap } from '@src/utils/toErrorMap';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '@src/utils/createUrqlClient';

interface FormValues {
  title: string;
  propertyType: string;
  image: string;
  pricePerNight: number;
  description: string;
  address: string;
  amenities: string[];
}

const CreatePropertyPage = () => {
  useIsAuth();
  const router = useRouter();
  const [, createProperty] = useCreatePropertyMutation();

  return (
    <>
      <h1>Create Property</h1>
      <Formik<FormValues>
        initialValues={{
          title: '',
          propertyType: '',
          image: '',
          pricePerNight: 0,
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
              address: values.address,
              amenities: values.amenities,
            },
            image: values.image,
          });
          console.log(res.data);
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
                required
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
              <button type="submit" disabled={isSubmitting}>
                Create Property
              </button>
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: false })(
  CreatePropertyPage,
);
