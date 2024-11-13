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
import Graph from "../graph/Graph";
import ForgetPassword from "../ForgetPassword/ForgetPassword";
import Mail from "../Mail/Mail";
import ResetPassword from "../Resetpassword/ResetPassword";
import Tree from "../Tree/Tree";
import Preorder from "../Tree/Travel/Preorder/preorder.jsx"
import Postorder from "../Tree/Travel/Postorder/Postorder.jsx"
import Inorder from "../Tree/Travel/Inorder/Inorder.jsx"
import BinarySearch from "../Algorithms/Array/Search/Binary/BinarySearch.jsx";
import LinearSearch from "../Algorithms/Array/Search/Linear/LinearSearch.jsx"

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<HomeMain />}>
        <Route path="" element={<Home />} />
        <Route path="graph" element={<Graph />} />
        <Route path="tree" element = {<Tree/>} />
        <Route path="tree/preorder" element = {< Preorder/>} />
        <Route path="tree/postorder" element = {< Postorder/>} />
        <Route path="tree/inorder" element = {< Inorder/>} />
        <Route path="profile" element={<Profile />} />
        <Route path="editprofile" element={<EditProfile />}>
          <Route path="editProfilePage" element={<EditProfilePage />} />
          <Route path="editPlatformPage" element={<EditPlatformPage />} />
          <Route path="editAccountsPage" element={<EditAccountsPage />} />
        </Route>
      <Route path="binarysearch" element={<BinarySearch />} />
      <Route path="linearsearch" element={<LinearSearch />} />
      </Route>


      <Route path="login" element={<Login />} />
      <Route path="login/forgetpassword" element={<ForgetPassword />} />
      <Route path="login/forgetpassword/mail" element={<Mail />} />
      <Route
        path="login/forgetpassword/changepassword"
        element={<ResetPassword />}
      />
      <Route path="signup" element={<Signup />} />
    </Route>
  )
);

export default Router;
