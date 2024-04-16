import { authSubscribe, signIn, signOut, type User } from "@junobuild/core";
import {
  createContext,
  createEffect,
  createSignal,
  useContext,
  type Accessor,
  type JSX,
} from "solid-js";
import { toaster } from "@kobalte/core";
import { Button } from "@/components/ui/button";
import {
  Toast,
  ToastContent,
  ToastDescription,
  ToastProgress,
  ToastTitle,
} from "@/components/ui/toast";

export interface AuthContextType {
  user: Accessor<User | null>;
  isAuthenticated: Accessor<boolean>;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export const AuthProvider = (props: { children: JSX.Element }) => {
  const [user, setUser] = createSignal<User | null>(null);

  const login = async () => {
    await signIn();
  };
  const logout = async () => {
    await signOut();
  };
  const isAuthenticated = () => {
    return !!user();
  };

  const store = {
    user,
    login,
    logout,
    isAuthenticated,
  };

  createEffect(() => {
    authSubscribe((user) => {
      setUser(user);
    });
  });

  return (
    <AuthContext.Provider value={store}>{props.children}</AuthContext.Provider>
  );
};
