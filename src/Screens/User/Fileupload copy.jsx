import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Helpers from "../../Config/Helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import { useHeader } from '../../Components/HeaderContext';

function FileUpload() {

  const { setHeaderData } = useHeader();
  useEffect(() => {
    setHeaderData({ title: 'Datei-Upload', desc: '' });
  }, [setHeaderData]);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [fileResponses, setFileResponses] = useState({});
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    setSelectedFiles(Array.from(event.target.files));
    setFileResponses({});
  };

  const handleFileUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      Helpers.toast("error", "Bitte wählen Sie zunächst eine Datei aus.");
      return;
    }

    setUploading(true);
    let newFileResponses = {};

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const formData = new FormData();
      formData.append("document", file);
      formData.append("fileName", file.name);

      try {
        const response = await axios.post(`${Helpers.apiUrl}uploadFile`, formData, Helpers.authFileHeaders);

        if (response.status === 200) {
          Helpers.toast("success", "Datei erfolgreich hochgeladen.");
          newFileResponses[file.name] = { status: "Success", data: response.data.data };
        } else {
          throw new Error(response.message || "Fehler beim Hochladen der Datei");
        }
      } catch (error) {
        console.error("Error:", error);
        Helpers.toast("error", "Fehler beim Hochladen der Datei " + file.name);
        newFileResponses[file.name] = { status: "Error", data: error.toString() };
      }
    }

    setFileResponses(newFileResponses);
    setUploading(false);
  };

  const formatDataAsPlainText = (data) => {
    return Object.entries(data).map(([key, value], index) => (
      <p key={index}>{`${key}: ${typeof value === 'object' ? JSON.stringify(value, null, 2) : value}`}</p>
    ));
  };

  return (
    <div className=" w-full bg-white py-5 mx-auto">
      <h2 className="text-center text-2xl font-semibold  mb-8">
        Daten hochladen
      </h2>
      <div className="flex flex-col items-center px-10">
        <input
          type="file"
          className="form-control mb-4 border border-bgray-300 w-full   rounded-lg px-4 py-3.5 placeholder:placeholder:text-base"
          accept="application/pdf"
          required
          multiple
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        </div>
        <div className="flex justify-end">
        <button
          onClick={handleFileUpload}
          disabled={uploading}
          className="flex  justify-end text-white py-3 px-6 font-bold bg-success-300 hover:bg-success-300 transition-all rounded-lg"
          style={{ marginRight:'40px'}}
        >
          {uploading ? (
            <span className="flex items-center">Hochladen... <FontAwesomeIcon icon={faCloudUploadAlt} className="ml-2 animate-spin" /></span>
          ) : (
            <span>Hochladen <FontAwesomeIcon icon={faCloudUploadAlt} className="ml-2" /></span>
          )}
        </button>
      </div>
      <div className="mt-8">
        <ul className="space-y-4">
          {selectedFiles.map((file, index) => (
            <li key={index} className="bg-white  p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center space-x-2">
                <span className="hidden md:block">{file.name} ({file.size} bytes)</span>
                {fileResponses[file.name] && (
                  <div className="mt-2 text-md">
                    {fileResponses[file.name].data && formatDataAsPlainText(fileResponses[file.name].data)}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FileUpload;
