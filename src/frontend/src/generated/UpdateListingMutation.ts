/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ListingInput } from './globalTypes';

// ====================================================
// GraphQL mutation operation: UpdateListingMutation
// ====================================================

export interface UpdateListingMutation_updateListing {
  __typename: 'Listing';
  id: string;
  image: string;
  publicId: string;
  latitude: number;
  propertyType: string;
  longitude: number;
  bedrooms: number;
  address: string;
}

export interface UpdateListingMutation {
  updateListing: UpdateListingMutation_updateListing | null;
}

export interface UpdateListingMutationVariables {
  id: string;
  input: ListingInput;
}
