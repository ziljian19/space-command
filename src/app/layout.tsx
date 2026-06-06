import "./globals.css";
import type { Metadata } from "next";
import Providers from "./providers";
import Link from "next/link";
import SiteNavAuth from "./site-nav-auth";

export const metadata: Metadata = {
  title: "Space Command",
  description: "Full-stack Next.js demo — auth, database, admin panel",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col overflow-x-hidden" suppressHydrationWarning>
        <Providers>

          {/* ── Top nav ── */}
          <header className="border-b border-cyan-900/40 bg-[#040d1a]/80 backdrop-blur-md sticky top-0 z-50">
            <nav className="shell flex items-center gap-2 sm:gap-6 py-3">

              {/* Logo */}
              <Link href="/" className="flex items-center gap-2.5 no-underline group">
                <div className="w-8 h-8 rounded border border-cyan-500/50 bg-cyan-500/10 flex items-center justify-center text-cyan-400 text-sm font-bold group-hover:bg-cyan-500/20 transition-colors"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  ⊕
                </div>
                <span className="hidden sm:inline text-sm font-bold tracking-widest text-cyan-300 uppercase hover:text-cyan-200 transition-colors"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  Space Command
                </span>
              </Link>

              {/* Nav links */}
              <div className="flex items-center gap-1">
                <Link href="/about"
                  className="px-3 py-1.5 text-xs uppercase tracking-widest text-slate-400 hover:text-cyan-300 hover:bg-cyan-950/40 rounded transition-all no-underline"
                  style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                  About
                </Link>
                <Link href="/contact"
                  className="px-3 py-1.5 text-xs uppercase tracking-widest text-slate-400 hover:text-cyan-300 hover:bg-cyan-950/40 rounded transition-all no-underline"
                  style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                  Contact
                </Link>
              </div>

              {/* Auth (right side) */}
              <SiteNavAuth />
            </nav>
          </header>

          {/* ── Page content ── */}
          <main className="shell py-8 flex-1">{children}</main>

          {/* ── Footer ── */}
          <footer className="border-t border-cyan-900/30 mt-8">
            <div className="shell py-5 flex items-center justify-between">
              <span className="text-xs text-slate-600"
                style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                SPACE COMMAND · MISSION CONTROL
              </span>
              <span className="text-xs text-slate-700"
                style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                © {new Date().getFullYear()} · ALL RIGHTS RESERVED
              </span>
            </div>
          </footer>

        </Providers>
      </body>
    </html>
  );
}
