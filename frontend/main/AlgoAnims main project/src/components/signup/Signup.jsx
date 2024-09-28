import { useEffect, useState } from "react";
import gsap from "gsap";
import { useNavigate, NavLink } from "react-router-dom";
import getkey from "../../../public/key";
import cryptoJs from "crypto-js";
import './signup.css';

function Signup() {
  const navigate = useNavigate();
  const [password, setPass] = useState("");
  const [repassword, setRePass] = useState("");
  const [encrypt, setEncrypt] = useState("");
  const [emailid, setEmailid] = useState("");
  const [alldata, setAlldata] = useState([]);

  // Fetch existing user data
  async function main() {
    const api = await fetch("http://localhost:8080/signup");
    const data = await api.json();
    setAlldata(data);
  }

  useEffect(() => {
    main();

    // GSAP animations
    gsap.from("#background-video", {
      scale: 1.2,
      opacity: 0.5,
      duration: 2,
      ease: "power2.out"
    });

    const loginBox = document.querySelector(".login-box");
    const signupBox = document.querySelector(".signup-box");
    const algoanimsHeading = document.querySelector(".algoanims-heading");

    let tl = gsap.timeline();

    if (loginBox) {
      tl.from(loginBox, { y: 50, opacity: 0, duration: 1.5, delay:1 },"ok");
    }

    if (signupBox) {
      tl.from(signupBox, { y: 50, opacity: 0, duration:1.5, delay: 1 },"ok");
    }

    if (algoanimsHeading) {
      tl.from(algoanimsHeading, { y: -50, opacity: 0, duration: 1.5, delay: 1 },"ok");
    }

    // Cleanup on unmount
    return () => {
      tl.kill();
    };

  }, []);

  // Handle form submission
  function handler(evt) {
    evt.preventDefault();
    let accountExists = false;

    // Check if the email already exists
    for (let data of alldata) {
      if (data.emailId === emailid) {
        alert("Your account already exists!");
        accountExists = true;
        break;
      }
    }

    if (!accountExists) {
      if (password === repassword) {
        // Encrypt password before sending
        const lastChar = password[password.length - 1];
        const formData = {
          uname: evt.target[0].value,
          email: emailid,
          pass: cryptoJs.AES.encrypt(password, getkey()).toString(),
          last_char: lastChar
        };

        // Send data to the server
        fetch("http://localhost:8080/signup", {
          method: 'POST',
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(formData)
        }).then((res) => {
          console.log("respones");
        });

        navigate("/");
      } else {
        document.querySelector(".pass").classList.remove("hidden");
      }
    }
  }

  return (
    <div className="body">
      <div className="login-container">
        <div className="video-container">
          <video className="video" id="background-video" src="/bg.mp4" autoPlay muted loop />
        </div>

        <header className="algoanims-heading">
          AlgoAnims
        </header>

        <div className="form-container">
          <div className="login-box">
            <div className="logo">
              <img src="/logo.png" alt="Logo" />
            </div>
            <form className="login-form" onSubmit={handler}>
              <input type="text" placeholder="Username" required />
              <input
                onChange={(evt) => setEmailid(evt.target.value)}
                value={emailid}
                type="email"
                placeholder="Email Address"
                required
              />
              <input
                onChange={(evt) => {
                  setPass(evt.target.value);
                  setEncrypt(cryptoJs.AES.encrypt(evt.target.value, getkey()).toString());
                }}
                value={password}
                type="password"
                placeholder="Password"
                required
              />
              <input
                onChange={(evt) => setRePass(evt.target.value)}
                value={repassword}
                type="password"
                placeholder="Confirm Password"
                required
              />
              <button type="submit" className="signupbtn">Sign Up</button>
              <div className="separator">
                <div className="line"></div>
              </div>
              
              <small className="text-red-600 pass hidden">Passwords do not match!</small>
            </form>
          </div>
          <div className="signup-box">
            <p>
              Have an account? 
              <NavLink to='/login' className="text-blue-500">
                <span> Log In</span>
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
