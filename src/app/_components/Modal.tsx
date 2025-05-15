"use client";

import React, { useState } from "react";
import { api } from "~/trpc/react"; 

interface ModalProps {
closeModal: () => void;
}

function closeModal() {
    throw new Error("Function not implemented.");
}

export const Modal: React.FC<ModalProps> = ({ closeModal }) => {
    const utils = api.useUtils();
    
    // Some default values 
    const [form, setForm] = useState ({
        name: "",
        class: "",
        level: 1,
        hp: 10,
        str: 10,
        dex: 10,
        con: 10,
        int: 10,
        wis: 10,
        char: 10,
        race: 1,
    });

    // 
    const createCharacter = api.addCharacter.create.useMutation({
        onSuccess: async () => {
            closeModal();
            await utils.playerCharacters.invalidate();

        },
        onError: (error) => {
            console.error("Error creating Character", error)
        },
    })

    // Handles the submit of the form, storing form data into database. 
    const handleSubmit  = (e: React.FormEvent) => {
        e.preventDefault();
        createCharacter.mutate({
            name: form.name,
            class: form.class,
            level: form.level,
            hp: form.hp,
            str: form.str,
            dex: form.dex,
            con: form.con,
            int: form.int,
            wis: form.wis,
            char: form.char,
            race: form.race,
            // status: form.status,
        }) 
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
        ) => {
        const { name, value } = e.target

        setForm((prev) => ({
            ...prev, 
            [name]:
            ["level", "hp", "str", "dex", "con", "int", "wis", "char", "race"].includes(name)
            ? parseInt(value)
            : value,
        }))
    }
    return (
        // Closes window when user clicks on backdrop 
        <div
            className="modal-container"
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                if ((e.target as HTMLDivElement).className === 'modal-container') {
                    closeModal();
                }
            }}
            >
            {/* dashboard */}
            <div className="modal"> 
                <form onSubmit={handleSubmit}>
                    <div className="form-group"> 
                        <label htmlFor="name">Name</label>
                        <input name="name" value={form.name} onChange = {handleChange} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor='class'>Class</label>
                        <input name="class" value={form.class} onChange = {handleChange} required/>
                    </div>
                    <div className="form-group"> 
                        <label htmlFor="level">Level</label>
                        <input name="level" type="number" value={form.level} onChange = {handleChange} required/>
                    </div>
                    <div className="form-group"> 
                        <label htmlFor="hp">HP</label>
                        <input name="hp" value={form.hp} onChange = {handleChange} required/>
                    </div>
                    <div className="form-group"> 
                        <label htmlFor="str">STR</label>
                        <input name="str" value={form.str} onChange = {handleChange} required/>
                    </div>
                    <div className="form-group"> 
                        <label htmlFor="dex">DEX</label>
                        <input name="dex" value={form.dex} onChange = {handleChange} required/>
                    </div>
                    <div className="form-group"> 
                        <label htmlFor="con">CON</label>
                        <input name="con" value={form.con} onChange = {handleChange} required/>
                    </div>
                    <div className="form-group"> 
                        <label htmlFor="int">INT</label>
                        <input name="int" value={form.int} onChange = {handleChange} required/>
                    </div>
                    <div className="form-group"> 
                        <label htmlFor="wis">WIS</label>
                        <input name="wis" value={form.wis} onChange = {handleChange} required/>
                    </div>
                    <div className="form-group"> 
                        <label htmlFor="char">CHAR</label>
                        <input name="char" value={form.char} onChange = {handleChange} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="race">Race</label>
                        <select name="race">
                            <option value = {1}>Human</option>
                        </select>
                    </div>
                    <div className="form-group"> 
                        <label htmlFor="status">Status</label>
                        <select name="status">
                            <option value="live">Live</option>
                            <option value="dead">Dead</option>
                            <option value="draft">Draft</option>
                        </select>  
                    </div>
                    {/* Submit button to add in new data */}
                    <button type="submit" className="btn">Submit</button>
                </form>
            </div>
        </div>
    )
};

// Button to activate the modal
export const Button = () => {
    const [modelOpen, setModelOpen] = useState(false);

    return (
        <>
            <button className="btn" onClick={() => setModelOpen(true)}>Add</button>
            {modelOpen && <Modal closeModal={() => setModelOpen(false)} />}
        </>
    )
}

function AsyncResource() {
    throw new Error("Function not implemented.");
}



