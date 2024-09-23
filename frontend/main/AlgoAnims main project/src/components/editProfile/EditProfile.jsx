import './editprofile.css'
import { Link, Outlet } from 'react-router-dom'

function EditProfile() {

  // let [option,setOption] = useState('profile');

  function EditOption({label})
  {
    // console.log(label.toLowerCase())
    return(
      <Link to={'edit'+label+'Page'}>
        <div className="editOptions" 
      id={label.toLowerCase()}
      onClick={(e)=> {
        console.log(e.target.id)
        // setOption(e.target.id)
        const rightSection = document.querySelector('.rightedit');
        if (rightSection) {
          rightSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
      }
      
      >{label}</div>
      </Link>
    )
  }
  
  return (
    <>
      <div className="profile">
        <div className="leftedit flex-col">
          <div className="profiledetails">
            <div className="profilePic">N</div>
            <div className="profileUser">Nishant Dholakia</div>
          </div>

          <div className="changeOptions">
            <h2 className="changeHeader">Edit Options</h2>
            <EditOption label = 'Profile' />
            <EditOption label = 'Platform' />
            <EditOption label = 'Accounts' />
          </div>

        </div>
        <div className="rightedit">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default EditProfile;
