'use client'

import { useRouter } from "next/navigation";

export default function SidebarButtons({ session }: { session: any }) {
  const router = useRouter();
  
  return (
    <>
      <button className="side-bar-btn" onClick={() => router.push("/")}>Home</button>
      {session?.user && (
        <>
          <button className="side-bar-btn" onClick={() => router.push("/PlayerPage")}>Player</button>
          <button className="side-bar-btn" onClick={() => router.push("/DungeonMasterPage")}>DM</button>
        </>
      )}
    </>
  );
}