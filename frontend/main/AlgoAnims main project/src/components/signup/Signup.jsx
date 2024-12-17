import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useNavigate, NavLink } from "react-router-dom";
import { getGlobalApi } from "../getGlobalApi"
import './signup.css';
import { isDigit, isChar, isSpecialChar } from '../../Functions/Check'
import { toast } from "react-toastify";

function Signup() {
  useEffect(() => {
    localStorage.removeItem("LoginReload");
  }, [])

  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPass] = useState("");
  const [repassword, setRePass] = useState("");
  const [encrypt, setEncrypt] = useState("");
  const [emailid, setEmailid] = useState("");
  const [alldata, setAlldata] = useState([]);

  const [passType, setPassType] = useState("password");
  const [passicon, setPassicon] = useState("👁️");
  const [repassType, setrePassType] = useState("password");
  const [repassicon, setrePassicon] = useState("👁️");

  const [emailColor, setEmailColor] = useState("text-red-500");
  const [passColor, setpassColor] = useState("text-red-500");
  const [repassColor, setRepassColor] = useState("text-red-500");
  const [unameColor, setUnameColor] = useState("text-red-500");

  const [emailTick, setEmailTick] = useState("X");
  const [passTick, setPassTick] = useState("X");
  const [unameTick, setUnameTick] = useState("X");
  const [repassTick, setRepassTick] = useState("X");

  const [emailMsg, setEmailmsg] = useState("invalid email");
  const [passMsg, setpassMsg] = useState("invalid password");
  const [repassmsg, setRepassmsg] = useState("password not match");
  const [unameMsg, setunameMsg] = useState("invalid username");



  function userNameError(evt) {
    let value = evt.target.value
    setUserName(value);
    setUnameColor("text-red-500");
    setUnameTick("X")

    if (value.length < 6) {
      setunameMsg("userName must have at least 6 charcters");
    } else {
      if (!isChar(value)) {
        setunameMsg("username should have characters");
      } else {
        if (!isDigit(value)) {
          setunameMsg("username should have digits");
        } else {
          setunameMsg("valid");
          setUnameColor("text-green-500");
          setUnameTick("✔")
        }
      }
    }

    for (let data of alldata) {
      if (data.userName === value) {
        setUnameTick("X");
        setunameMsg("userName is not availabel");
        setUnameColor("text-red-500");
        break;
      }
    }

  }

  async function emailError(evt) {
    let value = evt.target.value;
    setEmailid(value);

    // const response = await fetch(`https://api.hunter.io/v2/email-verifier?email=${value}&api_key=91fe1ddad21f8fc3e899ceb48bc41c704ad89269`);
    // const data = await response.json();

    if ('valid') {
      setEmailTick("✔");
      setEmailColor("text-green-500");
      setEmailmsg("valid");
    } else {
      setEmailTick("X");
      setEmailmsg("invalid emailid");
      setEmailColor("text-red-500");
    }

  }

  function rePassError(evt) {
    let value = evt.target.value;
    setRePass(value)
    if (value != password) {
      setRepassColor("text-red-500");
      setRepassTick("X");
      setRepassmsg("don't match password");
    } else {
      setRepassColor("text-green-500");
      setRepassTick("✔");
      setRepassmsg("valid");
    }
  }

  function passwordError(evt) {
    let value = evt.target.value
    if (value != repassword) {
      setRepassColor("text-red-500");
      setRepassTick("X");
      setRepassmsg("don't match password");
    }
    setPass(value);
    setpassColor("text-red-500");
    setPassTick("X");
    if (value.length < 6) {
      setpassMsg("min length of password is 6");
    } else {
      if (!isChar(value)) {
        setpassMsg("password should contain charaters");
      } else {
        if (!isDigit(value)) {
          setpassMsg("password should contain digit");
        } else {
          if (!isSpecialChar(value)) {
            setpassMsg("password should contain special charcter");
          } else {
            setpassMsg("valid");
            setPassTick("✔");
            setpassColor("text-green-500")
          }
        }
      }


    }
  }




  // Fetch existing user data
  async function main() {
    const api = await fetch(`${getGlobalApi()}/api/signup`);
    const data = await api.json();
    setAlldata(data);
    console.log(data)
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
      tl.from(loginBox, { y: 50, opacity: 0, duration: 1.5, delay: 1 }, "ok");
    }

    if (signupBox) {
      tl.from(signupBox, { y: 50, opacity: 0, duration: 1.5, delay: 1 }, "ok");
    }

    if (algoanimsHeading) {
      tl.from(algoanimsHeading, { y: -50, opacity: 0, duration: 1.5, delay: 1 }, "ok");
    }

    // Cleanup on unmount
    return () => {
      tl.kill();
    };

  }, []);

  // Handle form submission
  function handler(evt) {
    evt.preventDefault();
    if (passTick == '✔' && unameTick == '✔' && repassTick == '✔' && emailTick == '✔') {
      // Encrypt password before sending
      const formData = {
        uname: evt.target[0].value,
        email: emailid,
        password: password

      };

      // Send data to the server
      fetch(`${getGlobalApi()}/user/signup`, {
        method: 'POST',
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(formData)
      }).then(async (res) => {
        // console.log(res);
        let data = await res.json()
        console.log(data)
        if (data.message) {
          toast.error(data.message);
        } else {
          toast.success("user register successfully")
          navigate("/login");
        }
      });



    }
  }

  return (
    <div className="body33">
      <div className="login-container bg-zinc-900">


        <header className="algoanims-heading">
          AlgoAnims
        </header>

        <div className="form-container">
          <div className="login-box">
            <div className="logo">
              <img src="/logo.png" alt="Logo" />
            </div>
            <form className="login-form" onSubmit={handler}>


              <div className="fileds-tick">
                <div className="fileds">
                  <input type="text"
                    id="uname"
                    value={userName}
                    onChange={(evt) => {
                      userNameError(evt);
                    }}
                    placeholder="Username" required />
                  {userName.length > 0 ? <input type="text"
                    readOnly
                    className={`${unameColor}`}
                    value={unameTick}
                  /> : <></>}
                </div>
                {unameMsg != "valid" && userName.length > 0 ? <small className={`${unameColor} unamesmall`}>{unameMsg}</small> : <></>}
              </div>

              <div className="fileds-tick">
                <div className="fileds">
                  <input
                    onChange={(evt) => {
                      emailError(evt);
                    }}
                    value={emailid}
                    type="email"
                    placeholder="Email Address"
                    required
                  />
                  {emailid.length > 0 ? <input type="text"
                    readOnly
                    className={`${emailColor}`}
                    value={emailTick}
                  /> : <></>}

                </div>
                {emailMsg != "valid" && emailid.length > 0 ? <small className={`${emailColor}`}>{emailMsg}</small> : <></>}
              </div>


              <div className="fileds-tick pass-tick">
                <div className="fileds">
                  <input
                    onChange={(evt) => {
                      passwordError(evt)

                    }}

                    value={password}
                    type={passType}
                    placeholder="Password"
                    required
                  />
                  <button
                    className="btn-pass"
                    type="button"
                    onClick={() => {
                      setPassType((prev) => {
                        if (prev == 'password') {
                          setPassicon("🙈");
                          return "text";
                        } else {
                          setPassicon("👁️");
                          return "password";
                        }
                      })
                    }}
                  >{passicon}</button>
                  {password.length > 0 ? <input type="text"
                    readOnly
                    className={`${passColor}`}
                    value={passTick}
                  /> : <></>}
                </div>
                {passMsg != "valid" && password.length > 0 ? <small className={`${passColor}`}>{passMsg}</small> : <></>}
              </div>

              <div className="fileds-tick pass-tick">
                <div className="fileds">
                  <input
                    onChange={(evt) => {
                      rePassError(evt)
                    }}
                    value={repassword}
                    type={repassType}
                    placeholder="Confirm Password"
                    required
                  />
                  <button
                    className="btn-pass"
                    type="button"
                    onClick={() => {
                      setrePassType((prev) => {
                        if (prev == 'password') {
                          setrePassicon("🙈");
                          return "text";
                        } else {
                          setrePassicon("👁️");
                          return "password";
                        }
                      })
                    }}
                  >{repassicon}</button>
                  {repassword.length > 0 ? <input type="text"
                    readOnly
                    className={`${repassColor}`}
                    value={repassTick}
                  /> : <></>}

                </div>
                {repassmsg != "valid" && repassword.length > 0 ? <small className={`${repassColor}`}>{repassmsg}</small> : <></>}
              </div>


              <button type="submit" className="signupbtn">Sign Up</button>
              <div className="separator">
                <div className="line"></div>
              </div>
            </form>
          </div>
          <div className="signup-box">
            <form  action="http://localhost:3000/auth/google" method="get">
            
              <button type="submit">Sign up google</button>
            </form>
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
