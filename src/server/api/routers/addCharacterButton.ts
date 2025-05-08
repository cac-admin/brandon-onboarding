import { z } from "zod";
import { PrismaClient } from "~/generated/prisma";
import { createTRPCRouter, publicProcedure } from "../trpc";

const prisma = new PrismaClient()

export const addCharacterButton = createTRPCRouter({
  getByUser: publicProcedure.query(async ({ ctx }) => {

    if (!ctx.session){
      throw new Error("not authenticated");
    }
    
    const newPc = await prisma.pc.create({
    data: {
      name: "Blank name",
      class: "some class",
      level: 3,
      currentHp: 3,
      maxHp: 2,
      str: 3,
      dex: 3,
      con: 3,
      int: 3,
      wis: 3,
      char: 3,
      userId: ctx.session.user.id,
      raceId: 1,
    },
  })
    return newPc;
  }),
});

