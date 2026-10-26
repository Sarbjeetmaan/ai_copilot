import {
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { AuthContext, type User } from "./AuthContext";

/* ---------- helpers ---------- */

// Reads the "exp" (expiry) time stored inside the JWT.
// Returns milliseconds left; 0 when expired or unreadable.
function msUntilExpiry(token: string) {
  try {
    const base64 = token
      .split(".")[1]
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const payload = JSON.parse(atob(base64));

    if (typeof payload.exp !== "number") {
      return 0;
    }

    return Math.max(
      0,
      payload.exp * 1000 - Date.now()
    );
  } catch {
    return 0;
  }
}

// Removes the login AND the last results shown on screen, so the
// next person on a shared computer doesn't see them.
function clearSession() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user");
  localStorage.removeItem("resumeResult");
  localStorage.removeItem("interviewQuestions");
}

// A stored token that has already expired counts as "logged out".
function readStoredToken() {
  const token = localStorage.getItem("access_token");

  if (token && msUntilExpiry(token) === 0) {
    clearSession();
    return null;
  }

  return token;
}

/* ---------- provider ---------- */

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!readStoredToken()
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

  // When the token runs out while the page is open, log out
  // automatically. Otherwise the navbar would still say "Hi, name"
  // while new results quietly stopped being saved.
  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    const token = localStorage.getItem("access_token");

    if (!token) {
      return;
    }

    const timer = window.setTimeout(
      () => {
        clearSession();
        setUser(null);
        setIsLoggedIn(false);
      },
      Math.min(msUntilExpiry(token), 2_000_000_000)
    );

    return () => window.clearTimeout(timer);
  }, [isLoggedIn]);

  function login(token: string, user: User) {
    localStorage.setItem("access_token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setUser(user);
    setIsLoggedIn(true);
  }

  function logout() {
    clearSession();

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
