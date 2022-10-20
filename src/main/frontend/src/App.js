import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';

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

function App() {
  return (
    <div className="App">
      <UserProfiles/>
    </div>
  );
}

export default App;