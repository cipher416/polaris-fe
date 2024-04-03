import { authSubscribe, signIn, signOut } from "@junobuild/core";
import {
  createContext,
  createEffect,
  createSignal,
  useContext,
  type Accessor,
  type JSX,
} from "solid-js";

export interface AuthContextType {
  state: Accessor<boolean>;
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
  const [state, setState] = createSignal(false);

  const login = async () => {
    await signIn();
    const user = authSubscribe((user) => {
      setState(!!user);
      console.log(user);
    });
  };
  const logout = async () => {
    await signOut();
  };

  const store = {
    state,
    login,
    logout,
  };

  createEffect(() => {
    authSubscribe((user) => {
      console.log(!!user);
      setState(!!user);
    });
  });

  return (
    <AuthContext.Provider value={store}>{props.children}</AuthContext.Provider>
  );
};