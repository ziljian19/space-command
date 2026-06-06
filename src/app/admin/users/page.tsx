import { requireAuth } from "../_utils";
import { prisma } from "@/lib/prisma";
import AddUserForm from "./ui/AddUserForm";
import UsersTable from "./ui/UsersTable";

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

      <div className="card card-glow">
        <p className="text-xs font-mono uppercase tracking-widest text-cyan-800 mb-3">Add Operator</p>
        <AddUserForm />
      </div>

      <UsersTable users={users} />
    </div>
  );
}
