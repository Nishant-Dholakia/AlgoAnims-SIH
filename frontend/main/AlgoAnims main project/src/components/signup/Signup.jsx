<<<<<<< HEAD

import { useEffect, useState } from "react"
=======
import { useEffect } from "react"
>>>>>>> 295876372eabc353a8396b28d4dd478333ddb5fe
import gsap from "gsap";
import {Link, useNavigate} from "react-router-dom"
import Encriptor from "encriptorjs";
import getkey from "../../../public/key";
function Signup() {
    const navigate = useNavigate();
    const [password , setPass] = useState("");
    const [repassword , setRePass] = useState("");
    const [encrypt,setEncrypt] = useState("");
    const [emailid , setEmailid] = useState("");
    const [alldata , setAlldata] = useState();
    const key = getkey();

    async function main() {
        const api = await fetch("http://localhost:8080/signup");
        const data = await api.json();
        setAlldata(data)
    }


  useEffect(()=>{
    main()
    window.onload = function() {
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
  }
  })
  function handler(evt){
      evt.preventDefault();
      let f = 0;

      for(let data of alldata){
        if(data.emailId == emailid){
            alert("your account is already exits!");
            f = 1;
            break;
        }
      }

      if(f == 0){
        if(password === repassword){
            navigate("/home");
        }else{
            document.querySelector(".pass").classList.remove("hidden");
        }
      }

      
  }
  
  return (
    <div className="body">
      <div className="login-container">
        <div className="video-container">
            <video className="video" id="background-video" autoPlay muted loop>
                <source src="1726757407553429.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>

        <header className="algoanims-heading">
            AlgoAnims
        </header>

        <div className="form-container">
            <div className="login-box">
                <div className="logo">
                    <img src="/logo.png" alt="Logo" />
                </div>
                <form className="login-form" method='post'
                onSubmit={(evt)=>{

                    const formData = {
                        uname : evt.target[0].value,
                        email : emailid,
                        pass : encrypt,
                    }
                    

                    fetch("http://localhost:8080/signup",{
                        method : 'POST',
                        headers:{
                            "Content-type" : "application/json"
                        },
                        body : JSON.stringify(formData)
                    }).then((data) => data.json())


                    handler(evt);
                }}
                >
                    <input type="text" placeholder="username" required />
                    <input 
                    onChange={(evt)=>{
                        setEmailid(evt.target.value);
                    }}
                    value={emailid}
                    type="email" placeholder="Email Address" required />
                    <input type="password"
                    
                    onChange={(evt)=>{
                        setPass(evt.target.value);
                        setEncrypt(Encriptor.encrypt(password , key));
                    }}
                    value={password}
                    placeholder="Password" required />
                    <input 
                    onChange={(evt)=>{
                        setRePass(evt.target.value);
                    }}
                    value={repassword}
                    minLength={6}
                    type="password"  placeholder="confirm password" required />
                    <small className="text-red-600 pass hidden">check your password</small><br />
                    <button type="submit" className="signupbtn">Sign Up</button>
                    <div className="separator">
                    </div> 
                </form>
            </div>
            <div className="signup-box">
                <p>have an account?
                <Link to='login'>
                  Log In
                </Link>
                </p>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Signup;
<<<<<<< HEAD
=======

>>>>>>> 295876372eabc353a8396b28d4dd478333ddb5fe
