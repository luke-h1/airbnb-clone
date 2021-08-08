import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import { AiFillCaretDown } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions/userActions';

interface DropDownProps {
  links: { href: string; name: string }[];
  me?: any;
}

const DropDown: React.FC<DropDownProps> = ({ links, me }) => {
  const handleLogout = () => {
    const dispatch = useDispatch();
    dispatch(logout());
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
            <AiFillCaretDown
              className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
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
                          active
                            ? 'bg-violet-500 text-gray-600'
                            : 'text-gray-900'
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        type="button"
                      >
                        <Link to={l.href}>
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
                      active ? 'bg-violet-500 text-gray-600' : 'text-gray-900'
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
