"use client";

import Link from "next/link";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import { usePathname } from "next/navigation";
import classnames from "classnames";

export default function NavBar() {
  // get current route path
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      {/* logo */}
      <Link href="/">
        <AiFillBug />
      </Link>
      {/* links */}
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              // styling active link
              className={classnames({
                "text-zinz-900": link.href === currentPath,
                "text-zinz-500": link.href !== currentPath,
                "hover:text-zinc-800 transition-colors": true,
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
