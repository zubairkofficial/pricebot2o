import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import Helpers from '../../Config/Helpers';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const successMessage = location.state?.successMessage;

  useEffect(() => {
    if (successMessage) {
      Helpers.toast("success", successMessage);
      // Clear the state after displaying the message
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [successMessage, navigate, location.pathname]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${Helpers.apiUrl}auth/Getuser`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleEdit = (userId) => {
    navigate(`/admin/Edit-user/${userId}`);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${Helpers.apiUrl}auth/delete/${selectedUserId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Fehler beim Löschen des Benutzers');
      }
      setUsers(users.filter(user => user.id !== selectedUserId));
      setSelectedUserId(null);
      setShowConfirmation(false);
    Helpers.toast('success', 'User Deleted Successfully ' );
    } catch (error) {
      setError(error.message);
    }
  };

  const confirmDelete = () => {
    handleDelete(selectedUserId);
    setShowConfirmation(false);
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

  return (
    <div className="container mt-5">
      <h2 className="text-center" style={{ fontWeight: 'bold', color: '#333' }}>
        Benutzerliste
      </h2>
      <div className="row">
        <div className="col-md-12">
          <div className="d-flex justify-content-end mb-3">
            <Link to="/admin/add-user" className="btn btn-success">
              + Benutzer hinzufügen
            </Link>
          </div>
          {alertMessage && (
            <div className="alert alert-success" role="alert">
              {alertMessage}
            </div>
          )}
          <div className="card shadow-sm border" style={{ borderRadius: '20px' }}>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead style={{ backgroundColor: '#343a40', color: 'white' }}>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Dienst</th>
                      <th scope="col">Email</th>
                      <th scope="col">Aktionen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={user.id}>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.services.join(', ')}</td>
                        <td>{user.email}</td>
                        <td>
                          <button
                            className="btn btn-primary btn-sm me-2"
                            onClick={() => handleEdit(user.id)}
                            title="Editieren"
                          >
                            <FaPencilAlt />
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            style={{ marginLeft: '12px' }}
                            onClick={() => {
                              setSelectedUserId(user.id);
                              setShowConfirmation(true);
                            }}
                            title="Löschen"
                          >
                            <FaTrashAlt />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>Bestätigung der Löschung</Modal.Title>
            </Modal.Header>
            <Modal.Body>Sind Sie sicher, dass Sie diesen Benutzer löschen möchten?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowConfirmation(false)}>
                Abbrechen
              </Button>
              <Button variant="danger" onClick={confirmDelete}>
                Löschen
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default UserList;
