import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Helpers from "../../Config/Helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudUploadAlt,
  faSpinner,
  faCheckCircle,
  faExclamationCircle,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { useHeader } from "../../Components/HeaderContext";
import * as XLSX from "xlsx";

function FileUpload() {
  const { setHeaderData } = useHeader();
  useEffect(() => {
    setHeaderData({ title: Helpers.getTranslationValue("files_upload"), desc: "" });
  }, [setHeaderData]);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileStatuses, setFileStatuses] = useState({});
  const [isEmailSending, setIsEmailSending] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newStatuses = {};
    files.forEach((file) => {
      newStatuses[file.name] = { status: "Pending", data: null };
    });
    setSelectedFiles(files);
    setFileStatuses(newStatuses);
  };

  const handleFileUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      Helpers.toast("error", Helpers.getTranslationValue("file_select_first"));
      return;
    }

    const newStatuses = { ...fileStatuses };

    for (let file of selectedFiles) {
      const formData = new FormData();
      formData.append("document", file);
      formData.append("fileName", file.name);
      formData.append("user_id", JSON.parse(localStorage.getItem("user")).id);

      newStatuses[file.name].status = "In Progress";
      setFileStatuses({ ...newStatuses });

      try {
        const response = await axios.post(
          `${Helpers.apiUrl}uploadFile`,
          formData,
          Helpers.authFileHeaders
        );

        if (response.status === 200) {
          newStatuses[file.name] = { status: "Completed", data: response.data.data };
        } else {
          throw new Error(response.message || Helpers.getTranslationValue("error_file_upload"));
        }
      } catch (error) {
        newStatuses[file.name] = { status: "Error", data: error.toString() };
      }

      setFileStatuses({ ...newStatuses });
    }

    Helpers.toast("success", Helpers.getTranslationValue("files_processed_msg"));
  };

  const handleSendEmail = async () => {
    setIsEmailSending(true);
    const data = [];
    const allKeys = new Set();

    selectedFiles.forEach((file, index) => {
      const status = fileStatuses[file.name];
      if (status && status.data) {
        Object.keys(status.data).forEach((key) => allKeys.add(key));
      }
    });

    const headers = ["SR_No", "Filename", ...Array.from(allKeys)];
    data.push(headers);

    selectedFiles.forEach((file, index) => {
      const status = fileStatuses[file.name];
      if (status && status.data) {
        const row = [index + 1, file.name];
        headers.slice(2).forEach((header) => {
          row.push(status.data[header] || "NA");
        });
        data.push(row);
      }
    });
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Processed Files");

    const wbout = XLSX.write(wb, { type: "array", bookType: "xlsx" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    const formData = new FormData();
    formData.append("file", blob, "Processed_Files_Data.xlsx");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${Helpers.apiUrl}send-processed-file`, formData, {
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
      });
      Helpers.toast("success", response.data.message || "Die Datei wurde erfolgreich an Ihre E-Mail-Adresse gesendet.");
      setIsEmailSending(false);
    } catch (error) {
      setIsEmailSending(false);
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
      <h2 className="text-center text-2xl font-semibold mb-8">
        {Helpers.getTranslationValue("files_upload")}
      </h2>
      <div className="flex flex-col items-center px-10">
        <input
          type="file"
          className="form-control mb-4 border border-bgray-300 w-full rounded-lg px-4 py-3.5 placeholder:placeholder:text-base"
          accept="application/pdf"
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
          disabled={Object.values(fileStatuses).some((file) => file.status === "In Progress")}
          className="text-white py-3 px-6 font-bold bg-success-300 hover:bg-success-300 transition-all rounded-lg"
        >
          {Helpers.getTranslationValue("carry_out")} <FontAwesomeIcon icon={faCloudUploadAlt} className="ml-2" />
        </button>
        <button
          onClick={handleSendEmail}
          disabled={isEmailSending}
          className="text-white py-3 px-6 font-bold bg-success-300 hover:bg-success-300 transition-all rounded-lg"
        >
          {Helpers.getTranslationValue(isEmailSending ? 'sending_email' : 'send_email')}
          <FontAwesomeIcon
            icon={isEmailSending ? faSpinner : faEnvelope}
            spin={isEmailSending}
            className="ml-2"
          />
        </button>
      </div>
    </div>
  );
}

export default FileUpload;
