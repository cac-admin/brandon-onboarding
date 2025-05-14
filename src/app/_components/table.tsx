"use client";

import React, { useState, useEffect } from "react"
import { BsFillTrashFill,  BsFillPencilFill} from "react-icons/bs"
import "./table.css"
import { PrismaClient } from "@prisma/client";

import { api } from "~/trpc/react";

export const prisma = new PrismaClient();



export const Table = () => {
    
    // Query's the table and stores it in data: rows. Is loading is used to check if player recieved data 
    const { data: rows, isLoading } = api.playerCharacters.getCharacter.useQuery(); 

    // If the table is loading, display "loading Characers..."
    if (isLoading) {
        return <p> Loading Characters...</p>
    }

    // If the player has no players, display "There are no characters"
    if (!rows) {
        return 
        <p>There are no characters</p>
    }

    return ( 
        <div className="table-wrapper">
            <table className="table">
                <thead>
                    <tr> 
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
                        <th>Feats</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>

                    {/* Displays the users stored characters from the database  */}
                    {rows.map((row, idx) => {
                        return (
                            <tr key = {idx}>
                                <td>{row.name}</td>
                                <td>{row.level}</td>
                                <td>{row.maxHp}</td>
                                <td>{row.str}</td>
                                <td>{row.dex}</td>
                                <td>{row.con}</td>
                                <td>{row.int}</td>
                                <td>{row.wis}</td>
                                <td>{row.char}</td>
                                <td></td>
                                {/* Display users feats (Note it is an array) */}
                                <td> <Feats characterId={row.id}/></td>
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

type FeatsProp = {
    characterId: number
}

// Creates a drop down for the feats, which allows users to select a feat and save it 
export const Feats = ({ characterId }: FeatsProp) => {
    const { data: rows, isLoading } = api.playerCharacters.getCharacter.useQuery(); 
    const { data: feats, isLoading: featsLoading } = api.feats.getFeats.useQuery();

    if (isLoading || featsLoading) {
        return <p>Retrieving Feats</p>
    }
    if (!rows || !feats) {
        return <p>Error, are no rows</p>
    }

    // Finds character associated with the id 
    const character = rows.find((c) => c.id === characterId)
    if(!character) {
        return <p>Character not found</p>
    }

    // Calculates the number of feats the user should have (note characters do not gain a feat at 20 but instead 19) 
    let numDropdowns = Math.floor(character.level / 4); 

    if (character.level == 20) {
        numDropdowns -= 1;
    }

    if (character.level > 19) {
        numDropdowns += 1;
    }

    return (
        <div
        style = {{ display: 'flex', flexWrap: 'wrap' }}>
        {Array.from({ length: numDropdowns }).map((_, i) => ( // Creates selected fields based on character level
        <select 
            key={i} 
            className="p-2 border rounded mr-2 mb-2"
            defaultValue={character.feats?.[i]?.name ?? ""} // Sets the value of feat based on previously chosen feats
            style={{ flex: '0 0 48%' }}
        >
          <option>Select a Feat</option> 
          {feats.map((feat, idx) => (
            <option key={idx}>{feat.name}</option>
          ))}
        </select>
      ))}
    </div>
  );
};

export const Save = () => {

}