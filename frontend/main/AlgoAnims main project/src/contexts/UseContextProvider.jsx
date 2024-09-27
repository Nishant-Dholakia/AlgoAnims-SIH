import  { useState } from 'react'
import Context from './context';
function UseContextProvider({children}) {
    
    const [allData,setAllData] = useState({});
    const [userName,setUserName] = useState("");
    return (
    <Context.Provider value={{allData,setAllData,userName,setUserName}}>
        {children}
    </Context.Provider>
  )
}

export default UseContextProvider
