import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { USER_SESSION_STORAGE_KEY } from "../data/const";
import { AuthenticationResponse } from "../data/entities/AuthenticationResponse";
import LocalStorageService from "../data/services/LocalStorageService";
import UserService from "../data/services/UserService";

interface UserContextData {
  isAuthenticated: boolean;
  userData: AuthenticationResponse | null;
  checkTicketValability: () => void,
  authenticate: (username: string, password: string) => void;
  logout: () => void;
}

interface Props {
  children: JSX.Element;
}

export const UserContext = React.createContext<UserContextData>({
  isAuthenticated: false,
  userData: null,
  checkTicketValability: () => {},
  authenticate: () => {},
  logout: () => {},
});

const UserProvider = (props: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userData, setUserData] = useState<AuthenticationResponse | null>(
    LocalStorageService.loadFromLocalStorage(USER_SESSION_STORAGE_KEY) as AuthenticationResponse
  );

  useEffect(() => {
    if (userData) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [userData]);

  const authenticate = (email: string, password: string): void => {
    UserService.authenticate(email, password).then(
      (response: AxiosResponse<AuthenticationResponse>) => {
        const userData = Object.assign({}, response.data);
        setIsAuthenticated(true);
        setUserData(userData);
        LocalStorageService.saveToLocalStorage(
          USER_SESSION_STORAGE_KEY,
          userData
        );
      }
    );
  };

  const checkTicketValability = () => {
    if (userData) {
      const parseJwt = (token: string) => {
        try {
          return JSON.parse(atob(token.split(".")[1]));
        } catch (e) {
          return null;
        }
      };
      const decodedJwt = parseJwt(userData.token);
      if (decodedJwt.exp * 1000 < Date.now()) {
        logout();
      }
    }
  }

  const logout = (): void => {
    setUserData(null);
    LocalStorageService.deleteFromLocalStorage(USER_SESSION_STORAGE_KEY);
  };

  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        userData,
        checkTicketValability,
        authenticate,
        logout,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
