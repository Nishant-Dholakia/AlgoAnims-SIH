import { useContext, useState } from 'react';
import style from './edit.module.css';
import Context from '../../../contexts/context';

function EditPlatformPage() {
  const { allData, setAllData } = useContext(Context);
  
  const [leetUname,setLeetUname] = useState(localStorage.getItem("leetcode"));
  const [codeUname,setCodeUname] = useState(localStorage.getItem("codechef"));
  const [gfgUname,setGfgUname] = useState(localStorage.getItem("gfg"));
  async function Savedb()
  {
  
    const email = localStorage.getItem("email");

    // Send the updated usernames to the server
    const response = await fetch("http://localhost:8080/editprofile/editPlatformPage", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ leetUname, codeUname, gfgUname , email })
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
    // location.reload(true);
    Savedb();
  };

  console.log("allData" , allData); 

  return (
    <form className={style.edit} onSubmit={handleSubmit}>
      <div className={style.area}>
        <label htmlFor="leetcode" className={style.label}>LeetCode:</label>
        <input type="text"
        defaultValue={leetUname}
        name='leetcodeUname' id='leetcode' placeholder='username (e.g., user_12)'
        onChange={evt => setLeetUname(evt.target.value)}
        />
      </div>
      <div className={style.area}>
        <label htmlFor="codechef" className={style.label}>CodeChef:</label>
        <input type="text" 
        defaultValue={codeUname}
        name='codechefUname' id='codechef' placeholder='username (e.g., user_12)'
        onChange={evt => setCodeUname(evt.target.value)}
        />
      </div>
      <div className={style.area}>
        <label htmlFor="geeksforgeeks" className={style.label}>GeeksForGeeks:</label>
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
