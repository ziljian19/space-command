# Space Command

A full-stack portfolio application built with Next.js 15, demonstrating real-world patterns including credential authentication, protected admin routes, live API integration, and a PostgreSQL database.

## Tech Stack

- **Next.js 15** (App Router, server components, API routes)
- **React 19** + **TypeScript**
- **Prisma 6** — ORM with PostgreSQL
- **NextAuth v4** — JWT credential authentication
- **Tailwind CSS v4** — Space-themed dark UI
- **Zod** — Schema validation
- **bcryptjs** — Password hashing

## Features

- Public pages: Home, About (NASA APOD live data), Contact form
- Credential login with NextAuth + bcryptjs password hashing
- Role-based admin panel (Users, Contact Submissions)
- Full Prisma → PostgreSQL data flow
- Deployed on Vercel

## Local Setup

### 1. Clone and install

```bash
git clone https://github.com/ziljian19/space-command.git
cd space-command
npm install
```

### 2. Create a free PostgreSQL database

Go to [neon.tech](https://neon.tech), create a free project, and copy the connection string.

### 3. Configure environment variables

```bash
cp .env.example .env
```

Fill in `.env`:

```env
DATABASE_URL="postgresql://..."   # from Neon
NEXTAUTH_SECRET="..."             # openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"
NASA_API_KEY="DEMO_KEY"           # or get a free key at api.nasa.gov
```

### 4. Run migrations and seed

```bash
npx prisma migrate dev --name init
npm run db:seed
```

The seed creates a default admin account: `admin@spacecommand.dev` / `admin123`

### 5. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploying to Vercel

1. Push to GitHub
2. Import the repo in [vercel.com](https://vercel.com)
3. Add environment variables in Vercel project settings:
   - `DATABASE_URL` — your Neon connection string
   - `NEXTAUTH_SECRET` — a random 32-char string
   - `NEXTAUTH_URL` — your Vercel deployment URL (e.g. `https://space-command.vercel.app`)
   - `NASA_API_KEY` — optional, `DEMO_KEY` works for low traffic
4. Deploy — Vercel runs `prisma generate && next build` automatically

## Live Demo

[Vercel URL coming soon]

---

Built by Todd Jackson — [greenappledirty.com](https://greenappledirty.com)
