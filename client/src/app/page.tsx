"use client"
import { useCurrentUserContext } from "@/contexts/CurrentUserContext";
import Image from "next/image";
import { useEffect } from "react";

export const SERVER_URI = "http://localhost:9090";

export default function Home() {

  const context = useCurrentUserContext();
  const { currentUser, setCurrentUser } = context!;

  useEffect(() => {
    console.log(currentUser)
  }, [currentUser])

  return <div>this is the page.tsx from app directory
    <button onClick={() => setCurrentUser({lastName: "", email: "s", firstName: "s", userName: "nothing"})}>click me</button>
  </div>;
}
