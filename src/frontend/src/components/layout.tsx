import React, { ReactNode } from 'react';
import Link from 'next/link';
import { useAuth } from 'src/auth/useAuth';

interface Iprops {
  children: ReactNode;
}

const Layout: React.FC<Iprops> = ({ children }) => {
  const { authenticated, logout } = useAuth();
  return (
    <div className="bg-gray-900 max-w-screen-2xl mx-auto text-white">
      <nav className="bg-gray-800" style={{ height: '64px' }}>
        <div className="px-6 flex items-center justify-between h-16">
          <Link href="/">
            <a>
              <img
                src="/home-color.svg"
                alt="home house"
                className="inline w-6"
              />
            </a>
          </Link>
          {authenticated ? (
            <>
              <Link href="/houses/add">
                <a>Add House</a>
              </Link>
              <button onClick={logout} type="button">
                Logout
              </button>
            </>
          ) : (
            <Link href="/auth">
              <a>Login / Signup</a>
            </Link>
          )}
        </div>
      </nav>
      <main style={{ minHeight: 'calc(100vh - 64px)' }}>{children}</main>
    </div>
  );
};
export default Layout;
