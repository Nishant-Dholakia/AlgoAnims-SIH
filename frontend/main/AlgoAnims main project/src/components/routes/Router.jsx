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
      <Route path="" element={<HomeMain />}>
        <Route path="" element={<Home />} />
        {/* <Route path="home" element={<Home />} /> */}
        <Route path="profile" element={<Profile />}/>
        <Route path="editprofile" element={<EditProfile />}>
            <Route path="editProfilePage" element={<EditProfilePage />} />
            <Route path="editPlatformPage" element={<EditPlatformPage />} />
            <Route path="editAccountsPage" element={<EditAccountsPage />} />
          </Route>
        
      </Route>


      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
    </Route>
  )
);

        


export default Router;
