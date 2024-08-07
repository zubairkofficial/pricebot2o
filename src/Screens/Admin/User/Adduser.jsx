import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-dropdown-select";
import axios from "axios";
import Helpers from "../../../Config/Helpers";
import { useHeader } from '../../../Components/HeaderContext';

const AddUser = () => {
  const { setHeaderData } = useHeader();
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

  useEffect(() => {
    setHeaderData({ title: Helpers.getTranslationValue('Dashboard'), desc: Helpers.getTranslationValue('Dashboard_Desc') });
    fetchServices();
    fetchOrgs();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${Helpers.apiUrl}active-services`, Helpers.authHeaders);
      setServices(response.data);
    } catch (error) {
      Helpers.toast('error', error.message);
    }
  };

  const fetchOrgs = async () => {
    try {
      const response = await axios.get(`${Helpers.apiUrl}all-orgs`, Helpers.authHeaders);
      setOrgs(response.data);
    } catch (error) {
      Helpers.toast('error', error.message);
    }
  };

  const handleChange = (name) => (value) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${Helpers.apiUrl}auth/register`, user, Helpers.authHeaders);
      if (response.status === 201) {
        Helpers.toast('success', Helpers.getTranslationValue('user_save_msg'));
        navigate("/admin/home");
      } else {
        throw new Error(Helpers.getTranslationValue('user_save_error'));
      }
    } catch (error) {
      Helpers.toast('error', error.message);
    }
  };

  return (
    <section className="bg-white">
      <div className="flex flex-col lg:flex-row justify-between lg:px-12">
        <div className="xl:w-full lg:w-8/12 px-5 xl:pl-12 ">
          <div className="max-w-2xl mx-auto pb-16">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-center text-2xl font-semibold mb-8">{Helpers.getTranslationValue('Add user')}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">{Helpers.getTranslationValue('Name')}</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={user.name}
                  onChange={(e) => handleChange('name')(e.target.value)}
                />

                <label htmlFor="email" className="block text-sm font-medium text-gray-700">{Helpers.getTranslationValue('Email')}</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={user.email}
                  onChange={(e) => handleChange('email')(e.target.value)}
                />

                <label htmlFor="password" className="block text-sm font-medium text-gray-700">{Helpers.getTranslationValue('Password')}</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={user.password}
                  onChange={(e) => handleChange('password')(e.target.value)}
                />

                <label htmlFor="services" className="block text-sm font-medium text-gray-700">
                  {Helpers.getTranslationValue('Servies')}</label>
                <Select
                  options={services.map(service => ({ label: service.name, value: service.id }))}
                  multi
                  onChange={(values) => handleChange('services')(values.map(v => v.value))}
                  className="text-base border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-0 p-2"
                />

                {user.services.includes(2) &&
                  <>
                    <label htmlFor="org" className="block text-sm font-medium text-gray-700">
                      {Helpers.getTranslationValue('Organization')}</label>
                    <Select
                      options={orgs.map(org => ({ label: org.name, value: org.id }))}
                      onChange={(value) => handleChange('org_id')(value.value)}
                      className="text-base border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-0 p-2"
                    />
                  </>
                }

                <div className="flex justify-end mt-4">
                  <button
                    type="submit"
                    className="py-2 px-4 text-white bg-success-300 hover:bg-success-400 rounded-lg hover:bg-blue-600"
                  >
                    {Helpers.getTranslationValue('Add user')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddUser;
