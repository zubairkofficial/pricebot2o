import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaPencilAlt, FaTrashAlt, FaUsers } from "react-icons/fa"; // Added FaUsers icon
import Helpers from "../../../Config/Helpers";
import Pagination from "../../../Components/Pagination";

const OrganizationUsers = () => {
  const { customerId } = useParams(); // Get customerId from the route parameters
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  // Modal state management for viewing user usage
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchOrganizationUsers();
  }, [customerId]);

  useEffect(() => {
    setFilteredUsers(
      users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (user.services &&
            user.services
              .join(", ")
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (user.organization_name &&
            user.organization_name
              .toLowerCase()
              .includes(searchTerm.toLowerCase()))
      )
    );
  }, [searchTerm, users]);

  const fetchOrganizationUsers = async () => {
    try {
      const response = await axios.get(
        `${Helpers.apiUrl}getAllOrganizationalUsersForCustomer/${customerId}`,
        Helpers.authHeaders
      );
      if (response.status !== 200) {
        throw new Error("Error fetching organizational users.");
      }

      const usersData = Array.isArray(response.data.organization_users)
        ? response.data.organization_users
        : [];
      setUsers(usersData);
      setFilteredUsers(usersData); // Set both users and filteredUsers to the response data
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleShowModal = (user) => {
    setSelectedUser(user); // Set the selected user with the counts to the state
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleViewUsers = (id) => {
    navigate(`/admin/normal-child-users/${id}`);
  };

  const indexOfLastUser = (currentPage + 1) * itemsPerPage;
  const indexOfFirstUser = currentPage * itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500">
        {Helpers.getTranslationValue("Error")}: {error}
      </div>
    );
  }

  return (
    <section className="w-full h-full">
      {/* Modal for displaying user usage */}
      {showModal && selectedUser && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div className="fixed inset-0 bg-gray-100 opacity-75"></div>
    <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Gesamtnutzung der Organisation
        </h2>
        <button
          onClick={handleCloseModal}
          className="text-gray-500 hover:text-gray-700"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-success-300 text-white">
              <tr>
                <th className="px-6 py-3 border-b text-left text-sm font-medium text-white">
                  #
                </th>
                <th className="px-6 py-3 border-b text-left text-sm font-medium text-white">
                Werkzeug
                </th>
                <th className="px-6 py-3 border-b text-left text-sm font-medium text-white">
                Hochgeladene Dateien
                </th>
              </tr>
            </thead>
            <tbody>
  {/* Conditionally render rows based on service IDs */}
  {selectedUser.serviceIds.includes(1) && (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 text-sm text-gray-600 font-bold">1</td>
      <td className="px-6 py-4 text-sm text-gray-600 font-bold">Sthamer</td>
      <td className="px-6 py-4 text-sm text-gray-600 font-bold">
        {selectedUser.documentsCount}
      </td>
    </tr>
  )}
  {selectedUser.serviceIds.includes(3) && (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 text-sm text-gray-600 font-bold">2</td>
      <td className="px-6 py-4 text-sm text-gray-600 font-bold">
        Contract Solution
      </td>
      <td className="px-6 py-4 text-sm text-gray-600 font-bold">
        {selectedUser.contractSolutionCount}
      </td>
    </tr>
  )}
  {selectedUser.serviceIds.includes(4) && (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 text-sm text-gray-600 font-bold">3</td>
      <td className="px-6 py-4 text-sm text-gray-600 font-bold">Datenprozess</td>
      <td className="px-6 py-4 text-sm text-gray-600 font-bold">
        {selectedUser.dataProcessCount}
      </td>
    </tr>
  )}
</tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={handleCloseModal}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between space-x-2 mb-4">
          <div className="mb-4">
            <input
              type="text"
              className="border border-gray-300 rounded-lg p-2 pr-10 focus:border-blue-500 focus:ring-0"
              id="search"
              placeholder={Helpers.getTranslationValue("Search Users")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {Helpers.getTranslationValue("Name")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {Helpers.getTranslationValue("Email")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {Helpers.getTranslationValue("Services")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {Helpers.getTranslationValue("Voice Protocol Organization")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {Helpers.getTranslationValue("Actions")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {Helpers.getTranslationValue("Users")}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentUsers.map((user, index) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {indexOfFirstUser + index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.services ? user.services.join(", ") : ""}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.organization_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center">
                      <button
                        className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 ml-2"
                        onClick={() => handleShowModal(user)}
                      >
                        <FaEye className="text-black" />
                      </button>
                   
                    </td>
                    <td>
                    <button
                        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 ml-2"
                        onClick={() => handleViewUsers(user.id)}
                      >
                        <FaUsers className="text-black" />
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

export default OrganizationUsers;
