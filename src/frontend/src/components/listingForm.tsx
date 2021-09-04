/* eslint-disable */
import Link from 'next/link';
import { useState, useEffect, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import { Image } from 'cloudinary-react';

import { CreateSignatureMutation } from 'src/generated/CreateSignatureMutation';
import { SearchBox } from './searchBox';
import {
  CreateListingMutation,
  CreateListingMutationVariables,
} from 'src/generated/CreateListingMutation';
import {
  UpdateListingMutation,
  UpdateListingMutationVariables,
} from 'src/generated/UpdateListingMutation';

const SIGNATURE_MUTATION = gql`
  mutation CreateSignatureMutation {
    createImageSignature {
      signature
      timestamp
    }
  }
`;

const CREATE_LISTING_MUTATION = gql`
  mutation CreateListingMutation($input: ListingInput!) {
    createListing(input: $input) {
      id
    }
  }
`;

const UPDATE_LISTING_MUTATION = gql`
  mutation UpdateListingMutation($id: String!, $input: ListingInput!) {
    updateListing(id: $id, input: $input) {
      id
      image
      publicId
      latitude
      propertyType
      longitude
      bedrooms
      address
    }
  }
`;

interface IUploadImageResponse {
  secure_url: string;
}

async function uploadImage(
  image: File,
  signature: string,
  timestamp: number
): Promise<IUploadImageResponse> {
  const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
  const formData = new FormData();
  formData.append('file', image);
  formData.append('signature', signature);
  formData.append('timestamp', timestamp.toString());
  formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_KEY!);

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });
  return response.json();
}
interface IFormData {
  address: string;
  latitude: number;
  longitude: number;
  propertyType: string;
  bedrooms: string;
  image: FileList;
}

interface IListing {
  id: string;
  address: string;
  latitude: number;
  longitude: number;
  bedrooms: number;
  propertyType: string;
  image: string;
  publicId: string;
}

interface IProps {
  listing?: IListing;
}

export default function ListingForm({ listing }: IProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [select, setSelect] = useState<string>('');
  const { register, handleSubmit, setValue, errors, watch } =
    useForm<IFormData>({
      defaultValues: listing
        ? {
            address: listing.address,
            latitude: listing.latitude,
            longitude: listing.longitude,
            bedrooms: listing.bedrooms.toString(),
            propertyType: listing.propertyType,
          }
        : {},
    });

  const address = watch('address');
  const [createSignature] =
    useMutation<CreateSignatureMutation>(SIGNATURE_MUTATION);

  const [createListing] = useMutation<
    CreateListingMutation,
    CreateListingMutationVariables
  >(CREATE_LISTING_MUTATION);

  const [updateListing] = useMutation<
    UpdateListingMutation,
    UpdateListingMutationVariables
  >(UPDATE_LISTING_MUTATION);

  useEffect(() => {
    register({ name: 'address' }, { required: 'Please enter your address' });
    register({ name: 'latitude' }, { required: true, min: -90, max: 90 });
    register({ name: 'longitude' }, { required: true, min: -180, max: 180 });
  }, [register]);

  const handleCreate = async (data: IFormData) => {
    const { data: signatureData } = await createSignature();
    if (signatureData) {
      const { signature, timestamp } = signatureData.createImageSignature;
      const imageData = await uploadImage(data.image[0], signature, timestamp);
      const { data: listingData } = await createListing({
        variables: {
          input: {
            address: data.address,
            image: imageData.secure_url,
            propertyType: data.propertyType,
            coordinates: {
              latitude: data.latitude,
              longitude: data.longitude,
            },
            bedrooms: parseInt(data.bedrooms, 10),
          },
        },
      });
      if (listingData?.createListing) {
        router.push(`/listings/${listingData.createListing.id}`);
      }
    }
  };

  const handleUpdate = async (currentListing: IListing, data: IFormData) => {
    let { image } = currentListing; // secure URL

    // user wants to update image
    if (data.image[0]) {
      const { data: signatureData } = await createSignature();
      if (signatureData) {
        const { signature, timestamp } = signatureData.createImageSignature;
        const imageData = await uploadImage(
          data.image[0],
          signature,
          timestamp
        );
        image = imageData.secure_url;
      }
    }

    const { data: listingData } = await updateListing({
      variables: {
        id: currentListing.id,
        input: {
          propertyType: data.propertyType,
          address: data.address,
          image,
          coordinates: {
            latitude: data.latitude,
            longitude: data.longitude,
          },
          bedrooms: parseInt(data.bedrooms, 10),
        },
      },
    });
    if (listingData?.updateListing) {
      router.push(`/listings/${currentListing.id}`);
    }
  };

  const onSubmit = (data: IFormData) => {
    setSubmitting(true);
    if (listing) {
      // we're updating a listing
      handleUpdate(listing, data);
    } else {
      // we're creating a listing
      handleCreate(data);
    }
  };

  return (
    <form className="mx-auto max-w-xl py-4" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-xl">
        {listing ? `Editing ${listing.address}` : 'Add a new listing'}
      </h1>
      <div className="mt-4">
        <label htmlFor="search" className="block">
          Search for your address
        </label>
        <SearchBox
          onSelectAddress={(address, latitude, longitude) => {
            setValue('address', address);
            setValue('latitude', latitude);
            setValue('longitude', longitude);
          }}
          defaultValue={listing ? listing.address : ''}
        />
        {errors.address && <p>{errors.address.message}</p>}
      </div>
      {address && (
        <>
          <div className="mt-4">
            <label
              htmlFor="image"
              className="p-4 border-dashed border-4 border-gray-400 block cursor-pointer"
            >
              Click to add image (16:9)
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              ref={register({
                validate: (fileList: FileList) => {
                  if (listing || fileList.length === 1) return true;
                  return 'Please upload one image';
                },
              })}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (e?.target?.files?.[0]) {
                  const file = e.target.files[0];
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setPreviewImage(reader.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            {previewImage ? (
              <img
                src={previewImage}
                className="mt-4 object-cover"
                style={{ width: '576px', height: `${(9 / 16) * 576}px` }}
              />
            ) : listing ? (
              <Image
                className="mt-4"
                cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
                publicId={listing.publicId}
                alt={listing.address}
                secure
                dpr="auto"
                quality="auto"
                width={576}
                height={Math.floor((9 / 16) * 576)}
                crop="fill"
                gravity="auto"
              />
            ) : null}
            {errors.image && <p>{errors.image.message}</p>}
          </div>
          <div className="mt-4">
            <label htmlFor="bedrooms" className="block">
              Beds
            </label>
            <input
              id="bedrooms"
              name="bedrooms"
              type="number"
              className="p-2"
              ref={register({
                required: 'Please enter the number of bedrooms',
                max: { value: 10, message: 'too many beds' },
                min: { value: 1, message: 'Must have at least 1 bedroom' },
              })}
            />
            {errors.bedrooms && <p>{errors.bedrooms.message}</p>}
          </div>
          <div className="mt-4 mb-4">
            <select
              id="propertyType"
              name="propertyType"
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setSelect(e.target.value)
              }
              value={select}
              className="select-menu"
              ref={register({
                required: 'Please enter the property type',
              })}
            >
              {errors.propertyType && <p>{errors.propertyType}</p>}
              <option value="0" disabled className="text-black">
                Select property type:
              </option>
              <option value="Flat">Flat</option>
              <option value="House">House</option>
              <option value="Bungalow">Bungalow</option>
            </select>
          </div>
          <div className="mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"
              type="submit"
              disabled={submitting}
            >
              Save
            </button>{' '}
            <Link href={listing ? `/listings/${listing.id}` : '/'}>
              <a>Cancel</a>
            </Link>
          </div>
        </>
      )}
    </form>
  );
}
