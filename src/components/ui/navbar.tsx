import { Button } from "./button";
import type { MenuItemProps } from "./menuitems";
import MenuItems from "./menuitems";
import { useAuth } from "../providers/authprovider";
import { createEffect } from "solid-js";

const routes: MenuItemProps[] = [
  { href: "/", label: "Dashboard" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/activity", label: "Activity" },
  { href: "/account", label: "Account" },
];

export default function Navbar() {
  const auth = useAuth();

  createEffect(() => {
    console.log(auth.state());
  }, [auth.state]);

  return (
    <>
      <header class="sm:px-2 px-4 lg:px-6 py-5 sm:flex-col lg:flex-row flex items-center bg-opacity-0 h-max">
        <a class="flex items-center justify-center">
          <MountainIcon className="h-6 w-6" />
        </a>
        <nav class="ml-auto flex gap-4 sm:gap-6 items-center">
          {routes.map((route) => (
            <MenuItems {...route} />
          ))}
          {auth.state() ? (
            <Button
              onClick={async () => {
                await auth.logout();
              }}
            >
              Sign Out
            </Button>
          ) : (
            <Button
              onClick={async () => {
                await auth.login();
              }}
            >
              Sign In
            </Button>
          )}
        </nav>
      </header>
    </>
  );
}

export function MountainIcon({ className }: { className: string }) {
  return (
    <svg
      class={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
