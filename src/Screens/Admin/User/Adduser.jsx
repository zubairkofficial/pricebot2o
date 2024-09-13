import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-dropdown-select";
import axios from "axios";
import "./styles.css";
import Helpers from "../../../Config/Helpers";
import { useHeader } from "../../../Components/HeaderContext";

const AddUser = () => {
  const { setHeaderData } = useHeader();
  const [organizationalUsers, setOrganizationalUsers] = useState([]);
  const [selectedOrganizationalUser, setSelectedOrganizationalUser] = useState({
    org_id: "",
    services: [],
  }); // Store org_id and services for selected organizational user
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    org_id: "",
    services: [],
    is_user_organizational: 0, // 0 for normal user, 1 for organizational user
    showPassword: false,
    creator_id: "",
  });
  const [services, setServices] = useState([]);
  const [orgs, setOrgs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setHeaderData({
      title: Helpers.getTranslationValue("Dashboard"),
      desc: Helpers.getTranslationValue("Dashboard_Desc"),
    });
    fetchServices();
    fetchOrganizationalUsers();
    fetchOrgs();
  }, []);

  const fetchOrganizationalUsers = async () => {
    try {
      const response = await axios.get(
        `${Helpers.apiUrl}getOrganizationalUserss`,
        Helpers.authHeaders
      );
      setOrganizationalUsers(response.data);
    } catch (error) {
      Helpers.toast("error", error.message);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await axios.get(
        `${Helpers.apiUrl}active-services`,
        Helpers.authHeaders
      );
      setServices(response.data);
    } catch (error) {
      Helpers.toast("error", error.message);
    }
  };

  const fetchOrgs = async () => {
    try {
      const response = await axios.get(
        `${Helpers.apiUrl}all-orgs`,
        Helpers.authHeaders
      );
      setOrgs(response.data);
    } catch (error) {
      Helpers.toast("error", error.message);
    }
  };

  const handleChange = (name) => (value) => {
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Handle organizational user selection
  const handleSelectOrganizationalUser = (selectedValues) => {
    const selectedUserId = selectedValues[0]?.value;
    
    // Find selected organizational user's org_id and services
    const selectedUser = organizationalUsers.find(user => user.id === selectedUserId);
    
    setSelectedOrganizationalUser({
      org_id: selectedUser?.org_id || "",
      services: selectedUser?.services || [],
    });
    
    // Set the creator_id in the user state
    setUser((prevUser) => ({
      ...prevUser,
      creator_id: selectedUserId,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      let payload;
      let apiUrl;

      // Conditionally build payload and select API route
      if (user.is_user_organizational === 0) {
        // Normal user - use creator_id's org_id and services
        payload = {
          name: user.name,
          email: user.email,
          password: user.password,
          creator_id: user.creator_id, // The organizational user (ID)
          org_id: selectedOrganizationalUser.org_id, // Use org_id from selected organizational user
          services: selectedOrganizationalUser.services, // Use services from selected organizational user
        };
        apiUrl = `${Helpers.apiUrl}register_user`;
      } else {
        // Organizational user
        payload = {
          name: user.name,
          email: user.email,
          password: user.password,
          org_id: user.org_id,
          services: user.services,
          is_user_organizational: user.is_user_organizational,
        };
        apiUrl = `${Helpers.apiUrl}auth/register`;
      }

      const response = await axios.post(apiUrl, payload, Helpers.authHeaders);

      if (response.status === 201 || response.status === 200) {
        Helpers.toast("success", Helpers.getTranslationValue("user_save_msg"));
        navigate("/admin/dashboard");
      } else {
        throw new Error(Helpers.getTranslationValue("user_save_error"));
      }
    } catch (error) {
      Helpers.toast("error", error.message);
    }
  };

  return (
    <section className="bg-white">
      <div className="flex flex-col lg:flex-row justify-between lg:px-12">
        <div className="xl:w-full lg:w-8/12 px-5 xl:pl-12 ">
          <div className="max-w-2xl mx-auto pb-16">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-center text-2xl font-semibold mb-8">
                {Helpers.getTranslationValue("Add user")}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  {Helpers.getTranslationValue("Name")}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder={Helpers.getTranslationValue("Name")}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={user.name}
                  onChange={(e) => handleChange("name")(e.target.value)}
                />

                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  {Helpers.getTranslationValue("Email")}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder={Helpers.getTranslationValue("Email")}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={user.email}
                  onChange={(e) => handleChange("email")(e.target.value)}
                />

                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  {Helpers.getTranslationValue("Password")}
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder={Helpers.getTranslationValue("Password")}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={user.password}
                  onChange={(e) => handleChange("password")(e.target.value)}
                />

                <div className="flex flex-col items-start space-x-3 space-y-2 mt-4">
                  <label
                    htmlFor="is_user_organization"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {Helpers.getTranslationValue("Benutzertyp")}
                  </label>

                  <div className="custom-switch-toggle">
                    <button
                      type="button"
                      className={`custom-switch-button ${
                        user.is_user_organizational === 0 ? "active" : ""
                      }`}
                      onClick={() => handleChange("is_user_organizational")(0)}
                    >
                      Normal
                    </button>
                    <button
                      type="button"
                      className={`custom-switch-button ${
                        user.is_user_organizational === 1 ? "active" : ""
                      }`}
                      onClick={() => handleChange("is_user_organizational")(1)}
                    >
                      Organisatorisch
                    </button>
                  </div>
                </div>

                {user.is_user_organizational === 0 && (
                  <div>
                    <label
                      htmlFor="organization2"
                      className="block text-sm font-medium text-gray-700"
                    >
                      {Helpers.getTranslationValue("Organisationsbenutzer")}
                    </label>
                    <Select
                      options={organizationalUsers.map((user) => ({
                        label: user.name,
                        value: user.id,
                      }))}
                      onChange={handleSelectOrganizationalUser}
                      className=" mt-4 text-base border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-0 p-2"
                    />
                  </div>
                )}

                {user.is_user_organizational === 1 && (
                  <>
                    <label
                      htmlFor="services"
                      className="block text-sm font-medium text-gray-700"
                    >
                      {Helpers.getTranslationValue("Services")}
                    </label>
                    <Select
                      options={services.map((service) => ({
                        label: service.name,
                        value: service.id,
                      }))}
                      multi
                      onChange={(values) =>
                        handleChange("services")(values.map((v) => v.value))
                      }
                      className="text-base border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-0 p-2"
                    />

                    {/* Conditionally render Voice Protocol Organization when services include 2 */}
                    {user.services.includes(2) && (
                      <div>
                        <label
                          htmlFor="org"
                          className="block text-sm font-medium text-gray-700"
                        >
                          {Helpers.getTranslationValue("Organisation des Sprachprotokolls")}
                        </label>
                        <Select
                          options={orgs.map((org) => ({
                            label: org.name,
                            value: org.id,
                          }))}
                          onChange={(value) =>
                            handleChange("org_id")(value[0].value)
                          }
                          className="text-base border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-0 p-2"
                        />
                      </div>
                    )}
                  </>
                )}

                <div className="flex justify-end mt-4">
                  <button
                    type="submit"
                    className="py-2 px-4 text-white bg-success-300 hover:bg-success-400 rounded-lg hover:bg-blue-600"
                  >
                    {Helpers.getTranslationValue("Add user")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddUser;
