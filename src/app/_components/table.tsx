"use client";

import React from "react"
import { BsFillTrashFill,  BsFillPencilFill} from "react-icons/bs"
import "./table.css"
import { PrismaClient } from "@prisma/client";

import { api } from "~/trpc/react";

export const prisma = new PrismaClient();



export const Table = () => {
    
    const { data: rows, isLoading } = api.playerCharacters.getCharacter.useQuery(); 

    if (isLoading) {
        return <p> Loading Characters...</p>
    }
    if (!rows) {
        return 
        <p>There are no characters</p>
    }

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
                        return (
                            <tr key = {idx}>
                                <td>{row.user.name}</td>
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
                                {/* <td>{row.status}</td> */}
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

[{
	"resource": "/c:/Users/brandonk.admin/Documents/GitHub/brandon-onboarding/src/app/_components/table.tsx",
	"owner": "typescript",
	"code": "2322",
	"severity": 8,
	"message": "Type '{ id: number; Alive: string; Dead: string; Draft: string; }[]' is not assignable to type 'ReactNode'.\n  Type '{ id: number; Alive: string; Dead: string; Draft: string; }[]' is not assignable to type 'Iterable<ReactNode>'.\n    The types returned by '[Symbol.iterator]().next(...)' are incompatible between these types.\n      Type 'IteratorResult<{ id: number; Alive: string; Dead: string; Draft: string; }, undefined>' is not assignable to type 'IteratorResult<ReactNode, any>'.\n        Type 'IteratorYieldResult<{ id: number; Alive: string; Dead: string; Draft: string; }>' is not assignable to type 'IteratorResult<ReactNode, any>'.\n          Type 'IteratorYieldResult<{ id: number; Alive: string; Dead: string; Draft: string; }>' is not assignable to type 'IteratorYieldResult<ReactNode>'.\n            Type '{ id: number; Alive: string; Dead: string; Draft: string; }' is not assignable to type 'ReactNode'.",
	"source": "ts",
	"startLineNumber": 59,
	"startColumn": 37,
	"endLineNumber": 59,
	"endColumn": 49,
	"relatedInformation": [
		{
			"startLineNumber": 2166,
			"startColumn": 9,
			"endLineNumber": 2166,
			"endColumn": 17,
			"message": "The expected type comes from property 'children' which is declared here on type 'DetailedHTMLProps<TdHTMLAttributes<HTMLTableDataCellElement>, HTMLTableDataCellElement>'",
			"resource": "/c:/Users/brandonk.admin/Documents/GitHub/brandon-onboarding/node_modules/@types/react/index.d.ts"
		}
	]
}]