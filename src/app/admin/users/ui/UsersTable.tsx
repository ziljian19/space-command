"use client";

import { useState } from "react";

type User = {
  id: number;
  email: string;
  name: string | null;
  role: string;
  createdAt: Date;
};

export default function UsersTable({ users: initial }: { users: User[] }) {
  const [users, setUsers] = useState(initial);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ email: "", name: "", role: "user", password: "" });
  const [msg, setMsg] = useState<{ id: number; text: string; ok: boolean } | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  function startEdit(u: User) {
    setEditingId(u.id);
    setForm({ email: u.email, name: u.name ?? "", role: u.role, password: "" });
    setMsg(null);
  }

  function cancelEdit() {
    setEditingId(null);
    setMsg(null);
  }

  async function saveEdit(id: number) {
    const body: Record<string, string> = {
      email: form.email,
      name: form.name,
      role: form.role,
    };
    if (form.password) body.password = form.password;

    const res = await fetch(`/api/admin/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === id ? { ...u, email: form.email, name: form.name, role: form.role } : u
        )
      );
      setEditingId(null);
      setMsg({ id, text: "Saved", ok: true });
      setTimeout(() => setMsg(null), 2000);
    } else {
      const j = await res.json().catch(() => ({}));
      setMsg({ id, text: j.error ?? "Failed to save", ok: false });
    }
  }

  async function deleteUser(id: number) {
    setDeletingId(id);
    const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
    setDeletingId(null);
    if (res.ok) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } else {
      setMsg({ id, text: "Failed to delete", ok: false });
    }
  }

  return (
    <div className="card card-glow overflow-x-auto">
      <p className="text-xs font-mono uppercase tracking-widest text-cyan-800 mb-4">
        Registered Operators · {users.length}
      </p>
      <table className="table w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Name</th>
            <th>Role</th>
            <th>Joined</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) =>
            editingId === u.id ? (
              <tr key={u.id} className="bg-cyan-950/20">
                <td className="text-slate-600 font-mono text-xs">{u.id}</td>
                <td>
                  <input
                    className="input text-xs py-1 w-full min-w-[140px]"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  />
                </td>
                <td>
                  <input
                    className="input text-xs py-1 w-full min-w-[120px]"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Name"
                  />
                </td>
                <td>
                  <select
                    className="input text-xs py-1 w-full"
                    value={form.role}
                    onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                </td>
                <td>
                  <input
                    className="input text-xs py-1 w-full min-w-[120px]"
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                    placeholder="New password"
                    autoComplete="new-password"
                  />
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <button
                      className="btn btn-primary text-xs py-1 px-3"
                      onClick={() => saveEdit(u.id)}
                    >
                      Save
                    </button>
                    <button
                      className="btn text-xs py-1 px-3"
                      onClick={cancelEdit}
                    >
                      Cancel
                    </button>
                  </div>
                  {msg?.id === u.id && (
                    <p className={`text-xs font-mono mt-1 ${msg.ok ? "text-cyan-500" : "text-red-400"}`}>
                      {msg.text}
                    </p>
                  )}
                </td>
              </tr>
            ) : (
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
                <td>
                  <div className="flex items-center gap-2">
                    <button
                      className="btn text-xs py-1 px-3"
                      onClick={() => startEdit(u)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn text-xs py-1 px-3 text-red-400 border-red-900/50 hover:bg-red-950/40 disabled:opacity-40"
                      onClick={() => deleteUser(u.id)}
                      disabled={deletingId === u.id}
                    >
                      {deletingId === u.id ? "…" : "Delete"}
                    </button>
                  </div>
                  {msg?.id === u.id && (
                    <p className="text-xs font-mono mt-1 text-red-400">{msg.text}</p>
                  )}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
