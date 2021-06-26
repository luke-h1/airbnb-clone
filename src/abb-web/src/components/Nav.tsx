import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '@src/utils/createUrqlClient';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useLogoutMutation, useMeQuery } from '@src/generated/graphql';
import { isServer } from '@src/utils/isServer';
import Image from 'next/image';
import styled from '@emotion/styled';
import { Loader } from './Loader';

const StyledLink = styled(Link)`
  margin-right: 15px;
  font-size: 16px;
`;

const NavLink = ({ children, href }: { children: ReactNode; href: string }) => (
  <Link
    as={NextLink}
    px={2}
    py={1}
    rounded="md"
    cursor="pointer"
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={href}
  >
    {children}
  </Link>
);

const Nav = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });

  const handleLogout = async () => {
    await logout();
    router.reload();
  };

  let links: { name: string; href: string }[] = [];

  if (fetching) {
    //   user is not logged in
  }
  if (!data?.me) {
    links = [
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
    links = [
      {
        name: 'Create Property',
        href: '/property/create-property',
      },
      {
        name: 'View Account',
        href: '/me/account',
      },
      {
        name: 'My properties',
        href: '/me/properties',
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
              <NavLink href="/">
                <a style={{ cursor: 'pointer' }}>
                  <Image src="/images/airbnb.svg" width={30} height={50} />
                </a>
              </NavLink>
            </Box>
            <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
              {links
                && links.map((l) => <NavLink href={l.href}>{l.name}</NavLink>)}
            </HStack>
          </HStack>
          <Flex alignItems="center">
            <Menu>
              <StyledLink href="/">
                {data?.me?.email && data?.me?.email}
              </StyledLink>

              <MenuButton
                as={Button}
                rounded="full"
                variant="link"
                cursor="pointer"
              >
                {data?.me?.picture && (
                  <Avatar size="sm" src={data.me.picture} />
                )}
              </MenuButton>
              <MenuList>
                {links
                  && links.map((l) => (
                    <MenuItem>
                      <NavLink href={l.href}>{l.name}</NavLink>
                    </MenuItem>
                  ))}
                <MenuDivider />
                {data?.me?.email && logoutFetching ? (
                  <Loader size="sm" />
                ) : (
                  <button onClick={handleLogout} type="button">
                    logout
                  </button>
                )}
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as="nav" spacing={4}>
              {links
                && links.map((l) => <NavLink href={l.href}>{l.name}</NavLink>)}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: false })(Nav);
