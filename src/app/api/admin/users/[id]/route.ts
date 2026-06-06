import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return null;
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const deny = await requireAdmin();
  if (deny) return deny;

  const { id } = await params;
  const { email, name, role, password } = await req.json();

  const data: Record<string, unknown> = {};
  if (email) data.email = email;
  if (name !== undefined) data.name = name;
  if (role) data.role = role;
  if (password) data.password = await bcrypt.hash(password, 10);

  try {
    const updated = await prisma.user.update({ where: { id: Number(id) }, data });
    return NextResponse.json({ id: updated.id });
  } catch (e: unknown) {
    if (e instanceof Error && (e as { code?: string }).code === "P2002")
      return NextResponse.json({ error: "Email already exists" }, { status: 409 });
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const deny = await requireAdmin();
  if (deny) return deny;

  const { id } = await params;

  try {
    await prisma.user.delete({ where: { id: Number(id) } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
