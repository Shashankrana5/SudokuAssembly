import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { SERVER_URI } from "../app/Contextexample";

export default function AuthenticatedLayout(props: any) {
  const [profile, setProfile] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    const res = await fetch(`${SERVER_URI}/api/test/profile`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    if (res.ok) {
      const json = await res.json();
      setProfile(json);
    } else {
      router.push("/signin");
    }
  }

  function logout() {
    localStorage.removeItem("token");
    router.push("/");
  }

  return (
    <div>
      <div>
        <p>Signed in as: {profile && profile.username}</p>
        <p>
          <button onClick={logout}>Log out</button>
        </p>
      </div>
      {props.children}
    </div>
  );
}
