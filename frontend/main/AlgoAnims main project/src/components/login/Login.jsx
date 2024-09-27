import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./login.css";
import logoImage from "/logo.png";
import { useNavigate } from "react-router-dom";
import getkey from "../../../public/key";
import CryptoJS from "crypto-js";

import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";


function Login() {
  // Create refs for the elements you want to animate

  
  const loginBoxRef = useRef(null);
  const signupBoxRef = useRef(null);
  const headingRef = useRef(null);

  const [firstField, setFirst] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  let [obj, setObj] = useState([]);

  async function setalldata() {
    const api = await fetch("http://localhost:8080/login");
    const apidata = await api.json();
    for (let data of apidata) {
      let email = data.emailId;
      let uname = data.userName;
      let password = data.password;
      let lastchar = data.password.charAt(data.password.length - 1)

      let newPass = "";
      for (let i = 0; i < password.length - 1; i++) {
        newPass += password[i];
      }


      let finalstr = CryptoJS.AES.decrypt(newPass, getkey()).toString(CryptoJS.enc.Utf8)
      finalstr += lastchar;

      // console.log(new)

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
      navigate("/home");

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
    setalldata();
    console.log("useEffect called");

    // const tl = gsap.timeline();

    gsap.from(
      loginBoxRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 2, delay: 0.5, ease: "power2.out" }
    );
      gsap.from(
        signupBoxRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 2, delay: 0.3, ease: "power2.out" },
        "-=1" // Overlap the animations
      )
      gsap.from(
        headingRef.current,
        { y: -50, opacity: 0 },
        { y: -15, opacity: 1, duration: 2, delay: 0.3, ease: "power2.out" },
        "-=1.2"
      );

    // Optional: Clean up the timeline on component unmount
    // return () => {
    //   tl.kill();
    // };
  }, []); // Empty dependency array ensures this runs once on mount

  return (

    <div className="body">
      
      <div className="login-container">
        
        <div className="video-container">
          {/* Uncomment and ensure the video path is correct if needed */}
          <video id="background-video" src="/bg.mp4" muted loop autoPlay/>
        </div>

        {/* Attach ref to the heading */}
        <header className="algoanims-heading" ref={headingRef}>
          AlgoAnims
        </header>

        <div className="form-container">
          {/* Attach ref to the login box */}
          <div className="login-box" ref={loginBoxRef}>
            <div className="logo">
              <img src={logoImage} alt="Logo" />
            </div>
            <form className="login-form"
              onSubmit={(evt) => {
                evt.preventDefault();
                check();
              }}>
              <input
                value={firstField}
                onChange={(evt) => {
                  setFirst(evt.target.value);
                }}
                type="text"
                placeholder="Username, or Email"
                required
              />
              <input
                value={pass}
                onChange={(evt) => {
                  setPass(evt.target.value);
                }}
                type="password" placeholder="Password" required />
              <button type="submit" className="loginbtn">Log In</button>
              <div className="separator">
                <div className="line"></div>
              </div>
              <a href="#" className="forgot-password">
                Forgot password?
              </a>
            </form>
          </div>

          {/* Attach ref to the signup box */}
          <div className="signup-box" ref={signupBoxRef}>
            <p>
              Do not have an account? 
              <NavLink to='/signup' className="text-blue-500">
              <div>Sign up</div>
              </NavLink>
              Do not have an account? <a href="sign_up.html">Sign up</a>

            </p>
          </div>
        </div>
      </div>
    </div>
  
  );
}

export default Login;
