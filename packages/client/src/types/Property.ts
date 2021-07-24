import { User } from './User';

export type Property = null | {
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

export type Properties = [] | {
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
