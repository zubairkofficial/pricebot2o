import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-dropdown-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Helpers from "../../../Config/Helpers";
import axios from "axios";
import { useHeader } from '../../../Components/HeaderContext';


const AddUserForm = () => {
  const { setHeaderData } = useHeader();

  useEffect(() => {
    setHeaderData({ title: 'Dashboard', desc: 'Lassen Sie uns noch heute Ihr Update überprüfen' });
  }, [setHeaderData]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    org_id: "",
    services: [],
    showPassword: false,
  });

  const [services, setServices] = useState([]);
  const [orgs, setOrgs] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const fetchServices = async () => {
    try {
      const response = await axios.get(`${Helpers.apiUrl}active-services`, Helpers.authHeaders);
      if (response.status != 200) {
        throw new Error("Failed to fetch services");
      }
      setServices(response.data);
    } catch (error) {
      Helpers.toast('error', error.message);
    }
  };
  const fetchPartnerNumbers = async () => {
    try {
      const response = await axios.get(`${Helpers.apiUrl}getData`, Helpers.authHeaders);
      setOrgs(response.data);
    } catch (error) {
      Helpers.toast('error', error.message);
    }
  };

  useEffect(() => {
    fetchPartnerNumbers();
    fetchServices();
  }, []);
  const handleServiceChange = (values) => {
    const selectedValues = values.map((option) => option.value);
    setUser({ ...user, services: selectedValues });
  };
  const handleOrgChange = (id) => {
    setUser({ ...user, org_id: id });
  };

  const togglePasswordVisibility = () => {
    setUser({ ...user, showPassword: !user.showPassword });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.name || !user.email || !user.password) {
      Helpers.toast("error", "Name, email, and password are required.");
      return;
    }

    try {
      const response = await axios.post(`${Helpers.apiUrl}auth/register`, {
        name: user.name,
        email: user.email,
        password: user.password,
        org_id: user.org_id,
        services: user.services,
      });

      if (response.status != 200) {
        throw new Error("Failed to register user");
      }

      setUser({
        name: "",
        email: "",
        password: "",
        org_id: "",
        services: [],
        showPassword: false,
      });

      Helpers.toast("success", "User registered successfully!");
      navigate("/admin/home");
    } catch (error) {
      Helpers.toast('error', "Failed to register user.");
    }
  };

  const getServiceName = (id) => {
    if (!id) return '';
    const service = services.find((service) => service.id === id);
    return service ? service.name : '';
  };

  const servicesOptions = services.map((service) => ({
    value: service.id,
    label: service.name,
  }));

  const OrgsOptions = orgs.map((org) => ({
    value: org.id,
    label: org.name,
  }));

  return (
    <div className="modal-content " style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
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
                  type={user.showPassword}
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
                options={servicesOptions}
                multi
                onChange={handleServiceChange}
                values={user.services.map((service) => ({
                  label: getServiceName(service),
                  value: service,
                }))}
                className="custom-select p-2"
              />
            </div>
            {user.services.includes(2) &&
              <div className="col-md-12">
                <label htmlFor="services" className="form-label">
                  Organisation
                </label>
                <Select
                  style={{ color: "#000000" }}
                  options={OrgsOptions}
                  value={user.org_id}
                  className="custom-select p-2"
                />
              </div>}
            <div className="d-flex justify-content-end   ">
              <button type="submit" className="btn-one text-white" style={{ width: '30%' }} >
                Registrieren
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const AddUser = () => {
  return (
    <div className="container-fluid vh-100  text-white " style={{ paddingTop: '2rem', boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}  >
      <div className="row h-100">
        <div className="col-2 ">

        </div>
        <div className="col-9 d-flex justify-content-center align-items-center">
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

export default AddUser;
