import React, { useState } from "react";

const Login = () => {
  const [usernameOrEmail, setUsenameOrEmail] = useState();
  const [password, setPassword] = useState();

    const handleClick = async(e) => {

        e.preventDefault()

        const response = await fetch("http://localhost:8080/login", {

            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username: usernameOrEmail,password: password})
        });
        const json = response.json()

        console.log(json)
    }
  return (

      <form>
        <label>Username or Email</label>
        <input onChange={(e) => setUsenameOrEmail(e.target.value)}></input>
        <label>Password</label>
        <input onChange={(e) => setPassword(e.target.value)}></input>
        <div>
           <button onClick={handleClick}>Submit</button>
        </div>
      </form>
  );
};

export default Login;