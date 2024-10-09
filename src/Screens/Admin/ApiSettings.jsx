import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Helpers from './../../Config/Helpers'; // Assuming the helpers file is located one level up

const ApiSettings = () => {
  const [openAiApiKey, setOpenAiApiKey] = useState('');  // OpenAI API Key
  const [deepgramApiKey, setDeepgramApiKey] = useState('');  // Deepgram API Key
  const [loadingOpenAi, setLoadingOpenAi] = useState(false);  // Independent loading state for OpenAI
  const [loadingDeepgram, setLoadingDeepgram] = useState(false);  // Independent loading state for Deepgram
  const [loadingPage, setLoadingPage] = useState(true);  // Loading state for fetching keys initially

  // Fetch API keys from the backend when the component loads
  useEffect(() => {
    const fetchApiKeys = async () => {
      try {
        const response = await axios.get(`${Helpers.apiUrl}api-keys`, Helpers.authHeaders); // Assuming this endpoint returns both API keys
        const { openai_key, deepgram_key } = response.data;  // Assuming the keys are returned like this
        setOpenAiApiKey(openai_key || '');  // Set the OpenAI API key
        setDeepgramApiKey(deepgram_key || '');  // Set the Deepgram API key
      } catch (error) {
        console.error('Fehler beim Abrufen der API-Schlüssel:', error);
        alert('Ein Fehler ist beim Abrufen der API-Schlüssel aufgetreten');
      } finally {
        setLoadingPage(false);  // End page loading state after fetching
      }
    };

    fetchApiKeys();
  }, []);

  // Handle OpenAI API Key submission
  const handleOpenAiSubmit = async (e) => {
    e.preventDefault();
    setLoadingOpenAi(true);  // Set loading state for OpenAI
    try {
      const response = await axios.post(
        `${Helpers.apiUrl}save-api-key`,
        { name: 'OpenAI', key: openAiApiKey },
        Helpers.authHeaders
      );
      if (response.status === 200 || response.status === 201) {
        alert('OpenAI API-Schlüssel erfolgreich gespeichert');
      } else {
        alert('Fehler beim Speichern des OpenAI API-Schlüssels');
      }
    } catch (error) {
      console.error('Fehler beim Speichern des OpenAI API-Schlüssels:', error);
      alert('Ein Fehler ist beim Speichern des OpenAI API-Schlüssels aufgetreten');
    } finally {
      setLoadingOpenAi(false);  // Reset loading state for OpenAI
    }
  };

  // Handle Deepgram API Key submission
  const handleDeepgramSubmit = async (e) => {
    e.preventDefault();
    setLoadingDeepgram(true);  // Set loading state for Deepgram
    try {
      const response = await axios.post(
        `${Helpers.apiUrl}save-api-key`,
        { name: 'Deepgram', key: deepgramApiKey },
        Helpers.authHeaders
      );
      if (response.status === 200 || response.status === 201) {
        alert('Deepgram API-Schlüssel erfolgreich gespeichert');
      } else {
        alert('Fehler beim Speichern des Deepgram API-Schlüssels');
      }
    } catch (error) {
      console.error('Fehler beim Speichern des Deepgram API-Schlüssels:', error);
      alert('Ein Fehler ist beim Speichern des Deepgram API-Schlüssels aufgetreten');
    } finally {
      setLoadingDeepgram(false);  // Reset loading state for Deepgram
    }
  };

  if (loadingPage) {
    return <div>Lade API-Schlüssel...</div>;  // Loading message while fetching API keys
  }

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-700">API-Einstellungen</h2>
      </div>

      {/* Form to save OpenAI API key */}
      <form onSubmit={handleOpenAiSubmit}>
        <div className="mb-4">
          <label htmlFor="openAiApiKey" className="block text-gray-600 mb-2">
            OpenAI API-Schlüssel
          </label>
          <input
            type="text"
            id="openAiApiKey"
            value={openAiApiKey}
            onChange={(e) => setOpenAiApiKey(e.target.value)}
            placeholder="OpenAI API-Schlüssel eingeben"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <button
          type="submit"
          className={`py-2 px-4 rounded-md text-white bg-success-300 ${loadingOpenAi ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loadingOpenAi}
        >
          {loadingOpenAi ? 'Speichern...' : 'OpenAI API-Schlüssel aktualisieren'}
        </button>
      </form>

      {/* Form to save Deepgram API key */}
      <form onSubmit={handleDeepgramSubmit} className="mt-6">
        <div className="mb-4">
          <label htmlFor="deepgramApiKey" className="block text-gray-600 mb-2">
            Deepgram API-Schlüssel
          </label>
          <input
            type="text"
            id="deepgramApiKey"
            value={deepgramApiKey}
            onChange={(e) => setDeepgramApiKey(e.target.value)}
            placeholder="Deepgram API-Schlüssel eingeben"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <button
          type="submit"
          className={`py-2 px-4 rounded-md text-white bg-success-300 ${loadingDeepgram ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loadingDeepgram}
        >
          {loadingDeepgram ? 'Speichern...' : 'Deepgram API-Schlüssel aktualisieren'}
        </button>
      </form>
    </div>
  );
};

export default ApiSettings;
