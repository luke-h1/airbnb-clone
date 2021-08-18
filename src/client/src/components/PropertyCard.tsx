import { Scalars, User } from '@src/generated/graphql';
import React from 'react';
import {
  Box, Image, Badge, Avatar, Text,
} from '@chakra-ui/react';
import EditDeleteButtons from '@src/components/EditDeleteButtons';
import Link from 'next/link';

interface PropertyProps {
  property: {
    __typename?: 'Property' | undefined;
    id: Scalars['Int'];
    title: Scalars['String'];
    creatorId: Scalars['Int'];
    propertyType: Scalars['String'];
    image: Scalars['String'];
    beds: Scalars['Int'];
    baths: Scalars['Int'];
    bedrooms: Scalars['Int'];
    description: Scalars['String'];
    pricePerNight: Scalars['Int'];
    address: Scalars['String'];
    amenities: Array<Scalars['String']>;
    createdAt: Scalars['String'];
    updatedAt: Scalars['String'];
    creator: User;
    descriptionSnippet: Scalars['String'];
  };
}

const PropertyCard: React.FC<PropertyProps> = ({ property }) => {
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      cursor="pointer"
    >
      <Link href={`/property/${property.id}`}>
        <Image src={property.image} alt={property.title} />
      </Link>
      <Box p="6">
        <Box d="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            New
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {property.beds} beds &bull; {property.baths} baths
          </Box>
        </Box>
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {property.title}
        </Box>
        <EditDeleteButtons id={property.id} creatorId={property.creator.id} />
        <Box>
          £{property.pricePerNight}
          <Box as="span" color="gray.600" fontSize="sm">
            / wk
          </Box>
        </Box>
        <Box>
          <hr />
          <Text mr={2} as="p">
            Posted By: {property.creator.fullName}
          </Text>
          <Box m={0}>
            <Avatar src={property.creator.image} />
          </Box>
        </Box>
        {/* <Box d="flex" mt="2" alignItems="center">
          {Array(5)
            .fill('')
            .map((_, i) => (
              <StarIcon
                key={i}
                color={i < property.rating ? 'teal.500' : 'gray.300'}
              />
            ))}
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            {property.reviewCount} reviews
          </Box>
        </Box> */}
      </Box>
    </Box>
  );
};
export default PropertyCard;
