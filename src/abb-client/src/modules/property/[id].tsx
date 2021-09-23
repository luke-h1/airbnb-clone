/* eslint-disable react/require-default-props */
import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { IoAnalyticsSharp } from 'react-icons/io5';
import { ReactElement } from 'react';
import { useRouter } from 'next/router';
import { useMeQuery } from '@src/generated/graphql';
import { useGetPropertyFromUrl } from '@src/utils/useGetPropertyFromUrl';
import { Loader } from '@src/components/Loader';
import NotFoundPage from '@src/modules/NotFoundPage';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '@src/utils/createUrqlClient';

interface FeatureProps {
  text: string;
  iconBg: string;
  icon?: ReactElement;
}

const Feature = ({ text, icon, iconBg }: FeatureProps) => {
  return (
    <Stack direction="row" align="center">
      <Flex
        w={8}
        h={8}
        align="center"
        justify="center"
        rounded="full"
        bg={iconBg}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};

const SinglePropertyPage = () => {
  const router = useRouter();
  const [{ data: meData }] = useMeQuery();
  const [{ data, fetching }] = useGetPropertyFromUrl();
  if (fetching) {
    return <Loader />;
  }

  if (meData?.me?.id !== data?.property.creator.id) {
    router.push('/');
  }

  if (!data?.property) {
    return <NotFoundPage />;
  }

  return (
    <Container maxW="5xl" py={12}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Stack spacing={4}>
          <Text
            textTransform="uppercase"
            color="blue.400"
            fontWeight={600}
            fontSize="sm"
            bg={useColorModeValue('blue.50', 'blue.900')}
            p={2}
            alignSelf="flex-start"
            rounded="md"
          >
            {data?.property.title}
          </Text>
          <Text as="p">{data?.property.description}</Text>
          <Text color="gray.500" fontSize="lg">
            £
            {data.property.pricePerNight}
            {' '}
            per night
          </Text>
          <Stack
            spacing={4}
            divider={(
              <StackDivider
                borderColor={useColorModeValue('gray.100', 'gray.700')}
              />
            )}
          >
            {data?.property.amenities.map((a) => (
              <Feature
                icon={
                  <Icon as={IoAnalyticsSharp} color="yellow.500" w={5} h={5} />
                }
                iconBg={useColorModeValue('yellow.100', 'yellow.900')}
                text={a}
              />
            ))}
          </Stack>
        </Stack>
        <Flex>
          <Image
            rounded="md"
            alt="feature image"
            src={data?.property.image}
            objectFit="cover"
          />
        </Flex>
      </SimpleGrid>
    </Container>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: false })(
  SinglePropertyPage,
);
