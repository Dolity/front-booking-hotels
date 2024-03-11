import axios from "axios";
import { useState } from "react";
import "./Register.css";

import emailIcon from "../assets/mail.png";
import passwordIcon from "../assets/padlock.png";
import { Link } from "react-router-dom";


const registerURL = "http://localhost:8000/api/v1/user/register";

function Register() {
    // const [isSubmitted, setIsS] = useState(false);
    // const [isError, setIsError] = useState({});
    const [isAction, setIsAction] = useState("Sign Up");

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [repassword, setRepassword] = useState('');

    // const errors = {
    //     loginError: "Invalid username or password",
    // };


    const isValidEmail = (value) => {
        // ตรวจสอบรูปแบบของ Email ในที่นี้ให้ง่ายๆ โดยใช้ Regular Expression
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const registerForm = { email, password };

        if (registerForm.email === "" || !isValidEmail(registerForm.email)) {
            setEmailError('Email is required');
            return;
        }

        if (registerForm.password === "" || registerForm.password !== repassword) {
            setPasswordError('Password is required');
            console.log("Password not match");
            return;
        }

        try {
            const response = await axios.post(registerURL, {
                email: registerForm.email,
                password: registerForm.password
            });

            console.log(response);

            if (response.data.status === 201) {
                console.log("Register Success");
                localStorage.setItem("token", response.data.token);
                window.location.href = "/login";
            } else {
                console.log("Register Failed");
            }
        } catch (error) {
            console.log(error);
        }
    };



    // Generate JSX code for error message
    // const renderErrorMessage = (name) =>
    //   name === errorMessages.name && (
    //     <div className="error">{errorMessages.message}</div>
    //   );

    const renderForm = (
        <form onSubmit={handleSubmit}>
            <div className="container">
                <div className="header">
                    <div className="text">{isAction}</div>
                    <div className="underline"></div>
                </div>

                <div className="inputs">
                    {isAction === "Login" ? <div></div> :
                        <div className="input">
                            <img src={emailIcon} alt="" style={{ width: "75px" }} />
                            <input type="email" placeholder="Email" required value={email} onChange={() => {
                                setEmail(event.target.value)
                            }} />
                            {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                        </div>
                    }

                    <div className="input">
                        <img src={passwordIcon} alt="" style={{ width: "75px" }} />
                        <input type="password" placeholder="Password" required value={password} onChange={() => {
                            setPassword(event.target.value)
                        }} />
                        {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                    </div>

                    <div className="input">
                        <img src={passwordIcon} alt="" style={{ width: "75px" }} />
                        <input type="password" placeholder="Re-Password" required value={repassword} onChange={() => {
                            setRepassword(event.target.value)
                        }} />
                    </div>

                    {isAction === "Sign Up" ? <div></div> :
                        <div className="forgot-password">
                            Lost Password? <span>Click Here!</span>
                        </div>}

                    <div className="submit-container">
                        <div >
                            <Link to={`/register`}>
                                <button className={isAction === "Login" ? "submit gray" : "submit"} onClick={handleSubmit} >Sign Up</button>
                            </Link>
                        </div>
                        <div >
                            <Link to={`/login`}>
                                <button className={isAction === "Sign Up" ? "submit gray" : "submit"} >Login</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );

    return <>{renderForm}</>;
}

export default Register;
