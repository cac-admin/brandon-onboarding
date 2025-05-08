import React from "react"
import { BsFillTrashFill,  BsFillPencilFill} from "react-icons/bs"
import "./table.css"

export const Table = () => {
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
                    </tr>
                </thead>
                <tbody>
                    <tr> 
                    <td>Home</td>
                        <td>This is the main page</td>
                        <td>
                            <span>Live</span>
                        </td>
                        <td>
                            <span>
                                <BsFillTrashFill className = "delete=btn>" />
                                <BsFillPencilFill />                        
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

