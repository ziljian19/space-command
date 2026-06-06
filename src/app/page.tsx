import Link from "next/link";

const features = [
  {
    icon: "◈",
    title: "Authentication",
    desc: "JWT-based credential auth via NextAuth. Protected routes, session callbacks, and role-aware UI.",
  },
  {
    icon: "◉",
    title: "Database",
    desc: "Prisma ORM with PostgreSQL. Type-safe queries, schema migrations, and server-side data fetching.",
  },
  {
    icon: "◎",
    title: "Admin Panel",
    desc: "Role-protected admin dashboard. Manage users, review contact submissions, real-time updates.",
  },
  {
    icon: "◌",
    title: "Live API Data",
    desc: "Server components fetching live data from NASA's Astronomy Picture of the Day API on every request.",
  },
  {
    icon: "◇",
    title: "Contact System",
    desc: "Validated contact form that persists submissions to the database, viewable in the admin panel.",
  },
  {
    icon: "◆",
    title: "Full-Stack TypeScript",
    desc: "End-to-end type safety across API routes, server components, and client forms using Zod.",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col gap-16">

      {/* ── Hero ── */}
      <section className="pt-8 pb-4 flex flex-col gap-6">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-600 uppercase tracking-widest">
          <span className="inline-block w-8 h-px bg-cyan-800"></span>
          Full-Stack Next.js Portfolio Project
          <span className="inline-block w-8 h-px bg-cyan-800"></span>
        </div>

        <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            backgroundImage: "linear-gradient(135deg, #67e8f9 0%, #a78bfa 60%, #818cf8 100%)"
          }}>
          SPACE<br />COMMAND
        </h1>

        <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
          A full-stack demo application built with <span className="text-cyan-400">Next.js 15</span>,{" "}
          <span className="text-cyan-400">Prisma</span>, and <span className="text-cyan-400">NextAuth</span>.
          Features credential auth, protected admin routes, live API integration, and a PostgreSQL database.
        </p>

        <div className="flex items-center gap-3 flex-wrap">
          <Link href="/about"
            className="btn btn-primary px-5 py-2.5 text-sm no-underline">
            → View Live Data
          </Link>
          <Link href="/contact"
            className="btn px-5 py-2.5 text-sm no-underline">
            Contact
          </Link>
          <Link href="/login"
            className="btn px-5 py-2.5 text-sm no-underline text-slate-500">
            Admin Login
          </Link>
        </div>

        <div className="divider-glow mt-4" />
      </section>

      {/* ── Feature grid ── */}
      <section className="flex flex-col gap-6">
        <h2 className="text-xs uppercase tracking-widest text-cyan-700 font-mono">
          System Capabilities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <div key={f.title} className="card card-glow group hover:border-cyan-700/50 transition-all relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
              <div className="flex items-start gap-3">
                <span className="text-2xl text-cyan-500/60 mt-0.5 group-hover:text-cyan-400 transition-colors"
                  style={{ fontFamily: "monospace" }}>
                  {f.icon}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-slate-200 mb-1"
                    style={{ fontFamily: "'Orbitron', sans-serif", letterSpacing: "0.08em" }}>
                    {f.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Stack callout ── */}
      <section className="card card-glow">
        <h2 className="text-xs uppercase tracking-widest text-cyan-700 font-mono mb-4">Tech Stack</h2>
        <div className="flex flex-wrap gap-2">
          {["Next.js 15","React 19","TypeScript","Prisma 6","PostgreSQL","NextAuth","Tailwind CSS","Zod","bcryptjs"].map((t) => (
            <span key={t} className="px-2.5 py-1 rounded border border-cyan-900/50 bg-cyan-950/30 text-xs text-cyan-400/80 font-mono">
              {t}
            </span>
          ))}
        </div>
      </section>

    </div>
  );
}
