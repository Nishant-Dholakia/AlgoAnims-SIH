import { useEffect } from "react";
import "./home.css";
import gsap from "gsap";
import { NavLink } from "react-router-dom";
import { Reload } from "../../Functions/Reload";


export default function Home() {

  // logout()
  useEffect(() => {
    localStorage.removeItem("LoginReload");
    Reload("HomeReload");
    main();
  }, []);


  async function main() {
    console.log("in fun");
    const api = await fetch('http://localhost:8080/api/home', {
      credentials: 'include'
    })
    const data = await api.json()
    // localStorage.removeItem('HomeReload')
    console.log(data)
    if (data._id) {
        Reload('AgainHome')

      window.localStorage.setItem("UserName", data.userName);
      window.localStorage.setItem("email", data.emailId);
      window.localStorage.setItem("Country", data.details.country);
      window.localStorage.setItem("Contact", data.details.contactNo);

      window.localStorage.setItem("leetcode", data.userNames.leetcode);
      window.localStorage.setItem("gfg", data.userNames.gfg);
      window.localStorage.setItem("codechef", data.userNames.codechef);

      window.localStorage.setItem("github", data.accounts.github);
      window.localStorage.setItem("linkedlin", data.accounts.linkedin);
      window.localStorage.setItem("discord", data.accounts.discord);

    }

  }




  setTimeout(() => {
    var h2 = document.querySelector("h2");
    var h2T = h2.textContent;
    var splittedtext = h2T.split("");
    var half = Math.floor(splittedtext.length / 2);

    var clutter1 = "";
    splittedtext.forEach(function (e, idx) {
      if (idx < half) {
        clutter1 += `<span class="a">${e}</span>`;
      } else {
        clutter1 += `<span class="b">${e}</span>`;
      }
    });

    h2.innerHTML = clutter1;

    gsap.to(".marque", {
      transform: "translateX(0%)",
      duration: 4,
      repeat: -1,
      ease: "none",
    });
  }, 100)


  window.addEventListener("wheel", function (dets) {

    if (this.document.querySelector(".marque")) {
      if (dets.deltaY > 0) {
        gsap.to(".marque", {
          transform: "translateX(-200%)",
          duration: 4,
          repeat: -1,
          ease: "none",
        });
        gsap.to(".marque img", {
          rotate: 180,
        });
      } else {
        gsap.to(".marque", {
          transform: "translateX(0%)",
          duration: 4,
          repeat: -1,
          ease: "none",
        });
        gsap.to(".marque img", {
          rotate: 0,
        });
      }
    }
  });
  setTimeout(() => {
    gsap.from("h2 .a", {
      y: 50,
      duration: 0.8,
      delay: 0.5,
      stagger: 0.15,
      opacity: 0,
    });

    gsap.from("h2 .b", {
      y: 50,
      duration: 0.8,
      delay: 0.5,
      stagger: -0.15,
      opacity: 0,
    });

  }, 200)

  function Arrow() {
    return (
      <div className="marque">
        <h3>dive into algorithm</h3>
        <img src="arrow-br.svg" alt="arrow" />
      </div>
    )
  }

  function TopicCard({ imgSrc, heading, description1, description2, navlink, }) {
    return (
      <div className="container1">
        <div className="container">
          <div className="card">
            <div className="cardimage">
              <img src={imgSrc} alt="" />
            </div>
            <div className="cardcontent">
              <h2>{heading}</h2>
              <br />
              <p>
                {description1}
              </p>
              <br />
              <h4>
                {description2}
              </h4>
              <br />
              <NavLink to={navlink} >
                <button className="cardbtn"  >Explore</button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (

    <div>

      <div className="rightimage">
        <div className="content">
          <h2>Welcome to AlgoAnims!!</h2>
          <br />
          <h1>Unlock the World of Algorithms</h1>
          <br />
          <p>
            Say goodbye to dry textbooks! Our dynamic animations simplify
            complex concepts, making it easier for you to grasp the essentials
            of algorithms.
          </p>
        </div>

        <div className="image">
          <img src="./intro_laptop.avif" alt="" />
        </div>
      </div>
      <br />
      <br />
      <br />{" "}
      <div id="page2">
        <div id="move">
          <Arrow />
          <Arrow />
          <Arrow />
          <Arrow />
          <Arrow />
          <Arrow />
        </div>
      </div>
      <br />
      <br />
      <TopicCard
        imgSrc="graph.jpeg"
        heading='GRAPH'
        description1={`Graph algorithms are the backbone of many complex systems and
                applications, from social networks to transportation logistics.
                These algorithms help us understand and solve problems involving
                interconnected data, allowing us to traverse, analyze, and
                manipulate graphs efficiently.`}
        description2={`Jump into our graph algorithms section and unlock a treasure
                trove of knowledge that will enhance your skills and expand your
                horizons.`}
        navlink='/graph'
      />
      <br />
      <br />
      <TopicCard
        imgSrc="tree.jpeg"
        heading='TREE'
        description1={`Trees are fundamental data structures that model hierarchical
                relationships. They consist of nodes connected by edges, making
                them ideal for representing data with a parent-child
                relationship. From file systems to decision processes, trees are
                everywhere!`}
        description2={`Ready to branch out into the world of tree data structures?
                Explore our dedicated section and cultivate your knowledge
                today!`}
        navlink='/'
      />
      <br />
      <br />
      <TopicCard
        imgSrc="search.jpeg"
        heading='SEARCHING'
        description1={`Searching algorithms are the unsung heroes of data retrieval,
                helping you find the information you need quickly and
                efficiently. From simple lists to complex databases, mastering
                these algorithms is essential for any aspiring programmer or
                data enthusiast.`}
        description2={`Are you ready to enhance your skills and unlock the power of
                searching algorithms? Explore our dedicated section today and
                embark on a journey toward becoming a search master!`}
        navlink='/'
      />
      <br />
      <br />
      <TopicCard
        imgSrc="Sorting.jpeg"
        heading="SORTING"
        description1={`The Art of Sorting in DSA Sorting is more than just order; it's
          a dance of efficiency! In data structures and algorithms (DSA), it 
          transforms chaos into clarity. From Bubble Sort bubbling elements to 
          Quick Sort swiftly partitioning data, each algorithm tells a unique 
          story. Explore sorting to master smarter data handling!`}
        description2={`Dive deeper into each sorting algorithm through our dynamic 
          animations and interactive examples. Experience firsthand how they work 
          and see their performance in action!`}
        navlink="/"
      />
      <br />
    </div>

  );
}


