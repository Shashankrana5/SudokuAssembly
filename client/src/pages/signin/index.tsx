import { useRouter } from "next/router";
import { useState } from "react";
import "../../../styles/signin.css";
import loginImage from "@/assets/signin-image.jpg";
import Image from "next/image";

export default function SignIn() {
  const router = useRouter();

  const [state, setState] = useState({
    username: "",
    password: "",
  });

  function handleChange(e: any) {
    const copy: any = { ...state };
    copy[e.target.name] = e.target.value;
    setState(copy);
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/auth/signin`, {
      method: "POST",
      body: JSON.stringify(state),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const json = await res.json();
      localStorage.setItem("token", json.token);
      router.push("/");
    } else {
      alert("Bad credentials");
    }
  }

  return (
    <div className="center-div">
      <section className="sign-in">
        <div className="container">
          <div className="signin-content">
            <div className="signin-image">
              <figure>
                <Image src={loginImage} alt="sign in image"></Image>
              </figure>

              <a href="/signup" className="signup-image-link">
                Create an account
              </a>
            </div>
            <div className="signin-form">
              <h2 className="form-title">Sign in</h2>
              <form method="POST" className="register-form" id="login-form">
                <div className="form-group">
                  <label htmlFor="username">
                    <i className="zmdi zmdi-email material-icons-name"></i>
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    value={state.username}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">
                    <i className="zmdi zmdi-lock"></i>
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={state.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group form-button" onClick={handleSubmit}>
                  <input
                    type="submit"
                    name="signin"
                    id="signin"
                    className="form-submit"
                    value="Log in"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
