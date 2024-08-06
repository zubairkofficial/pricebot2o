import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Helpers from "../../../Config/Helpers";
import axios from "axios";
import { useHeader } from '../../../Components/HeaderContext';

const EditTrans = () => {
    const { setHeaderData } = useHeader();
    const { id } = useParams();
    const [trans, setTrans] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        key: "",
        value: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        setHeaderData({ title: 'Organisationen', desc: 'Verwalten Sie hier Ihre Organisationen' });
        fetchTrans();
    }, [id]);

    const fetchTrans = async () => {
        try {
            const response = await axios.get(`${Helpers.apiUrl}get-trans/${id}`, Helpers.authHeaders);
            if (response.status !== 200) {
                throw new Error("Failed to fetch Organization");
            }
            setTrans(response.data);
            setFormData({
                key: response.data.key,
                value: response.data.value,
            });
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${Helpers.apiUrl}update-trans/${id}`, formData, Helpers.authHeaders);
            if (response.status !== 200) {
                throw new Error("Organisation konnte nicht aktualisiert werden");
            }
            Helpers.toast("success", "Organisation erfolgreich aktualisiert");
            navigate("/admin/translations");
        } catch (error) {
            setError(error.message);
        }
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
        return <div className="text-center text-red-500 mt-5">{error}</div>;
    }

    if (!trans) {
        return <div className="text-center text-red-500 mt-5">Organisation nicht gefunden</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">{isEditing ? 'Organisation bearbeiten' : 'Organisationsdetails'}</h2>
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        {isEditing ? (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <input
                                    type="text"
                                    name="key"
                                    className="block w-full sm:text-sm border-gray-300 rounded-md shadow-sm"
                                    value={formData.key}
                                    onChange={handleChange}
                                    placeholder="Name der Organisation"
                                />
                                <input
                                    type="text"
                                    name="value"
                                    className="block w-full sm:text-sm border-gray-300 rounded-md shadow-sm"
                                    value={formData.value}
                                    onChange={handleChange}
                                    placeholder="value"
                                />
                                <div className="flex justify-end space-x-3">
                                    <button type="button" className="bg-gray-200 py-2 px-4 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-300 focus:outline-none" onClick={() => setIsEditing(false)}>
                                    {Helpers.getTranslationValue('Cancel')}</button>
                                    <button type="submit" className="text-white bg-success-300 py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white hover:bg-success-400 focus:outline-none">
                                    {Helpers.getTranslationValue('save_changes')}</button>
                                </div>
                            </form>
                        ) : (
                            <>
                                <div className="space-y-4">
                                    <p><strong>Key:</strong> {trans.key}</p>
                                    <p><strong>Value:</strong> {trans.value}</p>
                                    <div className="flex justify-end space-x-3">
                                        <Link to="/admin/translations" className=" bg-gray-200 py-2 px-4 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-300 focus:outline-none">{Helpers.getTranslationValue('Back')}</Link>
                                        <button onClick={() => setIsEditing(true)} className="text-white bg-success-300 py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white hover:bg-success-400 focus:outline-none">{Helpers.getTranslationValue('Edit')}</button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditTrans;
