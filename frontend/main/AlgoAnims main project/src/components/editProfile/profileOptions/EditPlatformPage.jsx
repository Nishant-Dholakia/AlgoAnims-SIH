import {useState } from 'react';
import style from './edit.module.css';
import Context from '../../../contexts/context';
import { useContext } from 'react';
function EditPlatformPage() {
  // const [allData, setAlldata] = useState(0);

    let {allData,setAllData} = useContext(Context);
 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const leetcodeUname = e.target.leetcodeUname.value;
    const codechefUname = e.target.codechefUname.value;
    const gfgUname = e.target.gfgUname.value;

    const response = await fetch("http://localhost:8080/editprofile/editPlatformPage", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ leetcodeUname, codechefUname, gfgUname })
    });

    const data = await response.json();
  setAllData(data);
}; 
console.log(allData);
  return (
    <form className={style.edit} onSubmit={handleSubmit}>
      <div className={style.area}>
        <label htmlFor="leetcode" className={style.label}>LeetCode : </label>
        <input type="text" name='leetcodeUname' id='leetcode' placeholder='username (e.g., user_12)' />
      </div>
      <div className={style.area}>
        <label htmlFor="codechef" className={style.label}>CodeChef : </label>
        <input type="text" name='codechefUname' id='codechef' placeholder='username (e.g., user_12)' />
      </div>
      <div className={style.area}>
        <label htmlFor="geeksforgeeks" className={style.label}>GeeksForGeeks : </label>
        <input type="text" name='gfgUname' id='geeksforgeeks' placeholder='username (e.g., user_12)' />
      </div>
      <button className={style.save} type="submit">Save</button>
    </form>
  );
}

export default EditPlatformPage;
