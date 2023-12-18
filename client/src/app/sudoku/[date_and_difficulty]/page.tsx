"use client"

import NavBar from "@/app/components/NavBar";
import SudokuBoard from "@/app/components/SudokuBoard";
import { stringToMatrix } from "@/app/utils/FormatData";
import { useEffect, useState } from "react";

export default function SudokuPage({ params }: { params: { date_and_difficulty: string } }) {

    const [ board, setBoard ] = useState<string[][] | null>();
    const [ solution, setSolution ] = useState<string[][] | null>(null);

    useEffect(() => {
        const fetchSudoku = async() => {
            console.log(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/sudoku/search/date-and-difficulty/${params.date_and_difficulty}`)
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URI}/api/sudoku/search/date-and-difficulty/${params.date_and_difficulty}`,
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                }
              );
            const json = await res.json();
                console.log(json)
              setBoard(json.puzzle)
              setSolution(json.solution)

            // setBoard(stringToMatrix(json.puzzle))
            // setSolution(stringToMatrix(json.solution))
        }
    
        fetchSudoku();
    }, [])




    return <>
      <NavBar />

    {board && solution && <SudokuBoard board={board} solution={solution} />}
        
    </>;
   } 