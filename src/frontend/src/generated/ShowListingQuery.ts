/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ShowListingQuery
// ====================================================

export interface ShowListingQuery_listing_nearby {
  __typename: 'Listing';
  id: string;
  latitude: number;
  longitude: number;
}

export interface ShowListingQuery_listing {
  __typename: 'Listing';
  id: string;
  userId: string;
  address: string;
  publicId: string;
  bedrooms: number;
  propertyType: string;
  latitude: number;
  longitude: number;
  nearby: ShowListingQuery_listing_nearby[];
}

export interface ShowListingQuery {
  listing: ShowListingQuery_listing | null;
}

export interface ShowListingQueryVariables {
  id: string;
}
