import { Dispatch, SetStateAction, createContext, useState, ReactNode, useMemo } from 'react';
import { UserType } from 'serverTypes/main.types';

type UserContextType = {
  user: UserType | undefined;
  setUser: Dispatch<SetStateAction<UserType | undefined>>;
};

export const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserType | undefined>();

  const value = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
