export type MenuItemProps = {
  href: string;
  label: string;
};
export default function MenuItems({ href, label }: MenuItemProps) {
  return (
    <a
      class="text-sm font-semibold hover:underline underline-offset-4 transition ease-in-out delay-150 hover:-translate-y-1"
      href={href}
    >
      {label}
    </a>
  );
}
