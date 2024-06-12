import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-dropdown-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Helpers from "../../Config/Helpers";
import toast from "react-hot-toast";

const myData = [
  { label: "Sthamer", value: "Sthamer" },
  // { label: "Protokoll", value: "Protokoll" },
  // { label: "Preishistorie", value: "Preishistorie" },
  // { label: "Finde Lieferscheine mit", value: "Finde Lieferscheine mit" },
];

const AddUserForm = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    services: [],
    showPassword: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleServiceChange = (values) => {
    const selectedValues = values.map((option) => option.value);
    setUser({ ...user, services: selectedValues });
  };

  const togglePasswordVisibility = () => {
    setUser({ ...user, showPassword: !user.showPassword });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.name || !user.email || !user.password) {
      Helpers.toast(  "error" ,"Name, email, and password are required.");
      return;
    }

    try {
      const response = await fetch(`${Helpers.apiUrl}auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          password: user.password,
          services: user.services,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to register user");
      }

      setUser({
        name: "",
        email: "",
        password: "",
        services: [],
        showPassword: false,
      });

      Helpers.toast(  "success" ,  "User registered successfully!");

      setTimeout(() => {
        navigate("/admin/home");
      }, 2000);
    } catch (error) {
      toast.error("Failed to register user.");
    }
  };

  return (
    <div className="modal-content ">
    <div className="modal-header">
      <h5 className="modal-title ms-3">Benutzer hinzufügen</h5>
    </div>
    <div className="modal-body modal-body-two">
      <div className="from-main">
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={user.name}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="password" className="form-label">
              Passwort
            </label>
            <div className="input-group">
              <input
                type={user.showPassword }
                className="form-control"
                id="password"
                name="password"
                value={user.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="services" className="form-label">
              Dienstleistungen
            </label>
            <Select
              options={myData}
              multi
              onChange={handleServiceChange}
              values={user.services.map((service) => ({
                label: service,
                value: service,
              }))}
              className="custom-select p-2"
            />
          </div>
          <div className="d-flex justify-content-end   ">
            <button type="submit" className="btn-one"  style={{width:'30%'}} >
              Registrieren
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
};

const AdminPanel = () => {
  return (
    <div className="container-fluid vh-100 bg-dark text-white " style={{paddingTop:'2rem'}} >
    <div className="row h-100">
      <div className="col-2 ">
        
      </div>
      <div className="col-10 d-flex justify-content-center align-items-center">
        <div className="row justify-content-center w-100">
          <div className="col-md-8">
            <div className="card bg-dark text-white border-0">
              <div className="card-body">
                <AddUserForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default AdminPanel;
