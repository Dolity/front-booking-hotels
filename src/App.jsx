import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from './components/Background'
import Navbar from './components/Navbar'
import axios from 'axios';
import Listhotel from './components/Listhotel';

//const authenURL = "http://localhost:8000/api/v1/user/users";
const authenURL = "https://tame-loincloth-bass.cyclic.app/api/v1/user/users";

function App() {

  const navigate = useNavigate();

useEffect(() => {
  try {
    const token = localStorage.getItem("token");
    axios.get(authenURL, {
      headers: {
        "authorization": `Bearer ${token}`
      }

    })
      .then((response) => {
        console.log(response);

        if (response.data.status === 200) {
          console.log("Authentication Success");
        } else {
          console.log("Authentication Failed");
          navigate("/login")
        }
      })

  } catch (error) {
    console.log(error);
  }

}, [navigate])

  return (
    <>
      <div>
        <Navbar />
       <Background /> 
       <Listhotel />

      </div>
    </>
  )
}

export default App