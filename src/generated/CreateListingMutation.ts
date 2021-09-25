/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ListingInput } from './globalTypes';

// ====================================================
// GraphQL mutation operation: CreateListingMutation
// ====================================================

export interface CreateListingMutation_createListing {
  __typename: 'Listing';
  id: string;
}

export interface CreateListingMutation {
  createListing: CreateListingMutation_createListing | null;
}

export interface CreateListingMutationVariables {
  input: ListingInput;
}
