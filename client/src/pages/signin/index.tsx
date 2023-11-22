import { useRouter } from "next/router"
import { useState } from "react"
// import styles from "../styles/styles.module.css"
import styles from "../../../styles/style.module.css"
import { SERVER_URI } from "@/app/page"
import "../../../styles/signin.css"
import loginImage from "@/assets/signin-image.jpg"
import Image from "next/image"

export default function SignIn() {
  const router = useRouter()

  const [state, setState] = useState({
    username: "",
    password: ""
  })

  function handleChange(e: any) {
    const copy:any = { ...state }
    copy[e.target.name] = e.target.value
    setState(copy)
  }

  async function handleSubmit() {
    const res = await fetch(`${SERVER_URI}/api/auth/signin`, {
      method: "POST",
      body: JSON.stringify(state),
      headers: {
        "Content-Type": "application/json"
      }
    })
    if (res.ok) {
      const json = await res.json()
      localStorage.setItem("token", json.token)
      router.push("/user")
    } else {
      alert("Bad credentials")
    }
  }

  return (
    // <div>
    //   <div className={styles.container}>
    //     <h1 className={styles.title}>Sign In</h1>
    //     <div className={styles.form}>
    //       <input className={styles.input} type="text" name="username" placeholder="username" value={state.username} onChange={handleChange} autoComplete="off" />
    //       <input className={styles.input} type="password" name="password" placeholder="password" value={state.password} onChange={handleChange} />
    //       <button className={styles.btn} onClick={handleSubmit}>Submit</button>
    //     </div>
    //   </div>
    // </div>
    <div className = "center-div">
    <section className="sign-in">
        <div className="container">
            <div className="signin-content">
                <div className="signin-image">
                    <figure><Image src={loginImage} alt="sign in image"></Image></figure>

                    <a href="/register" className="signup-image-link">Create an account</a>
                </div>
                <div className="signin-form">
                    <h2 className="form-title">Sign in</h2>
                    <form method="POST" className="register-form" id="login-form" 
                    // th:action="@{/loginhandle}"
                    >
                        <div className="form-group">
                            <label htmlFor="username"><i className="zmdi zmdi-email material-icons-name"></i></label>
                            <input type="text" name="username" id="username" placeholder="Username"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password"><i className="zmdi zmdi-lock"></i></label>
                            <input type="password" name="password" id="password" placeholder="Password"/>
                        </div>
                        <div className="form-group form-button">
                            <input type="submit" name="signin" id="signin" className="form-submit" value="Log in"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</div>
  )
}