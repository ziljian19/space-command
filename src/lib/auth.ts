import type { NextAuthOptions, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

interface ExtendedUser extends User {
  role: string;
}

interface ExtendedJWT extends JWT {
  role?: string;
}

interface ExtendedSession extends Session {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  };
}

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email:    { label: "Email",    type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await prisma.user.findUnique({ where: { email: credentials.email } });
        if (!user) return null;
        const ok = await bcrypt.compare(credentials.password, user.password);
        if (!ok) return null;
        return {
          id:    String(user.id),
          email: user.email,
          name:  user.name ?? "User",
          role:  user.role,
        } as ExtendedUser;
      },
    }),
  ],
  pages: { signIn: "/login" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) (token as ExtendedJWT).role = (user as ExtendedUser).role;
      return token;
    },
    async session({ session, token }) {
      (session as ExtendedSession).user.role = (token as ExtendedJWT).role;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
