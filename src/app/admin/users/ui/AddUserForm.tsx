"use client";
import { useState } from "react";

export default function AddUserForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"user" | "admin">("user");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, role, password }),
    });
    if (res.ok) {
      setMsg("User created");
      setEmail(""); setName(""); setPassword(""); setRole("user");
      location.reload();
    } else {
      const j = await res.json().catch(() => ({}));
      setMsg(j.error ?? "Failed to create user");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      // try to disable browser autofill heuristics
      autoComplete="off"
      className="flex items-end gap-2 flex-wrap md:flex-nowrap"
    >
      <input
        className="input flex-[2] min-w-[170px]"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        name="new-user-email"           // unique name helps bypass autofill
        autoComplete="off"              // most browsers respect this
        spellCheck={false}
        required
      />
      <input
        className="input flex-[1] min-w-[140px]"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        name="new-user-name"
        autoComplete="off"
        spellCheck={false}
        required
      />
      <select
        className="input w-32 max-w-[160px]"
        value={role}
        onChange={(e) => setRole(e.target.value as any)}
        name="new-user-role"
      >
        <option value="user">user</option>
        <option value="admin">admin</option>
      </select>
      <input
        className="input flex-[1] min-w-[160px]"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        name="new-user-password"
        autoComplete="new-password"     // prevents saved password autofill
        required
      />
      <button className="btn btn-primary whitespace-nowrap">Add</button>

      {msg && <span className="text-sm text-neutral-400 md:ml-2">{msg}</span>}
    </form>
  );
}
