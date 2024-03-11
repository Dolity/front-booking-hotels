import { useEffect, useState } from 'react';
import Background from './components/Background'
import Navbar from './components/Navbar'
import Search from './components/Search'
import axios from 'axios';

const authenURL = "http://localhost:8000/api/v1/user/users";

function App() {

  const [users, setUsers] = useState([]);

  
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
          setUsers(response.data.users)
        } else {
          console.log("Authentication Failed");
          window.location.href = "/login"
        }
      })

  } catch (error) {
    console.log(error);
  }

}, [])

  return (
    <>
      <div>
        <Navbar />
       <Background /> 
       {/* <Search /> */}

      </div>
    </>
  )
}

export default App