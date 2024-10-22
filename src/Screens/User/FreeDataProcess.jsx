import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Helpers from "../../Config/Helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt, faSpinner, faCheckCircle, faExclamationCircle, faDownload } from "@fortawesome/free-solid-svg-icons";
import { useHeader } from '../../Components/HeaderContext';
import * as XLSX from "xlsx";

function FreeDataProcess() {
    const { setHeaderData } = useHeader();

    useEffect(() => {
        setHeaderData({ title: Helpers.getTranslationValue('Kostenloser Datenprozess'), desc: 'Dieses Tool ist für kostenlose Benutzer unter dem Cretschmar-Administrator verfügbar' });
    }, [setHeaderData]);

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [fileStatuses, setFileStatuses] = useState({});
    const [allProcessedData, setAllProcessedData] = useState([]);
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
        let json = localStorage.getItem("user");
        let userObj = JSON.parse(json);
        let userId = userObj.id;
        const newStatuses = { ...fileStatuses };
        let allData = [];
    
        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
            const formData = new FormData();
            formData.append("documents[]", file);
            formData.append("user_id", userId);
    
            newStatuses[file.name] = { status: "In Progress" };
            setFileStatuses({ ...newStatuses });
    
            try {
                const token = localStorage.getItem('token');
    
                const response = await axios.post(`${Helpers.apiUrl}freeDataProcess`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`,
                    },
                    timeout: 120000,
                });
    
                if (response.status === 200 && response.data && response.data.data) {
                    newStatuses[file.name].status = "Completed";
                    setFileStatuses({ ...newStatuses });
    
                    // Parse and process data from the response
                    const parsedData = response.data.data.map(item => {
                        try {
                            // If item is an object, use it directly
                            return { data: item || {} };
                        } catch (parseError) {
                            console.error("Error processing item:", item, parseError);
                            return { data: {} }; // Return empty object in case of error
                        }
                    });
    
                    allData = allData.concat(parsedData);
                } else {
                    throw new Error(response.message || Helpers.getTranslationValue('error_file_upload'));
                }
            } catch (error) {
                console.error("Error uploading file:", file.name, error);
                newStatuses[file.name].status = "Error";
                setFileStatuses({ ...newStatuses });
            }
        }
    
        setAllProcessedData(allData);
        Helpers.toast("success", Helpers.getTranslationValue('files_processed_msg'));
    };

    const handleDownload = () => {
        const MAX_CHAR_LIMIT = 32767;
        const data = [];
    
        // Define the custom headers in your desired order
        const headers = [
             "Dateiname SDB", "Ausgabedatum bzw. letzte Änderung", "Flammpunkt (numerischer Wert)[°C]", "H Sätze durch Komma getrennt",
            "Hinweise/Bemerkungen/Sicherheitsbetrachtung (stoffspezifisch)", "LG Klasse", "WGK (numerischer Wert)", "Maßnahmen Lagerung Abschnitt 7.2", "Zusammenlagerverbot Abschnitt 10.5"
        ];
        data.push(headers);
    
        // Define a mapping from headers to data keys
        const headerMapping = {
           
            "Dateiname SDB": "Dateiname SDB",
            "Ausgabedatum bzw. letzte Änderung": "Ausgabedatum bzw. letzte Änderung",
            "Flammpunkt (numerischer Wert)[°C]": "Flammpunkt\n(numerischer Wert)\n[°C]",
            "H Sätze durch Komma getrennt": "H Sätze\ndurch Komma getrennt",
            "Hinweise/Bemerkungen/Sicherheitsbetrachtung (stoffspezifisch)": "Hinweise/Bemerkungen/Sicherheitsbetrachtung (stoffspezifisch)",
            "LG Klasse": "LG Klasse",
            "WGK (numerischer Wert)": "WGK\n(numerischer Wert)",
            "Maßnahmen Lagerung Abschnitt 7.2": "Maßnahmen Lagerung\nAbschnitt 7.2",
            "Zusammenlagerverbot Abschnitt 10.5": "Zusammenlagerverbot\nAbschnitt 10.5"
        };

       
    
        // Map the actual data based on the custom headers
        allProcessedData.forEach((fileData) => {
            let rowData = Array(headers.length).fill(""); // Initialize row data with empty strings
            
            headers.forEach((header, index) => {
                const key = headerMapping[header];
                let cellData = fileData.data[key] || ""; // Use empty string as default value
    
                // If the content exceeds the max character limit, split it across rows
                while (cellData.length > MAX_CHAR_LIMIT) {
                    rowData[index] = cellData.slice(0, MAX_CHAR_LIMIT);
                    data.push([...rowData]);
                    cellData = cellData.slice(MAX_CHAR_LIMIT);
                    rowData = Array(headers.length).fill(""); // Start a new row with empty strings
                }
                rowData[index] = cellData;
            });
    
            data.push(rowData);
        });
    
        const ws = XLSX.utils.aoa_to_sheet(data);
    
        // Adjust column widths
        ws["!cols"] = headers.map(() => ({ wch: 30 })); // Set width for all columns
    
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Processed Free Data");
        XLSX.writeFile(wb, "Processed_Free_Files_Data.xlsx");
    
        // Reset the form after download
        setSelectedFiles([]);
        setFileStatuses({});
        setAllProcessedData([]);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
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
            <h2 className="text-center text-2xl font-semibold mb-8">{Helpers.getTranslationValue('Kostenloser Datenprozess')}</h2>
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
                                    {getStatusIcon(fileStatuses[file.name]?.status)}
                                    <span>{fileStatuses[file.name]?.status}</span>
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
                {allProcessedData.length > 0 && (
                    <button
                        onClick={handleDownload}
                        className="flex justify-end text-white py-3 px-6 font-bold bg-success-300 hover:bg-success-300 transition-all rounded-lg"
                    >
                        {Helpers.getTranslationValue('download_file')} <FontAwesomeIcon icon={faDownload} className="ml-2" />
                    </button>
                )}
            </div>
        </div>
    );
}

export default FreeDataProcess;
