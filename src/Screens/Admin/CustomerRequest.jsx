import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import Helpers from "../../Config/Helpers";
import { useNavigate } from "react-router-dom";
import { useHeader } from '../../Components/HeaderContext';
import { FaCog, FaCheck } from 'react-icons/fa'; // Importing icons

const CustomerRequest = () => {
  const { setHeaderData } = useHeader(); // Header Context to set page details
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Set header data
    setHeaderData({ title: Helpers.getTranslationValue('kundenanfragen'), desc: '' });

    // Fetch customer requests
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`${Helpers.apiUrl}customer-requests`, Helpers.authHeaders);
        setRequests(response.data);
      } catch (error) {
        setErrors(Helpers.getTranslationValue('fehler_beim_abfragen_von_anfragen'));
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [setHeaderData]);

  const handleApproveDefault = async (userId) => {
    try {
      const response = await axios.post(
        `${Helpers.apiUrl}customer-requests/${userId}/approve`,
        { defaultSettings: true }, // Assuming the backend can handle default settings via a flag
        Helpers.authHeaders
      );
      setRequests(requests.filter(request => request.user_id !== userId));
      Helpers.toast('success', Helpers.getTranslationValue('anfrage_erfolgreich_genehmigt'));
    } catch (error) {
      Helpers.toast('error', Helpers.getTranslationValue('anfrage_konnte_nicht_genehmigt_werden'));
    }
  };

  const handleEdit = (userId) => {
    navigate(`/admin/edit-user/${userId}`);
  };

  if (loading) {
    return <p>{Helpers.getTranslationValue('lade_anfragen')}</p>;
  }

  if (errors) {
    return <p>{errors}</p>;
  }

  return (
    <div className="mt-10">
      <div className="max-w-4xl m-auto py-6">
        <h2 className="text-2xl font-bold mb-6">{Helpers.getTranslationValue('kundenanfragen')}</h2>
        {requests.length === 0 ? (
          <p>{Helpers.getTranslationValue('keine_anfragen_verfugbar')}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                    {Helpers.getTranslationValue('sr_no')}
                  </th>
                  <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                    {Helpers.getTranslationValue('Name')}
                  </th>
                  <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                    {Helpers.getTranslationValue('Aktionen')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request, index) => (
                  <tr key={request.user_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 border-b text-sm text-gray-600">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 border-b text-sm text-gray-600">
                      {/* {request.user.name} */}
                    </td>
                    <td className="px-6 py-4 border-b text-sm text-gray-600 flex space-x-2">
                      <button
                        onClick={() => handleApproveDefault(request.id)}
                        className="flex items-center py-2 px-4 bg-success-300 text-white rounded hover:bg-success-400 transition"
                      >
                        <FaCheck className="mr-2" /> {Helpers.getTranslationValue('Standard_genehmigen')}
                      </button>
                      <button
                        onClick={() => handleEdit(request.user_id)}
                        className="flex items-center py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                      >
                        <FaCog className="mr-2" /> {Helpers.getTranslationValue('Einstellungen')}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Toaster />
      </div>
    </div>
  );
};

export default CustomerRequest;
