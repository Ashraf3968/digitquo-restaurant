import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { loginUser, signupUser } from "../lib/api";
import type { AuthUser } from "../types";

type LoginPayload = {
  email: string;
  password: string;
};

type SignupPayload = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type AuthResult = {
  ok: boolean;
  message?: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  login: (payload: LoginPayload) => Promise<AuthResult>;
  signup: (payload: SignupPayload) => Promise<AuthResult>;
  logout: () => void;
};

const STORAGE_KEY = "megamart-auth-user";
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return;
    }
    try {
      setUser(JSON.parse(raw) as AuthUser);
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const persistUser = (nextUser: AuthUser | null) => {
    setUser(nextUser);
    if (typeof window === "undefined") {
      return;
    }

    if (nextUser) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
      return;
    }

    window.localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: Boolean(user),
        isAdmin: user?.role === "admin",
        login: async ({ email, password }) => {
          if (!email || !password) {
            return { ok: false, message: "Enter both email and password." };
          }

          try {
            const nextUser = await loginUser({ email, password });
            persistUser(nextUser);
            return { ok: true };
          } catch (error) {
            return { ok: false, message: error instanceof Error ? error.message : "Login failed." };
          }
        },
        signup: async ({ name, email, password, confirmPassword }) => {
          if (!name || !email || !password || !confirmPassword) {
            return { ok: false, message: "Complete all fields to create an account." };
          }

          if (password.length < 6) {
            return { ok: false, message: "Use at least 6 characters for your password." };
          }

          if (password !== confirmPassword) {
            return { ok: false, message: "Password and confirm password must match." };
          }

          try {
            const nextUser = await signupUser({ name, email, password });
            persistUser(nextUser);
            return { ok: true };
          } catch (error) {
            return { ok: false, message: error instanceof Error ? error.message : "Signup failed." };
          }
        },
        logout: () => persistUser(null),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
