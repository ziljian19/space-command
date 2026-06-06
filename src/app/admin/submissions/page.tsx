import { prisma } from "@/lib/prisma";
import { requireAuth } from "../_utils";

export default async function SubmissionsPage() {
  await requireAuth();
  const subs = await prisma.contactSubmission.findMany({ orderBy: { id: "desc" } });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-mono uppercase tracking-widest text-cyan-700 mb-1">— Incoming</p>
        <h1 className="text-2xl font-black text-slate-200" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          Submissions
        </h1>
      </div>

      <div className="card card-glow overflow-x-auto">
        <p className="text-xs font-mono uppercase tracking-widest text-cyan-800 mb-4">
          Contact Submissions · {subs.length}
        </p>
        {subs.length === 0 ? (
          <p className="text-sm text-slate-600 font-mono text-center py-8">No transmissions received yet.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Received</th>
              </tr>
            </thead>
            <tbody>
              {subs.map((s) => (
                <tr key={s.id}>
                  <td className="text-slate-600 font-mono text-xs">{s.id}</td>
                  <td className="text-slate-300 whitespace-nowrap">{s.name}</td>
                  <td className="font-mono text-xs text-cyan-400/80 whitespace-nowrap">{s.email}</td>
                  <td className="text-slate-400 text-sm max-w-xs whitespace-pre-wrap">{s.message}</td>
                  <td className="text-slate-600 font-mono text-xs whitespace-nowrap">
                    {new Date(s.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
