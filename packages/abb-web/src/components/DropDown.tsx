import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import { useLogoutMutation, User } from '@src/generated/graphql';
import { useRouter } from 'next/router';

interface DropDownProps {
  links: { href: string; name: string }[];
  me?:
    | ({
        __typename?: 'User' | undefined;
      } & {
        __typename?: 'User' | undefined;
      } & Pick<
          User,
          'image' | 'id' | 'email' | 'fullName' | 'firstName' | 'lastName'
        >)
    | null;
}

const DropDown: React.FC<DropDownProps> = ({ links, me }) => {
  const router = useRouter();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    await logout();
    router.reload();
  };
  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <svg
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="presentation"
              focusable="false"
              style={{
                display: 'block',
                fill: 'none',
                height: '16px',
                width: '16px',
                stroke: 'currentColor',
                strokeWidth: 3,
                overflow: 'visible',
              }}
            >
              <g fill="none" fillRule="nonzero">
                <path d="m2 16h28" />
                <path d="m2 24h28" />
                <path d="m2 8h28" />
              </g>
            </svg>
          </Menu.Button>
        </div>
        <Transition
          as={React.Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {links
              && links.map((l) => (
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-violet-500 text-white' : 'text-gray-900'
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        type="button"
                      >
                        <Link href={l.href}>
                          <a>{l.name}</a>
                        </Link>
                      </button>
                    )}
                  </Menu.Item>
                </div>
              ))}
            {me?.firstName && (
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    type="button"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                )}
              </Menu.Item>
            )}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
export default DropDown;
