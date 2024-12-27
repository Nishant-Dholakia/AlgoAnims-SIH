// import Nav from "../navigation/Nav";
import "./profile.css";
import { Link } from "react-router-dom";
import { useEffect, useState , useRef } from "react";
import { useNavigate } from "react-router-dom";
import LeetcodeActivity from "./Leetcode/LeetcodeActivity";
import MyHeatmap from "../heatMap/heatMap";
import CodechefGraph from "../CodeChefGraph/CodechefGraph";
import GFG from "./gfg/GFG";
import CodeChef from "./codechef/CodeChef";
import axios from "axios";
import { getGlobalApi } from "../getGlobalApi";

function Profile() {
  const [hover, setHover] = useState(false);
  const [userName, setUserName] = useState('');
  const [emailId, setEmailId] = useState('');
  const formref = useRef(null)
  const navigate = useNavigate();

  const [currentPlatform, setCurrentPlatform] = useState('');

  useEffect(() => {

    setUserName(localStorage.getItem("UserName"));
    setEmailId(localStorage.getItem("email"));
    if (!localStorage.getItem("UserName")) {
      navigate("/login");
    }
  }, [navigate]);




  function CreateUserDetails({ svg, text, data = "N/A" }) {
    return (
      <div className="accounts break-words flex gap-2 items-center m-2">
        <img src={svg} className="mx-1 darksvg  dark:invert" /> <a href={data}>{text}</a>
      </div>
    );
  }


  function CreatePlatForms({ svg, text, data = "N/A" }) {
    return (
      <div
        className="platformAccounts bg-slate-500 flex justify-center p-1 my-2 rounded-md dark:bg-platformAccount"
        onClick={() => {
          const rightSection = document.querySelector(".right");
          if (rightSection) {
            rightSection.scrollIntoView({ behavior: "smooth" });
          }
        }}
      >
        <img
          src={svg}
          alt={text}
          className="w-11 h-11 m-2 bg-white rounded-md"
        />

        <div className="textplatform flex-col">
          <div className="text-xl">{text}</div>
          <div>{data}</div>
        </div>
        <button className="p-1" onClick={() => setCurrentPlatform(text)}>
          <img src="/linkopen.svg" className="darksvg  w-9 h-9 dark:invert" alt={text} />
        </button>
      </div>
    );
  }

  return (
    <div className="profilecss dark:bg-black ">
      <div className="left  flex-col dark:bg-custoBg dark:text-antiquewhite">
        <div className="personaldetails">
          <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className="profilepic rounded-full dark:bg-platformAccount ">
            {/* <div className=" image-container"> */}

              {/* {hover && (
                <div className="edit-icon" onClick={()=>{
                  formref.current.click()
                }}>
                  <i className="ri-edit-line"></i>
                </div>
              )} */}
            {/* </div> */}
            {/* <div className="absoulte left-1/2  -translate-x-[80%]"> */}
              {(userName.charAt(0)).toUpperCase()}
            {/* </div> */}

            <input type="file" hidden ref={formref} onChange={async(event)=>{
              const file = event.target.files[0];
              console.log(file)
              if (file) {
                const formData = new FormData();
                console.log("formData")
                formData.append('image', file);
                console.log(formData)
                const obj = {
                  formData : formData,
                  id : localStorage.getItem("id"),
                }
                try {
                  const response = await axios.post(`${getGlobalApi()}/details/editphoto`, obj, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                  });
                  // console.log('File uploaded:', response.data);
                } catch (error) {
                  console.error('Error uploading file:', error);
                }
              }
            }}/>

          </div>
          {/* <img
              className="profilepic"
              src="https://media.licdn.com/dms/image/v2/D4D03AQHMKhaYEalknA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1705511571724?e=1732147200&v=beta&t=UMWylJghozMP14R5X9VJ4XrHHzuNm2nOqf-yz5X1Udo"
              alt="N"
            /> */}

          <div className="username">{userName}</div>
        </div>

        <Link to="/editprofile">
          <button className="editprofilebtn">Edit Profile</button>
        </Link>
        <div>
          <CreateUserDetails
            svg="/email.svg"
            text={emailId}
            data={emailId}
          />
          <CreateUserDetails
            svg="/linkedin.svg"
            text="Linkedin Profile"
            data={localStorage.getItem(`linkedlin`)}
          />
          <CreateUserDetails
            svg="/github.svg"
            text="Github Profile"
            data={localStorage.getItem(`github`)}
          />
        </div>
        <h1 className="text-2xl font-bold text-center"> Competitive Platforms</h1>

        <div className="platforms mt-6">
          <CreatePlatForms
            svg="/leetcode.svg"
            text="LeetCode"
            data={localStorage.getItem(`leetcode`)}
          />

          <CreatePlatForms
            svg="/codechef.svg"
            text="CodeChef"
            data={localStorage.getItem(`codechef`)}

          />
          <CreatePlatForms
            svg="/gfg.svg"
            text="GeeksforGeeks"
            data={localStorage.getItem(`gfg`)}
          />


        </div>
      </div>
      <div className="right dark:bg-custoBg">
        <div className="rightShow">

          <h1 className="text-center text-3xl w-full font-bold text-theme">{currentPlatform}</h1>
          {currentPlatform === 'LeetCode' && <LeetcodeActivity />}
          {
            currentPlatform === 'CodeChef' &&
            <div className="mapdiv  dark:bg-custoBg w-full rounded-md px-6 pt-1 pb-0 ">
              <CodeChef />
            </div>
          }
          {currentPlatform === 'GeeksforGeeks' && <GFG />}
        </div>

      </div>
    </div>
  );
}

export default Profile;
