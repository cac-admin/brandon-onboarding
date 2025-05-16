import { auth } from "~/server/auth";
import SidebarButtons from "./PageHandler";
import { redirect } from "next/dist/server/api-utils";

export default async function Sidebar() {
    const session = await auth();

    // if (!session?.user) {
    //     redirect("/api/auth/signin");

    // }
    return (
        <div className="side-bar">
            <SidebarButtons session={session} />
            
        </div>
    );
}