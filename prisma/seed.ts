import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { email: "admin@spacecommand.dev" },
    update: {},
    create: {
      email: "admin@spacecommand.dev",
      name: "Admin",
      password: passwordHash,
      role: "admin",
    },
  });
  console.log("Seeded admin@spacecommand.dev");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
