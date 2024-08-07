import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Helpers from "../../../Config/Helpers";
import axios from "axios";
import { useHeader } from '../../../Components/HeaderContext';

const AddService = () => {
    const { setHeaderData } = useHeader();

    useEffect(() => {
        setHeaderData({ title: Helpers.getTranslationValue('Servies'), desc: Helpers.getTranslationValue('servies_desc') });
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
            Helpers.toast("error", Helpers.getTranslationValue('service_fileds_error'));
            return;
        }

        try {
            const response = await axios.post(`${Helpers.apiUrl}add-service`, service, Helpers.authHeaders);
            if (response.status !== 200) {
                throw new Error(Helpers.getTranslationValue('service_add_error'));
            }

            setService({
                name: "",
                description: "",
                link: "",
            });

            Helpers.toast("success", Helpers.getTranslationValue('add_service_msg'));
            navigate("/admin/services");
        } catch (error) {
            Helpers.toast('error', error.message);
        }
    };

    return (
        <div className="bg-gray-100 py-8">
            <div className="flex justify-center items-center">
                <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl w-full">
                    <h5 className="text-xl font-semibold mb-4">{Helpers.getTranslationValue('add_service')}</h5>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">{Helpers.getTranslationValue('Name')}</label>
                            <input
                                type="text"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                id="name"
                                name="name"
                                value={service.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="link" className="block text-sm font-medium text-gray-700">{Helpers.getTranslationValue('link')}</label>
                            <input
                                type="url"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                id="link"
                                name="link"
                                value={service.link}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">{Helpers.getTranslationValue('description')}</label>
                            <textarea
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                id="description"
                                name="description"
                                rows="4"
                                value={service.description}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-success-300 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-success-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                {Helpers.getTranslationValue('add_service')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddService;
