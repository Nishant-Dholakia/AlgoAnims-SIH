import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UserProtected = ({children}) => {
    const navigate = useNavigate()
    const [uid, setuid] = useState(localStorage.getItem("id"))
  
    useEffect(()=>{
      if(!uid){
        navigate("/login")
      }
    } , [uid])

  return (
    <div>
        {children}
    </div>
  )
}

export default UserProtected