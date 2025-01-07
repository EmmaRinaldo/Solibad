import { PrismaClient } from "@prisma/client";

let prisma;

// Assure que Prisma ne se recrée pas en mode développement
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
