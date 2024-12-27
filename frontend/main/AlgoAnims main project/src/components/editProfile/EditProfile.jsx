import style from './editprofile.module.css'
import { Link, Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';


function EditProfile() {
  const [userName, setUserName] = useState('');

  const navigate = useNavigate();
  useEffect(() => {

    setUserName(localStorage.getItem("UserName"));
    if (!localStorage.getItem("UserName")) {
      navigate("/login");
    }



  }, [navigate]);

  function EditOption({ label }) {
    // console.log(label.toLowerCase())
    return (
      <>

        <Link to={'edit' + label + 'Page'} >
          <div className={`${style.editOptions} dark:bg-platformAccount dark:text-antiquewhite`}
            id={label.toLowerCase() + '1'}
            onClick={(e) => {
              console.log(e)
              // setOption(e.target.id)  
              const rightSection = document.querySelector('.rightedit');
              if (rightSection) {
                rightSection.scrollIntoView({ behavior: 'smooth' });
              }
            }
            }

          >{label}</div>
        </Link>
      </>
    )
  }

  return (
    <>
      <div className={`${style.profile} dark:bg-black `} >
        <div className={`${style.leftedit} flex-col dark:bg-custoBg`}>
          <div className={style.profiledetails}>
            <div
             
              className={`${style.profilePic}  dark:bg-platformAccount dark:text-antiquewhite `}>
              {(userName.charAt(0)).toUpperCase()}
            </div>
            <div className={`${style.profileUser} dark:text-antiquewhite`}>{userName}</div>
          </div>

          <div className={`${style.changeOptions} dark:bg-custoBg dark:text-white`}>
            <h2 className={style.changeHeader}>Edit Options</h2>
            <EditOption label="Profile" />
            <EditOption label="Platform" />
            <EditOption label="Accounts" />
          </div>

        </div>
        <div className={`${style.rightedit} dark:bg-custoBg`}>
          <Outlet />
        </div>
      </div>

    </>
  );
}

export default EditProfile;
