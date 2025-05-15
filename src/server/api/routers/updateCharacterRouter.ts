import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export const characterUpdateRouter = createTRPCRouter({
  updateCharacter: publicProcedure
    .input(
      z.object({
        id: z.number(),
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
        feats: z.number().array(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session?.user.id;
      return db.character.update({
        where: {id: input.id},
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
            connect: { id: userId },
          },
          Race: {
            connect: { id: input.race },
          },
          feats: {
            connect: input.feats.map((id) => ({ id }))
          }
        },
      });
    }),
});
