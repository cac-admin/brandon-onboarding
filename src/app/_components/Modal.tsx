"use client";

import React, { useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { api } from "~/trpc/react"; 
import "./Modal.css";
import "./table.css";


interface ModalProps {
closeModal: () => void;
}

function closeModal() {
    throw new Error("Function not implemented.");
}

export const Modal: React.FC<ModalProps> = ({ closeModal }) => {
    const utils = api.useUtils();
    const { data: race, isLoading: raceLoading } = api.race.getRace.useQuery();
    
    const createCharacter = api.addCharacter.create.useMutation({
        onSuccess: async () => {
            closeModal();
            await utils.playerCharacters.invalidate();

        },
        onError: (error) => {
            console.error("Error creating Character", error)
        },
    })
    if (raceLoading) return <p>Retrieving Race...</p>;
    if (!race) return <p>Error, no race data</p>;  
    // Handles the submit of the form, storing form data into database. 
    const handleSubmit  = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        console.log(formData.get("race"))

        createCharacter.mutate({
            name: formData.get("name") as string,
            class: formData.get("class") as string,
            level: Number(formData.get("level")),
            hp: Number(formData.get("hp")),
            str: Number(formData.get("str")),
            dex: Number(formData.get("dex")),
            con: Number(formData.get("con")),
            int: Number(formData.get("int")),
            wis: Number(formData.get("wis")),
            char: Number(formData.get("char")),
            race: Number(formData.get("race")),
            // status: formData.get("status") as string,
        }) 
    }
    return (
        // Closes window when user clicks on backdrop 
        <div
            className="modal-container"
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                if ((e.target as HTMLDivElement).className === 'modal-container') { closeModal(); }
            }}
        >
        {/* dashboard */}
            <div className="modal"> 
                <form onSubmit={handleSubmit}>
                    <div className="form-group"> 
                        <label htmlFor="name">Name</label>
                        <input name="name" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor='class'>Class</label>
                        <input name="class" required/>
                    </div>
                    <div className="form-group"> 
                        <label htmlFor="level">Level</label>
                        <input name="level" type="number"  required/>
                    </div>
                    <div className="form-group"> 
                        <label htmlFor="hp">HP</label>
                        <input name="hp"  required/>
                    </div>
                    <div className="form-group"> 
                        <label htmlFor="str">STR</label>
                        <input name="str"  required/>
                    </div>
                    <div className="form-group"> 
                        <label htmlFor="dex">DEX</label>
                        <input name="dex"  required/>
                    </div>
                    <div className="form-group"> 
                        <label htmlFor="con">CON</label>
                        <input name="con" required/>
                    </div>
                    <div className="form-group"> 
                        <label htmlFor="int">INT</label>
                        <input name="int" required/>
                    </div>
                    <div className="form-group"> 
                        <label htmlFor="wis">WIS</label>
                        <input name="wis" required/>
                    </div>
                    <div className="form-group"> 
                        <label htmlFor="char">CHAR</label>
                        <input name="char" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="race">Race</label>
                        <select name="race"
                            className="p-2 border rounded mr-2 mb-2"
                        >
                            <option key = {0}>Select a Race</option>
                            {race.map((raceOption) => (
                                <option key={raceOption.id} 
                                value={raceOption.id} >
                                {raceOption.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* <div className="form-group"> 
                        <label htmlFor="status">Status</label>
                        <select name="status">
                            <option value="live">Live</option>
                            <option value="dead">Dead</option>
                            <option value="draft">Draft</option>
                        </select>  
                    </div> */}
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

// Warning for when user tries to delete a character 
export const Warning: React.FC<ModalProps & { rowId: number }>  = ({ closeModal, rowId }) => {
    const utils = api.useUtils();
    
     // Update page if user deletes a character
    const deleteCharacter = api.delete.deleteCharacter.useMutation({
    onSuccess: async () => {
      await utils.playerCharacters.getCharacter.invalidate();
    },
     onError: (error) => {
      console.error("Error deleting character:", error);
    },
  });
  return (
   <div
    className="modal-container"
    onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        if ((e.target as HTMLDivElement).className === 'modal-container') { closeModal(); }
    }}
    >
        {/* dashboard */}
        <div className="modal"> 
            <h2 style={{ fontSize: "1.2rem", fontWeight: "bold" }} >
                Warning, you are about to permanently delete this character. Proceed?
            </h2>
            <div className="warning-btns" style={{ }}>
                <button className="btn" onClick={closeModal} > Cancel </button>
                <button className="final-delete-btn" onClick={() => deleteCharacter.mutate({id: rowId})} > Delete </button>
            </div>
        </div>
    </div>
    ) 
}

// Actual button to open modal
export const WarningButton = ({ id }: {id:number}) => {
    const [modelOpen, setModelOpen] = useState(false);    
        return (
        <>
            <BsFillTrashFill
                className="delete-btn"
                style={{ cursor: "pointer" }}
                onClick={() => setModelOpen(true)}
            />
            {modelOpen && (
                <Warning
                rowId={id} 
                closeModal={() => setModelOpen(false)}
            />
        )}
    </>
  ); 
}

function AsyncResource() {
    throw new Error("Function not implemented.");
}



