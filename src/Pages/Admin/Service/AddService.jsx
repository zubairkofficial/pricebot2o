import React, { useEffect,useState } from "react";
import {  useNavigate } from "react-router-dom";
import Helpers from "../../../Config/Helpers";
import axios from "axios";
import { useHeader } from '../../../Components/Admin/HeaderContext';

const AddService = () => {

    const { setHeaderData } = useHeader();

    useEffect(() => {
      setHeaderData({ title: 'Dienstleistungen', desc: 'Verwalten Sie hier Ihre Dienste' });
    }, [setHeaderData]);

    const [service, setService] = useState({
        name: "",
        description: "",
        link: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        
        const { name, value } = e.target;
        setService({ ...service, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!service.name || !service.description || !service.link) {
            Helpers.toast("error", "Name, Description, and Link are required.");
            return;
        }

        try {
            const response = await axios.post(`${Helpers.apiUrl}add-service`, {
                name: service.name,
                description: service.description,
                link: service.link,
            },Helpers.authHeaders
        );

            if (response.status != 200) {
                throw new Error("Failed to Add Service");
            }

            setService({
                name: "",
                description: "",
                link: "",
            });

            Helpers.toast("success", response.data.message);
            navigate("/admin/services");
        } catch (error) {
            Helpers.toast('error', "Failed to Add Service.");
        }
    };



    return (
        <div className="container-fluid vh-100  text-white " style={{ paddingTop: '2rem', boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}  >
            <div className="row h-100">
                <div className="col-2 ">

                </div>
                <div className="col-9 d-flex justify-content-center align-items-center">
                    <div className="row justify-content-center w-100">
                        <div className="col-md-8">
                            <div className="card bg-dark text-white border-0">
                                <div className="card-body">
                                    <div className="modal-content " style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
                                        <div className="modal-header">
                                            <h5 className="modal-title ms-3">Dienst hinzufügen</h5>
                                        </div>
                                        <div className="modal-body modal-body-two">
                                            <div className="from-main">
                                                <form className="row g-3" onSubmit={handleSubmit}>
                                                    <div className="col-md-6">
                                                        <label htmlFor="name" className="form-label">
                                                            Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="name"
                                                            name="name"
                                                            value={service.name}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label htmlFor="link" className="form-label">
                                                            Link
                                                        </label>
                                                        <input
                                                            type="link"
                                                            className="form-control"
                                                            id="link"
                                                            name="link"
                                                            value={service.link}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                    <div className="col-md-12">
                                                        <label htmlFor="link" className="form-label">
                                                            Description
                                                        </label>
                                                        <textarea class="form-control" id="description"
                                                            onChange={handleChange} name="description" rows={7}>{service.description}</textarea>
                                                    </div>
                                                    <div className="d-flex justify-content-end   ">
                                                        <button type="submit" className="btn-one text-white" style={{ width: '30%' }} >
                                                            Dienst hinzufügen
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default AddService;
