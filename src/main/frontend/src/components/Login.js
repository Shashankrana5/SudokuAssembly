import React, { useState } from "react";

const Login = () => {
  const [date, setDate] = useState();
  const [date_and_source, setDate_and_source] = useState();
  const [level, setLevel] = useState();
  const [puzzle, setPuzzle] = useState();
  const [solution, setSolution] = useState();
  const [source, setSource] = useState();

  const handleClick = (e) => {
    e.preventDefault();
    const ss = { date, level, puzzle, solution };
    console.log(ss);
    fetch("http://localhost:8080/register",{ method: "POST", 
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(ss)} ).then(() => {
        console.log("new student has been added");
    })
  };

  return (
    <form>
      <label>date</label>
      <input onChange={(e) => setDate(e.target.value)}></input>
      <label>date_and_source</label>
      <input onChange={(e) => setDate_and_source(e.target.value)}></input>
      <label>level</label>
      <input onChange={(e) => setLevel(e.target.value)}></input>
      <label>puzzle</label>
      <input onChange={(e) => setPuzzle(e.target.value)}></input>
      <label>solution</label>
      <input onChange={(e) => setSolution(e.target.value)}></input>
      <label>source</label>
      <input onChange={(e) => setSource(e.target.value)}></input>
      <div>
        <button onClick={handleClick}>Submit</button>
      </div>
    </form>
  );
};

export default Login;
