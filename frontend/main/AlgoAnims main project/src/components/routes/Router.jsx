import { createBrowserRouter, createRoutesFromElements,Route } from 'react-router-dom'
import Login from '../login/Login'
import Signup from '../signup/Signup'
import Home from '../home/Home'
import Profile from '../profile/Profile'
import App from '../../App'
const Router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App />}>
            <Route path='' element={<Home />} />
            <Route path='profile' element={<Profile />} />
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<Signup />} />
        </Route>
    )

)

export default Router
