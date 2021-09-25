import React, { useEffect, useState, useContext, createContext } from 'react';
import { useRouter } from 'next/router';
import firebase from 'firebase/app';
import 'firebase/auth';
import initFirebase from './initFirebase';
import { removeTokenCookie, setTokenCookie } from './tokenCookies';

initFirebase();

interface IAuthContext {
  user: firebase.User | null;
  logout: () => void;
  authenticated: boolean;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  logout: () => null,
  authenticated: false,
});

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const router = useRouter();

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        router.push('/');
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    const cancelAuthListener = firebase
      .auth()
      // eslint-disable-next-line no-shadow
      .onIdTokenChanged(async (user) => {
        if (user) {
          // user has logged in
          const token = await user.getIdToken();
          setTokenCookie(token);
          setUser(user);
        } else {
          // user has logged out
          removeTokenCookie();
          setUser(null);
        }
      });
    return () => {
      cancelAuthListener();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        authenticated: !!user,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
