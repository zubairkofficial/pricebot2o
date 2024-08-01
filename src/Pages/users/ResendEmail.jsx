import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import Helpers from "../../Config/Helpers";
import { useHeader } from "../../Components/HeaderContext";

function ResendEmail() {
  const { setHeaderData } = useHeader();
  useEffect(() => {
    setHeaderData({ title: "Resend Email", desc: "" });
  }, [setHeaderData]);
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
          `${Helpers.apiUrl}getemailId/${userId}`,
          Helpers.authHeaders
        );
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
        const response = await axios.get(
          `${Helpers.apiUrl}getData`,
          Helpers.authHeaders
        );
        if (Array.isArray(response.data)) {
          setPartnerNumbers(response.data);
        } else {
          setPartnerNumbers([]); // Ensure partnerNumbers is an array
          console.error("Fetched data is not an array:", response);
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
      const response = await axios.post(
        `${Helpers.apiUrl}sendEmail`,
        {
          email,
          transcriptionText: text,
          summary,
          date,
          theme,
          partnerNumber: partner?.value.number,
          branchManager,
          participants,
          author,
        },
        Helpers.authHeaders
      );
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
    value: {
      number: partner.number,
      name: partner.name,
      street: partner.street,
    },
    label: `${partner.number} / ${partner.name} / ${partner.street}`,
  }));

  const handleChange = (selectedOption) => {
    setPartner(selectedOption);
    setPartnerNumber(selectedOption?.value.number || "");
  };

  const back = () => navigate("/voice");

  return (
    <section className="bg-white p-5">
      <div className="flex flex-col lg:flex-row justify-between lg:px-12 pt-10">
        <div className="xl:w-full lg:w-88 px-5 xl:pl-12 pt-10">
          <div className="max-w-[614px] m-auto pt-10 pb-16">
            <div className="bg-white  p-6 rounded-lg shadow-md">
              <h2 className="text-center text-2xl font-semibold  mb-8">
                Transkriptionsdetails
              </h2>
              <div className="flex flex-col items-center">
                {success ? (
                  <p className="text-center  mb-4">
                    Transkription erfolgreich an {email} gesendet!
                  </p>
                ) : (
                  <form onSubmit={handleSubmit} className="w-full">
                    <div className="mb-4">
                      <label className="">Datum:</label>
                      <input
                        type="date"
                        className=" border border-bgray-300  h-14 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-base"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="">Thema:</label>
                      <input
                        type="text"
                        className=" border border-bgray-300  h-14 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-base"
                        value={theme}
                        onChange={(e) => setTheme(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="">Gesellschafternummer:</label>
                      <Select
                        className=" border border-bgray-300  rounded-lg px-4 py-3.5"
                        value={options.find(
                          (option) => option.value.number === partnerNumber
                        )}
                        onChange={handleChange}
                        options={options}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="">Verfasser:</label>
                      <input
                        type="text"
                        className=" border border-bgray-300  h-14 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-base"
                        value={branchManager}
                        onChange={(e) => setBranchManager(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="">Teilnehmer:</label>
                      <input
                        type="text"
                        className=" border border-bgray-300  h-14 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-base"
                        value={participants}
                        onChange={(e) => setParticipants(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="">Niederlassungsleiter:</label>
                      <input
                        type="text"
                        className=" border border-bgray-300  h-14 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-base"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="">Transkription:</label>
                      <textarea
                        className=" border border-bgray-300  h-36 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-base"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="">Zusammenfassung:</label>
                      <textarea
                        className=" border border-bgray-300  h-36 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-base"
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="">E-Mail:</label>
                      <input
                        type="email"
                        className=" border border-bgray-300  h-14 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-base"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <button
                      type="submit"
                      className="mt-6 py-3.5 flex items-center justify-center  font-bold bg-success-300 hover:bg-success-300 transition-all rounded-lg w-full"
                      disabled={loading}
                    >
                      {loading ? "Senden..." : "Transkription senden"}
                    </button>
                    <button
                      type="button"
                      className="mt-4 py-3.5 flex items-center justify-center bg-gray-300   rounded-lg w-full hover:bg-gray-400 "
                      onClick={back}
                    >
                      Zurück
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResendEmail;
