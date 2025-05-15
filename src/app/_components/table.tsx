"use client";

import React, { useState } from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import "./table.css";
import { api } from "~/trpc/react";
import { useMutation } from "@tanstack/react-query";
import { number } from "zod";

// Defining input fields 
type characterUpdateInput = {
  id: number; 
  name: string;
  class: string;
  level: number;
  currentHp: number;
  maxHp: number;
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  char: number;
  Race: { name: string; id: number; abilities: string };
  feats: { name: string; id: number; description: string }[];
}

export const Table = () => {
  const utils = api.useUtils();
  // Local state for editable form rows
  const [formRows, setFormRows] = useState<Record<number, any>>({});

  const { data: rows, isLoading } = api.playerCharacters.getCharacter.useQuery();


  const { data: race, isLoading: raceLoading } = api.race.getRace.useQuery();

  const { data: feats, isLoading: featsLoading } = api.feats.getFeats.useQuery();


  // Refreshes page whenever data has been updated 
  const updateCharacter = api.updateCharacter.updateCharacter.useMutation({
    onSuccess: async () => {
      await utils.playerCharacters.getCharacter.invalidate();
    },
    onError: (error) => {
      console.error("Error updating character:", error);
    },
    });

    
  if (isLoading) return <p>Loading Characters...</p>;
  if (!rows) return <p>There are no characters</p>;
  
  if (raceLoading) return <p>Retrieving Race...</p>;
  if (!race) return <p>Error, no race data</p>;  

  if (isLoading || featsLoading) return <p>Retrieving Feats</p>
  if (!rows || !feats) return <p>Error, are no rows</p>

    const handleChange = (id: number, field: any, value: any) => {
      
      console.log(id, field, value);
      // Retrieves the rows data and then updates field 
      setFormRows((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          [field]: value,
        },
      }));
    };

    // Handles any input changes that may have occured during the 
    const handleSubmit = (originalCharacter: characterUpdateInput) => {
      
      const updateData = {
        ...originalCharacter,
        ...formRows[originalCharacter.id],
      }

      // updates the database based off user interaction 
      updateCharacter.mutate({
        id: updateData.id,
        name: updateData.name,
        class: updateData.class,
        level: updateData.level,
        hp: updateData.currentHp,
        str: updateData.str,
        dex: updateData.dex,
        con: updateData.con,
        int: updateData.int,
        wis: updateData.wis,
        char: updateData.char,
        race: updateData.Race.id, 
        feats: updateData.feats.map((feat: { id: any; }) => feat.id),
});

    };

  return (
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Character</th>
              <th>Level</th>
              <th>Class</th>
              <th>HP</th>
              <th>STR</th>
              <th>DEX</th>
              <th>CON</th>
              <th>INT</th>
              <th>WIS</th>
              <th>CHAR</th>
              <th>Race</th>
              <th>Feats</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const rows = formRows[row.id] ?? row;
              
              
              let numDropdowns = Math.floor(row.level / 4); 
              console.log(numDropdowns)
              if (row.level == 20) {
                  numDropdowns -= 1;
              }

              if (row.level > 19) {
                  numDropdowns += 1;
              }
              return (
                <tr key={row.id}>
                  <td> 
                    <input 
                      name={'name:' + row.id}  
                      defaultValue={row.name}
                      onChange = {(e) => handleChange(row.id, "name", e.target.value)} 
                    /> 
                  </td>
                  <td> 
                    <input 
                      name={'level' + row.id}  
                      defaultValue={row.level} 
                      onChange = {(e) => handleChange(row.id, "level", Number(e.target.value))} 
                    /> 
                  </td>
                  <td> 
                    <input 
                        name={"class" + row.id}  
                        defaultValue={row.class}
                        onChange = {(e) => handleChange(row.id, "class", e.target.value)}
                      /> 
                  </td>
                  <td> 
                    <input 
                      type="number"  
                      name={"currentHp" + row.id} 
                      defaultValue={row.currentHp} 
                      onChange = {(e) => handleChange(row.id, "currentHp", Number(e.target.value))}
                    /> 
                  </td>
                  <td> 
                    <input 
                      type="number"  
                      name={"str" + row.id} 
                      defaultValue={row.str} 
                      onChange={(e) => handleChange(row.id, "str", Number(e.target.value))}
                    /> 
                  </td>
                  <td> 
                    <input 
                      type="number"  
                      name={"dex" + row.id} 
                      defaultValue={row.dex} 
                      onChange={(e) => handleChange(row.id, "dex", Number(e.target.value))}
                    />
                  </td>
                  <td> 
                    <input 
                      type="number" 
                      name={"con" + row.id} 
                      defaultValue={row.con} 
                      onChange = {(e) => handleChange(row.id, "con", Number(e.target.value))}
                    />  
                  </td>
                  <td> 
                    <input 
                      type="number"  
                      name={"int" + row.id} 
                      defaultValue={row.int} 
                      onChange={(e) => handleChange(row.id, "int", Number(e.target.value))}
                    />   
                  </td>         
                  <td> <input 
                      type="number"  
                      name={"wis" + row.id} 
                      defaultValue={row.wis} 
                      onChange={(e) => handleChange(row.id, "wis", Number(e.target.value))}

                    />  
                  </td>         
                  <td> 
                    <input 
                      type="number"  
                      name={"char" + row.id} 
                      defaultValue={row.char} 
                      onChange={(e) => handleChange(row.id, "char", Number(e.target.value))}
                    /> 
                  </td>    
                  <td> 
                    <select
                      className="p-2 border rounded mr-2 mb-2"
                      defaultValue={rows.Race?.id}
                      onChange={(e) => {
                      const selectedId = Number(e.target.value);
                      const selectedRace = race.find((r) => r.id === selectedId);
                      if (selectedRace) {
                        handleChange(row.id, "Race", selectedRace);
                      }
                    }}
                    >
                      <option>Select a Race</option>
                      {race.map((raceOption) => (
                        <option key={raceOption.id} 
                        value={raceOption.id} >
                        {raceOption.name}
                        </option>
                      ))}
                    </select>
                  </td> 
                  <td> {Array.from({ length: numDropdowns }).map((_, i) => ( 
                  <select 
                    key={i} 
                    className="p-2 border rounded mr-2 mb-2"
                    onChange={(e) => {
                    const selectedId = Number(e.target.value);
                    const selectedFeat = feats.find((f) => f.id === selectedId);
                    if (selectedFeat) {
                      // Get existing feats from form state or fall back to original feats
                      const existingFeats = formRows[row.id]?.feats ?? [...row.feats];

                      // Clone array and update just the one at index `i`
                      const updatedFeats = [...existingFeats];
                      updatedFeats[i] = selectedFeat;

                      // Update form row with updated feats
                      handleChange(row.id, "feats", updatedFeats)
                    }}}
                    >

                    {/* Initial feat if user has not chosen one yet  */}
                    <option>Select a Feat</option> 
                    {/* Showcase the feats that the user can choose from */}
                    {feats.map((feat, idx) => (
                      <option key={idx} value={feat.id}>{feat.name}</option>
                    ))}
                  </select>
                ))} 
                </td>
                  <td> 
                    <button type="button" onClick={() => handleSubmit(row)} className="btn"> Save </button>                  
                    </td>
                </tr>

              );
            })} 
          </tbody>
        </table>
      </div>
  );
};