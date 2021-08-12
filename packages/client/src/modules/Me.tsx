import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Link,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';
import { useMeQuery } from '@src/generated/graphql';
import { createUrqlClient } from '@src/utils/createUrqlClient';
import { withUrqlClient } from 'next-urql';
import Router from 'next/router';

const Me = () => {
  const [{ data }] = useMeQuery();
  if (!data?.me) {
    Router.replace('/login');
  }


  const handleDelete = async () => { 
    
   }

  return (
    <Center py={6}>
      <Box
        maxW="320px"
        w="full"
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow="2xl"
        rounded="lg"
        p={6}
        textAlign="center"
      >
        <Avatar
          size="xl"
          src={data?.me?.image}
          alt="Avatar Alt"
          mb={4}
          pos="relative"
          _after={{
            content: '""',
            w: 4,
            h: 4,
            bg: 'green.300',
            border: '2px solid white',
            rounded: 'full',
            pos: 'absolute',
            bottom: 0,
            right: 3,
          }}
        />
        <Heading fontSize="2xl" fontFamily="body">
          {data?.me?.fullName}
        </Heading>
        <Text fontWeight={600} color="gray.500" mb={4}>
          {data?.me?.email}
        </Text>
        <Stack mt={8} direction="row" spacing={4}>
          <Button
            flex={1}
            fontSize="sm"
            rounded="full"
            _focus={{
              bg: 'gray.200',
            }}
            onClick={handleDelete}
          >
            Delete account
          </Button>
          <Button
            flex={1}
            fontSize="sm"
            rounded="full"
            bg="blue.400"
            color="white"
            boxShadow="0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
            _hover={{
              bg: 'blue.500',
            }}
            _focus={{
              bg: 'blue.500',
            }}
          >
            Follow
          </Button>
        </Stack>
      </Box>
    </Center>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(Me);
