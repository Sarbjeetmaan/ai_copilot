import { useState, type ReactNode } from "react";
import { AuthContext, type User } from "./AuthContext";

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("access_token")
  );

  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("user");

    if (!stored) {
      return null;
    }

    try {
      return JSON.parse(stored);
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  });

  function login(token: string, user: User) {
    localStorage.setItem("access_token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setUser(user);
    setIsLoggedIn(true);
  }

  function logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");

    setUser(null);
    setIsLoggedIn(false);
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}