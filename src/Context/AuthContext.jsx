import React from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

export const AuthContext = React.createContext();

export const AuthContextProvider = ({ children }) => {
  const [curUser, setCurUser] = React.useState({});

  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurUser(user);
    });

    return () => {
      unsub();
    };
  }, []);

  const value = React.useMemo(() => {
    return { curUser };
  }, [curUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
