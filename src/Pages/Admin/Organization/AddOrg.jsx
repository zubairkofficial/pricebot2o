import React, { useEffect,useState } from "react";
import {  useNavigate } from "react-router-dom";
import Helpers from "../../../Config/Helpers";
import axios from "axios";
import { useHeader } from '../../../Components/Admin/HeaderContext';

const AddOrg = () => {

    const { setHeaderData } = useHeader();

    useEffect(() => {
        setHeaderData({ title: 'Organisationen', desc: 'Verwalten Sie hier Ihre Organisationen' });
      }, [setHeaderData]);
      
    const [org, setOrg] = useState({
        name: "",
        street: "",
        number: "",
        prompt: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        
        const { name, value } = e.target;
        setOrg({ ...org, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!org.name || !org.street || !org.number) {
            Helpers.toast("error", "Name, Street, and Number are required.");
            return;
        }

        try {
            const response = await axios.post(`${Helpers.apiUrl}add-org`, {
                name: org.name,
                street: org.street,
                number: org.number,
                prompt: org.prompt,
            },Helpers.authHeaders
        );

            if (response.status != 200) {
                throw new Error("Failed to Add Organization");
            }

            setOrg({
                name: "",
                street: "",
                number: "",
                prompt: "",
            });

            Helpers.toast("success", response.data.message);
            navigate("/admin/orgs");
        } catch (error) {
            Helpers.toast('error', "Failed to Add Organization.");
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
                                                            value={org.name}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label htmlFor="number" className="form-label">
                                                            Number
                                                        </label>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            id="number"
                                                            name="number"
                                                            value={org.number}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                    <div className="col-md-12">
                                                        <label htmlFor="street" className="form-label">
                                                            Street
                                                        </label>
                                                        <textarea class="form-control" id="street"
                                                            onChange={handleChange} name="street" rows={7}>{org.street}</textarea>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <label htmlFor="prompt" className="form-label">
                                                            Prompt
                                                        </label>
                                                        <textarea class="form-control" id="prompt"
                                                            onChange={handleChange} name="prompt" rows={7}>{org.prompt}</textarea>
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

export default AddOrg;
