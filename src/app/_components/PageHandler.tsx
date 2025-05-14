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
       <button className = "btn" onClick={handleClick} > DM </button>
    ) 
}

export function PlayerPage () {
    const router = useRouter();

    // Moves to PlayerPage when clicked 
    const handleClick = () => {
        router.push("/PlayerPage")
    };

    return (
        //Button 
        <button className = "btn" onClick={handleClick} >Player</button>
    )
}

// Moves to HomePage when clicked 
export function HomePage() {
    const router = useRouter();

    const handlClick = () => {
        router.push("/")
    }

    return (
        <button className="btn" onClick={handlClick}>Home</button>
    )
}