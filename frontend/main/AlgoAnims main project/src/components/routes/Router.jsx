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
import Graph from "../Topic/Topic.jsx";
import ForgetForm from "../ForgetForm/ForgetForm.jsx";
import Mail from "../Mail/Mail";
import ResetPassword from "../Resetpassword/ResetPassword";
import Preorder from "../Algorithms/Tree/Travel/Preorder/preorder.jsx"
import Postorder from "../Algorithms/Tree/Travel/Postorder/Postorder.jsx"
import Inorder from "../Algorithms/Tree/Travel/Inorder/Inorder.jsx"
import Topic from "../Topic/Topic.jsx";
import BinarySearch from "../Algorithms/Array/Search/Binary/BinarySearch.jsx";
import LinearSearch from "../Algorithms/Array/Search/Linear/LinearSearch.jsx";
import UserProcted from "../UserProcted/UserProtected.jsx"
import Level from "../Algorithms/Tree/Travel/Level/Level.jsx"

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<HomeMain />}>
        <Route path="" element={<Home />} />
        <Route path="graph" element={
          <UserProcted>
            <Graph />
          </UserProcted>} />

        <Route path="profile" element={
          <UserProcted>
            <Profile />
          </UserProcted>} />
        <Route path="editprofile" element={
          <UserProcted>
            <EditProfile />
          </UserProcted>}>
          <Route path="editProfilePage" element={
            <UserProcted>
              <EditProfilePage />
            </UserProcted>} />
          <Route path="editPlatformPage" element={
            <UserProcted>
              <EditPlatformPage />
            </UserProcted>} />
          <Route path="editAccountsPage" element={
            <UserProcted>
              <EditAccountsPage />
            </UserProcted>} />
        </Route>

        <Route path="search" element={
          <UserProcted>
            <Topic />
          </UserProcted>
        } />
        <Route path="sort" element={
          <UserProcted>
            <Topic />
          </UserProcted>} />
        <Route path="graph" element={
          <UserProcted>
            <Topic />
          </UserProcted>} />
        <Route path="linkedlist" element={
          <UserProcted>
            <Topic />
          </UserProcted>} />
        <Route path="tree" element={
          <UserProcted>
            <Topic />
          </UserProcted>} />

        <Route path="array/search/binary" element={
          <UserProcted>
            <BinarySearch />
          </UserProcted>} />
        <Route path="array/search/linear" element={
          <UserProcted>
            <LinearSearch />
          </UserProcted>} />

        <Route path="tree/preorder" element={
          <UserProcted>
            <Preorder />
          </UserProcted>
        } />
        <Route path="tree/postorder" element={
          <UserProcted>
            <Postorder />
          </UserProcted>} />
        <Route path="tree/inorder" element={
          <UserProcted>
            <Inorder />
          </UserProcted>} />
          <Route path="tree/levelorder" element={
          <UserProcted>
            <Level />
          </UserProcted>} />
      </Route>

      <Route path="login" element={<Login />} />
      <Route path="login/forgetpassword" element={<ForgetForm />} />
      <Route path="login/forgetusername" element={<ForgetForm />} />
      <Route path="login/forgetpassword/mail" element={<Mail />} />
      <Route path="login/forgetusername/mail" element={<Mail />} />
      <Route
        path="login/forgetpassword/changepassword"
        element={<ResetPassword />}
      />
      <Route path="signup" element={<Signup />} />

    </Route>
  )
);

export default Router;
