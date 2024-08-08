import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Helpers from "../../../Config/Helpers";
import axios from "axios";
import { useHeader } from '../../../Components/HeaderContext';

const EditOrg = () => {
    const { setHeaderData } = useHeader();
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
        setHeaderData({ title: Helpers.getTranslationValue('Organizations'), desc: Helpers.getTranslationValue('org_desc') });
        fetchOrg();
    }, [id]);

    const fetchOrg = async () => {
        try {
            const response = await axios.get(`${Helpers.apiUrl}get-org/${id}`, Helpers.authHeaders);
            if (response.status !== 200) {
                throw new Error(Helpers.getTranslationValue('org_fetch_error'));
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
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${Helpers.apiUrl}update-org/${id}`, formData, Helpers.authHeaders);
            if (response.status !== 200) {
                throw new Error(Helpers.getTranslationValue('org_update_error'));
            }
            Helpers.toast("success", Helpers.getTranslationValue('org_update_msg'));
            navigate("/admin/orgs");
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

    if (!org) {
        return <div className="text-center text-red-500 mt-5">{Helpers.getTranslationValue('org_fetch_error')}</div>;
    }

    return (
        <div className="bg-gray-100 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">{Helpers.getTranslationValue(isEditing ? 'edit_org' : 'Organizations')}</h2>
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        {isEditing ? (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder={Helpers.getTranslationValue('Name')}
                                    className="block w-full sm:text-sm border-gray-300 rounded-md shadow-sm"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="number"
                                    placeholder={Helpers.getTranslationValue('Number')}
                                    className="block w-full sm:text-sm border-gray-300 rounded-md shadow-sm"
                                    value={formData.number}
                                    onChange={handleChange}
                                />
                                <textarea
                                    name="street"
                                    placeholder={Helpers.getTranslationValue('street')}
                                    className="block w-full sm:text-sm border-gray-300 rounded-md shadow-sm"
                                    value={formData.street}
                                    onChange={handleChange}
                                    rows="3"
                                />
                                <textarea
                                    name="prompt"
                                    placeholder={Helpers.getTranslationValue('Prompt')}
                                    className="block w-full sm:text-sm border-gray-300 rounded-md shadow-sm"
                                    value={formData.prompt}
                                    onChange={handleChange}
                                    rows="3"
                                />
                                <div className="flex justify-end space-x-3">
                                    <button type="button" className="bg-gray-200 py-2 px-4 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-300 focus:outline-none" onClick={() => setIsEditing(false)}>
                                        {Helpers.getTranslationValue('Cancel')}</button>
                                    <button type="submit" className="text-white bg-success-300 py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white hover:bg-success-400 focus:outline-none">                                 {Helpers.getTranslationValue('save_changes')}</button>
                                </div>
                            </form>
                        ) : (
                            <>
                                <div className="space-y-4">
                                    <p><strong>{Helpers.getTranslationValue('Name')}:</strong> {org.name}</p>
                                    <p><strong>{Helpers.getTranslationValue('Number')}:</strong> {org.number}</p>
                                    <p><strong>{Helpers.getTranslationValue('street')}:</strong> {org.street}</p>
                                    <p><strong>{Helpers.getTranslationValue('Prompt')}:</strong> {org.prompt}</p>
                                    <div className="flex justify-end space-x-3">
                                        <Link to="/admin/orgs" className=" bg-gray-200 py-2 px-4 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-300 focus:outline-none">{Helpers.getTranslationValue('Back')}</Link>
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

export default EditOrg;
