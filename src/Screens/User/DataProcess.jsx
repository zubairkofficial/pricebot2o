import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Helpers from "../../Config/Helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt, faSpinner, faCheckCircle, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { useHeader } from '../../Components/HeaderContext';

function DataProcess() {
    const { setHeaderData } = useHeader();

    useEffect(() => {
        setHeaderData({ title: Helpers.getTranslationValue('Data Process'), desc: '' });
    }, [setHeaderData]);

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [fileStatuses, setFileStatuses] = useState({});
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        const newStatuses = {};
        files.forEach(file => {
            newStatuses[file.name] = { status: "Pending", data: null };
        });
        setSelectedFiles(files);
        setFileStatuses(newStatuses);
    };

    const handleFileUpload = async () => {
        if (!selectedFiles || selectedFiles.length === 0) {
            Helpers.toast("error", Helpers.getTranslationValue('file_select_first'));
            return;
        }

        const newStatuses = { ...fileStatuses };

        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
            const formData = new FormData();
            formData.append("document", file);

            newStatuses[file.name].status = "In Progress";
            setFileStatuses({ ...newStatuses });

            try {
                const token = localStorage.getItem('token'); // Retrieve the token from local storage

                const response = await axios.post(`${Helpers.apiUrl}data-process`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
                    },
                    responseType: 'blob',
                    timeout: 120000, 
                });

                if (response.status === 200) {
                    // Create a URL for the file blob and trigger a download
                    const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                    const downloadUrl = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = downloadUrl;
                    link.download = `Data_Processed_${file.name.split('.')[0]}.xlsx`; 
                    document.body.appendChild(link);
                    link.click();
                    link.remove();

                    newStatuses[file.name] = { status: "Completed", data: null };
                    setSelectedFiles([]);
                    setFileStatuses({});
                    if (fileInputRef.current) {
                        fileInputRef.current.value = ''; // Reset the file input
                    }
                    Helpers.toast("success", Helpers.getTranslationValue('upload_success'));
                } else {
                    throw new Error(response.message || Helpers.getTranslationValue('error_file_upload'));
                }
            } catch (error) {
                console.error("Error:", error);
                Helpers.toast("error", Helpers.getTranslationValue('error_file_upload') + file.name);
                newStatuses[file.name] = { status: "Error", data: error.toString() };
            }

            setFileStatuses({ ...newStatuses });
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "In Progress":
                return <FontAwesomeIcon icon={faSpinner} spin className="text-blue-500" />;
            case "Completed":
                return <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />;
            case "Error":
                return <FontAwesomeIcon icon={faExclamationCircle} className="text-red-500" />;
            default:
                return null;
        }
    };

    return (
        <div className="w-full bg-white py-5 mx-auto">
            <h2 className="text-center text-2xl font-semibold mb-8">{Helpers.getTranslationValue('Data Process')}</h2>
            <div className="flex flex-col items-center px-10">
               
                <input
                    type="file"
                    className="form-control mb-4 border border-bgray-300 w-full rounded-lg px-4 py-3.5 placeholder:placeholder:text-base"
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/pdf"
                    multiple
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />
            </div>
            <div className="px-10">
                <ul className="space-y-4">
                    {selectedFiles.map((file, index) => (
                        <li key={index} className="bg-white p-4 rounded-lg shadow-sm">
                            <div className="flex justify-between items-center space-x-2">
                                <span>{file.name} ({file.size} bytes)</span>
                                <span className="flex items-center space-x-2">
                                    {getStatusIcon(fileStatuses[file.name].status)}
                                    <span>{fileStatuses[file.name].status}</span>
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex justify-end gap-1 mt-8 px-10">
                <button
                    onClick={handleFileUpload}
                    disabled={Object.values(fileStatuses).some(file => file.status === "In Progress")}
                    className="flex justify-end text-white py-3 px-6 font-bold bg-success-300 hover:bg-success-300 transition-all rounded-lg"
                    style={{ marginRight: '40px' }}
                >
                    {Helpers.getTranslationValue('carry_out')} <FontAwesomeIcon icon={faCloudUploadAlt} className="ml-2" />
                </button>
            </div>
        </div>
    );
}

export default DataProcess;