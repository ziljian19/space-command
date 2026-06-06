import { requireAuth } from "./_utils";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminHome() {
  const session = await requireAuth() as { user?: { email?: string; role?: string } };
  const [userCount, submissionCount, latestSub] = await Promise.all([
    prisma.user.count(),
    prisma.contactSubmission.count(),
    prisma.contactSubmission.findFirst({ orderBy: { createdAt: "desc" } }),
  ]);

  const stats = [
    {
      label: "Registered Users",
      value: userCount,
      icon: "◈",
      href: "/admin/users",
      sub: "Manage →",
    },
    {
      label: "Contact Submissions",
      value: submissionCount,
      icon: "◉",
      href: "/admin/submissions",
      sub: latestSub
        ? `Last: ${new Date(latestSub.createdAt).toLocaleDateString()}`
        : "None yet",
    },
    {
      label: "Active Session",
      value: session.user?.role === "admin" ? "Admin" : "User",
      icon: "◎",
      href: null,
      sub: session.user?.email ?? "—",
    },
  ];

  return (
    <div className="flex flex-col gap-8">

      {/* Header */}
      <div>
        <p className="text-xs font-mono uppercase tracking-widest text-cyan-700 mb-1">
          — Mission Control
        </p>
        <h1 className="text-3xl font-black text-slate-200"
          style={{ fontFamily: "'Orbitron', sans-serif" }}>
          Dashboard
        </h1>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="card card-glow relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
            <div className="flex items-start justify-between mb-3">
              <span className="text-2xl text-cyan-500/50 group-hover:text-cyan-400 transition-colors">
                {s.icon}
              </span>
              {s.href && (
                <Link href={s.href} className="text-xs font-mono text-cyan-800 hover:text-cyan-400 no-underline transition-colors">
                  {s.sub}
                </Link>
              )}
            </div>
            <p className="text-3xl font-bold text-slate-100 font-mono">{s.value}</p>
            <p className="text-xs uppercase tracking-widest text-slate-600 mt-1 font-mono">{s.label}</p>
            {!s.href && (
              <p className="text-xs text-slate-600 font-mono mt-1 truncate">{s.sub}</p>
            )}
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div className="divider-glow" />
      <div className="flex gap-3 flex-wrap">
        <Link href="/admin/users" className="btn text-xs no-underline">◈ Manage Users</Link>
        <Link href="/admin/submissions" className="btn text-xs no-underline">◉ View Submissions</Link>
        <Link href="/" className="btn text-xs no-underline text-slate-600">← Back to Site</Link>
      </div>

    </div>
  );
}
