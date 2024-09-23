<<<<<<< HEAD
import { useEffect } from "react"
import gsap from "gsap";
import {Link} from "react-router-dom"
function Signup() {

  useEffect(()=>{
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
                <form className="login-form" method='post'>
                    <input type="text" placeholder="username" required />
                    <input type="text" placeholder="Email Address" required />
                    <input type="password" placeholder="Password" required />
                    <input type="password" placeholder="confirm password" required />
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
=======
>>>>>>> 72bcf5fd8bbf2f2d667fce57de2403a5ad13a523
