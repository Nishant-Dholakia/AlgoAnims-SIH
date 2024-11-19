import { useContext, useState , useEffect } from 'react';
import style from './edit.module.css';
import Context from '../../../contexts/context';
import { getGlobalApi } from '../../getGlobalApi';
import { toast } from "react-toastify";

function EditPlatformPage() {
  const { allData, setAllData } = useContext(Context);
  
  const [leetUname,setLeetUname] = useState(localStorage.getItem("leetcode"));
  const [codeUname,setCodeUname] = useState(localStorage.getItem("codechef"));
  const [gfgUname,setGfgUname] = useState(localStorage.getItem("gfg"));

  useEffect(()=>{
    if(localStorage.getItem("platformupdate") == "true"){
      toast.success("Platform updated successfully!")
      localStorage.setItem("platformupdate",false);
    }
  },[])

  async function Savedb()
  {
  
    const id = localStorage.getItem("id")

    // Send the updated usernames to the server
    const response = await fetch(`${getGlobalApi()}/details/editplatform`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ leetUname, codeUname, gfgUname , id })
    });


    // Update the local state with the response data
    const data = await response.json();
    console.log(data);
    setAllData(data);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("leetcode" , leetUname);
    localStorage.setItem("codechef" , codeUname);
    localStorage.setItem("gfg" , gfgUname);
    Savedb();
    location.reload(true);
    localStorage.setItem("platformupdate",true);
  };

  console.log("allData" , allData); 

  return (
    <form className={style.edit} onSubmit={handleSubmit}>
      <div className={`${style.area} dark:bg-platformAccount`}>
        <label htmlFor="leetcode" className={`${style.label} dark:text-white`}>LeetCode:</label>
        <input type="text"
        defaultValue={leetUname}
        name='leetcodeUname' id='leetcode' placeholder='username (e.g., user_12)'
        onChange={evt => setLeetUname(evt.target.value)}
        />
      </div>
      <div className={`${style.area} dark:bg-platformAccount`}>
        <label htmlFor="codechef" className={`${style.label} dark:text-white`}>CodeChef:</label>
        <input type="text" 
        defaultValue={codeUname}
        name='codechefUname' id='codechef' placeholder='username (e.g., user_12)'
        onChange={evt => setCodeUname(evt.target.value)}
        />
      </div>
      <div className={`${style.area} dark:bg-platformAccount`}>
        <label htmlFor="geeksforgeeks" className={`${style.label} dark:text-white`}>GeeksForGeeks:</label>
        <input type="text"
        defaultValue={gfgUname}
        name='gfgUname' id='geeksforgeeks' placeholder='username (e.g., user_12)'
        onChange={evt => setGfgUname(evt.target.value)}
        />
      </div>
      <button className={style.save} type="submit">Save</button>
    </form>
  );
}

export default EditPlatformPage;
