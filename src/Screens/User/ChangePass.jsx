import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Toaster } from "react-hot-toast";
import Helpers from "../../Config/Helpers";
import axios from "axios";

import { useHeader } from '../../Components/HeaderContext';

const ChangePassword = () => {
  const { setHeaderData } = useHeader();

  useEffect(() => {
    setHeaderData({ title: 'Kennwort ändern', desc: '' });
  }, [setHeaderData]);
  const [credentials, setCredentials] = useState({
    old_password: "",
    password: "",
    password_confirmation: "",
    showPassword: false,
    showconfirmPassword: false,
    showOldPassword: false,
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setCredentials({ ...credentials, showPassword: !credentials.showPassword });
  };

  const toggleconfirmPasswordVisibility = () => {
    setCredentials({ ...credentials, showconfirmPassword: !credentials.showconfirmPassword });
  };

  const toggleOldPasswordVisibility = () => {
    setCredentials({ ...credentials, showOldPassword: !credentials.showOldPassword });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!credentials.old_password || !credentials.password || !credentials.password_confirmation) {
      Helpers.toast('error', "Alle Felder sind erforderlich.");
      return;
    }

    if (credentials.password !== credentials.password_confirmation) {
      Helpers.toast('error', "Passwörter stimmen nicht überein");
      return;
    }

    try {
      await axios.post(`${Helpers.apiUrl}change-password`, {
        old_password: credentials.old_password,
        password: credentials.password,
        password_confirmation: credentials.password_confirmation
      }, Helpers.authHeaders
      );

      setCredentials({
        old_password: "",
        password: "",
        password_confirmation: "",
        showPassword: false,
        showconfirmPassword: false,
        showOldPassword: false,
      });

      Helpers.toast('success', "das Passwort wurde erfolgreich geändert!");
      navigate("/");
    } catch (error) {
      setErrors(error.response.data.errors || {});
      Helpers.toast("error", error.response.data.message);
    }
  };

  return (
    <section className="bg-white ">
      <div className="flex flex-col lg:flex-row justify-between">
        <div className="w-full px-5 xl:pl-12">
          <div className="max-w-[450px] m-auto py-6">
            <div className="bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6">Kennwort ändern</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4 relative">
                  <input
                    type={credentials.showOldPassword ? "text" : "password"}
                    className="text-base border border-bgray-300  h-14 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-base"
                    id="old_password"
                    name="old_password"
                    value={credentials.old_password}
                    onChange={handleChange}
                    placeholder="Aktuelles Passwort"
                  />
                  <div
                    className="absolute top-4 right-4 cursor-pointer"
                    onClick={toggleOldPasswordVisibility}
                  >
                    <FontAwesomeIcon
                      icon={credentials.showOldPassword ? faEyeSlash : faEye}
                      className="text-gray-500"
                    />
                  </div>
                  <small className="text-danger">
                    {errors.old_password ? errors.old_password[0] : ""}
                  </small>
                </div>
                <div className="mb-4 relative">
                  <input
                    type={credentials.showPassword ? "text" : "password"}
                    className=" text-base border border-bgray-300  h-14 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-base"
                    id="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    placeholder="Neues Kennwort"
                  />
                  <div
                    className="absolute top-4 right-4 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    <FontAwesomeIcon
                      icon={credentials.showPassword ? faEyeSlash : faEye}
                      className="text-gray-500"
                    />
                  </div>
                  <small className="text-danger">
                    {errors.password ? errors.password[0] : ""}
                  </small>
                </div>
                <div className="mb-6 relative">
                  <input
                    type={credentials.showconfirmPassword ? "text" : "password"}
                    className=" text-base border border-bgray-300  h-14 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-base"
                    id="password_confirmation"
                    name="password_confirmation"
                    value={credentials.password_confirmation}
                    onChange={handleChange}
                    placeholder="Bestätige das Passwort"
                  />
                  <div
                    className="absolute top-4 right-4 cursor-pointer"
                    onClick={toggleconfirmPasswordVisibility}
                  >
                    <FontAwesomeIcon
                      icon={credentials.showconfirmPassword ? faEyeSlash : faEye}
                      className="text-gray-500"
                    />
                  </div>
                  <small className="text-danger">
                    {errors.password_confirmation ? errors.password_confirmation[0] : ""}
                  </small>
                </div>
                <button
                  type="submit"
                  className="py-3.5 text-white flex items-center justify-center  font-bold bg-success-300 hover:bg-success-300 transition-all rounded-lg w-full"
                >
                  Kennwort ändern
                </button>
              </form>
            </div>
            <Toaster />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChangePassword;
