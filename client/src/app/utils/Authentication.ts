
// export const fetchAuth = async () => {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/test/profile`, {
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": "Bearer " + localStorage.getItem("token")
//           }
//         })
//         return res
      
// }
"use client"

export async function fetchAuth() {

  
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/test/profile`, {
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                  }
                })

    
  return res;
}
  