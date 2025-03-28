"use client";
import { cn } from "@app/lib";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./NavigationMenu";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { href: "/students", label: "Students" },
  { href: "/alumni", label: "Alumni" },
  { href: "/startups", label: "Startups" },
  //{ href: "/news", label: "News & Blog"},
  { href: "/program", label: "Program" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const ResponsiveNavigationMenu = ({
  orientation,
}: {
  orientation: "horizontal" | "vertical";
}) => {
  const pathname = usePathname();

  return (
    <NavigationMenu className="flex mx-auto md:mx-0" orientation={orientation}>
      <NavigationMenuList>
        {menuItems.map(({ href, label }) => (
          <NavigationMenuItem
            key={href}
            className="my-4 data-[orientation=horizontal]:my-0"
          >
            <Link href={href} legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  pathname === href && "font-bold",
                )}
              >
                {label}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
        <NavigationMenuItem className="my-4 md:my-0">
          <Link href="/sok" legacyBehavior passHref>
            <NavigationMenuLink className="group inline-flex h-9 w-full items-center justify-center rounded-md bg-tertiary text-tertiary-foreground px-8 py-2 font-medium transition-colors">
              Søk
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export { ResponsiveNavigationMenu };
