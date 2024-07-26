import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import Helpers from "../../Config/Helpers";

function Transcription() {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [combinedText, setCombinedText] = useState("");
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [date, setDate] = useState("");
  const [theme, setTheme] = useState("");
  const [partner, setPartner] = useState(null); // For selected partner
  const [branchManager, setBranchManager] = useState("");
  const [participants, setParticipants] = useState("");
  const [author, setAuthor] = useState("");
  const [partnerNumbers, setPartnerNumbers] = useState([]);
  const [partnerNumber, setPartnerNumber] = useState(""); // Previous default value number
  const navigate = useNavigate();

  // Initialize form fields with values from location state
  useEffect(() => {
    if (location.state) {
      setEmail(location.state.email || "");
      setText(location.state.text || "");
      setSummary(location.state.summary || "");
    }
  }, [location.state]);

  // Combine text and summary into one field
  useEffect(() => {
    setCombinedText(`${text}\n\nZusammenfassung:\n${summary}`);
  }, [text, summary]);

  // Fetch partner numbers when the component mounts
  useEffect(() => {
    const fetchPartnerNumbers = async () => {
      try {
        const response = await axios.get(`${Helpers.apiUrl}getData`, Helpers.authHeaders);
        setPartnerNumbers(response.data.data);
      } catch (error) {
        Helpers.toast('error', error.message);
      }
    };

    fetchPartnerNumbers();
  }, []);

  useEffect(() => {
    const fetchLatestNumber = async () => {
      try {
        const response = await axios.get(
          `${Helpers.apiUrl}getLatestNumber`,Helpers.authHeaders
        );
        setPartnerNumber(response.data.number);
        // Convert the date format from "DD-MM-YY" to "YYYY-MM-DD"
        const parts = response.data?.Datum?.split("-");
        const parsedDate = `20${parts[2]}-${parts[1]}-${parts[0]}`;
        setDate(parsedDate); // Set the date
        setTheme(response.data?.Thema); // Set the theme
        setAuthor(response.data?.BM); // Set the theme
        setBranchManager(response.data?.Niederlassungsleiter); // Set the theme
        setParticipants(response.data?.Teilnehmer); // Set the participants
        // console.log(response.data?.Teilnehmer); // Ensure Teilnehmer data is received
      } catch (error) {
        console.log(error)
        Helpers.toast('error', error.message);
      }
    };

    fetchLatestNumber();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${Helpers.apiUrl}sendEmail`,{
          email,
          transcriptionText: text,
          summary,
          date,
          theme,
          partnerNumber,
          branchManager,
          participants,
          author,
        }
      );

      setSuccess(true);
      navigate("/");
    } catch (error) {
      Helpers.toast('error', error.message);
    }
    setLoading(false);
  };

  const back = () => {
    window.history.back();
  };

  const options = partnerNumbers.map((partner) => ({
    value: { number: partner.number, name: partner.name, street: partner.street },
    label: `${partner.number} / ${partner.name} / ${partner.street}`,
  }));

  const handleChange = (selectedOption) => {
    setPartner(selectedOption);
  };

  return (
    <div className="container mt-3">
      <div className="row justify-content-center">
        <div className="col-md-2"></div>
        <div className="col-md-7">
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
                      value={options.find(
                        (option) => option.value.number === partnerNumber
                      )}
                      onChange={handleChange}
                      options={options}
                    />
                  </div>
                  <div className="form-group">
                    <label>Verfasser:</label>
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
                    <label>Niederlassungsleiter:</label>
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
                      value={combinedText}
                      onChange={(e) => setCombinedText(e.target.value)}
                      className="form-control"
                      rows={10}
                    />
                  </div>
                  <button
                    type="submit"
                    className="button btn-primary mt-4"
                    disabled={loading}
                  >
                    {loading ? "Bitte warten..." : "Transkription senden"}
                  </button>
                  <button className="button btn-danger ms-2 mt-4" onClick={back}>
                    Abbrechen
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transcription;
