import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Helpers from "../../Config/Helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt, faSpinner, faCheckCircle, faExclamationCircle, faDownload, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useHeader } from '../../Components/HeaderContext';
import * as XLSX from "xlsx";

function DataProcess() {
    const { setHeaderData } = useHeader();

    useEffect(() => {
        setHeaderData({ title: Helpers.getTranslationValue('Data Process'), desc: '' });
    }, [setHeaderData]);

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [fileStatuses, setFileStatuses] = useState({});
    const [allProcessedData, setAllProcessedData] = useState([]);
    const [isEmailSending, setIsEmailSending] = useState(false);
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

                const response = await axios.post(`${Helpers.apiUrl}data-process`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`,
                    },
                    timeout: 120000,
                });

                if (response.status === 200 && response.data && response.data.data) {
                    newStatuses[file.name].status = "Completed";
                    setFileStatuses({ ...newStatuses });

                    const parsedData = response.data.data.map(item => ({ data: item || {} }));
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

    const handleSendEmail = async () => {
        setIsEmailSending(true);
        const MAX_CHAR_LIMIT = 32767;
        const data = [];

        // Define the custom headers in your desired order
        const headers = [
            "Lagerkunde", "Artikel Nr.(Länge beachten)", "Materialkurztext", "Produktname", "Hersteller",
            "Dateiname SDB", "Ausgabedatum bzw. letzte Änderung", "LG Klasse", "WGK(numerischer Wert)",
            "H Sätze durch Komma getrennt", "Flammpunkt (numerischer Wert)[°C]",
            "Nr./Kategorie gem. Anhang I, 12. BImSchV 2017", "UN Nr", "Gefahrensymbole",
            "Gefahrgutklasse (Länge beachten)", "Verpackungsgruppe", "Tunnelcode",
            "N.A.G./NOS technische Benennung (Gefahraus-löser)", "LQ (Spalte eingefügt)",
            "Hinweise/Bemerkungen/Sicherheitsbetrachtung (stoffspezifisch)", "Freigabe Störrfallbeauftragter",
            "Maßnahmen Lagerung Abschnitt 7.2", "Zusammenlagerverbot Abschnitt 10.5", "Main Ingredients",
            "Section - PreText", "Section - 1", "Section - 2", "Section - 2|2.2", "Section - 3",
            "Section - 5|5.1", "Section - 7|7.2--15|15.1", "Section - 7|7.2", "Section - 9|9.1",
            "Section - 10|10.5", "Section - 15", "Section - 14"
        ];
        data.push(headers);

        // Add static row starting from column D and skipping column L
        const staticRow = ["", "", "", "", "", "", "14", "1-HZWMSC", "1-HZDWGK", "3-HARIZIN", "1-H2FLSP 3n", "", "1-HZUNNR 6n", "2-HECODE", "4-HMKLAS", "4-HMVPAK", "4-HMTNCD", "1-HZGSDE / 4-HMGSDE", "4-HMLQTP"];
        data.push(staticRow);

        // Define a mapping from headers to data keys
        const headerMapping = {
            "Lagerkunde": "Lagerkunde",
            "Artikel Nr.(Länge beachten)": "Artikel Nr.\n(Länge beachten)",
            "Materialkurztext": "Materialkurztext",
            "Produktname": "Produktname",
            "Hersteller": "Hersteller",
            "Dateiname SDB": "Dateiname SDB",
            "Ausgabedatum bzw. letzte Änderung": "Ausgabedatum bzw. letzte Änderung",
            "LG Klasse": "LG Klasse",
            "WGK(numerischer Wert)": "WGK\n(numerischer Wert)", // Make sure this matches the API response key
            "H Sätze durch Komma getrennt": "H Sätze\ndurch Komma getrennt",
            "Flammpunkt (numerischer Wert)[°C]": "Flammpunkt\n(numerischer Wert)\n[°C]", // Mapping "Flammpunkt" from data
            "Nr./Kategorie gem. Anhang I, 12. BImSchV 2017": "Nr./Kategorie gem. Anhang I, 12. BImSchV 2017",
            "UN Nr": "UN Nr",
            "Gefahrensymbole": "Gefahrensymbole",
            "Gefahrgutklasse (Länge beachten)": "Gefahrgutklasse (Länge beachten)",
            "Verpackungsgruppe": "Verpackungsgruppe",
            "Tunnelcode": "Tunnelcode",
            "N.A.G./NOS technische Benennung (Gefahraus-löser)": "N.A.G./NOS\ntechnische Benennung\n(Gefahraus-löser)",
            "LQ (Spalte eingefügt)": "LQ (Spalte eingefügt)",
            "Hinweise/Bemerkungen/Sicherheitsbetrachtung (stoffspezifisch)": "Hinweise/Bemerkungen/Sicherheitsbetrachtung (stoffspezifisch)",
            "Freigabe Störrfallbeauftragter": "Freigabe Störrfallbeauftragter",
            "Maßnahmen Lagerung Abschnitt 7.2": "Maßnahmen Lagerung\nAbschnitt 7.2",
            "Zusammenlagerverbot Abschnitt 10.5": "Zusammenlagerverbot\nAbschnitt 10.5",
            "Main Ingredients": "Main Ingredients",
            "Section - PreText": "Section - PreText",
            "Section - 1": "Section - 1",
            "Section - 2": "Section - 2",
            "Section - 2|2.2": "Section - 2|2.2",
            "Section - 3": "Section - 3",
            "Section - 5|5.1": "Section - 5|5.1",
            "Section - 7|7.2--15|15.1": "Section - 7|7.2--15",
            "Section - 7|7.2": "Section - 7|7.2",
            "Section - 9|9.1": "Section - 9|9.1",
            "Section - 10|10.5": "Section - 10|10.5",
            "Section - 15": "Section - 15",
            "Section - 14": "Section - 14"
        };

        // Populate data rows
        allProcessedData.forEach((fileData) => {
            let rowData = Array(headers.length).fill(""); // Initialize row data with empty strings
            headers.forEach((header, index) => {
                const key = headerMapping[header];
                let cellData = fileData.data[key] || "";

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

        // Create and configure the Excel sheet
        const ws = XLSX.utils.aoa_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Processed Data");

        // Convert workbook to a Blob for upload
        const wbout = XLSX.write(wb, { type: "array", bookType: "xlsx" });
        const blob = new Blob([wbout], { type: "application/octet-stream" });

        const formData = new FormData();
        formData.append("file", blob, "Processed_Files_Data.xlsx");

        // Send the file to the backend
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${Helpers.apiUrl}send-processed-file`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            Helpers.toast("success", response.data.message || "Die Datei wurde erfolgreich an Ihre E-Mail-Adresse gesendet.");

            setIsEmailSending(false);
        } catch (error) {
            setIsEmailSending(false);
            console.error("Error sending file:", error);
            Helpers.toast("error", "There was an error sending the file.");
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
                        onClick={handleSendEmail}
                        disabled={isEmailSending}
                        className="flex justify-end text-white py-3 px-6 font-bold bg-success-300 hover:bg-success-300  transition-all rounded-lg"
                    >
                        {Helpers.getTranslationValue(isEmailSending ? 'sending_email' : 'send_email')}
                        <FontAwesomeIcon
                            icon={isEmailSending ? faSpinner : faEnvelope}
                            spin={isEmailSending}
                            className={`ml-2 ${isEmailSending ? 'text-blue-500' : ''}`}
                        />

                    </button>
                )}
            </div>
        </div>
    );
}

export default DataProcess;
