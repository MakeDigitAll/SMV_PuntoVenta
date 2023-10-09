import { useContext, createContext, useState, useEffect } from "react";
import React from "react";
import { AccessTokenResponse, AuthResponse, User } from "./types/Types";
interface AuthProviderProps {
  children: React.ReactNode;
}
const AuthContext = createContext({
  isAuthenticated: false,
  getAccessToken: () => {},
  saveUser: (userData: AuthResponse) => {},
  getRefreshToken: () => {},
  getUser: () => ({} as User | undefined),
  signOut: () => {},
});
export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User>();
  function getAccessToken() {
    return accessToken;
  }
  useEffect(() => {
    checkAuth();
  }, []);
  async function requestNewAccessToken(refreshToken: string) {
    try {
      const response = await fetch("http://localhost:4000/api/auth/refreshToken", {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`,
        },
      });
      if (response.ok) {
        const json = (await response.json()) as AccessTokenResponse;
        if (json.error) throw new Error(json.error);
        return json.body.accessToken;
      } else throw new Error(response.statusText);
    } catch (error) {
      
      return null;
    }
  }
  function getUser() {
    return user;
  }
  async function getUserInfo(accessToken:string) {
    try {
      const response = await fetch(`http://localhost:4000/api/auth/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        const json = await response.json();
        if (json.error) {
          throw new Error(json.error);
        }
        return json.body;
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      return null;
    }
  }
  async function checkAuth() {
    if (accessToken) {
      return;
    } else {
      const token = getRefreshToken();
      if (token) {
        const newAccessToken = await requestNewAccessToken(token);        
        if (newAccessToken) {
          const userInfo = await getUserInfo(newAccessToken);          
          if (userInfo) {   
            saveSessionInfo(userInfo, newAccessToken, token);
            setIsLoading(false);
            return;
          }
        }
      }
    }
    setIsLoading(false);
  }
  function saveSessionInfo(
    userInfo: User,
    accessToken: string,
    refreshToken: string
  ) {
    setAccessToken(accessToken);
    localStorage.setItem("token", JSON.stringify(refreshToken));
    setIsAuthenticated(true);
    setUser(userInfo);
  }
  function getRefreshToken(): string | null {
    const tokenData = localStorage.getItem("token");
    if (tokenData) {
      const token = JSON.parse(tokenData);
      return token;
    }
    return null;
  }
  function saveUser(userData: AuthResponse) {
    saveSessionInfo(
      userData.body.userInfo,
      userData.body.accessToken,
      userData.body.refreshToken
    );
  }
  function signOut(){
    setIsAuthenticated(false);
    setAccessToken("");
    setUser(undefined);
    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, getAccessToken, saveUser, getRefreshToken, getUser, signOut }}
    >
      {isLoading ? null : children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
