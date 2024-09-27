
import { useEffect, useState } from "react"

import gsap from "gsap";
import { Link, useNavigate, NavLink } from "react-router-dom"
import getkey from "../../../public/key";
import cryptoJs from "crypto-js";
import './signup.css'
function Signup() {
  const navigate = useNavigate();
  const [password, setPass] = useState("");
  const [repassword, setRePass] = useState("");
  const [encrypt, setEncrypt] = useState("");
  const [emailid, setEmailid] = useState("");
  const [alldata, setAlldata] = useState();


  async function main() {
    const api = await fetch("http://localhost:8080/signup");
    const data = await api.json();
    setAlldata(data)
  }



  useEffect(() => {
    // main()

    gsap.from("#background-video", {
      scale: 1.2,
      opacity: 0.5,
      duration: 2,
      ease: "power2.out"
    });

    const backgroundVideo = document.getElementById("background-video");
    const loginBox = document.querySelector(".login-box");
    const signupBox = document.querySelector(".signup-box");
    const algoanimsHeading = document.querySelector(".algoanims-heading");

    let tl = gsap.timeline();

    // if (backgroundVideo) {
    //   tl.from(
    //     backgroundVideo,
    //     { scale: 1.2, opacity: 0.5 },
    //     { scale: 1, opacity: 1, duration: 2, ease: "power2.out" }
    //   );
    // }

    if (loginBox) {
      tl.from(
        loginBox,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, delay: 0.5 }
      );
    }

    if (signupBox) {
      tl.from(
        signupBox,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, delay: 0.8 }
      );
    }

    if (algoanimsHeading) {
      tl.from(
        algoanimsHeading,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, delay: 0.8 }
      );
    }

    // Cleanup on unmount
    return () => {
      tl.kill();
    };





  }, [])


  function handler(evt) {
    evt.preventDefault();
    let f = 0;

    for (let data of alldata) {
      if (data.emailId == emailid) {
        alert("your account is already exits!");
        f = 1;
        break;
      }
    }

    if (f == 0) {
      if (password === repassword) {
        navigate("/home");
      } else {
        document.querySelector(".pass").classList.remove("hidden");
      }
    }



    useEffect(() => {
      // main()

      gsap.from("#background-video", {
        scale: 1.2,
        opacity: 0.5,
        duration: 2,
        ease: "power2.out"
      });

      useEffect(() => {
        const backgroundVideo = document.getElementById("background-video");
        const loginBox = document.querySelector(".login-box");
        const signupBox = document.querySelector(".signup-box");
        const algoanimsHeading = document.querySelector(".algoanims-heading");

        let tl = gsap.timeline();

        // if (backgroundVideo) {
        //   tl.from(
        //     backgroundVideo,
        //     { scale: 1.2, opacity: 0.5 },
        //     { scale: 1, opacity: 1, duration: 2, ease: "power2.out" }
        //   );
        // }

        if (loginBox) {
          tl.from(
            loginBox,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.5, delay: 0.5 }
          );
        }

        if (signupBox) {
          tl.from(
            signupBox,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.5, delay: 0.8 }
          );
        }

        if (algoanimsHeading) {
          tl.from(
            algoanimsHeading,
            { y: -50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.5, delay: 0.8 }
          );
        }

        // Cleanup on unmount
        return () => {
          tl.kill();
        };
      }, []);




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
        delay: 0.8
      });
    }, [])




    function handler(evt) {
      evt.preventDefault();
      let f = 0;

      for (let data of alldata) {
        if (data.emailId == emailid) {
          alert("your account is already exits!");
          f = 1;
          break;
        }
      }

      if (f == 0) {
        if (password === repassword) {
          navigate("/home");
        } else {
          document.querySelector(".pass").classList.remove("hidden");
        }
      }


    }

    return (
      <>

        <div className="body">
          <div className="login-container">
            <div className="video-container">

              <video className="video" id="background-video" src="/bg.mp4" autoPlay muted loop />
              {/* <source src="/bg.mp4" type="video/mp4" />

   
    <div className="body">
      <div className="login-container">
        <div className="video-container">

            <video className="video" id="background-video" src="/bg.mp4" autoPlay muted loop/>
                {/* <source src="/bg.mp4" type="video/mp4" />


            {/* <video className="video" id="background-video" autoPlay muted loop>
                <source src="1726757407553429.mp4" type="video/mp4" />

                Your browser does not support the video tag.
            </video> */}
            </div>

            <header className="algoanims-heading">
              AlgoAnims
            </header>

            <div className="form-container">
              <div className="login-box" >
                <div className="logo">
                  <img src="/logo.png" alt="Logo" />
                </div>
                <form className="login-form" method='post'
                  onSubmit={(evt) => {

                    const formData = {
                      uname: evt.target[0].value,
                      email: emailid,
                      pass: encrypt,
                      last_char: password[password.length - 1]
                    }


                    fetch("http://localhost:8080/signup", {
                      method: 'POST',
                      headers: {
                        "Content-type": "application/json"
                      },
                      body: JSON.stringify(formData)
                    }).then((data) => data.json())


                    handler(evt);
                  }}
                >
                  <input type="text" placeholder="username" required />
                  <input
                    onChange={(evt) => {
                      setEmailid(evt.target.value);
                    }}
                    value={emailid}
                    type="email" placeholder="Email Address" required />
                  <input type="password"

                    onChange={(evt) => {
                      setPass(evt.target.value);
                      setEncrypt(cryptoJs.AES.encrypt(password, getkey()).toString());
                    }}
                    value={password}
                    placeholder="Password" required />
                  <input
                    onChange={(evt) => {
                      setRePass(evt.target.value);
                    }}
                    value={repassword}
                    type="password" placeholder="Confirm Password" required />
                  {/* <small className="text-red-600 pass hidden">check your password</small><br /> */}
                  <button type="submit" className="signupbtn">Sign Up</button>
                  <div className="separator">
                    <div className="line"></div>
                  </div>
                </form>
              </div>
              <div className="signup-box">
                <p>have an account?
                  <NavLink to='/login' className="text-blue-500">
                    <span>Log In</span>
                  </NavLink>
                </p>

                <p>have an account?

                  <NavLink to='/login' className="text-blue-500">
                    <span>Log In</span>
                  </NavLink>



                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Signup;
