import React, { useEffect, useState } from 'react'
import './signinMo.css'
import mokshScript from './script';
import { NavLink } from 'react-router-dom';

const MokshSignup = () => {

    const [userName , setUsername] = useState("");
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [rePassword , setRePassword] = useState("");

    setTimeout(() => {
        mokshScript()
    }, 100);

    
  return (
    <div className="body">
        <div className="login-container">
        <div className="video-container">
            <video id="background-video" src='/bg.mp4' autoPlay muted loop/> 
        </div>

        <header className="algoanims-heading">
            AlgoAnims
        </header>

        <div className="form-container">
            <div className="login-box">
                <div className="logo">
                    <img src="/logo.png" alt="Logo" />
                </div>

                <form className="login-form" id="signupForm" 
                onSubmit={(evt)=>{
                    evt.preventDefault();
                }}
                method="POST">
                    <input type="text" id="username" 
                    onChange={(evt)=>{
                        setUsername(evt.target.value);
                    }}
                    value={userName}
                    name="username" placeholder="Username" required />
                    <span id="usernameError" className="error-message">&#10006; Username already exists</span>
                    
                    <input type="email" id="email" name="email" 
                    onChange={(evt)=>{
                        setEmail(evt.target.value);
                    }}
                    value={email}
                    placeholder="Email Address" required />
                    <span id="emailError" className="error-message">&#10006; Email address already exists</span>

                    <div className="password-container">
                        <input type="password" id="password" name="password" placeholder="Password" 
                        value={password}
                        onChange={(evt)=>{
                            setPassword(evt.target.value);
                        }}
                        equired />
                        <span id="togglePassword" className="toggle-password">&#128065;</span>
                    </div>

                    <div className="password-container">
                        <input type="password" id="confirmPassword" name="confirmPassword" 
                        value={rePassword}
                        onChange={(evt)=>{
                            setRePassword(evt.target.value);
                        }}
                        placeholder="Confirm Password" required />
                        <span id="toggleConfirmPassword" className="toggle-password">&#128065;</span>
                    </div>
                    <span id="passwordError" className="error-message">&#10006; Passwords do not match</span>
                    
                   <div className="signbutton"> 
                       <button type="submit" id="signupBtn" className="btn-signup">Sign Up</button>
                   </div>

                    <div className="separator">
                        <div className="line"></div>
                    </div>
                </form>
            </div>
            <div className="signup-box">
                <p>Have an account? <NavLink to='/login'>Login</NavLink> </p>
            </div>
        </div>
    </div>
    </div>

  )
}

export default MokshSignup
