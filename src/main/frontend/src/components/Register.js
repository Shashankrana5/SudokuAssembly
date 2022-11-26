import React, { useState } from "react";
// import  Button  from "react-bootstrap/Button";
// You can also do:
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from "@chakra-ui/react";




const Register = () =>{

    const[show, setShow] = useState(false);
    const[firstName, setfirstName] = useState();
    const[lastName, setlastname] = useState();
    const[username, setusername] = useState();
    const[email, setemail] = useState();
    const[password, setpassword] = useState();
    const[confirmpassword, setConfirmpassword] = useState();
    const[role, setRole] = useState("USER");
    const[active, setActive] = useState(true);


    const registrationClick = (e) => {
        e.preventDefault();
        const valuesToPass = {firstName, lastName, username, email, password, role, active};
        console.log(valuesToPass);

        try{
        let result = axios.post("http://localhost:8080/adduser", valuesToPass)
        .then(() =>{
            console.log("user is added");
        },(err) =>{
            console.log(err);
        }
        
        )}
        catch(error){
            console.error("Failed to register!");
        }
        
        // fetch("http://localhost:8080/adduser", {
        //     method: "POST", 
        //     headers: {
        //         'Content-Type': 'application/json; charset=utf-8'},
                
        //     body: JSON.stringify(valuesToPass)})
        //         .then(() => {
        //             console.log("a new user has been added!");
        //         })
        window.location.replace("http://localhost:8080/home")
    }

    const handleClick = () => setShow(!show);

return(




    <VStack id= "registration-page" spacing="5px" color="black">
        
    <FormControl id="first-name" isRequired>
      <FormLabel>First Name</FormLabel>

      <Input
        placeholder="Enter Your Name"
        onChange={ (e) => setfirstName(e.target.value)}
      ></Input>
    </FormControl>



    <FormControl id="last-name" isRequired>
      <FormLabel>Last Name</FormLabel>

      <Input
        placeholder="Enter Your Name"
        onChange={(e) => setlastname(e.target.value)}
      ></Input>
    </FormControl>

    <FormControl id= "username" isRequired>
    <FormLabel>Username</FormLabel>
    <Input
        placeholder="Enter Your username"
        onChange={(e) => setusername(e.target.value)}
      ></Input>
    </FormControl>


    <FormControl id="email" isRequired>
      <FormLabel>Email</FormLabel>
      <Input
        placeholder="Enter Your Email"
        onChange={(e) => setemail(e.target.value)}
      ></Input>
    </FormControl>
    <FormControl id="password" isRequired>
      <FormLabel>Password</FormLabel>
      <InputGroup>
      <Input
        type={show ? "text" : "password"}
        placeholder="Password"
        onChange={(e) => setpassword(e.target.value)}
      ></Input>

      <InputRightElement width = "4.5rem">
          <Button h = "1.75rem" size = "sm" onClick= {handleClick}> {show ? "Hide" : "Show"} </Button>
      </InputRightElement>
      </InputGroup>
    </FormControl>



    <FormControl id="password" isRequired>
      <FormLabel>Confirm Password</FormLabel>
      <InputGroup>
      <Input
        type={show ? "text" : "password"}
        placeholder="Confirm Password"
        onChange={(e) => setConfirmpassword(e.target.value)}
      ></Input>

      <InputRightElement width = "4.5rem">
          <Button h = "1.75rem" size = "sm" onClick= {handleClick}> {show ? "Hide" : "Show"} </Button>
      </InputRightElement>
      </InputGroup>
    </FormControl>




    <Button
    colorScheme= "blue"
    width = "100%"
    style = {{marginTop: 15}}
    onClick = {registrationClick}
    >Sign Up</Button>


    </VStack>

);
};

export default Register;