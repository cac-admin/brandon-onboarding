import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../trpc";

import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export const characterTableRouter = createTRPCRouter({
  // Gets logged in users character only 
  getCharacter: protectedProcedure.query(async ({ ctx }) => {
    const userId = String(ctx.session.user.id)
    const characters = await ctx.db.character.findMany({
    where: {
      userId: userId,  
    },
    select: {
      userId: true,
      user: {
        select: {
          name: true,
        },
      },
      id: true,
      class: true,
      name: true,
      level: true,
      currentHp: true,
      maxHp: true,
      str: true,
      dex: true,
      con: true,
      int: true,
      wis: true,
      char: true,
      status: true,
      Race: true,
      feats: true,
    }
  });

    return characters ?? null;  // Return the found character or null if none
  }),
})

export const FeatRouter = createTRPCRouter({
  // Collects all feats in database 
  getFeats: publicProcedure.query(async ({ ctx }) => {
    const Feats = await ctx.db.feats.findMany( {
      select: {
        name: true,
        id: true,
      }
    })
    return Feats ?? null;
  }),
})

export const RaceRouter = createTRPCRouter({
  // Collects all feats in database 
  getRace: publicProcedure.query(async ({ ctx }) => {
    const Race = await ctx.db.race.findMany( {
      select: {
        name: true,
        id: true,
      }
    })
    return Race ?? null;
  }),
})

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

export const CharacterDelete = createTRPCRouter({
  deleteCharacter: publicProcedure
  .input (
    z.object ({ 
      id: z.number(),
     }))
  .mutation(async ({ ctx, input }) => {
    return ctx.db.character.delete({
      where: { id: input.id}
    })
  })
})
