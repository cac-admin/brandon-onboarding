import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { characterTableRouter, FeatRouter, RaceRouter, characterUpdateRouter, CharacterDelete } from "./routers/characterTableRouter";
import { characterRouter } from "./routers/CharactersRouter";

/**

 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  addCharacter: characterRouter,
  playerCharacters: characterTableRouter,
  feats: FeatRouter,
  updateCharacter: characterUpdateRouter,
  race: RaceRouter,
  delete: CharacterDelete
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
