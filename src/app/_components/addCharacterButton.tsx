"use client";

import React, { useState} from 'react'
import type { number } from 'zod';
import { api } from "~/trpc/react";

const AddCharacterButton = () => {
    const [character, setCharacter] = React.useState([{ 
        id: "",
        name: "",
        class: "",
        level: 3,
        currentHp: 0,
        maxHp: 0,
        str: 0,
        dex: 0,
        con: 0, 
        int: 0, 
        wis: 0, 
        char: 0,
    }])
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { name, value } = e.target;
        // Ensure that the index exists and update the state
        setCharacter((prevCharacters) => {
        const updatedCharacters = [...prevCharacters];
        if (updatedCharacters[index]) {
          updatedCharacters[index] = {
            ...updatedCharacters[index],
            [name]: value,
          };
        }
        return updatedCharacters;
      });
    }

    const addRow = () => {
        setCharacter([
          ...character,
          {
            id: "",
            name: "",
            class: "",
            level: 3,
            currentHp: 0,
            maxHp: 0,
            str: 0,
            dex: 0,
            con: 0,
            int: 0,
            wis: 0,
            char: 0,
          },
        ]);
    }

};

export default AddCharacterButton;