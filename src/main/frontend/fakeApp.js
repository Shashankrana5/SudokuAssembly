import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import Greet from './components/Greet';
import Welcome from './components/Welcome';

const UserProfiles = () =>{

  const [useProfiles, setUserProfiles] = useState([]); //[] is the initial state here.


  const fetchUserProfiles = () => {
    axios.get("http://localhost:8080/reactingtesting").then( res =>{
    console.log(res);
    const data = res.data;

    setUserProfiles(data);
  });
  }

  useEffect(() => {
    fetchUserProfiles();
  }, []);

  return useProfiles.map((userProfile, index) =>{
  return (
    <div key = {index}>
      <h1>{userProfile.id}</h1>
      <p> {userProfile.date_and_source}</p>
    </div>);
    }
  )
}
 /* <Greet name = "shashank"></Greet>
      <Greet name = "anotehr shashank"></Greet>
      <Greet name = "anthony"></Greet>
      <Greet name = "meg"></Greet>

      <Welcome></Welcome> */

function App() {

  const[count, setCount]  = useState(10);

  useEffect(() =>{
    setCount(count+1);
  }, []) // The empty bracket makes it so that this useeffect will only run once because there are no dependencies in an empty array.

  return (
    <div className="App">

      {/* <button onClick={() => setCount(count-1)}>Decrement</button> */}
      {count}
      {/* <button onClick  = {() => setCount(count+1)}>Increment</button> */}


    </div>
  );
}

export default App;