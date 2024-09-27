import  { useState } from 'react'
import Context from './context';
function UseContextProvider({children}) {
    
    const [allData,setAllData] = useState();
    const [userName,setUserName] = useState();
    return (
    <Context.Provider value={{allData,setAllData}}>
        {children}
    </Context.Provider>
  )
}

export default UseContextProvider
