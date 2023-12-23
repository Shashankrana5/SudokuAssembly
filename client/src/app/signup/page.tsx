"use client"
import Image from "next/image";
import loginImage from "@/assets/signin-image.jpg";
import "../../../styles/signin.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthenticationWrapper from "../components/AuthenticationWrapper";

type SignUpForm = {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
};

export default function Signup() {
  const router = useRouter();

  const [currentForm, setCurrentForm] = useState<SignUpForm>({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
  });

  function handleChange(e: any) {
    const copy: any = { ...currentForm };
    copy[e.target.name] = e.target.value;
    setCurrentForm(copy);
  }

  async function handleSubmit(e: any) {
    e.preventDefault()

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/auth/signup`, {
      method: "POST",
      body: JSON.stringify(currentForm),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      console.log("ok")
      alert("user registered success");
    }
  }

  return (

    <div className="center-div">
      <section className="signup">
        <div className="container">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title">Sign up</h2>
              <form
                method="POST"
                className="register-form"
                id="register-form"
                //  th:action="@{/register}"
              >
                <div className="splitter">
                  <div className="form-group">
                    <label htmlFor="firstName">
                      <i className="zmdi zmdi-account material-icons-name"></i>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      placeholder="First Name"
                      value={currentForm.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">
                      <i className="zmdi zmdi-account material-icons-name"></i>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      placeholder="Last Name"
                      value={currentForm.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="splitter">
                  <div className="form-group">
                    <label htmlFor="username">
                      <i className="zmdi zmdi-card"></i>
                    </label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      placeholder="Username"
                      value={currentForm.username}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">
                      <i className="zmdi zmdi-email"></i>
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Your Email"
                      value={currentForm.email}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                  </div>
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
                    value={currentForm.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="re_pass">
                    <i className="zmdi zmdi-lock-outline"></i>
                  </label>
                  <input
                    type="password"
                    name="re_pass"
                    id="re_pass"
                    placeholder="Repeat your password"
                  />
                </div>
                <div className="form-group form-button" onClick={handleSubmit}>
                  <input
                    type="submit"
                    name="signup"
                    id="signup"
                    className="form-submit"
                    value="Register"
                  />
                </div>
              </form>
            </div>
            <div className="signup-image">
              <figure>
                <Image src={loginImage} alt="sign in image"></Image>
              </figure>
              <a href="/signin" className="signup-image-link">
                I am already member
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>

  );
}
