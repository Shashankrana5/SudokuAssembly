"use client";

import { useEffect, useState } from "react";
import { fetchAuth } from "./utils/Authentication";
import { useRouter } from "next/navigation";
import Calendar from "./components/Calendar";
import NavBar from "./components/NavBar";
import AuthenticationWrapper from "./components/AuthenticationWrapper";
import Head from 'next/head'

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

  return (
    <div>
    <Head>
      <title>My page title</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
      <AuthenticationWrapper>
        <NavBar />
        {allSudokus && <Calendar allSudokus={allSudokus} />}
      </AuthenticationWrapper>
    </div>

  );
}
