/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface BoundsInput {
  ne: CoordiantesInput;
  sw: CoordiantesInput;
}

export interface CoordiantesInput {
  latitude: number;
  longitude: number;
}

export interface ListingInput {
  address: string;
  bedrooms: number;
  coordinates: CoordiantesInput;
  image: string;
  propertyType: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
