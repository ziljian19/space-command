"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // Close on escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="sm:hidden ml-auto">
      {/* Hamburger button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded border border-cyan-900/50 bg-cyan-950/20 hover:bg-cyan-950/40 transition-colors"
        aria-label="Toggle menu"
      >
        <span
          className="block w-5 h-px bg-cyan-400 transition-all duration-200 origin-center"
          style={open ? { transform: "translateY(4px) rotate(45deg)" } : {}}
        />
        <span
          className="block w-5 h-px bg-cyan-400 transition-all duration-200"
          style={open ? { opacity: 0 } : {}}
        />
        <span
          className="block w-5 h-px bg-cyan-400 transition-all duration-200 origin-center"
          style={open ? { transform: "translateY(-4px) rotate(-45deg)" } : {}}
        />
      </button>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute top-full left-0 right-0 border-b border-cyan-900/40 z-50 flex flex-col px-4 py-4 gap-1" style={{ backgroundColor: "#040d1a" }}>

          {/* User pill if logged in */}
          {session?.user?.name && (
            <div className="flex items-center gap-2 px-3 py-2 mb-2 rounded border border-cyan-900/40 bg-cyan-950/20">
              <span className="text-cyan-700 text-sm">⊕</span>
              <span className="text-xs font-mono text-cyan-500 tracking-widest">{session.user.name}</span>
            </div>
          )}

          {/* Nav links */}
          <Link
            href="/about"
            className="px-3 py-2.5 text-xs uppercase tracking-widest text-slate-400 hover:text-cyan-300 hover:bg-cyan-950/40 rounded transition-all no-underline"
            style={{ fontFamily: "'Share Tech Mono', monospace" }}
          >
            About
          </Link>
          <Link
            href="/contact"
            className="px-3 py-2.5 text-xs uppercase tracking-widest text-slate-400 hover:text-cyan-300 hover:bg-cyan-950/40 rounded transition-all no-underline"
            style={{ fontFamily: "'Share Tech Mono', monospace" }}
          >
            Contact
          </Link>

          <div className="my-2 h-px bg-cyan-900/30" />

          {/* Auth */}
          {status === "loading" ? (
            <span className="px-3 py-2 text-xs font-mono text-slate-600 animate-pulse">···</span>
          ) : session ? (
            <>
              <Link
                href="/admin"
                className="px-3 py-2.5 text-xs uppercase tracking-widest text-slate-400 hover:text-cyan-300 hover:bg-cyan-950/40 rounded transition-all no-underline"
                style={{ fontFamily: "'Share Tech Mono', monospace" }}
              >
                ⌘ Admin
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-left px-3 py-2.5 text-xs uppercase tracking-widest text-slate-400 hover:text-red-400 hover:bg-red-950/20 rounded transition-all"
                style={{ fontFamily: "'Share Tech Mono', monospace" }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="px-3 py-2.5 text-xs uppercase tracking-widest text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/40 rounded transition-all no-underline"
              style={{ fontFamily: "'Share Tech Mono', monospace" }}
            >
              Login →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
