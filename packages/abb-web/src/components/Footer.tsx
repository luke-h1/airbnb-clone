import { ReactNode } from 'react';

import {
  Box,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Image from 'next/image';

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight="500" fontSize="lg" mb={2}>
      {children}
    </Text>
  );
};

const Footer = () => {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Container as={Stack} maxW="6xl" py={10}>
        <SimpleGrid
          templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 1fr 1fr' }}
          spacing={8}
        >
          <Stack spacing={6}>
            <Box>
              <Image src="/images/airbnb.svg" width={50} height={50} />
            </Box>
            <Text fontSize="sm">© 2021 Airbnb clone</Text>
          </Stack>
          <Stack align="flex-start">
            <ListHeader>About</ListHeader>
            <Link href="#">How Airbnb works</Link>
            <Link href="#">Airbnb Plus</Link>
            <Link href="#">Airbnb for Work</Link>
            <Link href="#">Founders' Letter</Link>
            <Link href="#">Newsroom</Link>
          </Stack>
          <Stack align="flex-start">
            <ListHeader>Community</ListHeader>
            <Link href="#">Diversity & Belonging</Link>
            <Link href="#">Airbnb Associates</Link>
            <Link href="#">Gift cards</Link>
            <Link href="#">Against Discrimination</Link>
            <Link href="#">Airbnb.org</Link>
          </Stack>
          <Stack align="flex-start">
            <ListHeader>Host</ListHeader>
            <Link href="#">Host your home</Link>
            <Link href="#">Responsible hosting</Link>
            <Link href="#">Resource Center</Link>
            <Link href="#">Host an Experience</Link>
            <Link href="#">Host an Experience</Link>
          </Stack>
          <Stack align="flex-start">
            <ListHeader>Follow Us</ListHeader>
            <Link href="#">Facebook</Link>
            <Link href="#">Twitter</Link>
            <Link href="#">Dribbble</Link>
            <Link href="#">Instagram</Link>
            <Link href="#">LinkedIn</Link>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
};
export default Footer;
