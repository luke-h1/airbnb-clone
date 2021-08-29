/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BoundsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: ListingsQuery
// ====================================================

export interface ListingsQuery_listings {
  __typename: "Listing";
  id: string;
  latitude: number;
  longitude: number;
  address: string;
  publicId: string;
  bedrooms: number;
}

export interface ListingsQuery {
  listings: ListingsQuery_listings[];
}

export interface ListingsQueryVariables {
  bounds: BoundsInput;
}
