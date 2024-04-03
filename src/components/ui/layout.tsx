import { createEffect, createSignal, type JSX } from "solid-js";
import Navbar from "./navbar";
import { initJuno } from "@junobuild/core";
import { AuthProvider } from "../providers/authprovider";
import { ColorModeProvider, ColorModeScript } from "@kobalte/core";

export default function Layout({ children }: { children: JSX.Element }) {
  createEffect(async () => {
    await initJuno({
      satelliteId: "7jm6b-aiaaa-aaaal-ai42a-cai",
    });
  });

  return (
    <AuthProvider>
      <ColorModeProvider>
        <div>
          <ColorModeScript />
          <Navbar />
          {children}
        </div>
      </ColorModeProvider>
    </AuthProvider>
  );
}
