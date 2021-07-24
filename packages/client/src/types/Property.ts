import { User } from './User';

export interface Property {
    id: number;
    title: string;
    creatorId: number;
    creator: User;
    propertyType: string;
    image: string;
    description: string;
    pricePerNight: number;
    address: string;
    amenitites: string[];
    createdAt: number;
    updatedAt: number;
}
