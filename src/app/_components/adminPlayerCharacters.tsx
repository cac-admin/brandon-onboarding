"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

const PlayerData = () => {
    const { data: users, isLoading } = api.playerCharacters.getByUser.useQuery()

    return (
        <> 
            {users?.map((user) => (
                <tr key={user.id}>
                    
                </tr>
            ))}
        </>
        
    )
}

export default PlayerData
