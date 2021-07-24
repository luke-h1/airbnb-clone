import { InputField } from '@src/components/InputField';
import { Formik, Form } from 'formik';
import router from 'next/router';
import React from 'react';

const EditPage = () => {
  return (
    <>
     <h1>Update Property</h1>
      <Formik
        initialValues={{
          title: data.property.title,
          propertyType: data.property.propertyType,
          image: data.property.image,
          pricePerNight: data.property.pricePerNight,
          description: data.property.description,
          address: data.property.address,
          amenities: data.property.amenities,
        }}
        onSubmit={async (values) => {
          // await updateProperty({
          //   options: {
          //     title: values.title,
          //     propertyType: values.propertyType,
          //     pricePerNight: values.pricePerNight,
          //     description: values.description,
          //     address: values.address,
          //     amenities: values.amenities,
          //   },
          //   image: values.image,
          //   id: intId,
          // });

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
              type="number"
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
                  type="button"
                  disabled={isSubmitting}
                >
                  Update Property
                </button>
              </a>
            </div>
          </Form>
        )}
      </Formik>
    </>

  );
};
export default EditPage;
