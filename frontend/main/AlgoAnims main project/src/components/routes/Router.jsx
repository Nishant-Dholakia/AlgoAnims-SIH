import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Login from "../login/Login";
import Signup from "../signup/Signup";
import Home from "../home/Home";
import Profile from "../editor/Profile";
import App from "../../App";
import EditProfile from "../editProfile/EditProfile";
import EditAccountsPage from "../editProfile/profileOptions/EditAccountsPage";
import EditPlatformPage from "../editProfile/profileOptions/EditPlatformPage";
import EditProfilePage from "../editProfile/profileOptions/EditProfilePage";
import HomeMain from "../home/HomeMain/HomeMain";
const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* <Route path='/home' element={<Home />} /> */}
      <Route path="" element={<HomeMain />}>
        <Route path="" element={<Home />} />
        <Route path="profile" element={<Profile />}/>
        <Route path="editprofile" element={<EditProfile />}>
            <Route path="editProfilePage" element={<EditProfilePage />} />
            <Route path="editPlatformPage" element={<EditPlatformPage />} />
            <Route path="editAccountsPage" element={<EditAccountsPage />} />
          </Route>
        
      </Route>

<<<<<<< HEAD
            {/* <Route path='/home' element={<Home />} /> */}
            <Route path='' element={<Home />} />
            <Route path='profile' element={<Profile />} />
            <Route path='login' element={<Login/>} />
            <Route path='signup' element={<Signup/>} />
            <Route path='editprofile' element={<EditProfile />}>
                <Route path='editProfilePage' element={<EditProfilePage />} />
                <Route path='editPlatformPage' element={<EditPlatformPage />} />
                <Route path='editAccountsPage' element={<EditAccountsPage />} />
            </Route>
        </Route>
    )
=======
>>>>>>> 19b37f29b6a704d550d0143bbd78b4ba4521c421

      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
    </Route>
  )
);

<<<<<<< HEAD
export default Router



{/* <Route path='/' element={<App />}>

<Route path='' element={<Home />} />
<Route path='profile' element={<Profile />} />
<Route path='login' element={<Login/>} />
<Route path='signup' element={<Signup/>} />
<Route path='editprofile' element={<EditProfile />}>
    <Route path='editProfilePage' element={<EditProfilePage />} />
    <Route path='editPlatformPage' element={<EditPlatformPage />} />
    <Route path='editAccountsPage' element={<EditAccountsPage />} />
</Route>
</Route> */}
=======
        


export default Router;
>>>>>>> 19b37f29b6a704d550d0143bbd78b4ba4521c421
