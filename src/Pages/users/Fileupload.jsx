import React, { useState, useRef } from "react";
import { Container, Row, Col, Button, ListGroup } from "react-bootstrap";
import Helpers from "../../Config/Helpers";

function FileUpload() {
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
        const response = await fetch(`${Helpers.apiUrl}uploadFile`, {
          method: "POST",
          body: formData,
        });

        const responseData = await response.json();
        if (response.ok) {
          Helpers.toast("success", "Datei erfolgreich hochgeladen.");
          newFileResponses[file.name] = { status: "Success", data: responseData.data }; // Focus only on data field
        } else {
          throw new Error(responseData.message || "Fehler beim Hochladen der Datei");
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
      // Convert value to a string if it's an object or array
      <p key={index}>{`${key}: ${typeof value === 'object' ? JSON.stringify(value, null, 2) : value}`}</p>
    ));
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4 text-white">Daten hochladen</h2>
      <Row className="justify-content-center">
        <Col md={2}></Col>
        <Col md={10} className="mt-5">
          <div className="mb-3">
            <input
              type="file"
              className="form-control mb-2"
              style={{ backgroundColor: "#343a40", color: "#fff" }}
              accept="application/pdf"
              required
              multiple
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <Button
              variant="primary"
              className="text-white text-center mt-2"
              onClick={handleFileUpload}
              disabled={uploading}
              style={{ width: '15%' }}
            >
              {uploading ? "Hochladen..." : "Hochladen"}
            </Button>
          </div>
          <ListGroup className="mt-4">
            {selectedFiles.map((file, index) => (
              <ListGroup.Item key={index} style={{ backgroundColor: "#343a40", color: "#fff" }}>
                {file.name} ({file.size} bytes)
                {fileResponses[file.name] && (
                  <div style={{ marginTop: '10px' }}>
                    
                    {fileResponses[file.name].data && formatDataAsPlainText(fileResponses[file.name].data)}
                  </div>
                )}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default FileUpload;
