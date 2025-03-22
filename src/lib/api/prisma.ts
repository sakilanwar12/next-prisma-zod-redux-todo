import { PrismaClient } from "@prisma/client";

// Extend globalThis with PrismaClient type
declare global {
  const prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

// Only assign to global in development to avoid multiple instances
if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export default prisma;