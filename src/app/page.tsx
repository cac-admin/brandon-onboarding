import Link from "next/link";
import { auth } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";

import { HomePage, AdminPage, PlayerPage } from "./_components/PageHandler";

export default async function Home() {
  const session = await auth();

   return (
      <div className="App">
        <div className="header">
          <h1>Welcome to D&D Manager</h1>
        </div>        

        {/* Checks if the user has logged in, if not "display "Please Log In" */}
        {!session?.user&& (
        <p className="text-center text-2xl text-black">
          Please log in
        </p>

        )}

        {/* A session must be used in order for the rest of the side bar to be displayed */}
        <div className = "side-bar">
          <HomePage />
          {session?.user && (
              <><AdminPage />
              <PlayerPage /></>
          )}
        </div>
        {session && <span>Logged in as {session.user?.name}</span>}
          
          <Link
            href={session ? "/api/auth/signout" : "/api/auth/signin"}
            className="rounded-full bg-gray/10 px-10 py-3 font-semibold no-underline transition hover:bg-gray/20"
          >
            {session ? "Sign out" : "Sign in"}
          </Link>
        </div>
  );
}

