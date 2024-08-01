import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Helpers from "../../../Config/Helpers";
import axios from "axios";
import { useHeader } from '../../../Components/HeaderContext';

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
            const response = await axios.post(`${Helpers.apiUrl}add-org`, org, Helpers.authHeaders);

            if (response.status !== 200) {
                throw new Error("Failed to Add Organization");
            }

            setOrg({
                name: "",
                street: "",
                number: "",
                prompt: "",
            });

            Helpers.toast("success", "Organization added successfully");
            navigate("/admin/orgs");
        } catch (error) {
            Helpers.toast('error', error.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10 flex justify-center items-center">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl">
                <h5 className="text-xl font-semibold mb-4">Add Organization</h5>
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            id="name"
                            name="name"
                            value={org.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="number" className="block text-sm font-medium text-gray-700">Number</label>
                        <input
                            type="text"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            id="number"
                            name="number"
                            value={org.number}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="street" className="block text-sm font-medium text-gray-700">Street</label>
                        <textarea
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            id="street"
                            name="street"
                            rows={3}
                            value={org.street}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="prompt" className="block text-sm font-medium text-gray-700">Prompt</label>
                        <textarea
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            id="prompt"
                            name="prompt"
                            rows={3}
                            value={org.prompt}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-span-2 flex justify-end">
                        <button type="submit" className="bg-success-300 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-success-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Add Organization
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddOrg;
