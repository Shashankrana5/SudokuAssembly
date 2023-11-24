"use client";

import { useEffect, useState } from "react";
import { fetchAuth } from "./utils/Authentication";
import { useRouter } from "next/navigation";
import Calendar from "./components/Calendar";

export default function Home() {
  const router = useRouter();
  const [allSudokus, setAllSudokus] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchAuth();
      if (!res.ok) {
        router.push("/signin");
      }
    };
    const fetchSudokus = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/sudoku/search`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const json = await res.json();
      setAllSudokus(json);
    };

    fetchData();

    fetchSudokus();
  }, []);

  return <div>{allSudokus && <Calendar allSudokus={allSudokus} />}</div>;
}
