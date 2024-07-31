import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal, Button, Spinner } from "react-bootstrap";
import { FaPencilAlt, FaTrashAlt, FaCheck,FaTimes } from "react-icons/fa";
import Helpers from "../../../Config/Helpers";
import axios from "axios";
import { useHeader } from '../../../Components/HeaderContext';

const Services = () => {
    const { setHeaderData } = useHeader();

    useEffect(() => {
        setHeaderData({ title: 'Dienstleistungen', desc: 'Verwalten Sie hier Ihre Dienste' });
    }, [setHeaderData]);

    const [services, setServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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
        fetchServices();
    }, []);

    useEffect(() => {
        setFilteredServices(
            services.filter((service) =>
                service.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, services]);

    const fetchServices = async () => {
        try {
            const response = await axios.get(`${Helpers.apiUrl}all-services`, Helpers.authHeaders);
            if (response.status != 200) {
                throw new Error("Failed to fetch services");
            }
            setServices(response.data);
            setFilteredServices(response.data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const handleEdit = (serviceId) => {
        navigate(`/admin/edit-service/${serviceId}`);
    };

    const handleServiceStatus = async (id) => {
        try {
            const response = await axios.post(`${Helpers.apiUrl}update-service-status/${id}`, {}, Helpers.authHeaders);
            if (response.status != 200) {
                throw new Error("Failed to change service status");
            }
            setServices(response.data);
            setFilteredServices(response.data);
            Helpers.toast("success", "service status changed successfully");
        } catch (error) {
            setError(error.message);
        }
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

    const handleAddservice = () => {
        navigate("/admin/add-service");
    };

    return (
        <section className="nftmax-adashboard nftmax-show w-100 h-100 "  >
            <div className="nftmax-adashboard-left">
                {/* <div className="d-flex justify-content-end align-items-center ">
                    <button className="btn-one text-white" onClick={handleAddservice}>
                        Dienst hinzufügen
                    </button>
                </div> */}
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
                                        <th>Description</th>
                                        <th>Link</th>
                                        <th>Aktionen</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredServices.map((service, index) => (
                                        <tr key={service.id}>
                                            <td>{index + 1}</td>
                                            <td>{service.name}</td>
                                            <td>{service.description}</td>
                                            <td>{service.link}</td>
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
                                                    onClick={() => handleEdit(service.id)}
                                                >
                                                    <FaPencilAlt />
                                                </button>
                                                <button
                                                    style={{
                                                        backgroundColor: service.status ? "#dc3545" : "#28a745",
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
                                                        handleServiceStatus(service.id);
                                                    }}
                                                >
                                                    {service.status ? <FaTimes /> : <FaCheck />}
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
        </section>
    );
};

export default Services;
