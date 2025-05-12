import { z } from "zod";
import { PrismaClient } from "src/generated/prisma/client";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const prisma = new PrismaClient()

export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return await prisma.character.create({
        data: {
          name: input.name,
          class: input.class,
          level: input.level,

          currentHp: input.hp,
        },
      });
    }),
});