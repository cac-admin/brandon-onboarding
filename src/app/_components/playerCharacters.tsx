"use client";

import { useState } from "react";
import { PrismaClient } from "@prisma/client";
import { api } from "~/trpc/react";

const PlayerData = () => {
    const { data: users, isLoading } = api.playerCharacters.getAll.useQuery()

    return (
        <table> 
            <thead>
                <tr>
                    <th>
                        <ul>
                        {users?.map((user) => (
                            <li key={user.id}>
                                {user.name} - {user.email}
                            </li>
                            ))}
                        </ul>
                    </th>    
                </tr>
            </thead>
        </table>
        
    )
}

export default PlayerData
