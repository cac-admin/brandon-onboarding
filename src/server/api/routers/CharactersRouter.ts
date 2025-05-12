import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { PrismaClient } from "src/generated/prisma/client";
import { Prisma } from "~/generated/prisma";

export const db = new PrismaClient();


const userWithCharacters = await db.user.findUnique({
  where: {
    id: "", // The user ID
  },
  include: {
    characters: true , // Include all characters related to this user
  },
});

export const characterRouter = createTRPCRouter({
  
  create: publicProcedure
  .input(
    z.object({
      name: z.string(),
      class: z.string(),
      level: z.number(),
      hp: z.number(),
      str: z.number(),
      dex: z.number(),
      con: z.number(),
      int: z.number(),
      wis: z.number(),
      char: z.number(),
      race: z.number(),
      status: z.enum(["live", "dead", "draft"]),
    })
  )
  .mutation(async({ input, ctx }) => {
    const userId = ctx.session?.user.id;
    return db.character.create({
      data: {
        name: input.name,
        class: input.class,
        level: input.level,
        currentHp: input.hp,
        maxHp: input.hp,
        str: input.str,
        dex: input.dex,
        con: input.con,
        int: input.int,
        wis: input.wis,
        char: input.char,
        user: {
          connect: { id: userId }
        },

        Race: {
          connect: { id: 1 },
        },

        feats: {
          connect: [],
        }
      }
    })
  })
  
})

