import { Outlet } from "react-router-dom"
import Nav from "./components/navigation/Nav"
import UseContextProvider from "./contexts/UseContextProvider"
function App() {
  return (
      <UseContextProvider>
  <Outlet/>
  </UseContextProvider>
  )
}

export default App
