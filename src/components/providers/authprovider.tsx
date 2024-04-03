import { authSubscribe, signIn, signOut } from "@junobuild/core";
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
  const [isAuthenticated, setIsAuthenticated] = createSignal(false);

  const login = async () => {
    await signIn();
  };
  const logout = async () => {
    await signOut();
  };

  const store = {
    isAuthenticated,
    login,
    logout,
  };

  createEffect(() => {
    authSubscribe((user) => {
      setIsAuthenticated(!!user);
    });
  });

  return (
    <AuthContext.Provider value={store}>{props.children}</AuthContext.Provider>
  );
};
