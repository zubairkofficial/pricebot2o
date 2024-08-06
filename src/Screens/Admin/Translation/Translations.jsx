import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPencilAlt, FaTrash, FaTimes } from "react-icons/fa";
import Helpers from "../../../Config/Helpers";
import axios from "axios";
import { useHeader } from '../../../Components/HeaderContext';
import Pagination from '../../../Components/Pagination';

const Translations = () => {
    const { setHeaderData } = useHeader();
    useEffect(() => {
        setHeaderData({ title: Helpers.getTranslationValue("Translations"), desc: 'Verwalten Sie hier Ihre Organisationen' });
    }, [setHeaderData]);

    const [trans, setTrans] = useState([]);
    const [filteredTrans, setFilteredTrans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;
    const navigate = useNavigate();

    useEffect(() => {
        fetchTrans();
    }, []);

    useEffect(() => {
        setFilteredTrans(
            trans.filter((item) =>
                item.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.value.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, trans]);

    const fetchTrans = async () => {
        try {
            const response = await axios.get(`${Helpers.apiUrl}all-trans`, Helpers.authHeaders);
            localStorage.removeItem('translationData');
            if (response.status !== 200) {
                throw new Error("Organisationen konnten nicht abgerufen werden");
            }
            Helpers.setItem("translationData", response.data, true);
            setTrans(response.data);
            setFilteredTrans(response.data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const handleEdit = (id) => {
        navigate(`/admin/edit-trans/${id}`);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                    <span className="visually-hidden">{Helpers.getTranslationValue('Is_loading')}</span>
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500 text-center">{Helpers.getTranslationValue('error')}: {error}</div>;
    }

    const indexOfLastTrans = (currentPage + 1) * itemsPerPage;
    const indexOfFirstTrans = currentPage * itemsPerPage;
    const currentTrans = filteredTrans.slice(indexOfFirstTrans, indexOfLastTrans);


    return (
        <section className="bg-white">
            <div className="flex flex-col lg:flex-row justify-between lg:px-12 pt-10">
                <div className="w-full px-5 xl:pl-12">
                    <div className="m-auto">
                        <div className="bg-white p-6 rounded-lg shadow-md">
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
                                <Link to="/admin/add-trans"
                                    className="text-white h-10 px-5 mb-2 text-black transition-colors duration-150 bg-success-300 rounded-lg focus:shadow-outline hover:bg-success-400 flex items-center justify-center"
                                >
                                    Organisation hinzufügen
                                </Link>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Key</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{Helpers.getTranslationValue('Actions')}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {currentTrans.map((trans, index) => (
                                            <tr key={trans.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{indexOfFirstTrans + index + 1}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trans.key}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trans.value}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                                    <button
                                                        className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600"
                                                        onClick={() => handleEdit(trans.id)}
                                                    >
                                                        <FaPencilAlt />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <Pagination
                            currentPage={currentPage}
                            totalItems={filteredTrans.length}
                            itemsPerPage={itemsPerPage}
                            onPageChange={(page) => setCurrentPage(page)}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Translations;
