"use client";

import AuthenticationWrapper from "@/app/components/AuthenticationWrapper";
import NavBar from "@/app/components/NavBar";
import SudokuBoard from "@/app/components/SudokuBoard";
import { UserContextProvider } from "@/app/context/UserContext";
import { useEffect, useState } from "react";

type SudokuType = {
  date: string;
  date_and_source: string;
  id: string;
  level: "easy" | "medium" | "hard";
  puzzle: string[][];
  solution: string[][];
  source: string;
};

export default function SudokuPage({
  params,
}: {
  params: { date_and_difficulty: string };
}) {
  const [board, setBoard] = useState<string[][] | null>();
  const [solution, setSolution] = useState<string[][] | null>(null);
  const [sudoku, setSudoku] = useState<SudokuType | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [incorrects, setIncorrects] = useState(0);
  const [solved, setSolved] = useState(false);

  const getProgress = async (e: any) => {
    e.preventDefault();
    
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_SERVER_URI
      }/api/progress/getprogress/${localStorage.getItem("username")}/${sudoku?.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();

    setIncorrects(json.incorrects);
    setSeconds(json.timeSpent);
    setSolved(json.solved);
  };

  useEffect(() => {
    const fetchSudoku = async () => {
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
      setBoard(json.puzzle);
      setSolution(json.solution);
      setSudoku(json);
    };

    fetchSudoku();
  }, []);

  const updateProgress = async () => {

    if (!sudoku) return;

    console.log({
      incorrects,
      solved,
      timeSpent: seconds,
      username: localStorage.getItem("username"),
      sudoku_id: sudoku.id,
    });
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URI}/api/progress/addprogress`,
      {
        method: "POST",
        body: JSON.stringify({
          incorrects,
          solved,
          timeSpent: seconds,
          username: localStorage.getItem("username"),
          sudokuId: sudoku?.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await res.json();
    console.log(json);
  };
  useEffect(() => {
    const handleBeforeUnload = () => {
      updateProgress();
    };
  
    window.addEventListener("beforeunload", handleBeforeUnload);
  
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [sudoku]);
  
  useEffect(() => {
    // Clear existing listeners before adding new ones
    window.removeEventListener("beforeunload", updateProgress);
  }, []); 
  




  // useEffect(() => {

  
  //   const handleVisibilityChange = () => {
  //     if (document.hidden) {
  //       updateProgress();
  //     }
  //   };
  
  //   window.addEventListener("beforeunload", handleBeforeUnload);
  //   document.addEventListener("visibilitychange", handleVisibilityChange);
  //   window.addEventListener("pagehide", handleBeforeUnload);
  
  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //     document.removeEventListener("visibilitychange", handleVisibilityChange);
  //     window.removeEventListener("pagehide", handleBeforeUnload);
  //   };
  // }, [sudoku]);





  return (
    <AuthenticationWrapper>
      <UserContextProvider>
        <NavBar />

        {board && solution && (
          <SudokuBoard
            sudoku={sudoku!}
            getProgress={getProgress}
            updateProgress={updateProgress}
            solved={solved}
            setSolved={setSolved}
            incorrects={incorrects}
            setIncorrects={setIncorrects}
            seconds={seconds}
            setSeconds={setSeconds}
          />
        )}
      </UserContextProvider>
    </AuthenticationWrapper>
  );
}
