/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: EditListingQuery
// ====================================================

export interface EditListingQuery_listing {
  __typename: 'Listing';
  id: string;
  userId: string;
  address: string;
  image: string;
  propertyType: string;
  publicId: string;
  bedrooms: number;
  latitude: number;
  longitude: number;
}

export interface EditListingQuery {
  listing: EditListingQuery_listing | null;
}

export interface EditListingQueryVariables {
  id: string;
}
