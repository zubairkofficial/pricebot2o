import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import Helpers from "../../Config/Helpers";

function ResendEmail() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [date, setDate] = useState("");
  const [theme, setTheme] = useState("");
  const [partner, setPartner] = useState(null);
  const [branchManager, setBranchManager] = useState("");
  const [participants, setParticipants] = useState("");
  const [author, setAuthor] = useState("");
  const [partnerNumbers, setPartnerNumbers] = useState([]);
  const [partnerNumber, setPartnerNumber] = useState(""); 
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    const fetchEmail = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${Helpers.apiUrl}getemailId/${userId}`
        );
        console.log(response.data);
        const emailData = response.data.emails[0];
        setName(emailData.name || "");
        setTitle(emailData.title || "");
        setEmail(emailData.email || "");
        setText(emailData.transcriptionText || "");
        setSummary(emailData.summary || "");
        setDate(emailData.date || "");
        setTheme(emailData.theme || "");
        setPartnerNumber(emailData.partnerNumber || ""); // Ensure this is a string
        setBranchManager(emailData.branchManager || "");
        setParticipants(emailData.participants || "");
        setAuthor(emailData.author || "");
        setError("");
        setSuccess("");
      } catch (err) {
        setError("Fehler beim Abrufen der E-Mail-Daten");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchEmail();
    }
  }, [userId]);

  useEffect(() => {
    const fetchPartnerNumbers = async () => {
      try {
        const response = await fetch(`${Helpers.apiUrl}getData`);
        const data = await response.json();
        if (Array.isArray(data.data)) {
          setPartnerNumbers(data.data);
        } else {
          setPartnerNumbers([]); // Ensure partnerNumbers is an array
          console.error("Fetched data is not an array:", data);
        }
      } catch (error) {
        setError(error.message);
        setPartnerNumbers([]); // Ensure partnerNumbers is an array in case of error
        console.error("Error fetching partner numbers:", error);
      }
    };

    fetchPartnerNumbers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        const response = await axios.post(`${Helpers.apiUrl}sendEmail`, {
        email,
        transcriptionText: text,
        summary,
        date,
        theme,
        partnerNumber: partner?.value.number, 
        branchManager,
        participants,
        author,
      });
      console.log(response);
      setSuccess("Transkription erfolgreich gesendet!");
      setError("");
    } catch (err) {
      setError("Senden der Transkription fehlgeschlagen");
      setSuccess("");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const options = partnerNumbers.map((partner) => ({
    value: { number: partner.number, name: partner.name, street: partner.street },
    label: `${partner.number} / ${partner.name} / ${partner.street}`,
  }));

  const handleChange = (selectedOption) => {
    setPartner(selectedOption);
    setPartnerNumber(selectedOption?.value.number || ""); 
  };

  const back = () => navigate("/voice");

  return (
    <div className="container mt-3">
      <div className="row justify-content-center">
        <div className="col-md-2 col-2"></div>
        <div className="col-md-7 col-10">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Transkriptionsdetails</h2>
              {success ? (
                <p className="text-center">
                  Transkription erfolgreich an {email} gesendet!
                </p>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Datum:</label>
                    <input
                      type="date"
                      className="form-control"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Thema:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={theme}
                      onChange={(e) => setTheme(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Gesellschafternummer:</label>
                    <Select
                      className="form-control"
                      value={options.find(option => option.value.number === partnerNumber)}
                      onChange={handleChange}
                      options={options}
                    />
                  </div>
                  <div className="form-group">
                    <label>Niederlassungsleiter:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={branchManager}
                      onChange={(e) => setBranchManager(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Teilnehmer:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={participants}
                      onChange={(e) => setParticipants(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Verfasser:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      E-Mail:
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="transcription" className="form-label">
                      Transkriptionstext:
                    </label>
                    <textarea
                      id="transcription"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      className="form-control"
                      rows={10}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="summary" className="form-label">
                      Zusammenfassung:
                    </label>
                    <textarea
                      id="summary"
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                      className="form-control"
                      rows={10}
                    />
                  </div>
                  <div className="d-flex justify-content-start">
                  <button
                    type="submit"
                      className="button text-white btn-primary mb-3 mb-sm-0"
                      style={{ marginRight: '10px', width: "30%" }}
                    disabled={loading}
                  >
                    {loading ? "Bitte warten..." : "Transkription senden"}
                  </button>
                    <button
                      className="button text-white btn-danger mb-3 mb-sm-0"
                      style={{ width: "30%" }}
                      onClick={back}
                    >
                    Abbrechen
                  </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResendEmail;
