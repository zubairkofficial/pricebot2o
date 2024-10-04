import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Helpers from "../../../Config/Helpers";
import axios from "axios";
import { useHeader } from '../../../Components/HeaderContext';

const AddOrg = () => {
    const { setHeaderData } = useHeader();

    useEffect(() => {
        setHeaderData({ title: Helpers.getTranslationValue('Organizations'), desc: Helpers.getTranslationValue('org_desc') });
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

        if (!org.name || !org.prompt) {
            Helpers.toast("error", Helpers.getTranslationValue('org_fields_error'));
            return;
        }

        try {
            const response = await axios.post(`${Helpers.apiUrl}add-org`, org, Helpers.authHeaders);

            if (response.status !== 200) {
                throw new Error(Helpers.getTranslationValue('add_org_error'));
            }

            setOrg({
                name: "",
                prompt: "",
            });

            Helpers.toast("success", Helpers.getTranslationValue('add_org_msg'));
            navigate("/admin/orgs");
        } catch (error) {
            Helpers.toast('error', error.message);
        }
    };

    return (
        <div className="bg-gray-100 py-8 grid grid-cols-4 justify-center items-center">
            <div className="bg-white col-span-4 shadow-md rounded-lg p-6 w-full min-w-full">
                <h5 className="text-xl font-semibold mb-4">{Helpers.getTranslationValue('add_org')}</h5>
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">{Helpers.getTranslationValue('Name')}</label>
                        <input
                            type="text"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            id="name"
                            placeholder={Helpers.getTranslationValue('Name')}
                            name="name"
                            value={org.name}
                            onChange={handleChange}
                        />
                    </div>
                    {/* <div>
                        <label htmlFor="number" className="block text-sm font-medium text-gray-700">{Helpers.getTranslationValue('Number')}</label>
                        <input
                            type="text"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            id="number"
                            name="number"
                            placeholder={Helpers.getTranslationValue('Number')}
                            value={org.number}
                            onChange={handleChange}
                        />
                    </div> */}
                    {/* <div className="col-span-2">
                        <label htmlFor="street" className="block text-sm font-medium text-gray-700">{Helpers.getTranslationValue('street')}</label>
                        <textarea
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            id="street"
                            name="street"
                            rows={3}
                            placeholder={Helpers.getTranslationValue('street')}
                            value={org.street}
                            onChange={handleChange}
                        />
                    </div> */}
                    <div className="col-span-4">
                        <label htmlFor="prompt" className="block text-sm font-medium text-gray-700">{Helpers.getTranslationValue('Prompt')}</label>
                        <textarea
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            id="prompt"
                            name="prompt"
                            rows={4}
                            placeholder={Helpers.getTranslationValue('Prompt')}
                            value={org.prompt}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-span-2 flex justify-start">
                        <button type="submit" className="text-white bg-success-300 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-success-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            {Helpers.getTranslationValue('add_org')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddOrg;
