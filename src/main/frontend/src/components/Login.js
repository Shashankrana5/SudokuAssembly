import React, { useState } from "react";

const Login = () => {
  const [usernameOrEmail, setUsenameOrEmail] = useState();
  const [password, setPassword] = useState();


  return (
    <form>
      <label>Username or Email</label>
      <input onChange={(e) => setUsenameOrEmail(e.target.value)}></input>
      <label>Password</label>
      <input onChange={(e) => setPassword(e.target.value)}></input>
      <div>
        {/* <button onClick={handleClick}>Submit</button> */}
      </div>
    </form>
  
  );
};

export default Login;