import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import Helpers from "../../../Config/Helpers";
import axios from "axios";
import { useHeader } from '../../../Components/HeaderContext';

const EditOrg = () => {
       
    const { setHeaderData } = useHeader();

    useEffect(() => {
      setHeaderData({ title: 'Organisationen', desc: 'Verwalten Sie hier Ihre Organisationen' });
    }, [setHeaderData]);

    const { id } = useParams();
    const [org, setOrg] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        street: "",
        number: "",
        prompt: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetchOrg();
    }, [id]);

    const fetchOrg = async () => {
        try {
            const response = await axios.get(`${Helpers.apiUrl}get-org/${id}`, Helpers.authHeaders);
            if (response.status != 200) {
                throw new Error("Failed to fetch Organization");
            }
            setOrg(response.data);
            setFormData({
                name: response.data.name,
                street: response.data.street,
                number: response.data.number,
                prompt: response.data.prompt,
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
            const response = await axios.post(`${Helpers.apiUrl}update-org/${id}`, formData, Helpers.authHeaders);
            if (response.status != 200) {
                throw new Error("Failed to update Organization");
            }
            setOrg(response.data);
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

    if (!org) {
        return <div className="text-white text-center mt-5">Organization not found</div>;
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
                        Organisation bearbeiten
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
                                            Number
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="number"
                                            name="number"
                                            value={formData.number}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label" style={{ color: "black" }}>
                                            Street
                                        </label><textarea class="form-control" id="street"
                                            onChange={handleChange} name="street" rows={7}>{formData.street}</textarea>

                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label" style={{ color: "black" }}>
                                            Prompt
                                        </label><textarea class="form-control" id="prompt"
                                            onChange={handleChange} name="prompt" rows={7}>{formData.prompt}</textarea>

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
                                                {org.name}
                                            </p>
                                        </div>
                                        <div className="col-6 mb-3">
                                            <h6 style={{ color: "black" }}>Number</h6>
                                            <p className="text-muted" style={{ color: "black" }}>
                                                {org.number}
                                            </p>
                                        </div>
                                    </div>
                                    <h6 style={{ color: "black" }}>Street</h6>
                                    <hr className="mt-0 mb-4" />
                                    <div className="row pt-1">
                                        <div className="col-12 mb-3">
                                            <p className="text-muted" style={{ color: "black" }}>
                                                {org.street}
                                            </p>
                                        </div>
                                    </div>
                                    <h6 style={{ color: "black" }}>Prompt</h6>
                                    <hr className="mt-0 mb-4" />
                                    <div className="row pt-1">
                                        <div className="col-12 mb-3">
                                            <p className="text-muted" style={{ color: "black" }}>
                                                {org.prompt}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-end gap-2 p-2">
                                        <Link
                                            to="/admin/orgs"
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

export default EditOrg;
