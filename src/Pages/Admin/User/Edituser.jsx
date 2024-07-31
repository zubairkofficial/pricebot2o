import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Select from "react-dropdown-select";
import { Spinner } from "react-bootstrap";
import Helpers from "../../../Config/Helpers";
import Avatar from "react-avatar";
import userAvatar from "../../../Components/Admin/user.png";
import axios from "axios";
import { useHeader } from '../../../Components/HeaderContext';
const EditUser = () => {

  const { setHeaderData } = useHeader();

  useEffect(() => {
    setHeaderData({ title: 'Dashboard', desc: 'Lassen Sie uns noch heute Ihr Update überprüfen' });
  }, [setHeaderData]);

  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [orgs, setOrgs] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    org_id: "",
    services: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${Helpers.apiUrl}getuser/${id}`, Helpers.authHeaders);
      if (response.status !== 200) {
        throw new Error("Failed to fetch user");
      }
      setUser(response.data.user);
      setServices(response.data.services);
      setOrgs(response.data.orgs);
      setFormData({
        name: response.data.user.name,
        email: response.data.user.email,
        services: response.data.user.services,
        org_id: response.data.user.org_id,
      });
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleServiceChange = (values) => {
    const selectedValues = values.map((option) => option.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      services: selectedValues,
    }));
  };

  const servicesOptions = services.map((service) => ({
    value: service.id,
    label: service.name,
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${Helpers.apiUrl}updateUser/${id}`, {
        ...formData,
        services: formData.services,
      }, Helpers.authHeaders);
      if (response.status !== 200) {
        throw new Error("Failed to update user");
      }
      setUser(response.data);
      setIsEditing(false);

      window.location.reload();
      Helpers.toast("success", "User updated Successfully");
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 ">
        <Spinner animation="border" role="status">
          <span className="visually-hidden"></span>
        </Spinner>
      </div>
    );
  }
  const getServiceName = (id) => {
    if (!id) return '';
    const service = services.find((service) => service.id === id);
    return service ? service.name : '';
  };

  const OrgsOptions = orgs.map((org) => ({
    value: org.id,
    label: org.name,
  }));

  const selectedOrg = OrgsOptions.find((option) => option.value == formData.org_id);
  
  if (error) {
    return <div className="text-white text-center mt-5">Error: {error}</div>;
  }

  if (!user) {
    return <div className="text-white text-center mt-5">User not found</div>;
  }

  return (
    <div className="container-fluid vh-100 mt-5">
      <div className="row h-100">
        <div className="col-2"></div>
        <div
          className="col-9 d-flex flex-column align-items-center"
          style={{ paddingTop: "40px", overflow: "hidden" }}
        >
          <h2 className="text-center my-5" style={{ color: "black" }}>
            Benutzer bearbeiten
          </h2>
          <div
            className="card bg-light shadow-lg"
            style={{
              borderRadius: "20px",
              width: "90%",
              maxWidth: "700px",
              color: "black",
            }}
          >
            <div className="card-body m-3">
              {isEditing ? (
                <form onSubmit={handleSubmit}>
                  <div className="text-center">
                    <Avatar
                      name={user.name}
                      src={userAvatar}
                      round
                      size="100"
                      className="my-3"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" style={{ color: "black" }}>
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control bg-light border-0"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      style={{ color: "black" }}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" style={{ color: "black" }}>
                      E-Mail
                    </label>
                    <input
                      type="email"
                      className="form-control bg-light border-0"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={{ color: "black" }}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" style={{ color: "black" }}>
                      Dienstleistungen
                    </label>
                    <Select
                      options={servicesOptions}
                      onChange={handleServiceChange}
                      values={formData.services?.map((service) => ({
                        label: getServiceName(service),
                        value: service,
                      }))}
                      multi
                      placeholder="Dienstleistungen auswählen"
                      className="custom-select"
                      classNamePrefix="select"
                    />
                  </div>
                  {formData.services.includes(2) &&
                    <div className="mb-3">
                      <label className="form-label" style={{ color: "black" }}>
                        Organisation
                      </label>
                      <Select
                        values={selectedOrg ? [selectedOrg] : []}
                        options={OrgsOptions}
                        onChange={(selectedOption) => setFormData({ ...formData, org_id: selectedOption[0].value })}
                        placeholder="Organisation  auswählen"
                        className="custom-select"
                        classNamePrefix="select"
                      />
                    </div>
                  }
                  <div className="d-flex justify-content-end gap-2">
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm text-center"
                      style={{ width: "30%", borderRadius: "10px" }}
                      onClick={() => setIsEditing(false)}
                    >
                      Abbrechen
                    </button>
                    <button
                      type="submit"
                      className="btn btn-one btn-sm text-center text-white"
                      style={{ width: "30%" }}
                    >
                      Speichern
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="text-center">
                    <Avatar
                      name={user.name}
                      src={userAvatar}
                      round
                      size="100"
                      className="my-3"
                    />
                  </div>
                  <h6 style={{ color: "black" }}>Informationen</h6>
                  <hr className="mt-0 mb-4" />
                  <div className="row pt-1">
                    <div className="col-6 mb-3">
                      <h6 style={{ color: "black" }}>Name</h6>
                      <p className="text-muted" style={{ color: "black" }}>
                        {user.name}
                      </p>
                    </div>
                    <div className="col-6 mb-3">
                      <h6 style={{ color: "black" }}>E-Mail</h6>
                      <p className="text-muted" style={{ color: "black" }}>
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div className="row pt-1">
                    <div className="col-6 mb-3">
                      <h6 style={{ color: "black" }}>Dienstleistungen</h6>
                      <p className="text-muted" style={{ color: "black" }}>
                      {user.service_names ? user.service_names.join(", ") : ""}
                      </p>
                    </div>
                    <div className="col-6 mb-3">
                      <h6 style={{ color: "black" }}>Organisation</h6>
                      <p className="text-muted" style={{ color: "black" }}>
                        {user.organization.name}
                      </p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end gap-2 p-2">
                    <Link
                      to="/admin/home"
                      className="btn btn-secondary btn-sm text-center"
                      style={{ width: "30%", borderRadius: "10px" }}
                    >
                      Zurück
                    </Link>
                    <button
                      className="btn btn-one btn-sm text-center text-light"
                      onClick={() => setIsEditing(true)}
                      style={{ width: "30%" }}
                    >
                      Bearbeiten
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
