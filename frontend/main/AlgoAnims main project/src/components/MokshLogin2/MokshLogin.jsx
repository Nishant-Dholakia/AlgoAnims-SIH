import React, { useEffect, useState } from 'react'

import { NavLink  } from 'react-router-dom'
import './loginMoskh.css'
import gsap from 'gsap'
const MokshLogin = () => {

    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");

    async function setalldata() {
        const api = await fetch("http://localhost:8080/login");
        const apidata = await api.json();
        for (let data of apidata) {
          let email = data.emailId;
          let uname = data.userName;
          let password = data.password;
    
          let finalstr = CryptoJS.AES.decrypt(data.password, getkey()).toString(CryptoJS.enc.Utf8)
    
    
          obj.push({
            email: email,
            uname: uname,
            pass: finalstr
          })
    
        }
        console.log(obj);
      }
    
      function check() {
    
        let f = 0;
        let temp;
        for (let pd of obj) {
          if ((pd.uname === firstField || pd.email === firstField) && pd.pass === pass) {
            f = 1;
            temp = pd;
            break;
          }
        }
    
        if (f == 1) {
            
            navigate("/");
    
          const obj = {
            email: temp.email
          }
    
          if (temp) {
            fetch("http://localhost:8080/login", {
              method: 'POST',
              headers: {
                "Content-type": "application/json"
              },
              body: JSON.stringify(obj)
            }).then((res) => res.json());
    
          }
    
        } else {
          alert("invalid password and username or email");
        }
       
      }

    useEffect(() => {
        // setalldata();
        console.log("useEffect called");
        gsap.from("#background-video", {
            scale: 1.2, 
            opacity: 0.5,
            duration: 2,
            ease: "power2.out"
        });

        gsap.from(".login-box", {
            y: 50,
            opacity: 0,
            duration: 1.5,
            delay: 0.5
        });

        gsap.from(".signup-box", {
            y: 50,
            opacity: 0,
            duration: 1.5,
            delay: 0.8
        });

        gsap.from(".algoanims-heading", {
            y: -50,
            opacity: 0,
            duration: 1.5,
            delay:0.8
        });
    

      }, []);
  return (
    <div className='body'>
        <div className="login-container">
        <div className="video-container">
            <video id="background-video" src='/bg.mp4' autoPlay muted loop />
        </div>

        <header className="algoanims-heading">
            AlgoAnims
        </header>

        <div className="form-container">
            <div className="login-box">
                <div className="logo">
                    <img src="/logo.png" alt="Logo" />
                </div>
                <form id="loginForm" className="login-form">
                    <input type="text" id="username" 
                    
                    placeholder="Username or email" required />

                    <input type="password" id="password" placeholder="Password" required />

                    <span id="loginError" className="error-message" style={{display:'none', color: 'red'}}>Invalid username or password</span>

                    <button 
                    className='btn-login'
                    type="submit">Log In</button>

                    <div className="separator">
                        <div className="line"></div>
                    </div>
                    <NavLink to = "" className="forgot-password">Forgot password?</NavLink>
                </form>
            </div>
            <div className="signup-box">
                <p>Don't have an account? <NavLink to='/signup'>Sign up</NavLink></p>
            </div>
        </div>
    </div>
    
    </div>
  )
}

export default MokshLogin