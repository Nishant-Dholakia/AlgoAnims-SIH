import  { useEffect, useRef } from "react";
import gsap from "gsap";
import "./login.css";
// import logoImage from "../assets/logo.png"; 

function Login() {
  // Create refs for the elements you want to animate
  const loginBoxRef = useRef(null);
  const signupBoxRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    console.log("useEffect called");

    // Define the animation using fromTo to reset and animate elements
    const tl = gsap.timeline();

    tl.fromTo(
      loginBoxRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, delay: 0.5, ease: "power2.out" }
    )
      .fromTo(
        signupBoxRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, delay: 0.3, ease: "power2.out" },
        "-=1" // Overlap the animations
      )
      .fromTo(
        headingRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, delay: 0.3, ease: "power2.out" },
        "-=1.2"
      );

    // Optional: Clean up the timeline on component unmount
    return () => {
      tl.kill();
    };
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div className="body">
      <div className="login-container">
        <div className="video-container">
          {/* Uncomment and ensure the video path is correct if needed */}
          {/* <video id="background-video" muted loop>
            <source src="/1726757407553429.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video> */}
        </div>

        {/* Attach ref to the heading */}
        <header className="algoanims-heading" ref={headingRef}>
          AlgoAnims
        </header>

        <div className="form-container">
          {/* Attach ref to the login box */}
          <div className="login-box" ref={loginBoxRef}>
            <div className="logo">
              {/* <img src={logoImage} alt="Logo" /> */}
            </div>
            <form className="login-form">
              <input
                type="text"
                placeholder="Phone number, username, or email"
                required
              />
              <input type="password" placeholder="Password" required />
              <button type="submit">Log In</button>
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
              Do not have an account? <a href="sign_up.html">Sign up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
