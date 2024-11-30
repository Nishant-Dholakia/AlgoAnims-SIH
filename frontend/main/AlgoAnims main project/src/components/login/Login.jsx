import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./login.css";
import logoImage from "/logo.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Reload } from "../../Functions/Reload";
import { toast } from 'react-toastify'
import { getGlobalApi } from "../getGlobalApi";

function Login() {
  const loginBoxRef = useRef(null);
  const signupBoxRef = useRef(null);
  const headingRef = useRef(null);

  const [firstField, setFirst] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const [passtype, setpasstype] = useState("password");
  const [passicon, setpassicon] = useState("👁️");

  useEffect(() => {
    // localStorage.removeItem("NavedReload");
    // localStorage.removeItem("NavReload");


    // Reload("LoginReload");
    // setTimeout(() => {
    // }, 5000);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline();



    // Animation sequence
    tl.from(loginBoxRef.current, { y: 50, opacity: 0, duration: 2, delay: 0.5, ease: "power2.out" }, "ok")
      .from(signupBoxRef.current, { y: 50, opacity: 0, duration: 2, ease: "power2.out" }, "ok")
      .from(headingRef.current, { y: -50, opacity: 0, duration: 2, ease: "power2.out" }, "ok");

    return () => {
      tl.kill(); // Cleanup the timeline on unmount
    };
  }, []);



  async function check() {

    const obj = {
      username: firstField,
      password: pass
    }

    // console.log(`${getGlobalApi}`)
    const api = await fetch(`${getGlobalApi()}/user/login`, {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(obj),
    })

    // console.log(api);


    const data = await api.json();
    console.log(data);
    if (data && data.username) {
      navigate("/");
      toast.success("welcome to AlgoAnims")
      localStorage.setItem("UserName", data.username);
      localStorage.setItem("email", data.email);
      localStorage.setItem("id", data._id)
    } else {
      console.log("funck");
      toast.error("eror", {
        position: "top-right", // Adjust position
        autoClose: 3000,       // Adjust auto-close timing
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }



  useEffect(() => {


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


  }, []);



  return (

    <>

      <div className="body2">


        <div className="login-container bg-zinc-900">
          <header className="algoanims-heading" ref={headingRef}>
            AlgoAnims
          </header>

          <div className="form-container">

            <div className="login-box" ref={loginBoxRef}>
              <div className="logo">
                <img src={logoImage} alt="Logo" />
              </div>
              <form className="login-form"
                onSubmit={(evt) => {
                  evt.preventDefault();
                  check();
                }}>

                <div className="fileds-tick">
                  <div className="fileds">
                    <input
                      value={firstField}
                      onChange={(evt) => {
                        setFirst(evt.target.value)
                      }}
                      type="text"
                      placeholder="Username"
                      required
                    />

                  </div>

                </div>

                <div className="fileds-tick pass-tick">
                  <div className="fileds">
                    <input
                      value={pass}
                      onChange={(evt) => {
                        setPass(evt.target.value)
                      }}
                      type={passtype} placeholder="Password" required />
                    <button
                      type="button"
                      onClick={() => {
                        setpasstype((prevtype) => {
                          if (prevtype == "password") {
                            setpassicon("👁️")
                            return "text";
                          } else {
                            setpassicon("🙈")
                            return "password";
                          }
                        })
                      }}
                    >{passicon}</button>

                  </div>

                </div>

                <button type="submit" className="loginbtn btn-login">Log In</button>
                <div className="separator">
                  <div className="line"></div>
                </div>
                <div className="links flex justify-between">
                  <Link to={
                    {
                      pathname: "forgetusername",
                    }
                  }

                    className="forgot-password">
                    forget username?
                  </Link>
                  <Link to={
                    {
                      pathname: "forgetpassword",
                    }
                  } className="forgot-password">
                    Forgot password?
                  </Link>
                </div>
              </form>
            </div>


            <div className="signup-box" ref={signupBoxRef}>
              <p>
                Do not have an account?
                <NavLink to='/signup' className="text-blue-500">
                  <span> Sign up </span>
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}

export default Login;
