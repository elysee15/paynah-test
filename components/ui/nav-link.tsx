"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/libs/utils";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
  exact?: boolean;
} & React.ComponentProps<typeof Link>;

export function NavLink({
  href,
  children,
  className,
  activeClassName,
  inactiveClassName,
  exact = false,
  ...props
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = exact
    ? pathname === href
    : pathname.startsWith(href) || pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 transition-colors",
        isActive
          ? activeClassName || "text-primary"
          : inactiveClassName || "text-muted-foreground hover:text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
