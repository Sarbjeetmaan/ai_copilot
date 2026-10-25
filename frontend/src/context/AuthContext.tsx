import { createContext } from "react";

export interface User {
  name: string;
  email: string;
}

export interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}

export const AuthContext =
  createContext<AuthContextType | null>(null);