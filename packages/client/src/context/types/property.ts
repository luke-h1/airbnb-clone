export interface createPropertyOpts {
  title: string;
  image: string;
  propertyType: string;
  description: string;
  pricePerNight: number;
  address: string;
  amenities: string[];
}

export interface updatePropertyOpts {
  title: string;
  image: string;
  propertyType: string;
  description: string;
  pricePerNight: number;
  address: string;
  amenities: string[];
}

export interface getPropertyOpts {
    id: number;
}

export interface deletePropertyOpts {
    id: number;
}
