import { useState } from "react";
import "./edit.css";
import codes from "country-calling-code";
function EditProfilePage() {
  let code = new Object();

  for (let it of codes) {
    code[it.country] = it.countryCodes[0];
  }
  
  let [phonecode,setPhoneCode] = useState(code['India']);
  let [phonecountry,setPhoneCountry] = useState('India');
  console.log(code);
  return (
    <form className="edit" method="post">
      <div className="area">
        <label htmlFor="username" className="label">
          Username :
        </label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="eg. Billy_12"
        />
      </div>
      <div className="area">
        <label htmlFor="emailid" className="label">
          Email id :
        </label>
        <input
        readOnly
          type="email"
          name="emailid"
          id="emailid"
          placeholder="eg. billy12@gmail.com"
        />
      </div>
      <div className="area">
        <label htmlFor="country" className="label">
          Country : 
        </label>
        <select name="country" id="country" className="text-slate-950"
        onChange={(e)=>{
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
      <div className="area">
        <label htmlFor="contactnum" className="label">
          Contact Number :
        </label>
        <div className="contact-input">
    <span>{phonecode}</span>
    <input
      type="number"
      max={10}
      min={10}
      name="contactnum"
      id="contactnum"
      placeholder="Enter 10 digit number only"
      className="no-spinner"
    />
  </div>
      </div>
      <input type="submit" value="Save" className="save" />
    </form>
  );
}

export default EditProfilePage;
