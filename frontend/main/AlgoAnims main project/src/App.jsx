import { Outlet } from "react-router-dom"
import UseContextProvider from "./contexts/UseContextProvider"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <UseContextProvider>
      <ToastContainer />
        <Outlet />
    </UseContextProvider>
  )
}

export default App