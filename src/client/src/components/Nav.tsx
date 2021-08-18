import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useLogoutMutation, useMeQuery } from '@src/generated/graphql';
import { isServer } from '@src/hooks/isServer';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '@src/utils/createUrqlClient';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Nav = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });

  let Links: { name: string; href: string }[] = [];

  const handleLogout = async () => {
    await logout();
    router.reload();
  };

  if (fetching) {
    //   user is not logged in
    Links = [];
  }
  if (!data?.me) {
    Links = [
      {
        name: 'Login',
        href: '/login',
      },
      {
        name: 'Register',
        href: '/register',
      },
    ];
  } else {
    Links = [
      {
        name: 'Create Property',
        href: '/property/create-property',
      },
      {
        name: 'My Account',
        href: '/me',
      },
    ];
  }

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems="center">
            <Box>
              <Link href="/">
                <a>
                  <Image
                    boxSize="30px"
                    rounded="md"
                    objectFit="cover"
                    src="/images/airbnb.svg"
                  />
                </a>
              </Link>
            </Box>
            <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <Link href={link.href}>
                  <a>{link.name}</a>
                </Link>
              ))}
              {data?.me && (
                <Button colorScheme="blue" onClick={handleLogout}>
                  Logout
                </Button>
              )}
            </HStack>
          </HStack>
          <Flex alignItems="center">
            <Menu>
              <MenuButton
                as={Button}
                rounded="full"
                variant="link"
                cursor="pointer"
                minW={0}
              >
                {data?.me?.image ? (
                  <Avatar
                    size="sm"
                    src={data.me.image}
                    alt={`${data?.me.fullName}'s profile photo`}
                  />
                ) : (
                  <Avatar size="sm" src="/icons/account.svg" />
                )}
              </MenuButton>
              <MenuList>
                {Links
                  && Links.map((link) => (
                    <Link href={link.href}>
                      <MenuItem>{link.name}</MenuItem>
                    </Link>
                  ))}
                <MenuDivider />
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as="nav" spacing={4}>
              {Links
                && Links.map((link) => (
                  <Link href={link.href}>
                    <a>{link.name}</a>
                  </Link>
                ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: false })(Nav);
