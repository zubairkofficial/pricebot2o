import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Import react-switch or use a custom toggle
import axios from "axios";

import Helpers from "../../../Config/Helpers";

const AddOrganizationalUser = () => {
  const [user, setUser] = useState({
    creator_id: "",
    name: "",
    email: "",
    password: "",
    org_id: "",
    services: [],
    showPassword: false,
    counterLimit: Helpers.authUser.counter_limit,
    expirationDate: Helpers.authUser.expiration_date,
  });
  const [services, setServices] = useState([]);
  const [orgs, setOrgs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userObj = localStorage.getItem("user");
    const user = JSON.parse(userObj);
    const user_id = user.id;
    const user_services = user.services;
    const user_org_id = user.org_id;

    // Set the creator_id (user_id) in the state
    setUser((prevUser) => ({
      ...prevUser,
      creator_id: user_id,
      services: user_services,
      org_id: user_org_id,// Set the creator_id from localStorage
    }));

    // fetchServices();
    fetchOrgs();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(
        `${Helpers.apiUrl}active-services`,
        Helpers.authHeaders
      );
      setServices(response.data);
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : Helpers.getTranslationValue("services_fetch_error");
      Helpers.toast("error", errorMessage);
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
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Post request with user data including creator_id
      const response = await axios.post(
        `${Helpers.apiUrl}register_user`,
        user, // This user object contains creator_id
        Helpers.authHeaders
      );
      if (response.status === 201 || response.status === 200) {
        Helpers.toast("success", Helpers.getTranslationValue("user_save_msg"));
        navigate('/org-user-table');
      } else {
        throw new Error(Helpers.getTranslationValue("user_save_error"));
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        // Iterate through each field's errors and display them
        Object.keys(error.response.data.errors).forEach((field) => {
          error.response.data.errors[field].forEach((errorMessage) => {
            Helpers.toast("error", `Error: ${errorMessage}`);
          });
        });
      } else {
        Helpers.toast("error", error.message);
      }
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

export default AddOrganizationalUser;
