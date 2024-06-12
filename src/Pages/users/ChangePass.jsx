import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import toast, { Toaster } from "react-hot-toast";
import Helpers from "../../Config/Helpers";

const ChangePasswordForm = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    showPassword: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const id = localStorage.getItem("id"); // Assuming userId is stored in local storage
      if (!id) {
        toast.error("User ID not found in local storage.");
        return;
      }

      try {
        const response = await fetch(`${Helpers.apiUrl}auth/getUserCredentials/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }
        const data = await response.json();
        setCredentials((prevCredentials) => ({
          ...prevCredentials,
          name: data.name,
          email: data.email,
        }));
      } catch (error) {
        toast.error("Failed to fetch user details.");
      }
    };

    fetchUserDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setCredentials({ ...credentials, showPassword: !credentials.showPassword });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!credentials.email || !credentials.password) {
      toast.error("Email and password are required.");
      return;
    }

    const id = localStorage.getItem("id"); // Retrieve user ID here

    try {
      const response = await fetch(`${Helpers.apiUrl}auth/changePassword/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to change password");
      }

      setCredentials({
        name: "",
        email: "",
        password: "",
        showPassword: false,
      });

      toast.success("Password changed successfully!");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast.error("Failed to change password.");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-2">
          {/* Sidebar content goes here */}
        </div>
        <div className="col-10">
          <div className="modal-content " style={{ marginTop: '80px' }}>
            <div className="modal-header">
              <h5 className="modal-title ms-3">Passwort ändern</h5>
            </div>
            <div className="modal-body modal-body-two">
              <div className="from-main">
                <form className="row g-3" onSubmit={handleSubmit}>
                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={credentials.email}
                      onChange={handleChange}
                      readOnly
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="password" className="form-label">
                      Neues Passwort
                    </label>
                    <div className="input-group" style={{ position: 'relative' }}>
                      <input
                        type={credentials.showPassword ? "text" : "password"}
                        className="form-control"
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        
                      />
                      <div
                        onClick={togglePasswordVisibility}
                        style={{
                          position: 'relative',
                          right: '2rem',
                          // top: '48%',
                          bottom : '8px',
                          transform: 'translateY(-50%)',
                          cursor: 'pointer',
                          color: 'gray',
                     
                        }}
                      >
                        <FontAwesomeIcon
                          icon={credentials.showPassword ? faEyeSlash : faEye}
                        />
                      </div>
                  </div>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button
                      type="submit"
                      className="btn-one"
                      style={{ width: "30%" }}
                    >
                      Ändern
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <Toaster />
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
