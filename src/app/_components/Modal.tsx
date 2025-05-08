"use client";

import React from 'react'
import { useState } from 'react';

import "./Modal.css";

export const Modal = () => {
    return (
        <div className="modal-container">
            <div className="modal"> 
                <form>
                    <div className="form-group"> 
                        <label htmlFor="name">Name</label>
                        <input name="name" />
                    </div>
                    <div className="form-group"> 
                        <label htmlFor="level">Level</label>
                        <input name="level" />
                    </div>
                    <div className="form-group"> 
                        <label htmlFor="hp">HP</label>
                        <input name="hp" />
                    </div>
                    <div className="form-group"> 
                        <label htmlFor="str">STR</label>
                        <input name="str" />
                    </div>
                    <div className="form-group"> 
                        <label htmlFor="dex">DEX</label>
                        <input name="dex" />
                    </div>
                    <div className="form-group"> 
                        <label htmlFor="con">CON</label>
                        <input name="con" />
                    </div>
                    <div className="form-group"> 
                        <label htmlFor="int">INT</label>
                        <input name="int" />
                    </div>
                    <div className="form-group"> 
                        <label htmlFor="wis">WIS</label>
                        <input name="wis" />
                    </div>
                    <div className="form-group"> 
                        <label htmlFor="char">CHAR</label>
                        <input name="char" />
                    </div>
                    <div className="form-group"> 
                        <label htmlFor="status">Status</label>
                        <select name="status">
                            <option value="live">Live</option>
                            <option value="dead">Dead</option>
                            <option value="draft">Draft</option>
                        </select>  
                    </div>
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
            {modelOpen && <Modal />}
        </>
    )
}