import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { email, name, role = "user", password } = await req.json();
  if (!email || !password) return NextResponse.json({ error: "Missing email or password" }, { status: 400 });

  try {
    const hash = await bcrypt.hash(password, 10);
    const created = await prisma.user.create({ data: { email, name, role, password: hash } });
    return NextResponse.json({ id: created.id });
  } catch (e: unknown) {
    if (e instanceof Error && (e as { code?: string }).code === "P2002") return NextResponse.json({ error: "Email already exists" }, { status: 409 });
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
