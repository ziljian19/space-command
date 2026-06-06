"use client";

import { FormEvent, useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router       = useRouter();
  const params       = useSearchParams();
  const callbackUrl  = params.get("callbackUrl") ?? "/admin";
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState<string | null>(null);
  const [loading, setLoading]   = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await signIn("credentials", { redirect: false, email, password, callbackUrl });
    setLoading(false);
    if (!res) return setError("Unknown error");
    if (res.ok) router.push(callbackUrl);
    else setError("Invalid email or password");
  }

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-full max-w-sm flex flex-col gap-6">

        {/* Header */}
        <div className="text-center flex flex-col gap-2">
          <div className="mx-auto w-12 h-12 rounded-full border border-cyan-500/40 bg-cyan-500/10 flex items-center justify-center text-cyan-400 text-xl mb-2">
            ⊕
          </div>
          <h1 className="text-2xl font-black text-slate-200"
            style={{ fontFamily: "'Orbitron', sans-serif" }}>
            Access Control
          </h1>
          <p className="text-xs text-slate-600 font-mono uppercase tracking-widest">
            Space Command · Admin Portal
          </p>
        </div>

        {/* Form */}
        <div className="card card-glow flex flex-col gap-4">
          <form onSubmit={onSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono uppercase tracking-widest text-cyan-800">Email</label>
              <input
                className="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="operator@spacecommand.dev"
                autoComplete="email"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono uppercase tracking-widest text-cyan-800">Password</label>
              <input
                className="input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
            </div>

            <button
              className="btn btn-primary w-full justify-center py-2.5 mt-1 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Authenticating…" : "Authenticate →"}
            </button>

            {error && (
              <p className="text-xs text-red-400 font-mono text-center">{error}</p>
            )}
          </form>
        </div>

        <p className="text-xs text-slate-700 font-mono text-center">
          Seed the database to create the default admin account.
        </p>

      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
