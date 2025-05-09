import Link from "next/link";
import { auth } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";

import PlayerData from "./_components/adminPlayerCharacters";
import { Table } from "./_components/table";
import { Button } from "./_components/Modal";

export default async function Home() {
  const session = await auth();
  return (
    <HydrateClient>
      <div className="App">
      <h1>Player Data</h1>
        <Table/>
        <Button />
          <p className="text-center text-2xl text-black">
          
            {session && <span>Logged in as {session.user?.name}</span>}
          </p>
          <Link
            href={session ? "/api/auth/signout" : "/api/auth/signin"}
            className="rounded-full bg-gray/10 px-10 py-3 font-semibold no-underline transition hover:bg-gray/20"
          >
            {session ? "Sign out" : "Sign in"}
          </Link>
        </div>
    </HydrateClient>
  );
}
