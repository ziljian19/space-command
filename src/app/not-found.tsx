import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden relative">

      {/* Extra stars layer */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {[
          { top: "8%",  left: "12%", size: 2, delay: "0s"   },
          { top: "22%", left: "78%", size: 1, delay: "0.5s" },
          { top: "55%", left: "5%",  size: 2, delay: "1s"   },
          { top: "70%", left: "90%", size: 1, delay: "1.5s" },
          { top: "35%", left: "50%", size: 1, delay: "0.8s" },
          { top: "85%", left: "30%", size: 2, delay: "0.3s" },
          { top: "15%", left: "60%", size: 1, delay: "1.2s" },
          { top: "90%", left: "65%", size: 2, delay: "0.7s" },
        ].map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
              opacity: 0.6,
              animation: `twinkle 2s ease-in-out ${s.delay} infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* Rocket */}
      <div className="relative mb-8" style={{ animation: "float 3s ease-in-out infinite" }}>

        {/* Exhaust trail */}
        <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          style={{ bottom: "-48px" }}>
          <div className="w-4 h-8 rounded-full"
            style={{
              background: "linear-gradient(to bottom, #f97316, #fbbf24, transparent)",
              animation: "flicker 0.15s ease-in-out infinite alternate",
              transformOrigin: "top center",
            }} />
          <div className="w-2 h-6 rounded-full"
            style={{
              background: "linear-gradient(to bottom, #fbbf24, #fde68a, transparent)",
              animation: "flicker 0.2s ease-in-out 0.05s infinite alternate",
              transformOrigin: "top center",
            }} />
        </div>

        {/* Rocket SVG */}
        <svg width="100" height="160" viewBox="0 0 100 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Body */}
          <path d="M50 5 C30 5 18 40 18 75 L82 75 C82 40 70 5 50 5Z" fill="#0e7490" />
          <path d="M50 5 C40 5 30 25 26 50 L74 50 C70 25 60 5 50 5Z" fill="#22d3ee" opacity="0.8" />

          {/* Nose tip highlight */}
          <path d="M50 5 C46 12 44 20 43 30 L57 30 C56 20 54 12 50 5Z" fill="#67e8f9" opacity="0.5" />

          {/* Window */}
          <circle cx="50" cy="52" r="13" fill="#040d1a" stroke="#22d3ee" strokeWidth="2" />
          <circle cx="50" cy="52" r="9" fill="#082035" />
          <circle cx="50" cy="52" r="6" fill="#0e4060" />
          <circle cx="47" cy="49" r="2.5" fill="#67e8f9" opacity="0.5" />

          {/* Body lower */}
          <rect x="18" y="72" width="64" height="28" rx="4" fill="#0891b2" />
          <rect x="22" y="76" width="56" height="20" rx="3" fill="#0e7490" />

          {/* Detail lines */}
          <line x1="35" y1="78" x2="35" y2="94" stroke="#22d3ee" strokeWidth="1" opacity="0.4" />
          <line x1="65" y1="78" x2="65" y2="94" stroke="#22d3ee" strokeWidth="1" opacity="0.4" />
          <line x1="22" y1="86" x2="78" y2="86" stroke="#22d3ee" strokeWidth="1" opacity="0.3" />

          {/* Left fin */}
          <path d="M18 75 L2 105 L18 98 Z" fill="#0369a1" />
          <path d="M18 75 L4 100 L18 95 Z" fill="#0e7490" opacity="0.6" />

          {/* Right fin */}
          <path d="M82 75 L98 105 L82 98 Z" fill="#0369a1" />
          <path d="M82 75 L96 100 L82 95 Z" fill="#0e7490" opacity="0.6" />

          {/* Nozzle */}
          <path d="M30 100 L28 112 L72 112 L70 100 Z" fill="#075985" />
          <path d="M34 112 L32 118 L68 118 L66 112 Z" fill="#0369a1" />
        </svg>
      </div>

      {/* 404 text */}
      <div className="flex items-center gap-4 mb-4">
        <div className="h-px w-12 bg-cyan-900" />
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-700">
          Signal Lost
        </span>
        <div className="h-px w-12 bg-cyan-900" />
      </div>

      <h1
        className="text-8xl font-black text-transparent mb-2"
        style={{
          fontFamily: "'Orbitron', sans-serif",
          WebkitTextStroke: "2px #22d3ee",
          textShadow: "0 0 40px rgba(34,211,238,0.3)",
        }}
      >
        404
      </h1>

      <p className="text-slate-400 text-lg mb-2 max-w-md">
        This sector of space doesn&apos;t exist.
      </p>
      <p className="text-slate-600 text-sm font-mono mb-10">
        The coordinates you entered lead nowhere in the known universe.
      </p>

      <Link
        href="/"
        className="btn btn-primary px-8 py-3 text-sm no-underline"
        style={{ fontFamily: "'Share Tech Mono', monospace" }}
      >
        ← Return to Mission Control
      </Link>

      <style>{`
        @keyframes float {
          0%   { transform: translateY(0px) rotate(-2deg); }
          50%  { transform: translateY(-18px) rotate(2deg); }
          100% { transform: translateY(0px) rotate(-2deg); }
        }
        @keyframes flicker {
          0%   { transform: scaleX(0.8) scaleY(0.9); opacity: 0.9; }
          100% { transform: scaleX(1.2) scaleY(1.1); opacity: 1; }
        }
        @keyframes twinkle {
          0%   { opacity: 0.2; }
          100% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
