import React from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Admin/Sidebar";
import Header from "./Components/Admin/Header";
import { HeaderProvider } from './Components/Admin/HeaderContext';
import Home from "./Pages/Admin/User/Users";
import Helpers from "./Config/Helpers";
import Login from "./Pages/Auth/Login";
import Adduser from "./Pages/Admin/User/Adduser";
import Edituser from "./Pages/Admin/User/Edituser";
import UserHome from "./Pages/users/Home";
import UserSidebar from "./Pages/users/Sidebar";
import FileUpload from "./Pages/users/Fileupload";
import ChangePass from "./Pages/users/ChangePass";
import Voice from "./Pages/users/Voice";
import TestVoice from "./Pages/users/TestVoice";
import SentEmails from "./Pages/users/SentEmails";
import Transcription from "./Pages/users/Transcription";
import ResendEmail from "./Pages/users/ResendEmail";
import "./App.css";
import Services from "./Pages/Admin/Service/Services";
import AddService from "./Pages/Admin/Service/AddService";
import EditService from "./Pages/Admin/Service/EditService";
import Orgs from "./Pages/Admin/Organization/Orgs";
import AddOrg from "./Pages/Admin/Organization/AddOrg";
import EditOrg from "./Pages/Admin/Organization/EditOrg";

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
      return <Navigate to="/home" />;
    }

    // Ensure admins cannot access user routes
    if (!isAdmin && parseInt(user.user_type) === 1) {
      Helpers.toast(
        "error",
        "Access denied. Admins cannot access user routes."
      );
      return <Navigate to="/admin/home" />;
    }

    return children;
  }
  // For non-protected routes like /login
  else {
    if (user && token) {
      if (user.user_type === 1) {
        return <Navigate to="/admin/home" />;
      } else {
        return <Navigate to="/home" />;
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
          <Route path="/*"
            element={
              <div className="container d-flex" style={{ height: "100vh" }}>
                <UserSidebar />
                <div className="flex-grow-1">
                  <Routes>
                    <Route path="/" element={<Auth><UserHome /> </Auth>} />
                    <Route path="/fileupload" element={<Auth><FileUpload /></Auth>} />
                    <Route path="/voice" element={<Auth><Voice /></Auth>} />
                    <Route path="/testvoice" element={<Auth><TestVoice /></Auth>} />
                    <Route path="/transcription" element={<Auth><Transcription /></Auth>} />
                    <Route path="/sent-emails" element={<Auth><SentEmails /></Auth>} />
                    <Route path="/resend-email/:userId" element={<Auth><ResendEmail /></Auth>} />
                    <Route path="/changePass" element={<Auth><ChangePass /></Auth>} />
                  </Routes>
                </div>
              </div>
            }
          />
          <Route path="/admin/*"
            element={
              <div className="container d-flex" style={{ height: "100vh" }}>
                <Sidebar />
                <Header />
                <div className="flex-grow-1">
                  <Routes>
                    <Route path="home" element={<Auth isAdmin={true}> <Home /> </Auth>} />
                    <Route path="add-user" element={<Auth isAdmin={true}><Adduser /> </Auth>} />
                    <Route path="edit-user/:id" element={<Auth isAdmin={true}><Edituser /> </Auth>} />
                    <Route path="services" element={<Auth isAdmin={true}><Services /> </Auth>} />
                    {/* <Route path="add-service" element={<Auth isAdmin={true}><AddService /> </Auth>} /> */}
                    <Route path="edit-service/:id" element={<Auth isAdmin={true}><EditService /> </Auth>} />
                    <Route path="orgs" element={<Auth isAdmin={true}><Orgs /> </Auth>} />
                    <Route path="add-org" element={<Auth isAdmin={true}><AddOrg /> </Auth>} />
                    <Route path="edit-org/:id" element={<Auth isAdmin={true}><EditOrg /> </Auth>} />
                  </Routes>
                </div>
              </div>
            }
          />
        </Routes>
      </HeaderProvider>
    </BrowserRouter>
  );
};

export default App;
