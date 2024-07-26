import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Toaster } from "react-hot-toast";
import Helpers from "../../Config/Helpers";
import axios from "axios";

const ChangePasswordForm = () => {
  const [credentials, setCredentials] = useState({
    password: "",
    password_confirmation: "",
    showPassword: false,
    showconfirmPassword: false,
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!credentials.password || !credentials.password_confirmation) {
      Helpers.toast('error',"Password and Confirm password are required.");
      return;
    }
    try {
      const response = await axios.post(`${Helpers.apiUrl}changePassword/${Helpers.authUser.id}`, {
        password: credentials.password,
        password_confirmation: credentials.password_confirmation
      }, Helpers.authHeaders
      );

      if (response.status != 200) {
        throw new Error("Failed to change password");
      }

      setCredentials({
        password: "",
        password_confirmation: "",
        showPassword: false,
        showconfirmPassword: false,
      });

      Helpers.toast('success',"Password changed successfully!");
      navigate("/");
    } catch (error) {
      Helpers.toast('error',"Failed to change password.");
    }
  };

  return (
    <div className="container"  >
      <div className="row">
        <div className="col-2">

        </div>
        <div className="col-10" >
          <div className="modal-content " style={{ marginTop: '80px' }}>
            <div className="modal-header">
              <h5 className="modal-title ms-3">Passwort ändern</h5>
            </div>
            <div className="modal-body modal-body-two" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
              <div className="from-main">
                <form className="row g-3" onSubmit={handleSubmit}>
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
                          bottom: '8px',
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
                  <div className="col-md-6">
                    <label htmlFor="password_confirmation" className="form-label">
                      Passwort bestätigen
                    </label>
                    <div className="input-group" style={{ position: 'relative' }}>
                      <input
                        type={credentials.showconfirmPassword ? "text" : "password"}
                        className="form-control"
                        id="password_confirmation"
                        name="password_confirmation"
                        value={credentials.password_confirmation}
                        onChange={handleChange}

                      />
                      <div
                        onClick={toggleconfirmPasswordVisibility}
                        style={{
                          position: 'relative',
                          right: '2rem',
                          // top: '48%',
                          bottom: '8px',
                          transform: 'translateY(-50%)',
                          cursor: 'pointer',
                          color: 'gray',

                        }}
                      >
                        <FontAwesomeIcon
                          icon={credentials.showconfirmPassword ? faEyeSlash : faEye}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button
                      type="submit"
                      className="btn-one text-white"
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
