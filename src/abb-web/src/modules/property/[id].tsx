/* eslint-disable prefer-spread */
import React from 'react';
import { createUrqlClient } from '@src/utils/createUrqlClient';
import { useGetPropertyFromUrl } from '@src/utils/useGetPropertyFromUrl';
import { withUrqlClient } from 'next-urql';
import {
  Box,
  Stack,
  Heading,
  SimpleGrid,
  HStack,
  VStack,
  Text,
  Icon,
  Container,
  Flex,
  Image,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

const SingleProperty: React.FC<{}> = () => {
  const [{ data, error, fetching }] = useGetPropertyFromUrl();
  if (fetching) {
    return <p>loading..</p>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  if (!data?.property) {
    return <p>no property found with that id </p>;
  }

  return (
    <>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={0} mb={10}>
        <Flex bg="brand.400">
          <Image
            src={data.property.mainImage}
            alt="3 women looking at a laptop"
            fit="cover"
            w="full"
            h={{ base: 64, md: 'full' }}
            loading="lazy"
          />
        </Flex>
        <Flex
          direction="column"
          alignItems="start"
          justifyContent="center"
          px={{ base: 4, md: 8, lg: 20 }}
          py={24}
          zIndex={3}
        >
          <Text
            as="span"
            fontSize="lg"
            textTransform="uppercase"
            fontWeight="extrabold"
            mb={2}
          >
            {data.property.title} Hosted by {data.property.creator.fullName}{' '}
          </Text>
          <Text
            as="h1"
            mb={4}
            fontSize={{ base: '4xl', md: '4xl', lg: '5xl' }}
            fontWeight="bold"
            lineHeight="shorter"
            textShadow="2px 0 currentcolor"
          >
            Property description goes here
          </Text>
          <Text
            as="p"
            pr={{ base: 0, lg: 16 }}
            mb={4}
            fontSize="lg"
            letterSpacing="wider"
          >
            Take a look at the amenities below to see what's up for grabs
          </Text>
        </Flex>
      </SimpleGrid>
      {/* Amenities section */}
      <Box p={4} mb={20}>
        <Stack spacing={4} as={Container} maxW="3xl" textAlign="center">
          <Heading fontSize="3xl">Amenitites</Heading>
          <Text color="gray.600" fontSize="xl">
            From wifi to cleaning supplies, here’s what this property has
          </Text>
        </Stack>

        <Container maxW="6xl" mt={10}>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
            {data.property.amenities
              && data.property.amenities.map((p) => (
                <HStack align="top">
                  <Box color="green.400" px={2}>
                    <Icon as={CheckIcon} />
                  </Box>
                  <VStack align="start">
                    <Text fontWeight={600}>{p}</Text>
                  </VStack>
                </HStack>
              ))}
          </SimpleGrid>
        </Container>
      </Box>
      {/* Reviews */}
      <SimpleGrid columns={2} spacingX="40px" spacingY="20px">
        {data.property.reviews
          && data.property.reviews.map((r) => (
            <Flex p={50} w="full" alignItems="center" justifyContent="center">
              <Box w="sm" mx="auto" shadow="lg" rounded="lg" overflow="hidden">
                <Image
                  w="full"
                  h={56}
                  fit="cover"
                  objectPosition="center"
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                  alt="avatar"
                />

                <Flex alignItems="center" px={6} py={3} bg="gray.900">
                  <Text
                    as="h1"
                    mx={3}
                    color="white"
                    fontWeight="bold"
                    fontSize="lg"
                  >
                    {r.title}
                  </Text>
                </Flex>

                <Box py={4} px={6}>
                  <Text as="h1" fontSize="xl" fontWeight="bold">
                    Property review by, {r.user.fullName}
                  </Text>

                  <Text as="p" py={2}>
                    {r.body}
                  </Text>
                </Box>
              </Box>
            </Flex>
          ))}
      </SimpleGrid>
    </>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: false })(SingleProperty);
