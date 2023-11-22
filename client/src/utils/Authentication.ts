export default function Authenticatioon () {
    async function fetchProfile() {
        const res = await fetch(`${SERVER_URI}/api/test/profile`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
          }
        })
        if (res.ok) {
          const json = await res.json()
          setProfile(json)
        } else {
          router.push("/signin")
        }
    }
}