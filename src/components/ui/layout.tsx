import { createEffect, type JSX } from "solid-js";
import Navbar from "./navbar";
import { initJuno } from "@junobuild/core";
import { AuthProvider } from "../providers/authprovider";

export default function Layout({ children }: { children: JSX.Element }) {
  createEffect(async () => {
    await initJuno({
      satelliteId: "7jm6b-aiaaa-aaaal-ai42a-cai",
    });
  });
  return (
    <AuthProvider>
      <div>
        <Navbar />
        {children}
      </div>
    </AuthProvider>
  );
}
