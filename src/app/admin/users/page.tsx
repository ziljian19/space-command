import { requireAuth } from "../_utils";
import { prisma } from "@/lib/prisma";
import AddUserForm from "./ui/AddUserForm";

export default async function UsersPage() {
  await requireAuth();
  const users = await prisma.user.findMany({ orderBy: { id: "asc" } });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-mono uppercase tracking-widest text-cyan-700 mb-1">— Personnel</p>
        <h1 className="text-2xl font-black text-slate-200" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          Users
        </h1>
      </div>

      {/* Add user form */}
      <div className="card card-glow">
        <p className="text-xs font-mono uppercase tracking-widest text-cyan-800 mb-3">Add Operator</p>
        <AddUserForm />
      </div>

      {/* Users table */}
      <div className="card card-glow overflow-x-auto">
        <p className="text-xs font-mono uppercase tracking-widest text-cyan-800 mb-4">
          Registered Operators · {users.length}
        </p>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Name</th>
              <th>Role</th>
              <th>Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td className="text-slate-600 font-mono text-xs">{u.id}</td>
                <td className="font-mono text-xs text-cyan-400/80">{u.email}</td>
                <td className="text-slate-300">{u.name ?? <span className="text-slate-600">—</span>}</td>
                <td>
                  <span className={`badge ${u.role === "admin" ? "badge-admin" : "badge-user"}`}>
                    {u.role}
                  </span>
                </td>
                <td className="text-slate-600 font-mono text-xs whitespace-nowrap">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
