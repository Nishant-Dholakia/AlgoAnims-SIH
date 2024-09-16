import "./profile.css";
function Profile() {

function CreateUserDetails({svg,text,data = 'N/A'})
{
    return(
      <div className="accounts flex gap-2 items-center m-2">
      <img src={svg} className="mx-1 darksvg" />{' '}
      <a href={data}>{text}</a>
    </div>
    )
}

  return (
    <>
      <div className="profilecss">
        <div className="left">
          <div className="personaldetails">
            {/* <div className="profilepic">
                N
              </div> */}
              <img
                className="profilepic"
                src="https://media.licdn.com/dms/image/v2/D4D03AQHMKhaYEalknA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1705511571724?e=1732147200&v=beta&t=UMWylJghozMP14R5X9VJ4XrHHzuNm2nOqf-yz5X1Udo"
                alt="N"
              />
              
              <div className="username">Nishant Dholakia</div>
              {/* <div className="emailid">
                <img src="/email.svg" alt="emailid" className="darksvg" />
                nishantdholakia2020@gmail.com
              </div> */}
          </div>

          <button className="editprofilebtn">Edit Profile</button>
          <CreateUserDetails 
          svg = '/email.svg'
          text = 'nishantdholakia2020@gmail.com'
          data = 'nishantdholakia2020@gmail.com'
          />
          <CreateUserDetails 
          svg = '/linkedin.svg'
          text = 'Linkedin Profile'
          data = 'https://www.linkedin.com/in/nishant-dholakia-a43bb02a8/'
          />
          <CreateUserDetails 
          svg = '/github.svg'
          text = 'Github Profile'
          data = 'https://github.com/Nishant-Dholakia'
          />
        </div>
        <div className="right"></div>
      </div>
    </>
  );
}

export default Profile;
