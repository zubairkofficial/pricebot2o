import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Helpers from "../../../Config/Helpers";
import axios from "axios";
import { useHeader } from '../../../Components/HeaderContext';

const AddTrans = () => {
    const { setHeaderData } = useHeader();

    useEffect(() => {
        setHeaderData({ title: 'Organisationen', desc: 'Verwalten Sie hier Ihre Organisationen' });
    }, [setHeaderData]);

    const [trans, setTrans] = useState({
        key: "",
        value: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTrans({ ...trans, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!trans.key || !trans.value) {
            Helpers.toast("error", "Name, Straße und Nummer sind erforderlich.");
            return;
        }

        try {
            const response = await axios.post(`${Helpers.apiUrl}add-trans`, trans, Helpers.authHeaders);

            if (response.status !== 200) {
                throw new Error("Organisation konnte nicht hinzugefügt werde");
            }

            setTrans({        
                key: "",
                value: "",
            });

            Helpers.toast("success", "Organisation erfolgreich hinzugefügt");
            navigate("/admin/translations");
        } catch (error) {
            Helpers.toast('error', error.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10 flex justify-center items-center">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl">
                <h5 className="text-xl font-semibold mb-4">Organisation hinzufügen</h5>
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="key" className="block text-sm font-medium text-gray-700">Key</label>
                        <input
                            type="text"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            id="key"
                            name="key"
                            value={trans.key}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="value" className="block text-sm font-medium text-gray-700">Value</label>
                        <input
                            type="text"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            id="value"
                            name="value"
                            value={trans.value}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-span-2 flex justify-start">
                        <button type="submit" className="text-white bg-success-300 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-success-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Add Trans
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTrans;
