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
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded border border-cyan-900/50 bg-cyan-950/30 text-xs font-mono text-cyan-500 tracking-widest">
            <span className="text-cyan-700">⊕</span>
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
