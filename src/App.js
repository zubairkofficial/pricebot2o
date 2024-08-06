import React from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import AdminLayout from "./Screens/Admin/Layout";
import { HeaderProvider } from './Components/HeaderContext';
import Users from "./Screens/Admin/User/Users";
import Helpers from "./Config/Helpers";
import Login from "./Screens/Auth/Login";
import Adduser from "./Screens/Admin/User/Adduser";
import Edituser from "./Screens/Admin/User/Edituser";
import UserDashboard from "./Screens/User/Home";
import UserLayout from "./Screens/User/Layout";
import FileUpload from "./Screens/User/Fileupload";
import ChangePass from "./Screens/User/ChangePass";
import Voice from "./Screens/User/Voice";
import SentEmails from "./Screens/User/SentEmails";
import Transcription from "./Screens/User/Transcription";
import ResendEmail from "./Screens/User/ResendEmail";
import Services from "./Screens/Admin/Service/Services";
import AddService from "./Screens/Admin/Service/AddService";
import EditService from "./Screens/Admin/Service/EditService";
import Orgs from "./Screens/Admin/Organization/Orgs";
import AddOrg from "./Screens/Admin/Organization/AddOrg";
import EditOrg from "./Screens/Admin/Organization/EditOrg";
import Trans from "./Screens/Admin/Translation/Translations";
import AddTrans from "./Screens/Admin/Translation/AddTrans";
import EditTrans from "./Screens/Admin/Translation/EditTrans";

const Auth = ({ children, isAuth = true, isAdmin = false }) => {
  let user = Helpers.getItem("user", true);
  let token = Helpers.getItem("token");
  let loginTime = Helpers.getItem("loginTimestamp");
  let currentTime = new Date().getTime();
  let minutesPassed = Math.floor((currentTime - loginTime) / (1000 * 60));

  // Check for session expiration
  if (loginTime && minutesPassed > 120) {
    localStorage.clear();
    Helpers.toast("error", "Session expired. Login again to continue");
    return <Navigate to="/login" />;
  }
  // For protected routes
  else if (isAuth) {
    if (!user || !token) {
      Helpers.toast("error", "Please login to continue");
      return <Navigate to="/login" />;
    }

    // Ensure only admins can access admin routes
    if (isAdmin && parseInt(user.user_type) !== 1) {
      Helpers.toast("error", "Access denied. Only admin allowed.");
      return <Navigate to="/" />;
    }

    // Ensure admins cannot access user routes
    if (!isAdmin && parseInt(user.user_type) === 1) {
      Helpers.toast(
        "error",
        "Access denied. Admins cannot access user routes."
      );
      return <Navigate to="/admin/dashboard" />;
    }

    return children;
  }
  // For non-protected routes like /login
  else {
    if (user && token) {
      if (user.user_type === 1) {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/" />;
      }
    }
    return children;
  }
};

const App = () => {
  return (
    <BrowserRouter>
      <HeaderProvider>
        <Routes>
          <Route path="/login" element={<Auth isAuth={false}><Login /></Auth>} />
          <Route path="/" element={<UserLayout />}>
            <Route path="/" element={<Auth><UserDashboard /></Auth>} />
            <Route path="/fileupload" element={<Auth><FileUpload /></Auth>} />
            <Route path="/voice" element={<Auth><Voice /></Auth>} />
            <Route path="/transcription" element={<Auth><Transcription /></Auth>} />
            <Route path="/sent-emails" element={<Auth><SentEmails /></Auth>} />
            <Route path="/resend-email/:userId" element={<Auth><ResendEmail /></Auth>} />
            <Route path="/changePass" element={<Auth><ChangePass /></Auth>} />
          </Route>

          <Route path="/admin/" element={<AdminLayout />}>
            <Route path="dashboard" element={<Auth isAdmin={true}> <Users /> </Auth>} />
            <Route path="add-user" element={<Auth isAdmin={true}><Adduser /> </Auth>} />
            <Route path="edit-user/:id" element={<Auth isAdmin={true}><Edituser /> </Auth>} />
            <Route path="services" element={<Auth isAdmin={true}><Services /> </Auth>} />
            <Route path="add-service" element={<Auth isAdmin={true}><AddService /> </Auth>} />
            <Route path="edit-service/:id" element={<Auth isAdmin={true}><EditService /> </Auth>} />
            <Route path="orgs" element={<Auth isAdmin={true}><Orgs /> </Auth>} />
            <Route path="add-org" element={<Auth isAdmin={true}><AddOrg /> </Auth>} />
            <Route path="edit-org/:id" element={<Auth isAdmin={true}><EditOrg /> </Auth>} />
            <Route path="translations" element={<Auth isAdmin={true}><Trans /> </Auth>} />
            <Route path="add-trans" element={<Auth isAdmin={true}><AddTrans /> </Auth>} />
            <Route path="edit-trans/:id" element={<Auth isAdmin={true}><EditTrans /> </Auth>} />
          </Route>
        </Routes>
      </HeaderProvider>
    </BrowserRouter>
  );
};

export default App;
