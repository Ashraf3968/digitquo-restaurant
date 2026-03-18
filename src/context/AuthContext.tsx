import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type User = {
  name: string;
  email: string;
};

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

type AuthContextValue = {
  user: User | null;
  isLoggedIn: boolean;
  login: (payload: LoginPayload) => { ok: boolean; message?: string };
  signup: (payload: SignupPayload) => { ok: boolean; message?: string };
  logout: () => void;
};

const storageKey = "maison-ember-account";

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) {
      return;
    }

    try {
      const parsed = JSON.parse(raw) as User;
      if (parsed?.email) {
        setUser(parsed);
      }
    } catch {
      window.localStorage.removeItem(storageKey);
    }
  }, []);

  const persist = (nextUser: User | null) => {
    setUser(nextUser);
    if (nextUser) {
      window.localStorage.setItem(storageKey, JSON.stringify(nextUser));
      return;
    }
    window.localStorage.removeItem(storageKey);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoggedIn: Boolean(user),
      login: ({ email, password }) => {
        if (!email || !password) {
          return { ok: false, message: "Please enter both email and password." };
        }

        const fallbackName = email.split("@")[0].replace(/[._-]/g, " ");
        const name = fallbackName
          .split(" ")
          .filter(Boolean)
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join(" ");

        persist({ email, name: name || "Guest Member" });
        return { ok: true };
      },
      signup: ({ name, email, password, confirmPassword }) => {
        if (!name || !email || !password || !confirmPassword) {
          return { ok: false, message: "Please complete all fields to create your account." };
        }

        if (password.length < 6) {
          return { ok: false, message: "Use at least 6 characters for a more secure password." };
        }

        if (password !== confirmPassword) {
          return { ok: false, message: "Password and confirm password must match." };
        }

        persist({ name, email });
        return { ok: true };
      },
      logout: () => persist(null),
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
