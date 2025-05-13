'use client'

import { useRouter } from "next/navigation"

// Admin Page
export function AdminPage() {
    const router = useRouter();

    // move to AdminPage if the user clicks on AdminPage
    const handleClick = () => {
        router.push("/DungeonMasterPage")
    };

    return (
        //Button 
        <button 
            onClick={handleClick}
            className="bg-blue-600 text-white px-4 py-2 roundered">    
            DM PAGE
        </button>
    ) 
}

export function PlayerPage () {
    const router = useRouter() 

    const handleClick = () => {
        router.push("/PlayerPage")
    };

    return (
        //Button 
        <button 
            onClick={handleClick}
            className="bg-blue-600 text-white px-4 py-2 roundered">    
            Player Page        
        </button>
    )
    
}