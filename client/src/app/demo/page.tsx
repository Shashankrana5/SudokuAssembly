"use client"
import { useEffect } from "react";
import Loading from "../components/Loading";
import { useRouter } from "next/navigation";

export default function DemoPage() {
    const router = useRouter();

    useEffect(() => {
        const demoUserLogin = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/auth/demologin`)
                if (res.ok) {
                    const json = await res.json();
                    localStorage.setItem("token", json.token);
                    localStorage.setItem("email", json.email);
                    localStorage.setItem("username", json.username);
                    router.push("/");
                }
            } catch (error) {
                console.error("Network error:", error);
            }
        }
        demoUserLogin();
    }, [])

    return (
        <div>
            <Loading />
        </div>
    )
}