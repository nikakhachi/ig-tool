import { Dispatch, SetStateAction, createContext, useState, ReactNode, useMemo } from 'react';
import { UserType } from '../types/User';

type UserContextType = {
  user: UserType | undefined;
  setUser: Dispatch<SetStateAction<any>>;
};

export const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState();

  const value = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
