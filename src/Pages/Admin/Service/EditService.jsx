import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Helpers from "../../../Config/Helpers";
import axios from "axios";
import { useHeader } from '../../../Components/HeaderContext';

const EditService = () => {
    const { setHeaderData } = useHeader();
    const { id } = useParams();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        link: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        setHeaderData({ title: 'Dienstleistungen', desc: 'Verwalten Sie hier Ihre Dienste' });
        fetchService();
    }, [id]);

    const fetchService = async () => {
        try {
            const response = await axios.get(`${Helpers.apiUrl}get-service/${id}`, Helpers.authHeaders);
            if (response.status !== 200) {
                throw new Error("Failed to fetch service");
            }
            setService(response.data);
            setFormData({
                name: response.data.name,
                description: response.data.description,
                link: response.data.link,
            });
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${Helpers.apiUrl}update-service/${id}`, formData, Helpers.authHeaders);
            if (response.status !== 200) {
                throw new Error("Failed to update service");
            }
            Helpers.toast("success", "Service updated successfully");
            navigate("/admin/services");
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="text-center text-red-500 mt-5">{error}</div>;
    }

    if (!service) {
        return <div className="text-center text-red-500 mt-5">Service not found</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">{isEditing ? 'Edit Service' : 'Service Details'}</h2>
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        {isEditing ? (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="link" className="block text-sm font-medium text-gray-700">Link</label>
                                    <input
                                        type="url"
                                        name="link"
                                        id="link"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        value={formData.link}
                                        onChange={handleChange}
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                    <textarea
                                        name="description"
                                        id="description"
                                        rows="3"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        value={formData.description}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        className="bg-gray-200 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        onClick={() => setIsEditing(false)}
                                    >
                                        Stornieren
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-success-300 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-success-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Änderungen speichern
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <div className="flex-1">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">{service.name}</h3>
                                        <p className="mt-1 max-w-2xl text-sm text-gray-500">{service.description}</p>
                                    </div>
                                    <Link to="/admin/services" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200">
                                        Back
                                    </Link>
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-success-300 hover:bg-success-4  00"
                                    >
                                        Edit
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

export default EditService;
