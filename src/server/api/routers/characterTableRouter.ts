import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../trpc";


export const characterTableRouter = createTRPCRouter({

  getCharacter: protectedProcedure.query(async ({ ctx }) => {
    const userId = String(ctx.session.user.id)
    const characters = await ctx.db.character.findMany({
    where: {
      userId: userId,  // Ensure you filter based on the session user ID
    },
    select: {
      userId: true,
      user: {
        select: {
          name: true,
        },
      },
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
      // status: true,
      Race: true,
    }
  });

    return characters ?? null;  // Return the found character or null if none
  }),
})

