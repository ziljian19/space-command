"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function SiteNavAuth() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <span className="ml-auto text-xs text-slate-600 font-mono animate-pulse">···</span>;
  }

  if (session) {
    return (
      <span className="ml-auto flex items-center gap-2">
        {session.user?.name && (
          <span className="hidden sm:inline text-xs font-mono text-cyan-700 tracking-widest">
            {session.user.name}
          </span>
        )}
        <Link href="/admin" className="btn text-xs py-1 px-3 no-underline">
          ⌘ Admin
        </Link>
        <button className="btn text-xs py-1 px-3" onClick={() => signOut({ callbackUrl: "/" })}>
          Logout
        </button>
      </span>
    );
  }

  return (
    <span className="ml-auto">
      <Link href="/login" className="btn btn-primary text-xs py-1 px-3 no-underline">
        Login
      </Link>
    </span>
  );
}
