import { useEffect, useState } from 'react';
import './edit.css';

function EditPlatformPage() {
  const [allData, setAlldata] = useState(0);

 

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
  setAlldata(data);
  };

  return (
    <form className='edit' onSubmit={handleSubmit}>
      <div className="area">
        <label htmlFor="leetcode" className='label'>LeetCode : </label>
        <input type="text" name='leetcodeUname' id='leetcode' placeholder='username(eg. user_12)' />
      </div>
      <div className="area">
        <label htmlFor="codechef" className='label'>CodeChef : </label>
        <input type="text" name='codechefUname' id='codechef' placeholder='username(eg. user_12)' />
      </div>
      <div className="area">
        <label htmlFor="geeksforgeeks" className='label'>GeeksForGeeks : </label>
        <input type="text" name='gfgUname' id='geeksforgeeks' placeholder='username(eg. user_12)' />
      </div>
      <button 
      onClick={()=>{
        setFirst(true)
      }}
      type="submit">Save</button>
    </form>
  );
}

export default EditPlatformPage;
