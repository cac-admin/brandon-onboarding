import { z } from "zod";
import { PrismaClient } from "~/generated/prisma";
import { createTRPCRouter, publicProcedure } from "../trpc";

const prisma = new PrismaClient()

export const playerCharactersRouter = createTRPCRouter({
  getByUser: publicProcedure.query(async ({}) => {
    
    return await prisma.user.findMany();
  }),
});

