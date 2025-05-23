import { PrismaClient } from '@prisma/client';

// Add prisma to the global type definition in development to prevent multiple instances
declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export { prisma }; 