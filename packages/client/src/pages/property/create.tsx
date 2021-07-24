import { InputField } from '@src/components/InputField';
import { Formik, Form } from 'formik';
import React from 'react';

interface FormValues {
  title: string;
  propertyType: string;
  image: string;
  pricePerNight: number;
  description: string;
  address: string;
  amenities: string[];
}

const CreateProperty = () => {
  return (
    <>
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
          console.log(values)
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
export default CreateProperty;
