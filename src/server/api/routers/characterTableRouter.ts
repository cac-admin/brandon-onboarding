import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../trpc";


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

