import React, { useEffect } from "react";
import axios from "axios";

import { BrowserRouter, Navigate, Routes, Route, Link } from "react-router-dom";
import AdminLayout from "./Screens/Admin/Layout";
import { HeaderProvider } from "./Components/HeaderContext";
import AddOrganizationalUser from "./Screens/User/AddOrganizationalUser";
import Users from "./Screens/Admin/User/Users";
import Helpers from "./Config/Helpers";
import Login from "./Screens/Auth/Login";
import Adduser from "./Screens/Admin/User/Adduser";
import Edituser from "./Screens/Admin/User/Edituser";
import UserDashboard from "./Screens/User/Dashboard";
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
import ContractAutomationSolution from "./Screens/User/ContractAutomationSolution";
import Tools from "./Screens/Admin/Tools/Tools";
import AddTool from "./Screens/Admin/Tools/AddTool";
import EditTool from "./Screens/Admin/Tools/EditTool";
import DataProcess from "./Screens/User/DataProcess";
import ChangeLogo from "./Screens/User/ChangeLogo";
import Settings from "./Screens/User/Settings";
import OrganizationalUserTable from "./Components/OrganizationalUserTable";
import UserUsage from "./Screens/Admin/User/UserUsage";
import { useState } from "react";

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

const NotFound = () => {
  useEffect(() => {
    const user = Helpers.getItem("user", true);
    const token = Helpers.getItem("token");

    if (!user || !token) {
      <Navigate to="/login" />;
    } else if (parseInt(user.user_type) === 1) {
      <Navigate to="/admin/dashboard" />;
    } else {
      <Navigate to="/" />;
    }
  }, [Navigate]);

  return (
    <section class="bg-no-repeat bg-cover bg-notfound-light">
      <div class="flex items-center justify-center min-h-screen">
        <div class="max-w-2xl mx-auto">
          <img src="/assets/images/illustration/404.svg" alt="" />
          <div class="flex justify-center mt-10">
            <Link
              to="/"
              class="bg-success-300 text-sm font-bold text-white rounded-lg px-10 py-3"
            >
              {" "}
              Go Back{" "}
            </Link>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
};

const App = () => {
  const [isOrganizationalUser, setIsOrganizationalUser] = useState(false);

  // Retrieve is_user_organizational from localStorage on component mount
  useEffect(() => {
    let isUserOrg = Helpers.getItem("is_user_org");
    if (isUserOrg === "1") {
      setIsOrganizationalUser(true); // Set state to true if user is organizational
    } else {
      setIsOrganizationalUser(false); // Set state to false if user is normal
    }
  }, []);
  useEffect(() => {
    fetchTranslations();
  }, []);

  const fetchTranslations = async () => {
    try {
      const response = await axios.get(`${Helpers.apiUrl}get-trans`, {
        headers: { "Content-Type": "application/json" },
      });
      Helpers.setItem("translationData", response.data, true);
    } catch (error) {
      console.error("Error fetching translations:", error);
    }
  };

  return (
    <BrowserRouter>
      <HeaderProvider>
        <Routes>
          <Route
            path="/login"
            element={
              <Auth isAuth={false}>
                {" "}
                <Login />{" "}
              </Auth>
            }
          />
          <Route path="/" element={<UserLayout />}>
            <Route
              path="/"
              element={
                <Auth>
                  {" "}
                  <UserDashboard />{" "}
                </Auth>
              }
            />
            <Route
              path="/fileupload"
              element={
                <Auth>
                  {" "}
                  <FileUpload />{" "}
                </Auth>
              }
            />
            <Route
              path="/voice"
              element={
                <Auth>
                  {" "}
                  <Voice />{" "}
                </Auth>
              }
            />
            <Route
              path="/contract_automation_solution"
              element={
                <Auth>
                  {" "}
                  <ContractAutomationSolution />{" "}
                </Auth>
              }
            />
            <Route
              path="/data_process"
              element={
                <Auth>
                  {" "}
                  <DataProcess />{" "}
                </Auth>
              }
            />

            <Route
              path="/transcription"
              element={
                <Auth>
                  {" "}
                  <Transcription />{" "}
                </Auth>
              }
            />
            <Route
              path="/sent-emails"
              element={
                <Auth>
                  {" "}
                  <SentEmails />{" "}
                </Auth>
              }
            />
            <Route
              path="/resend-email/:userId"
              element={
                <Auth>
                  {" "}
                  <ResendEmail />{" "}
                </Auth>
              }
            />
            <Route
              path="/changePass"
              element={
                <Auth>
                  {" "}
                  <ChangePass />{" "}
                </Auth>
              }
            />
            <Route
              path="/change-logo"
              element={
                <Auth>
                  {" "}
                  <ChangeLogo />{" "}
                </Auth>
              }
            />
               <Route
                  path="/settings"
                  element={
                    <Auth>
                      {" "}
                      <Settings />{" "}
                    </Auth>
                  }
                />
            {isOrganizationalUser && (
              <>
                {" "}
             
                <Route
                  path="/add-org-user"
                  element={
                    <Auth>
                      {" "}
                      <AddOrganizationalUser />{" "}
                    </Auth>
                  }
                />
                   <Route
              path="/org-user-table"
              element={
                <Auth>
                  {" "}
                  <OrganizationalUserTable />{" "}
                </Auth>
              }
            />
              </>
            )}

         
          </Route>
          <Route path="/admin/" element={<AdminLayout />}>
            <Route
              path="dashboard"
              element={
                <Auth isAdmin={true}>
                  {" "}
                  <Users />{" "}
                </Auth>
              }
            />
           ]
            <Route
              path="add-user"
              element={
                <Auth isAdmin={true}>
                  {" "}
                  <Adduser />{" "}
                </Auth>
              }
            />
            <Route
              path="edit-user/:id"
              element={
                <Auth isAdmin={true}>
                  {" "}
                  <Edituser />{" "}
                </Auth>
              }
            />
            <Route
              path="services"
              element={
                <Auth isAdmin={true}>
                  {" "}
                  <Services />{" "}
                </Auth>
              }
            />
            <Route
              path="add-service"
              element={
                <Auth isAdmin={true}>
                  {" "}
                  <AddService />{" "}
                </Auth>
              }
            />
            <Route
              path="edit-service/:id"
              element={
                <Auth isAdmin={true}>
                  {" "}
                  <EditService />{" "}
                </Auth>
              }
            />
            <Route
              path="orgs"
              element={
                <Auth isAdmin={true}>
                  {" "}
                  <Orgs />{" "}
                </Auth>
              }
            />
            <Route
              path="add-org"
              element={
                <Auth isAdmin={true}>
                  {" "}
                  <AddOrg />{" "}
                </Auth>
              }
            />
            <Route
              path="edit-org/:id"
              element={
                <Auth isAdmin={true}>
                  {" "}
                  <EditOrg />{" "}
                </Auth>
              }
            />
            <Route
              path="translations"
              element={
                <Auth isAdmin={true}>
                  {" "}
                  <Trans />{" "}
                </Auth>
              }
            />
            <Route
              path="add-trans"
              element={
                <Auth isAdmin={true}>
                  {" "}
                  <AddTrans />{" "}
                </Auth>
              }
            />
            <Route
              path="edit-trans/:id"
              element={
                <Auth isAdmin={true}>
                  {" "}
                  <EditTrans />{" "}
                </Auth>
              }
            />
            <Route
              path="tools"
              element={
                <Auth isAdmin={true}>
                  {" "}
                  <Tools />{" "}
                </Auth>
              }
            />
            <Route
              path="add-tool"
              element={
                <Auth isAdmin={true}>
                  {" "}
                  <AddTool />{" "}
                </Auth>
              }
            />
            <Route
              path="edit-tool/:id"
              element={
                <Auth isAdmin={true}>
                  {" "}
                  <EditTool />{" "}
                </Auth>
              }
            />
          </Route>
          <Route path="*" element={<NotFound />} />{" "}
        </Routes>{" "}
      </HeaderProvider>{" "}
    </BrowserRouter>
  );
};

export default App;
