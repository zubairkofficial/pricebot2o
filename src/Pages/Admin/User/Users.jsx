import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Modal, Button, Spinner } from "react-bootstrap";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import Helpers from "../../../Config/Helpers";
import axios from "axios";
import { useHeader } from '../../../Components/HeaderContext';
import Pagination from '../../../Components/Pagination';

const UserList = () => {
  const { setHeaderData } = useHeader();

  useEffect(() => {
    setHeaderData({ title: 'Armaturenbrett', desc: 'Lassen Sie uns noch heute Ihr Update überprüfen' });
  }, [setHeaderData]);

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const location = useLocation();
  const navigate = useNavigate();
  const successMessage = location.state?.successMessage;

  useEffect(() => {
    if (successMessage) {
      Helpers.toast("success", successMessage);
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
      if (response.status !== 200) {
        throw new Error("Failed to fetch users");
      }
      setUsers(response.data.users);
      setFilteredUsers(response.data.users);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleEdit = (userId) => {
    navigate(`/admin/edit-user/${userId}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${Helpers.apiUrl}delete/${id}`, Helpers.authHeaders);
      if (response.status !== 200) {
        throw new Error("Failed to delete user");
      }
      setUsers(users.filter((user) => user.id !== id));
      setFilteredUsers(filteredUsers.filter((user) => user.id !== id));
      Helpers.toast("success", "User deleted successfully");
    } catch (error) {
      setError(error.message);
    }
  };

  const indexOfLastUser = (currentPage + 1) * itemsPerPage;
  const indexOfFirstUser = currentPage * itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner animation="border" role="status">
          <span className="visually-hidden"></span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <div className="text-blue-500">Fehler: {error}</div>;
  }

  return (
    <section className="w-full h-full">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex  justify-between space-x-2 mb-4">
          <div className="mb-4 ">
            <div className="relative">
              <input
                type="text"
                className="w-1/2 border border-darkblack-300 rounded-lg p-2 focus:border-blue-500 focus:ring-0"
                id="search"
                placeholder="Nach Name suchen"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
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
              </div>
            </div>
          </div>
          <Link to="/admin/add-user"
            className="h-10 px-5 mb-2 text-black transition-colors duration-150 bg-success-300 rounded-lg focus:shadow-outline hover:bg-success-300 flex items-center justify-center w-1/3 md:w-1/3"
          >
            Benutzer hinzufügen
          </Link>
        </div>
        <div className="rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-darkblack-200">
              <thead className="bg-white-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Berechtigungen</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organisation</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aktionen</th>
                </tr>
              </thead>
              <tbody className="">
                {currentUsers.map((user, index) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{indexOfFirstUser + index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.service_names ? user.service_names.join(", ") : ""}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.organization?.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        className="bg-blue-500 text-black p-2 rounded-lg hover:bg-blue-600"
                        onClick={() => handleEdit(user.id)}
                      >
                        <FaPencilAlt />
                      </button>
                      <button
                        className="bg-red-500 text-black   p-2 rounded-lg hover:bg-red-600 ml-2"
                        onClick={() => {
                          handleDelete(user.id);
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

          <Pagination
            currentPage={currentPage}
            totalItems={filteredUsers.length}
            itemsPerPage={itemsPerPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </section>
  );
};

export default UserList;
