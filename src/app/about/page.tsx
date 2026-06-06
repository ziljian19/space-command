import { Suspense } from "react";

type APOD = {
  title: string;
  explanation: string;
  url: string;
  hdurl?: string;
  media_type: "image" | "video";
  date: string;
  copyright?: string;
};

async function getAPOD(): Promise<APOD | null> {
  try {
    const key = process.env.NASA_API_KEY || "DEMO_KEY";
    const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${key}`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

async function APODSection() {
  const apod = await getAPOD();

  return (
    <section className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xs uppercase tracking-widest text-cyan-700 font-mono">
          NASA · Astronomy Picture of the Day
        </h2>
        <span className="text-xs font-mono text-slate-600">{apod?.date ?? "—"}</span>
      </div>

      {!apod ? (
        <div className="card text-center py-12 text-slate-600 font-mono text-sm">
          Could not load APOD data. NASA API may be rate-limited.
        </div>
      ) : (
        <div className="card card-glow flex flex-col gap-5 p-0 overflow-hidden">
          {apod.media_type === "image" ? (
            <div className="relative overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={apod.url}
                alt={apod.title}
                className="w-full max-h-[480px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071224] via-transparent to-transparent" />
            </div>
          ) : (
            <div className="aspect-video w-full">
              <iframe
                src={apod.url}
                title={apod.title}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          )}

          <div className="px-6 pb-6 flex flex-col gap-3">
            <h3 className="text-xl font-semibold text-cyan-300"
              style={{ fontFamily: "'Orbitron', sans-serif", letterSpacing: "0.05em" }}>
              {apod.title}
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed line-clamp-5">
              {apod.explanation}
            </p>
            <div className="flex items-center justify-between pt-1">
              {apod.copyright && (
                <span className="text-xs text-slate-600 font-mono">
                  © {apod.copyright.trim()}
                </span>
              )}
              <a
                href="https://apod.nasa.gov/apod/astropix.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-cyan-700 hover:text-cyan-400 ml-auto"
              >
                View on NASA →
              </a>
            </div>
          </div>
        </div>
      )}

      <p className="text-xs text-slate-700 font-mono">
        Data cached daily · Source: api.nasa.gov/planetary/apod
      </p>
    </section>
  );
}

function APODSkeleton() {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xs uppercase tracking-widest text-cyan-700 font-mono">
          NASA · Astronomy Picture of the Day
        </h2>
        <span className="text-xs font-mono text-slate-600">—</span>
      </div>
      <div className="card flex flex-col gap-4 p-0 overflow-hidden animate-pulse">
        <div className="w-full h-64 bg-cyan-950/30" />
        <div className="px-6 pb-6 flex flex-col gap-3">
          <div className="h-5 w-2/3 rounded bg-cyan-950/40" />
          <div className="h-3 w-full rounded bg-slate-800/60" />
          <div className="h-3 w-5/6 rounded bg-slate-800/60" />
          <div className="h-3 w-4/6 rounded bg-slate-800/60" />
        </div>
      </div>
      <p className="text-xs text-slate-700 font-mono">
        Data cached daily · Source: api.nasa.gov/planetary/apod
      </p>
    </section>
  );
}

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-10">

      <div>
        <p className="text-xs font-mono uppercase tracking-widest text-cyan-700 mb-2">
          — Mission Brief
        </p>
        <h1 className="text-4xl font-black text-slate-200 mb-3"
          style={{ fontFamily: "'Orbitron', sans-serif" }}>
          About
        </h1>
        <p className="text-slate-400 max-w-2xl leading-relaxed">
          Space Command is a full-stack portfolio project demonstrating real-world Next.js patterns:
          server components, credential authentication, protected admin routes, live external API
          integration, and a PostgreSQL database via Prisma.
        </p>
      </div>

      <div className="divider-glow" />

      <Suspense fallback={<APODSkeleton />}>
        <APODSection />
      </Suspense>

    </div>
  );
}
