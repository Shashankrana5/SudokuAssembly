import React, { useState } from "react"
import './App.css';
import Login from "./components/Login";
import Register from "./components/Register";
import Testingreact from "./components/testingreact";
import { Router, Route, Switch, Routes, BrowserRouter } from "react-router-dom"


function App() {  return (
  <div className="App">
    <BrowserRouter>
    <Routes>
    <Route path = "/loginpage" element = {<Login/>}></Route>
    <Route path  ="/register" element = {<Register/>}></Route>
    </Routes>
    </BrowserRouter>

    </div>
)}

export default App;