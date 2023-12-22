"use client"

import NavBar from "@/app/components/NavBar";
import SudokuBoard from "@/app/components/SudokuBoard";
import { stringToMatrix } from "@/app/utils/FormatData";
import { useEffect, useState } from "react";

type SudokuType = {
  date: string,
date_and_source: string,
id: string,
level: "easy" | "medium" | "hard", 
puzzle: string[][], 
solution: string[][], 
source: string,
}

export default function SudokuPage({ params }: { params: { date_and_difficulty: string } }) {

    const [ board, setBoard ] = useState<string[][] | null>();
    const [ solution, setSolution ] = useState<string[][] | null>(null);
    // const [ sudoku, setSudoku ] = useState< 

    const [ sudoku, setSudoku] = useState<SudokuType | null>(null);

    useEffect(() => {
        const fetchSudoku = async() => {

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URI}/api/sudoku/search/date-and-difficulty/${params.date_and_difficulty}`,
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                }
              );

            const json = await res.json()
              setBoard(json.puzzle)
              setSolution(json.solution)
                setSudoku(json)

        }

    
        fetchSudoku();
    }, [])



    return <>
      <NavBar />

    {board && solution && <SudokuBoard sudoku={sudoku!} />}
        
    </>;
   } 