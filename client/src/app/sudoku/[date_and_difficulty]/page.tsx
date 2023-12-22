"use client";

import NavBar from "@/app/components/NavBar";
import SudokuBoard from "@/app/components/SudokuBoard";
import { UserContextProvider } from "@/app/context/UserContext";
import { useUserContext } from "@/app/hooks/useUserContext";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  const [sudoku, setSudoku] = useState<SudokuType | null>(null);
  const {currentUser, setCurrentUser} = useUserContext();

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
  if (localStorage.getItem("username") === null) {
    router.push("/signin");
  } else {
    return (
      <>
        <UserContextProvider>
          <NavBar />

          {board && solution && <SudokuBoard sudoku={sudoku!} />}
        </UserContextProvider>
      </>
    );
  }
}
