import style from  './editprofile.module.css'
import { Link, Outlet } from 'react-router-dom'

function EditProfile() {

  // let [option,setOption] = useState('profile');

  function EditOption({label})
  {
    // console.log(label.toLowerCase())
    return(
      <>
      
      <Link to={'edit'+label+'Page'}>
        <div className={style.editOptions} 
      id={label.toLowerCase()+'1'}
      onClick={(e)=> {
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
      <div className={style.profile}>
        <div className={`${style.leftedit} flex-col`}>
          <div className={style.profiledetails}>
            <div className={style.profilePic}>N</div>
            <div className={style.profileUser}>Nishant Dholakia</div>
          </div>

          <div className={style.changeOptions}>
            <h2 className={style.changeHeader}>Edit Options</h2>
            <EditOption label="Profile" />
            <EditOption label="Platform" />
            <EditOption label="Accounts" />
          </div>
        </div>
        <div className={style.rightedit}>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default EditProfile;
