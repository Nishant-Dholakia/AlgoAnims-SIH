import { Outlet } from "react-router-dom"
import Nav from "./components/navigation/Nav"
import UseContextProvider from "./contexts/UseContextProvider"
function App() {
  return (
<<<<<<< HEAD
      <UseContextProvider>
  <Nav></Nav>
  <Outlet/>
  </UseContextProvider>
=======
    <UseContextProvider>
    
      <Outlet/>
    </UseContextProvider>
>>>>>>> 90e799e5cc0a1f7be6ad41ad1eaa1bd2c2e561f2
  )
}

export default App
