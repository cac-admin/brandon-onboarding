"use client";

import React from "react"
import { BsFillTrashFill,  BsFillPencilFill} from "react-icons/bs"
import "./table.css"
import { PrismaClient } from "src/generated/prisma/client";
import { useState, useEffect } from "react";
import { Chathura } from "next/font/google";

export const prisma = new PrismaClient();


  interface RowData {
    user: string;
    name: string;
    level: number;
    Hp: number;      // Correct field name
    maxHp: number;
    STR: number;     // Correct field name
    DEX: number;     // Correct field name
    CON: number;     // Correct field name
    INT: number;     // Correct field name
    WIS: number;     // Correct field name
    CHA: number;     // Correct field name
    status: string;  // Correct field name
    }   


interface TableProps {
    rows: RowData[]
    deleteRow: (index: number) => void;
}




export const Table = () => {
    
    
    const [rows, setRows] = useState<RowData[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const characters = await prisma.character.findMany({
                select: {
                    name: true,        // Select the character's name
                    class: true,       // Select the character's class
                    level: true,       // Select the character's level
                    currentHp: true,   // Select the current HP of the character
                    maxHp: true,       // Select the max HP of the character
                    str: true,         // Select the STR stat
                    dex: true,         // Select the DEX stat
                    con: true,         // Select the CON stat
                    int: true,         // Select the INT stat
                    wis: true,         // Select the WIS stat
                    char: true,        // Select the CHA stat
                    status: true,      // Select the character's status
                    user: {            // Include related user data
                    select: {
                        name: true,    // Select only the name field from the user model
                    },
                },
            },
        })
        const formattedRows = characters.map((character) => ({
            user: character.user?.name || "unkown",
            name: character.name,
            class: character.class,
            level: character.level,
            Hp: character.currentHp,
            maxHp: character.maxHp,
            STR: character.str,
            DEX: character.dex,
            CON: character.con,
            INT: character.int,
            WIS: character.wis,
            CHA: character.char,
            status: character.status?.[0]?.Alive ?? "Unknown", 
        }));
        
        setRows(formattedRows)
    };

    fetchData()
}, []);
    return ( 
        <div className="table-wrapper">
            <table className="table">
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
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, idx) => {
                        const statusText = row.status.charAt(0).toUpperCase() + row.status.slice(1);
                        return (
                            <tr key = {idx}>
                                <td>{row.user}</td>
                                <td>{row.name}</td>
                                <td>{row.level}</td>
                                <td>{row.Hp}</td>
                                <td>{row.STR}</td>
                                <td>{row.DEX}</td>
                                <td>{row.CON}</td>
                                <td>{row.INT}</td>
                                <td>{row.WIS}</td>
                                <td>{row.CHA}</td>
                                <td>
                                    <span className={`label label-${row.status}`}>
                                        {row.status}
                                    </span>

                                </td>
                                <td className="actions">
                                    <BsFillTrashFill className = "delete-btn >" />
                                    <BsFillPencilFill />   
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

