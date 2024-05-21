import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-dropdown-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Helpers from "../../Config/Helpers";
import toast from "react-hot-toast";

const services = [
  { name: "Preisbot" },
  { name: "Protokoll" },
  { name: "Preishistorie" },
];

// const roles = ["Admin", "User"];

const myData = [
  { label: "Preisbot", value: "Preisbot" },
  { label: "Protokoll", value: "Protokoll" },
  { label: "Preishistorie", value: "Preishistorie" },
  { label: "Finde Lieferscheine mit", value: "Finde Lieferscheine mit" },
];

const AddUserForm = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
   
    services: [],
   
  });
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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
      setErrorMessage("Name, email, and password are required.");
      setShowAlert(true);
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

      // Reset form fields
      setUser({
        name: "",
        email: "",
        password: "",
        services: [],
       
      });

      setErrorMessage("");
      setShowAlert(false);

    //   Show success toast
        Helpers.toast(  "success" , "Benutzer hat sich erfolgreich registriert", {
          duration: 4000, // Duration of the toast
        });

      setTimeout(() => {
        navigate("/admin/home");
      }, 2000);
    } catch (error) {
    //   console.error("Error registering user:", error.message);
      setErrorMessage("Failed to register user.");
      setShowAlert(true);

       Helpers.toast("success" , "Benutzer hat sich erfolgreich registriert");
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
    setErrorMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="container p-4 rounded shadow-sm bg-light"
      style={{
        maxWidth: '600px',
        marginTop: '50px',
        boxShadow: '0px 20px 30px -10px rgb(38, 57, 77)',
        borderRadius: '10px'
      }}
    >
      <h2 className="mb-4" style={{ color: '#333' }}>Benutzer hinzufügen</h2>

      <div className="mb-3">
        <label htmlFor="nameInput" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="nameInput"
          name="name"
          value={user.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="emailInput" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="emailInput"
          name="email"
          value={user.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label
          htmlFor="passwordInput"
          className="form-label d-flex align-items-center"
        >
          Passwort
          <span className="ms-auto" onClick={togglePasswordVisibility} style={{ cursor: 'pointer', marginLeft: '10px' }}>
            <FontAwesomeIcon icon={user.showPassword ? faEyeSlash : faEye} />
          </span>
        </label>
        <input
          type={user.showPassword ? "text" : "password"}
          className="form-control"
          id="passwordInput"
          name="password"
          value={user.password}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="serviceSelect" className="form-label">
        Dienstleistungen
        </label>
        <Select
          options={myData}
          onChange={handleServiceChange}
          multi
          placeholder="Select Services"
          className="form-control"
          name="services"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary m-2">
      Benutzer hinzufügen

      </button>
      <Link to={`/`} className="btn btn-secondary ">
      Stornieren
      </Link>
    </form>
  );
};

const AdminPanel = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card border-0">
            <div className="card-body">
              <AddUserForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
