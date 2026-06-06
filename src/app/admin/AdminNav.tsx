"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin",             label: "Dashboard" },
  { href: "/admin/users",       label: "Users" },
  { href: "/admin/submissions", label: "Submissions" },
];

export default function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="border-b border-cyan-900/40 bg-[#040d1a]/60 backdrop-blur">
      <ul className="shell flex gap-1 items-center">
        <span className="text-xs font-mono text-cyan-900 mr-2 hidden md:block uppercase tracking-widest">
          Admin ·
        </span>
        {links.map((l) => {
          const active = pathname === l.href;
          return (
            <li key={l.href}>
              <Link href={l.href} className={`admin-tab ${active ? "admin-tab-active" : ""} no-underline`}>
                {l.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
