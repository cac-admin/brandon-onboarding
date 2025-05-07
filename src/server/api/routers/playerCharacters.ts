import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()


import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const playerCharactersRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    return await prisma.user.findMany();
  }),
});

