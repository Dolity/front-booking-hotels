import axios from "axios";
import { useState, useFormState } from "react";
import { Link, useNavigate } from 'react-router-dom'

import emailIcon from "../assets/mail.png";
import passwordIcon from "../assets/padlock.png";
import "./Login.css";

//const loginURL = "http://localhost:8000/api/v1/user/login";
const loginURL = "https://tame-loincloth-bass.cyclic.app/api/v1/user/login";

function LoginForm() {
  const [isAction, setIsAction] = useState("Login");


  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showError, setShowError] = useState(false);

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();

    const loginForm = {
      email,
      password
    }

    if (loginForm.email === "") {
      setEmailError('Email is required');
      return;
    }

    if (loginForm.password === "") {
      setPasswordError('Password is required');
      return;
    }

    if (loginForm.password.length < 6)  {
      setPasswordError('Password > 6');
      return;
    }

    try {
      const response = await axios.post(loginURL, {
        email: loginForm.email,
        password: loginForm.password
      });

      console.log(response);

      if (response.data.status === 200) {
        console.log("Login Success");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("id", response.data.id);
        navigate("/book");
      } else {
        console.log("Login Failed");
        alert("รหัสผิด กรุณาลองใหม่อีกครั้ง");
      } 
    } catch (error) {
      if (error.response.status === 400) {
        console.log("Login Failed");
        setShowError(true);
      }
      console.log(error);
      setShowError(true);
    }
  };

  const renderForm = (
    <form onSubmit={handleSubmit}>
      <div className="container">
        <div className="header">
          <div className="text">{isAction}</div>
          <div className="underline"></div>
        </div>

        <div className="inputs">
          <div className="input">
            <img src={emailIcon} alt="" style={{ width: "75px" }} />
            <input required type="email" placeholder="Email" id="email" value={email} onChange={() => {
              setEmail(event.target.value)
              setEmailError('');
            }} />
              {emailError && 
                <p className="text-red-500 mr-10 whitespace-nowrap animate-bounce">
                  {emailError}
                </p>}
            
          </div>

          <div className="input">
            <img src={passwordIcon} alt="" style={{ width: "75px" }} />
            <input required type="password" placeholder="Password" id="password" value={password} onChange={() => {
              setPassword(event.target.value)
              setPasswordError('');
            }} />
              {passwordError && 
                <p className="text-red-500 mr-10 whitespace-nowrap animate-bounce">
                  {passwordError}
                </p>}
          </div>

          {isAction === "Sign Up" ? <div></div> :
            <div className="forgot-password">
              Lost Password? <span>Click Here!</span>
            </div>}

          <div className="submit-container">
            <div >
              <Link to={`/register`}>
                <button className={isAction === "Login" ? "submit gray" : "submit"} >Sign Up</button>
              </Link>
            </div>
            <div >
              <Link to={`/login`}>
                <button className={isAction === "Sign Up" ? "submit gray" : "submit"} onClick={handleSubmit} >Login</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {showError && (
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg text-center">
              <p className="text-red-500 text-lg">Email or Password not match</p>
              <button
                onClick={() => setShowError(false)}
                className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
              >
                Close
              </button>
            </div>
          </div>
        )}
    </form>
    
  );

  return (
    <>
      {renderForm}
    </>
  )
}
export default LoginForm;
