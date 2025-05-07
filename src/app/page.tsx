import Link from "next/link";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import PlayerData from "./_components/playerCharacters";
import React from 'react';

export default async function Home() {
  const session = await auth();

  return (

      <HydrateClient>
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
              <div className="flex flex-col items-center justify-center gap-4">
                <div>
                  <h1>Player Data</h1>
                </div>
                  <table>
                    <thead>
                      <tr> 
                        <th>User</th>
                        <th>Character</th>
                        <th>Level</th>
                        <th>HP</th>
                        <th>STR</th>
                        <th>DEX</th>
                        <th>CON</th>
                        <th>INT</th>
                        <th>WIS</th>
                        <th>CHAR</th>
                      </tr>
                    </thead>
                  </table>
                <div>
                    <PlayerData /> 
                </div>

                <p className="text-center text-2xl text-white">
                
                  {session && <span>Logged in as {session.user?.name}</span>}
                </p>
                <Link
                  href={session ? "/api/auth/signout" : "/api/auth/signin"}
                  className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
                >
                  {session ? "Sign out" : "Sign in"}
                </Link>
              </div>
              
          </main>
      </HydrateClient>
  );
}
