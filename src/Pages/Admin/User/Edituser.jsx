import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Select from "react-dropdown-select";
import Avatar from "react-avatar";
import axios from "axios";
import userAvatar from "./user.png";
import Helpers from "../../../Config/Helpers";
import { useHeader } from "../../../Components/HeaderContext";

const EditUser = () => {
  const { setHeaderData } = useHeader();
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
    setHeaderData({
      title: "Dashboard",
      desc: "Lassen Sie uns noch heute Ihr Update überprüfen",
    });
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `${Helpers.apiUrl}getuser/${id}`,
        Helpers.authHeaders
      );
      if (response.status !== 200) throw new Error("Failed to fetch user");
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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (values) => {
    setFormData((prev) => ({
      ...prev,
      services: values.map((v) => v.value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${Helpers.apiUrl}updateUser/${id}`,
        formData,
        Helpers.authHeaders
      );
      if (response.status !== 200) throw new Error("Failed to update user");
      Helpers.toast("success", "User updated successfully");
      navigate("/admin/home");
    } catch (error) {
      setError(error.message);
    }
  };

  const OrgsOptions = orgs.map((org) => ({
    value: org.id,
    label: org.name,
  }));

  const selectedOrg = OrgsOptions.find(
    (option) => option.value == formData.org_id
  );

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  if (error)
    return <div className="text-center text-red-500 mt-5">{error}</div>;

  if (!user)
    return <div className="text-center text-red-500 mt-5">User not found</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Edit User</h2>
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="services"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Services
                    </label>
                    <Select
                      options={services.map((service) => ({
                        label: service.name,
                        value: service.id,
                      }))}
                      values={services
                        .filter(service => formData.services.includes(service.id))
                        .map(service => ({
                          label: service.name,
                          value: service.id
                        }))
                      }
                      onChange={(selectedOptions) => handleServiceChange(selectedOptions)}
                      multi
                      className="text-base"
                    />
                  </div>
                  {formData.services.includes(2) && (
                    <div>
                      <label
                        htmlFor="org"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Organization
                      </label>
                      <Select
                        values={selectedOrg ? [selectedOrg] : []}
                        options={OrgsOptions}
                        onChange={(selectedOption) =>
                          setFormData({
                            ...formData,
                            org_id: selectedOption[0].value,
                          })
                        }
                        placeholder="Organisation  auswählen"
                        className="text-base border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-0 p-2"
                      />
                    </div>
                  )}
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      className="bg-gray-200 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-success-300 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-success-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div>
                <div className="text-center">
                  <Avatar name={user.name} src={userAvatar} round size="100" />
                </div>
                <h6 className="text-center text-lg font-medium text-gray-900 mt-4">
                  User Information
                </h6>
                <div className="border-t border-gray-200 mt-5">
                  <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Name
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        {user.name}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Email
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        {user.email}
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Services
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        {services
                          .filter((s) => user.services.includes(s.id))
                          .map((s) => s.name)
                          .join(", ")}
                      </dd>
                    </div>
                  </dl>
                </div>
                <div className="flex justify-end space-x-3">
                  <Link
                    to="/admin/dashboard"
                    className="bg-gray-200 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => setIsEditing(false)}
                  >
                    Zurück
                  </Link>
                  <button
                    type="submit"
                    onClick={() => setIsEditing(true)}
                    className="bg-success-300 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-success-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Bearbeiten
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
