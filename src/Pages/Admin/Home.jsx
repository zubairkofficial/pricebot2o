import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal, Button, Spinner } from "react-bootstrap";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import Helpers from "../../Config/Helpers";
import axios from "axios";
import { useHeader } from '../../Components/Admin/HeaderContext';

const UserList = () => {
  
  const { setHeaderData } = useHeader();
  
  useEffect(() => {
    setHeaderData({ title: 'Dashboard', desc: 'Lassen Sie uns noch heute Ihr Update überprüfen' });
}, [setHeaderData]);

  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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

  useEffect(() => {
    setFilteredUsers(
      users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, users]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${Helpers.apiUrl}dashboardInfo`, Helpers.authHeaders);
      if (response.status != 200) {
        throw new Error("Failed to fetch users");
      }
      setUsers(response.data.users);
      setFilteredUsers(response.data.users);
      // setServices(response.data.services);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleEdit = (userId) => {
    navigate(`/admin/edit-user/${userId}`);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete( `${Helpers.apiUrl}delete/${selectedUserId}`,Helpers.authHeaders );
      if (response.status != 200) {
        throw new Error("Failed to delete user");
      }
      setUsers(users.filter((user) => user.id !== selectedUserId));
      setFilteredUsers(
        filteredUsers.filter((user) => user.id !== selectedUserId)
      );
      setSelectedUserId(null);
      setShowConfirmation(false);
      Helpers.toast("success", "User deleted successfully");
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
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden"></span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleAddUser = () => {
    navigate("/admin/add-user");
  };

  return (
    <section className="nftmax-adashboard nftmax-show w-100 h-100 "  >
      <div className="nftmax-adashboard-left">
     <div className="d-flex justify-content-end align-items-center ">
            <button className="btn-one text-white" onClick={handleAddUser}>
              Benutzer 
            </button>
          </div>
        <div className="row tabel-main-box" style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
          
          <div className="col-lg-12 col-padding-0" >
            
            <div className="tabel-search-box">
              <div className="tabel-search-box-item">
                <div className="tabel-search-box-inner">
                  <div className="search-icon">
                    <span>
                      <svg
                        width={20}
                        height={20}
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="9.7859"
                          cy="9.78614"
                          r="8.23951"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15.5166 15.9448L18.747 19.1668"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control "
                    id="search"
                    placeholder="Nach Name suchen"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
         
          <div className="col-lg-12">
            <div className="tabel-main">
              <table
                id="expendable-data-table"
                className="table display nowrap w-100"
              >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Berechtigungen</th>
                    <th>Aktionen</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => (
                    <tr key={user.id}>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <p className="">
                        {user.service_names ? user.service_names.join(", ") : ""}
                      </p>
                      <td>
                        <button
                          style={{
                            backgroundColor: "#007bff",
                            border: "none",
                            color: "white",
                            padding: "5px 10px",
                            textAlign: "center",
                            textDecoration: "none",
                            display: "inline-block",
                            fontSize: "16px",
                            margin: "4px 2px",
                            cursor: "pointer",
                            borderRadius: "10px",
                          }}
                          onClick={() => handleEdit(user.id)}
                        >
                          <FaPencilAlt />
                        </button>
                        <button
                          style={{
                            backgroundColor: "#dc3545",
                            border: "none",
                            color: "white",
                            padding: "5px 10px",
                            textAlign: "center",
                            textDecoration: "none",
                            display: "inline-block",
                            fontSize: "16px",
                            margin: "4px 2px",
                            cursor: "pointer",
                            borderRadius: "10px",
                          }}
                          onClick={() => {
                            setSelectedUserId(user.id);
                            setShowConfirmation(true);
                          }}
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
      </div>

      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Löschen bestätigen</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-white"> Sind Sie sicher, dass Sie diesen Benutzer löschen möchten?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmation(false)}>
            Abbrechen
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Löschen
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default UserList;
