import { useState,useEffect } from 'react';
import style from './edit.module.css'; // Importing CSS module
import { useNavigate } from 'react-router-dom';
import { getGlobalApi } from '../../getGlobalApi';
import { toast } from "react-toastify";
function EditAccountsPage() {

  const [linkedin,setLinkedin] = useState(localStorage.getItem(`linkedin`));
  const [github,setGithub] = useState(localStorage.getItem(`github`));
  const [discord,setDiscord] = useState(localStorage.getItem(`discord`));
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem("accountupdate") == "true"){
      toast.success("Account updated successfully!")
      localStorage.setItem("accountupdate",false);
    }
      if (!localStorage.getItem("UserName")) {
          navigate("/login");
      }  
      
  }, [navigate]);

  async function main(){

    const data = {
      id : localStorage.getItem("id"),
      linkedin : linkedin,
      github : github,
      discord : discord,
    }

    const api = await fetch(`${getGlobalApi()}/details/editaccount` , {
      method : 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body : JSON.stringify(data),
    })

    
  }

  function setAccounts(e)
  {
    e.preventDefault();
    localStorage.setItem('linkedin',linkedin);
    localStorage.setItem('github',github);
    localStorage.setItem('discord',discord);
    main(); 
    location.reload(true);
    localStorage.setItem("accountupdate",true);
  }

  return (
    <form className={style.edit} method='post'
    onSubmit={(setAccounts)}
    >
      <div className={`${style.area} dark:bg-platformAccount `}>
        <label 
        htmlFor="linkedin" className={`${style.label} dark:text-white`}>LinkedIn : </label>
        <input 
        defaultValue={linkedin}
        type="text" name='linkedin' id='linkedin' placeholder='username(eg. user_12)' 
        onChange={(e)=>setLinkedin(e.target.value)}
        />
      </div>
      <div className={`${style.area} dark:bg-platformAccount`}>
        <label htmlFor="github" className={`${style.label} dark:text-white`}>GitHub : </label>
        <input 
        defaultValue={github}
        type="text" name='github' id='github' placeholder='username(eg. user_12)'
        onChange={(e)=>setGithub(e.target.value)}
        />
      </div>
      <div className={`${style.area} dark:bg-platformAccount`}>
        <label htmlFor="discord" className={`${style.label} dark:text-white`}>Discord : </label>
        <input 
        defaultValue={discord}
        type="text" name='discord' id='discord' placeholder='username(eg. user_12)' 
        onChange={(e)=>setDiscord(e.target.value)}
        />
      </div>
      <input type="submit" value='Save' className={`${style.save} cursor-pointer`} />
    </form>
  );
}

export default EditAccountsPage;
