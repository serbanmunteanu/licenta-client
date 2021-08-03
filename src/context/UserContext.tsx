import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { USER_SESSION_STORAGE_KEY } from "../data/const";
import { AuthenticationResponse } from "../data/entities/AuthenticationResponse";
import LocalStorageService from "../data/services/LocalStorageService";
import UserService from "../data/services/UserService";

interface UserContextData {
  authVerified: boolean;
  isAuthenticated: boolean;
  userData: object | null;
  authenticate: (username: string, password: string) => void;
  logout: () => void;
}

interface Props {
  children: JSX.Element;
}

export const UserContext = React.createContext<UserContextData>({
  authVerified: false,
  isAuthenticated: false,
  userData: null,
  authenticate: () => {},
  logout: () => {},
});

const UserProvider = (props: Props) => {
  const [authVerified, setAuthVerified] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userData, setUserData] = useState<object | null>(null);

  useEffect(() => {
    const auth = LocalStorageService.loadFromLocalStorage(
      USER_SESSION_STORAGE_KEY
    );

    if (auth) {
      setAuthVerified(true);
      setIsAuthenticated(true);
      setUserData(auth);
    } else {
      setAuthVerified(false);
      setIsAuthenticated(false);
    }
  }, []);

  const authenticate = (email: string, password: string): void => {
    UserService.authenticate(email, password).then(
      (response: AxiosResponse<AuthenticationResponse>) => {
        const userData = Object.assign({}, response.data);
        setAuthVerified(true);
        setIsAuthenticated(true);
        setUserData(userData);
        LocalStorageService.saveToLocalStorage(
          USER_SESSION_STORAGE_KEY,
          userData
        );
      }
    );
  };

  const logout = (): void => {
    setIsAuthenticated(false);
    setUserData(null);
    LocalStorageService.saveToLocalStorage(USER_SESSION_STORAGE_KEY, null, -1);
  };

  return (
    <UserContext.Provider
      value={{
        authVerified,
        isAuthenticated,
        userData,
        authenticate,
        logout,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
