import { useRouter } from 'next/router';
import { useLogoutMutation, useMeQuery } from '@src/generated/graphql';
import { isServer } from '@src/utils/isServer';
import Link from 'next/link';

const Nav = () => {
  const router = useRouter();
  const [logout, { loading: logoutLoading }] = useLogoutMutation();
  const { data, loading } = useMeQuery({
    skip: isServer(),
  });

  const handleLogout = async () => {
    await logout();
    router.reload();
  };

  let links: { name: string; href: string }[] = [];

  if (loading) {
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
        name: 'My Profile',
        href: '/me',
      },
    ];
  }

  return (
    <>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <img
            src="/images/airbnb.svg"
            style={{ width: '30px', height: '30px' }}
            alt="logo"
          />
          <Link href="/">
            <a>
              <span className="ml-3 text-xl">Airbnb</span>
            </a>
          </Link>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            {links
              && links.map((l) => (
                <Link href={l.href}>
                  <a className="ml-2 mr-2">{l.name}</a>
                </Link>
              ))}
          </nav>
          {data?.me && (
            <button
              className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
              type="button"
              onClick={() => handleLogout()}
              disabled={logoutLoading}
            >
              Logout
            </button>
          )}
        </div>
      </header>
    </>
  );
};
export default Nav;
