"use client";

import { useState, FormEvent } from "react";

export default function ContactPage() {
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus]   = useState<"idle" | "loading" | "ok" | "err">("idle");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });
    setStatus(res.ok ? "ok" : "err");
    if (res.ok) { setName(""); setEmail(""); setMessage(""); }
  }

  return (
    <div className="flex flex-col gap-10 max-w-lg">

      {/* Header */}
      <div>
        <p className="text-xs font-mono uppercase tracking-widest text-cyan-700 mb-2">
          — Open Channel
        </p>
        <h1 className="text-4xl font-black text-slate-200 mb-3"
          style={{ fontFamily: "'Orbitron', sans-serif" }}>
          Contact
        </h1>
        <p className="text-slate-400 leading-relaxed text-sm">
          Transmissions are saved to the database and reviewable in the admin panel.
          This demonstrates a full-stack form → API route → Prisma → PostgreSQL flow.
        </p>
      </div>

      <div className="divider-glow" />

      {/* Form */}
      {status === "ok" ? (
        <div className="card card-glow text-center py-10 flex flex-col items-center gap-3">
          <span className="text-3xl text-cyan-400">✓</span>
          <p className="text-cyan-300 font-mono text-sm uppercase tracking-widest">Transmission Received</p>
          <p className="text-slate-500 text-sm">Your message has been saved to the database.</p>
          <button className="btn btn-primary mt-2 text-xs" onClick={() => setStatus("idle")}>
            Send Another
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="card card-glow flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-mono uppercase tracking-widest text-cyan-800">Name</label>
            <input
              className="input"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-mono uppercase tracking-widest text-cyan-800">Email</label>
            <input
              className="input"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-mono uppercase tracking-widest text-cyan-800">Message</label>
            <textarea
              className="input resize-none"
              placeholder="Your message..."
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          <button
            className="btn btn-primary justify-center py-2.5 disabled:opacity-50"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Transmitting…" : "Send Message →"}
          </button>

          {status === "err" && (
            <p className="text-xs text-red-400 font-mono text-center">
              Transmission failed. Please try again.
            </p>
          )}
        </form>
      )}

    </div>
  );
}
