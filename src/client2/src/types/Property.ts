import { Review } from './Review';

export interface Property {
  _id: number;
  name: string;
  image: string;
  category: string;
  description: string;
  reviews: Review[];
  rating: number;
  numReviews: number;
  price: number;
  beds: number;
  bedrooms: number;
}
