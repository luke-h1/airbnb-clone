import { Property } from '@src/generated/graphql';
import React from 'react';
import { Box, Image, Badge } from '@chakra-ui/react';
import EditDeleteButtons from '@src/components/EditDeleteButtons';
import Link from 'next/link';
import LikeSection from './LikeSection';

interface PropertyProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyProps> = ({ property }) => {
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
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
          Posted By:
          <Box as="span" color="gray.600" fontSize="sm">
            {property.creator.fullName}
          </Box>
        </Box>
        <LikeSection property={property} />

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
