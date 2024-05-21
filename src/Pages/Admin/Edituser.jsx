import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Select from 'react-dropdown-select';
import { Spinner } from 'react-bootstrap';
import Helpers from '../../Config/Helpers';
import Avatar from 'react-avatar';
import userAvatar from '../../Components/Admin/user.png'; // Import the static image

const servicesOptions = [
  { label: "Preisbot", value: "Preisbot" },
  { label: "Protokoll", value: "Protokoll" },
  { label: "Preishistorie", value: "Preishistorie" },
  { label: "Finde Lieferscheine mit", value: "Finde Lieferscheine mit" },
];

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    services: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const response = await fetch(`${Helpers.apiUrl}auth/Getuser/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      const data = await response.json();
      setUser(data);
      setFormData({
        name: data.name,
        email: data.email,
        services: data.services,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${Helpers.apiUrl}auth/updateUser/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          services: formData.services,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update user');
      }
      const updatedUser = await response.json();
      setUser(updatedUser);
      setIsEditing(false);

      window.location.reload();
      Helpers.toast('success', 'User updated Successfully')
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden"></span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="d-flex flex-column align-items-center" style={{ minHeight: '100vh' }}>
      <h2 className="text-center m-5">Benutzer bearbeiten</h2>
      <div className="card shadow-lg border-0 mt-5" style={{ borderRadius: '20px', width: '90%', maxWidth: '900px' }}>
        <div className="row g-0">
          <div className="col-md-4 text-center text-white"
            style={{
              borderTopLeftRadius: '20px',
              borderBottomLeftRadius: '20px',
              backgroundColor: '#343a40',
            }}>
           <Avatar
  name={user.name}
  src={userAvatar} // Use the imported static image
  round
  size="150" // Increased the size to 150
  className="my-5"
  
/>

          </div>
          <div className="col-md-8">
            <div className="card-body p-4">
              {isEditing ? (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">E-Mail</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Dienstleistungen</label>
                    <Select
                      options={servicesOptions}
                      onChange={handleServiceChange}
                      values={formData.services.map(service => ({ label: service, value: service }))}
                      multi
                      placeholder="Dienstleistungen auswählen"
                      className="basic-multi-select"
                      classNamePrefix="select"
                    />
                  </div>
                  <div className="d-flex justify-content-between">
                    <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                      Abbrechen
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Speichern
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <h6>Informationen</h6>
                  <hr className="mt-0 mb-4" />
                  <div className="row pt-1">
                    <div className="col-6 mb-3">
                      <h6>Name</h6>
                      <p className="text-muted">{user.name}</p>
                    </div>
                    <div className="col-6 mb-3">
                      <h6>E-Mail</h6>
                      <p className="text-muted">{user.email}</p>
                    </div>
                  </div>
                  <h6>Dienstleistungen</h6>
                  <hr className="mt-0 mb-4" />
                  <div className="row pt-1">
                    <div className="col-12 mb-3">
                      <h6>Dienstleistungen</h6>
                      <p className="text-muted">{user.services ? user.services.join(', ') : ''}</p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between m-2">
                    <Link to="/admin/home" className="btn btn-secondary">
                      Zurück
                    </Link>
                    <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
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

export default UserDetail;
