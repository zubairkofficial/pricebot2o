import React, { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";
import Helpers from "../Config/Helpers";
import { useHeader } from "./HeaderContext";
const OrganizationalUserTable = () => {
  const { setHeaderData } = useHeader();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    setHeaderData({
      title: Helpers.getTranslationValue("Benutzer"),
      desc: Helpers.getTranslationValue("Benutzer verwalten"),
    });
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${Helpers.apiUrl}getOrganizationUsers?page=${
          currentPage + 1
        }&limit=${itemsPerPage}`,
        Helpers.authHeaders
      );
      if (response.status !== 200) {
        throw new Error(Helpers.getTranslationValue("users_fetch_error"));
      }
      const usersData = response.data.organization_users;
      setUsers(usersData);
      setFilteredUsers(usersData);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.services &&
          user.services
            .join(", ")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) ||
        user.org_id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${Helpers.apiUrl}delete_User/${id}`,
        Helpers.authHeaders
      );
      if (response.status !== 200) {
        throw new Error(Helpers.getTranslationValue("user_delete_error"));
      }
      setUsers(users.filter((user) => user.id !== id));
      setFilteredUsers(filteredUsers.filter((user) => user.id !== id));
      Helpers.toast("success", Helpers.getTranslationValue("user_delete_msg"));
      window.location.reload();
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
        <div>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-blue-500">
        {Helpers.getTranslationValue("error")}: {error}
      </div>
    );
  }

  return (
    <section className="w-full h-full">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between space-x-2 mb-4">
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                className="w-1/2 border border-darkblack-300 rounded-lg p-2 focus:border-blue-500 focus:ring-0"
                id="search"
                placeholder="Search users"
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
          <Link
            to="/add-org-user"
            className="h-10 px-5 mb-2 text-white transition-colors duration-150 bg-success-300 rounded-lg focus:shadow-outline hover:bg-success-300 flex items-center justify-center w-1/3 md:w-1/3"
          >
            {Helpers.getTranslationValue("Add user")}
          </Link>
        </div>

        <div className="rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-darkblack-200">
              <thead className="bg-white-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dienstleistungen
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Organisation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aktionen
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.length > 0 ? (
                  currentUsers.map((user, index) => (
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          className="bg-red-500 text-black p-2 rounded-lg hover:bg-red-600 ml-2"
                          onClick={() => handleDelete(user.id)}
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                    Es wurden noch keine Benutzer erstellt.

                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {filteredUsers.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalItems={filteredUsers.length}
              itemsPerPage={itemsPerPage}
              onPageChange={(page) => setCurrentPage(page)}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default OrganizationalUserTable;
