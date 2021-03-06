import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { useMeQuery, useDeleteUserMutation } from '@src/generated/graphql';
import { createUrqlClient } from '@src/utils/createUrqlClient';
import { isServer } from '@src/utils/isServer';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Me = () => {
  const router = useRouter();
  const [{ data }] = useMeQuery({ pause: isServer() });
  const [, deleteUser] = useDeleteUserMutation();

  useEffect(() => {
    if (!data?.me) {
      router.push('/');
    }
  }, []);

  const handleDelete = async () => {
    await deleteUser({ id: data!.me!.id });
    router.push('/');
  };

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
        </Stack>
      </Box>
    </Center>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: false })(Me);
