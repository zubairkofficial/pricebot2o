import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPencilAlt, FaCheck, FaTimes } from "react-icons/fa";
import Helpers from "../../../Config/Helpers";
import axios from "axios";
import { useHeader } from '../../../Components/HeaderContext';
import Pagination from '../../../Components/Pagination';

const Orgs = () => {
    const { setHeaderData } = useHeader();
    useEffect(() => {
        setHeaderData({ title: 'Organisationen', desc: 'Verwalten Sie hier Ihre Organisationen' });
    }, [setHeaderData]);

    const [orgs, setOrgs] = useState([]);
    const [filteredOrgs, setFilteredOrgs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const navigate = useNavigate();

    useEffect(() => {
        fetchOrgs();
    }, []);

    useEffect(() => {
        setFilteredOrgs(
            orgs.filter((org) =>
                org.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, orgs]);

    const fetchOrgs = async () => {
        try {
            const response = await axios.get(`${Helpers.apiUrl}all-orgs`, Helpers.authHeaders);
            if (response.status !== 200) {
                throw new Error("Failed to fetch Organizations");
            }
            setOrgs(response.data);
            setFilteredOrgs(response.data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const handleEdit = (id) => {
        navigate(`/admin/edit-org/${id}`);
    };

    const handleServiceStatus = async (id) => {
        try {
            const response = await axios.post(`${Helpers.apiUrl}update-org-status/${id}`, {}, Helpers.authHeaders);
            if (response.status !== 200) {
                throw new Error("Failed to change Organization status");
            }
            fetchOrgs();
            Helpers.toast("success", "Organization status changed successfully");
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
        return <div className="text-red-500 text-center">Error: {error}</div>;
    }

    const indexOfLastOrg = (currentPage + 1) * itemsPerPage;
    const indexOfFirstOrg = currentPage * itemsPerPage;
    const currentOrgs = filteredOrgs.slice(indexOfFirstOrg, indexOfLastOrg);


    return (
        <section className="bg-white p-5">
            <div className="flex flex-col lg:flex-row justify-between lg:px-12 pt-10">
                <div className="xl:w-full lg:w-88 px-5 xl:pl-12 pt-10">
                    <div className="m-auto pt-10 pb-16">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="flex justify-end mb-4">
                                <Link to="/admin/add-org"
                                    className="h-10 px-5 mb-2 text-black transition-colors duration-150 bg-success-300 rounded-lg focus:shadow-outline hover:bg-success-400 flex items-center justify-center"
                                >
                                    Organisation hinzufügen
                                </Link>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Street</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {currentOrgs.map((org, index) => (
                                            <tr key={org.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{indexOfFirstOrg + index + 1}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{org.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{org.number}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{org.street}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                                    <button
                                                        className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600"
                                                        onClick={() => handleEdit(org.id)}
                                                    >
                                                        <FaPencilAlt />
                                                    </button>
                                                    <button
                                                        className={`p-2 rounded-lg text-white ${org.status ? 'bg-gray-500 hover:bg-gray-600' : 'bg-success-300 hover:bg-success-400'}`}
                                                        onClick={() => handleServiceStatus(org.id)}
                                                    >
                                                        {org.status ? <FaTimes /> : <FaCheck />}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination
                                currentPage={currentPage}
                                totalItems={filteredOrgs.length}
                                itemsPerPage={itemsPerPage}
                                onPageChange={(page) => setCurrentPage(page)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Orgs;
