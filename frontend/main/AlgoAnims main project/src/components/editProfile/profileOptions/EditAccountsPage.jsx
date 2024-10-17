import { useState,useEffect } from 'react';
import style from './edit.module.css'; // Importing CSS module
import { useNavigate } from 'react-router-dom';
function EditAccountsPage() {


  const [linkedin,setLinkedin] = useState(localStorage.getItem(`linkedin`));
  const [github,setGithub] = useState(localStorage.getItem(`github`));
  const [discord,setDiscord] = useState(localStorage.getItem(`discord`));
  const navigate = useNavigate();
  useEffect(() => {
      if (!localStorage.getItem("UserName")) {
          navigate("/login");
      }  
      
  }, [navigate]);

  function setAccounts(e)
  {
    e.preventDefault();
    localStorage.setItem('linkedin',linkedin);
    localStorage.setItem('github',github);
    localStorage.setItem('discord',discord);

  }

  return (
    <form className={style.edit} method='post'
    onSubmit={(setAccounts)}
    >
      <div className={style.area}>
        <label 
        htmlFor="linkedin" className={style.label}>LinkedIn : </label>
        <input 
        defaultValue={linkedin}
        type="text" name='linkedin' id='linkedin' placeholder='username(eg. user_12)' 
        onChange={(e)=>setLinkedin(e.target.value)}
        />
      </div>
      <div className={style.area}>
        <label htmlFor="github" className={style.label}>GitHub : </label>
        <input 
        defaultValue={github}
        type="text" name='github' id='github' placeholder='username(eg. user_12)'
        onChange={(e)=>setGithub(e.target.value)}
        />
      </div>
      <div className={style.area}>
        <label htmlFor="discord" className={style.label}>Discord : </label>
        <input 
        defaultValue={discord}
        type="text" name='discord' id='discord' placeholder='username(eg. user_12)' 
        onChange={(e)=>setDiscord(e.target.value)}
        />
      </div>
      <input type="submit" value='Save' className={style.save} />
    </form>
  );
}

export default EditAccountsPage;
