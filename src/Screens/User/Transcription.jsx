import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import Helpers from "../../Config/Helpers";
import { useHeader } from "../../Components/HeaderContext";

function Transcription() {

  const { setHeaderData } = useHeader();
  useEffect(() => {
    setHeaderData({ title: "Transkription", desc: "" });
  }, [setHeaderData]);

  const location = useLocation();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [date, setDate] = useState("");
  const [theme, setTheme] = useState("");
  // const [branchManager, setBranchManager] = useState("");
  const [participants, setParticipants] = useState("");
  const [author, setAuthor] = useState("");
  // const [partnerNumbers, setPartnerNumbers] = useState([]);
  // const [partnerNumber, setPartnerNumber] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state) {
      setEmail(location.state.email || "");
      setText(location.state.text || ""); 
      setSummary(location.state.summary || "");
    }
  }, [location.state]);

  // useEffect(() => {
  //   const fetchPartnerNumbers = async () => {
  //     try {
  //       const response = await axios.get(`${Helpers.apiUrl}getData`, Helpers.authHeaders);
  //       setPartnerNumbers(response.data);
  //     } catch (error) {
  //       Helpers.toast('error', error.message);
  //     }
  //   };

  //   fetchPartnerNumbers();
  // }, []);

  useEffect(() => {
    const fetchLatestNumber = async () => {
      try {
        const response = await axios.get(
          `${Helpers.apiUrl}getLatestNumber`, Helpers.authHeaders
        );

        const data = response.data ?? {};
        // const number = data.number ?? '';
        const dateStr = data.Datum ?? '';
        const theme = data.Thema ?? '';
        const author = data.BM ?? '';
        const branchManager = data.Niederlassungsleiter ?? '';
        const participants = data.Teilnehmer ?? '';

        // setPartnerNumber(number);

        let parsedDate = '';
        if (dateStr) {
          const parts = dateStr.split("-");
          if (parts.length === 3) {
            parsedDate = `20${parts[2]}-${parts[1]}-${parts[0]}`;
          }
        }
        setDate(parsedDate);

        setTheme(theme);
        setAuthor(author);
        // setBranchManager(branchManager);
        setParticipants(participants);

      } catch (error) {
        console.log(error);
        Helpers.toast('error', error.message);
      }
    };

    fetchLatestNumber();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${Helpers.apiUrl}sendEmail`, {
        email,
        transcriptionText: text,
        summary,
        date,
        theme,
        // partnerNumber,
        // branchManager,
        participants,
        author,
      }, Helpers.authHeaders
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

  // const options = partnerNumbers.map((partner) => ({
  //   value: { number: partner.number, name: partner.name, street: partner.street },
  //   label: `${partner.number} / ${partner.name} / ${partner.street}`,
  // }));

  // const handleChange = (selectedOption) => {
    // setPartnerNumber(selectedOption);
  // };

  return (
    <section className="bg-white p-5">
      <div className="flex flex-col lg:flex-row justify-between lg:px-12">
        <div className="xl:w-full lg:w-88 px-5 xl:pl-12">
          <div className="max-w-[614px] m-auto py-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
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
                    {/* <div className="mb-4">
                      <label className="">Gesellschafternummer:</label>
                      <Select
                        className=" border border-bgray-300  rounded-lg px-4 py-3.5"
                        value={options.find(
                          (option) => option.value.number === partnerNumber
                        )}
                        onChange={handleChange}
                        options={options}
                      />
                    </div> */}
                    <div className="mb-4">
                      <label className="">Verfasser:</label>
                      <input
                        type="text"
                        className=" border border-bgray-300  h-14 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-base"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
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
                    {/* <div className="mb-4">
                      <label className="">Niederlassungsleiter:</label>
                      <input
                        type="text"
                        className=" border border-bgray-300  h-14 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-base"
                        value={branchManager}
                        onChange={(e) => setBranchManager(e.target.value)}
                      />
                    </div> */}
                    <div className="mb-4">
                      <label className="">Transkription:</label>
                      <textarea
                        className=" border border-bgray-300 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-base"
                        rows={8}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="">Zusammenfassung:</label>
                      <textarea
                        className=" border border-bgray-300 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-base"
                        rows={8}
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
                      className="mt-6 py-3.5 flex items-center justify-center text-white font-bold bg-success-300 hover:bg-success-300 transition-all rounded-lg w-full"
                      disabled={loading}
                    >
                      {loading ? "Senden..." : "Transkription senden"}
                    </button>
                    <button
                      type="button"
                      className="mt-4 py-3.5 flex items-center justify-center bg-gray-300  rounded-lg w-full hover:bg-gray-400 hover:bg-white-300"
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

export default Transcription;
