"use client";

import AuthenticationWrapper from "@/app/components/AuthenticationWrapper";
import NavBar from "@/app/components/NavBar";
import SudokuBoard from "@/app/components/SudokuBoard";
import { UserContextProvider } from "@/app/context/UserContext";
import { useEffect, useRef, useState } from "react";


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

  const secondsRef = useRef(seconds);
  const incorrectsRef = useRef(incorrects);

useEffect(() => {
  secondsRef.current = seconds;
}, [seconds]);

useEffect(() => {
  incorrectsRef.current = incorrects;
}, [incorrects])

  const handleBeforeUnload = () => {
    updateProgress();
  };
  

  const getProgress = async () => {
    
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

    return json;
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

  const timeSpent = secondsRef.current;
  const currentIncorrects = incorrectsRef.current;

  // Use the current values directly inside the fetch call
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/progress/addprogress`, {
    method: "POST",
    body: JSON.stringify({
      incorrects: currentIncorrects,
      solved,
      timeSpent,
      username: localStorage.getItem("username"),
      sudokuId: sudoku.id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  };
  

  useEffect(() => {
  
    window.addEventListener("beforeunload", handleBeforeUnload);

    window.addEventListener("unload", (event) => {
      handleBeforeUnload();
    });

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        updateProgress();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);

    };

  }, [sudoku]);
  
  useEffect(() => {
    window.removeEventListener("beforeunload", () => updateProgress());
    window.removeEventListener("unload", () => updateProgress());

  }, []); 

  useEffect(() => {
    const initialFetch = async () => {
      if (sudoku && sudoku.id) {
        await getProgress();
      }
    };
    
    initialFetch();

  }, [sudoku]); // Include 'sudoku' as a dependency

  useEffect(() => {
    console.log(incorrects)
  }, [incorrects])

  return (
    <AuthenticationWrapper>
      <UserContextProvider>
        <NavBar />
        {/* <div className="h-64">{incorrects}</div> */}
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
