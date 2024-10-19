import { useState ,useEffect} from "react";
import style from "./edit.module.css";
import codes from "country-calling-code";
import { useNavigate } from "react-router-dom";

function EditProfilePage() {
      let code = new Object();
      const [userName,setUserName] = useState(localStorage.getItem("UserName"));
      const emailId = localStorage.getItem("email");;
      const navigate = useNavigate();
      useEffect(() => {
          if (!localStorage.getItem("UserName")) {
              navigate("/login");
          }  
          
      }, [navigate]);

  for (let it of codes) {
    code[it.country] = it.countryCodes[0];
  }

  const [phonecountry, setPhoneCountry] = useState(localStorage.getItem('Country'));
  const [phonecode, setPhoneCode] = useState(code[phonecountry]);
  const [phoneNumber,setPhoneNumber] = useState(localStorage.getItem('Contact'));
  async function submitData(){
    const data = {
      email : emailId,
      username : userName,
      country : phonecountry,
      phoneNo : phoneNumber,
    }
    const api = await fetch("http://localhost:8080/editProfile" , {
      method : 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body : JSON.stringify(data),
    })


  }
  function saveEditProfile(e)
  {
    e.preventDefault();
    localStorage.setItem('Contact',phoneNumber);
    localStorage.setItem('Country',phonecountry);
    localStorage.setItem('UserName',userName);
    location.reload(true);// to show changes in the edit profile also
    
    submitData();
  }

  function setNumber(e)
  {
    let input = e.target.value;
    if(!input)
    {
      setPhoneNumber(null);
    }
    else if( /^\d+$/.test(input))// it returns true if string contains only digits, else false
    {
      setPhoneNumber(parseInt(input));
      console.log(input);
    }
  }

  

  return (
    <form className={style.edit} method="post"
      onSubmit={saveEditProfile}
    >
      <div className={style.area}>
        <label htmlFor="username" className={style.label}>
          Username :
        </label>
        <input
          defaultValue={userName}
          type="text"
          name="username"
          id="username"
          placeholder="eg. Billy_12"
          onChange={(e)=>setUserName(e.target.value)}
        />
      </div>
      <div className={style.area}>
        <label htmlFor="emailid" className={style.label}>
          Email id :
        </label>
        <input
          defaultValue={emailId}
          readOnly
          type="email"
          name="emailid"
          id="emailid"
          placeholder="eg. billy12@gmail.com"
        />
      </div>
      <div className={style.area}>
        <label htmlFor="country" className={style.label}>
          Country :
        </label>
        <select
          defaultValue={phonecountry}
          name="country"
          id="country"
          className="text-slate-950"
          onChange={(e) => {
            setPhoneCode(code[e.target.value]);
            setPhoneCountry(e.target.value);
          }}
          value={phonecountry}
        >
          {Object.entries(code).map(([country, phoneCode]) => {
            return (
              <option key={country} value={country} className="text-black">
                {country}
              </option>
            );
          })}
        </select>
      </div>

      <div className={style.area}>
        <label htmlFor="contactnum" className={style.label}>
          Contact Number :
        </label>
        <div className={style['contact-input']}>
          <span>{phonecode}</span>
          <input
            type="text"
            value={String(phoneNumber) == 'null' ? '' : String(phoneNumber)}
            maxLength={10}
            minLength={10}
            name="contactnum"
            id="contactnum"
            placeholder="Enter 10 digit number only"
            className={style['no-spinner']}
            onChange={setNumber}
          />
        </div>
      </div>
      <input type="submit" value="Save" className={style.save} />
    </form>
  );
}

export default EditProfilePage;
