"use client";

import React from "react"
import { BsFillTrashFill,  BsFillPencilFill} from "react-icons/bs"
import "./table.css"
import { useState } from 'react';
import { string } from "zod";


  interface RowData {
    user: string;
    character: string; 
    level: number;
    Hp: number;
    STR: number; 
    DEX: number; 
    CON: number; 
    INT: number; 
    WIS: number;
    CHAR: number;
    status: string;
  }


interface TableProps {
    rows: RowData[]
    deleteRow: (index: number) => void;
}

export const Table = () => {
    const rows= [
      { user: "mimigiojacksnow", character: "Rayla", level: 8, Hp: 46, STR: 9, DEX: 20, CON: 12, INT: 6, WIS: 22, CHAR: 20, status: "live" },
      { user: "mimigiojacksnow", character: "Big", level: 20, Hp: 500, STR: 24, DEX: 20, CON: 12, INT: 6, WIS: 22, CHAR: 20, status: "dead" },
      { user: "mimigiojacksnow", character: "Something", level: 200, Hp: 46, STR: 9, DEX: 20, CON: 12, INT: 6, WIS: 22, CHAR: 20, status: "dead" },
    ]
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
                                <td>{row.character}</td>
                                <td>{row.level}</td>
                                <td>{row.Hp}</td>
                                <td>{row.STR}</td>
                                <td>{row.DEX}</td>
                                <td>{row.CON}</td>
                                <td>{row.INT}</td>
                                <td>{row.WIS}</td>
                                <td>{row.CHAR}</td>
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

