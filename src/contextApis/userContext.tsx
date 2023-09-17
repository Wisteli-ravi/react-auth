import { createContext, useState, PropsWithChildren  } from 'react';
import { UserData } from 'api/SharedTypes';

export type UserContextState = {
  readonly userData: UserData | undefined;
  readonly isReadOnly: boolean;
  readonly setLoggedInUserData: (userData: UserData) => void;
  readonly setIsReadOnlyUser: (isReadOnlyUser: boolean) => void;
};

const initialValue: UserContextState = {
  userData: undefined,
  isReadOnly: false,
  setLoggedInUserData: () => null,
  setIsReadOnlyUser: () => null,
};
export const UserContext = createContext<UserContextState>(initialValue);
UserContext.displayName = 'UserContext';

export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [userData, setUserData] = useState<UserData | undefined>(undefined);
  const [isReadOnly, setIsReadOnly] = useState<boolean>(false);

  const setLoggedInUserData = (userData: UserData) => setUserData(userData);

  const setIsReadOnlyUser = (isReadOnlyUser: boolean) =>
    setIsReadOnly(isReadOnlyUser);

  return (
    <UserContext.Provider
      value={{
        isReadOnly,
        userData,
        setLoggedInUserData,
        setIsReadOnlyUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
