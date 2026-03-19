import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { loginUser, signupUser, type AuthUser } from "../lib/api";

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
  login: (payload: LoginPayload) => Promise<AuthResult>;
  signup: (payload: SignupPayload) => Promise<AuthResult>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoggedIn: Boolean(user),
      login: async ({ email, password }) => {
        if (!email || !password) {
          return { ok: false, message: "Please enter both email and password." };
        }

        try {
          const nextUser = await loginUser({ email, password });
          setUser(nextUser);
          return { ok: true };
        } catch (error) {
          return { ok: false, message: error instanceof Error ? error.message : "Login failed." };
        }
      },
      signup: async ({ name, email, password, confirmPassword }) => {
        if (!name || !email || !password || !confirmPassword) {
          return { ok: false, message: "Please complete all fields to create your account." };
        }

        if (password.length < 6) {
          return { ok: false, message: "Use at least 6 characters for a more secure password." };
        }

        if (password !== confirmPassword) {
          return { ok: false, message: "Password and confirm password must match." };
        }

        try {
          const nextUser = await signupUser({ name, email, password });
          setUser(nextUser);
          return { ok: true };
        } catch (error) {
          return { ok: false, message: error instanceof Error ? error.message : "Signup failed." };
        }
      },
      logout: () => setUser(null),
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
