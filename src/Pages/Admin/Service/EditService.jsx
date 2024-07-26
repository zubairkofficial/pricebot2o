import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import Helpers from "../../../Config/Helpers";
import axios from "axios";
import { useHeader } from '../../../Components/Admin/HeaderContext';

const EditService = () => {
       
    const { setHeaderData } = useHeader();

    useEffect(() => {
      setHeaderData({ title: 'Dienstleistungen', desc: 'Verwalten Sie hier Ihre Dienste' });
    }, [setHeaderData]);

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
        fetchService();
    }, [id]);

    const fetchService = async () => {
        try {
            const response = await axios.get(`${Helpers.apiUrl}get-service/${id}`, Helpers.authHeaders);
            if (response.status != 200) {
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
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${Helpers.apiUrl}update-service/${id}`, formData, Helpers.authHeaders);
            if (response.status != 200) {
                throw new Error("Failed to update service");
            }
            setService(response.data);
            setIsEditing(false);

            window.location.reload();
            Helpers.toast("success", response.data.message);
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100 ">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden"></span>
                </Spinner>
            </div>
        );
    }

    if (error) {
        return <div className="text-white text-center mt-5">Error: {error}</div>;
    }

    if (!service) {
        return <div className="text-white text-center mt-5">Service not found</div>;
    }

    return (
        <div className="container-fluid vh-100 mt-5">
            <div className="row h-100">
                <div className="col-2"></div>
                <div
                    className="col-9 d-flex flex-column align-items-center"
                    style={{ paddingTop: "40px", overflow: "hidden" }}
                >
                    <h2 className="text-center my-5" style={{ color: "black" }}>
                        Benutzer bearbeiten
                    </h2>
                    <div
                        className="card bg-light shadow-lg"
                        style={{
                            borderRadius: "20px",
                            width: "90%",
                            maxWidth: "700px",
                            color: "black",
                        }}
                    >
                        <div className="card-body m-3">
                            {isEditing ? (
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label" style={{ color: "black" }}>
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control bg-light border-0"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            style={{ color: "black" }}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label" style={{ color: "black" }}>
                                            Link
                                        </label>
                                        <input
                                            type="link"
                                            className="form-control"
                                            id="link"
                                            name="link"
                                            readOnly
                                            value={formData.link}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label" style={{ color: "black" }}>
                                            Description
                                        </label><textarea class="form-control" id="description"
                                            onChange={handleChange} name="description" rows={7}>{formData.description}</textarea>

                                    </div>
                                    <div className="d-flex justify-content-end gap-2">
                                        <button
                                            type="button"
                                            className="btn btn-secondary btn-sm text-center"
                                            style={{ width: "30%", borderRadius: "10px" }}
                                            onClick={() => setIsEditing(false)}
                                        >
                                            Abbrechen
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn btn-one btn-sm text-center text-white"
                                            style={{ width: "30%" }}
                                        >
                                            Speichern
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <>
                                    <h6 style={{ color: "black" }}>Informationen</h6>
                                    <hr className="mt-0 mb-4" />
                                    <div className="row pt-1">
                                        <div className="col-6 mb-3">
                                            <h6 style={{ color: "black" }}>Name</h6>
                                            <p className="text-muted" style={{ color: "black" }}>
                                                {service.name}
                                            </p>
                                        </div>
                                        <div className="col-6 mb-3">
                                            <h6 style={{ color: "black" }}>Link</h6>
                                            <p className="text-muted" style={{ color: "black" }}>
                                                {service.link}
                                            </p>
                                        </div>
                                    </div>
                                    <h6 style={{ color: "black" }}>Description</h6>
                                    <hr className="mt-0 mb-4" />
                                    <div className="row pt-1">
                                        <div className="col-12 mb-3">
                                            <p className="text-muted" style={{ color: "black" }}>
                                                {service.description}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-end gap-2 p-2">
                                        <Link
                                            to="/admin/services"
                                            className="btn btn-secondary btn-sm text-center"
                                            style={{ width: "30%", borderRadius: "10px" }}
                                        >
                                            Zurück
                                        </Link>
                                        <button
                                            className="btn btn-one btn-sm text-center text-light"
                                            onClick={() => setIsEditing(true)}
                                            style={{ width: "30%" }}
                                        >
                                            Bearbeiten
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default EditService;
