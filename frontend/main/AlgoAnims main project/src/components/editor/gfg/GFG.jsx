import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

function GFG() {

  const gfg = useSelector(state => state.gfg);
  const [gfgData, setGfgData] = useState({});
  useEffect(() => {
    const call = async () => {

      console.log("entered");
      const uname = {
        name: localStorage.getItem("gfg")
      }

      try {
        const api = await fetch(`http://localhost:8080/api/gfg`, {
          method: 'post',
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(uname)
        })
        const data = await api.json()
        console.log(data)
        setGfgData(data);
      } catch (error) {
        console.log("Fetch error:", error);
      }

    }
    console.log(gfg);
    call();
  }, [])
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