import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'

function GFG() {

    const gfg = useSelector(state => state.gfg);
    const [gfgData,setGfgData] = useState({});
    useEffect(()=>{
        const call = async ()=>{
            
                console.log("entered");
                try {
                    const apicall = await fetch(`https://geeks-for-geeks-api.vercel.app/${localStorage.getItem("gfg")}`);
                    if (!apicall.ok) throw new Error("Network response was not ok");
                    const obj = await apicall.json();
                    setGfgData(obj);
                  } catch (error) {
                    console.log("Fetch error:", error);
                  }
                            
        }
        console.log(gfg);
            call();
    },[])
    console.log(gfgData);
  return (
    <div>
        <div>
            <strong>
                Institution : {gfgData.institution}
            </strong>
        </div>
    </div>
  )
}

export default GFG;