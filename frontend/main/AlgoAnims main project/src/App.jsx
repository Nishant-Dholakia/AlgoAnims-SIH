import { Outlet } from "react-router-dom"
import Nav from "./components/navigation/Nav"
function App() {
  return (
    <>
    <Nav />
      <Outlet/>
    </>
  )
}

export default App
