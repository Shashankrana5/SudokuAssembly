import React, { useState } from "react";


const Register = () =>{
    const[firstName, setfirstName] = useState();
    const[lastName, setlastname] = useState();
    const[username, setusername] = useState();
    const[email, setemail] = useState();
    const[password, setpassword] = useState();
    const[role, setRole] = useState("USER");
    const[active, setActive] = useState(true);


    const registrationClick = (e) => {
        e.preventDefault();
        const valuesToPass = {firstName, lastName, username, email, password, role, active};
        console.log(valuesToPass);

        fetch("http://localhost:8080/adduser", {
            method: "POST", 
            headers: {
                'Content-Type': 'application/json; charset=utf-8'},
                
            body: JSON.stringify(valuesToPass)})
                .then(() => {
                    console.log("a new user has been added!");
                })
        
                
    }




return(
    <form>

        <label>First name</label>
        <input onChange={ (e) => setfirstName(e.target.value)}></input>
        
        <label>Last name</label>
        <input onChange={(e) => setlastname( e.target.value)}></input>
        
        <label>username</label>
        <input onChange={(e) => setusername(e.target.value)}></input>

        <label>email</label>
        <input onChange={(e) => setemail(e.target.value)}></input>
        
        <label>password</label>
        <input onChange={(e) => setpassword(e.target.value)}></input>

        <button onClick={registrationClick}>Register!</button>
    </form>
);
};

export default Register;