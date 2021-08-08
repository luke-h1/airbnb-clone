import { User } from './User';

export interface Review {
  name: string;
  rating: number;
  comment: string;
  user: User;
}
