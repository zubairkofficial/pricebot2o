import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Helpers from "../../Config/Helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faStopCircle } from "@fortawesome/free-solid-svg-icons";
import { useHeader } from "../../Components/HeaderContext";

const Voice = () => {
  const { setHeaderData } = useHeader();
  useEffect(() => {
    setHeaderData({ title: "Voice", desc: "" });
  }, [setHeaderData]);

  const [isListening, setIsListening] = useState(false);
  const [listeningText, setListeningText] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [transcriptionText, setTranscriptionText] = useState("");
  const [transcriptionSummary, setTranscriptionSummary] = useState("");
  const [summary, setSummary] = useState("");
  const [file, setFile] = useState(null);
  const [transcribing, setTranscribing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [summaryError, setSummaryError] = useState("");
  const [isEmailButtonVisible, setIsEmailButtonVisible] = useState(false);
  const [isGenerateSummaryButtonVisible, setIsGenerateSummaryButtonVisible] =
    useState(false);
  const [isSummaryGenerating, setIsSummaryGenerating] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showTranscriptionSummary, setShowTranscriptionSummary] =
    useState(false);
  const [hasHistory, setHasHistory] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setHasHistory(window.history.length > 1);
  }, []);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = "de-DE";
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = () =>
        console.log("Spracherkennung aktiviert. Bitte sprechen.");

      recognition.onresult = (event) => {
        let interimTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            setListeningText(
              (prevText) => prevText + event.results[i][0].transcript
            );
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        setInterimTranscript(interimTranscript);
      };

      recognition.onerror = (event) =>
        console.error("Fehler bei der Erkennung:", event.error);

      if (isListening) {
        recognition.start();
      } else {
        recognition.stop();
      }

      return () => recognition.stop();
    }
  }, [isListening]);

  const handleTranscribeClick = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("audio", file);

      try {
        setTranscribing(true);
        setErrorMessage("");

        const response = await axios.post(
          `${Helpers.apiUrl}transcribe`,
          formData,
          Helpers.authFileHeaders
        );

        if (response.status !== 200) {
          throw new Error(
            response.message || "Netzwerkantwort war nicht erfolgreich."
          );
        }

        setTranscriptionText(
          response.data.transcription.results.channels[0].alternatives[0]
            .transcript
        );
        setIsGenerateSummaryButtonVisible(true);
      } catch (error) {
        console.error("Fehler beim Transkribieren der Datei:", error);

        let errorMessage = "Fehler beim Transkribieren der Datei.";
        try {
          const errorJson = JSON.parse(error.message);
          if (errorJson.error) {
            errorMessage = errorJson.error;
          }
        } catch (jsonError) {
          errorMessage = error.message || errorMessage;
        }

        setErrorMessage(errorMessage);
      } finally {
        setTranscribing(false);
      }
    } else {
      setErrorMessage("Bitte wählen Sie zuerst eine Datei aus.");
    }
  };

  const handleGenerateSummaryVoice = async () => {
    try {
      setIsSummaryGenerating(true);

      const response = await axios.post(
        `${Helpers.apiUrl}generateSummary`,
        {
          recordedText: listeningText,
        },
        Helpers.authHeaders
      );

      if (response.status !== 200) {
        throw new Error(response.message || "Failed to generate summary.");
      }

      setSummary(response.data.summary);
      setShowSummary(true);
      setIsEmailButtonVisible(true);
    } catch (error) {
      console.error("Error generating summary:", error);
      setSummaryError(error.message || "Error generating summary.");
    } finally {
      setIsSummaryGenerating(false);
    }
  };

  const handleGenerateSummaryTranscription = async () => {
    try {
      setIsSummaryGenerating(true);

      const response = await axios.post(
        `${Helpers.apiUrl}generateSummary`,
        {
          recordedText: transcriptionText,
        },
        Helpers.authHeaders
      );

      if (response.status !== 200) {
        throw new Error(response.message || "Failed to generate summary.");
      }

      setTranscriptionSummary(response.data.summary);
      setShowTranscriptionSummary(true);
      setIsEmailButtonVisible(true);
    } catch (error) {
      console.error("Error generating summary:", error);
      setSummaryError(error.message || "Error generating summary.");
    } finally {
      setIsSummaryGenerating(false);
    }
  };

  const handleFileChange = (event) => setFile(event.target.files[0]);

  const handleNextPageClickTranscription = () => {
    navigate("/transcription", {
      state: {
        text: transcriptionText,
        summary: transcriptionSummary,
      },
    });
  };

  const handleNextPageClickListening = () => {
    navigate("/transcription", {
      state: {
        text: listeningText,
        summary: summary,
      },
    });
  };

  const handleStopListening = () => {
    setIsListening(false);
    setIsGenerateSummaryButtonVisible(true);
  };

  const forword = () => {
    window.history.forward();
  };

  return (
    <section className="bg-white ">
      <div className="flex flex-col lg:flex-row justify-between">
        <div className="xl:w-full lg:w-88 px-5 xl:pl-12 pt-10">
          <div className="max-w-4xl mx-auto pt-24 pb-16">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold  mb-6">Voice Recording</h2>
              <div className="flex flex-col md:flex-row md:space-x-4 mb-4 space-x-2">
                <Link
                  to={"/"}
                  className="h-10 px-5 mb-2  transition-colors duration-150 bg-success-300 rounded-lg focus:shadow-outline hover:bg-success-300 flex items-center justify-center w-1/2 md:w-1/2"
                >
                  Werkzeuge
                </Link>
                <Link
                  to={"/sent-emails"}
                  className="h-10 px-5 mb-2  transition-colors duration-150 bg-success-300 rounded-lg focus:shadow-outline hover:bg-success-300 flex items-center justify-center w-1/2 md:w-1/2"
                >
                  Vorherige Historie
                </Link>
                {hasHistory && (
                  <button
                    onClick={forword}
                    className="h-10 px-5 mb-2  transition-colors duration-150 bg-success-300 rounded-lg focus:shadow-outline hover:bg-success-300 flex items-center justify-center w-1/2 md:w-1/2"
                  >
                    Zurück
                  </button>
                )}
              </div>
              <div className="relative mb-4">
                <textarea
                  className=" text-base border border-blackgray-600  h-32 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:placeholder:text-base"
                  readOnly={isListening}
                  value={listeningText + interimTranscript}
                  onChange={(e) => setListeningText(e.target.value)}
                  placeholder="Beginnen Sie zu sprechen oder laden Sie Ihre Sprache hoch, um sie hier zu transkribieren."
                />
              </div>

              {summaryError && (
                <div className="text-red-500 mb-4 text-sm">{summaryError}</div>
              )}

              {showSummary && (
                <div className="mb-4">
                  <h5 className="text-lg font-semibold ">Zusammenfassung:</h5>
                  <p className="">{summary}</p>
                </div>
              )}

              {!isListening && isGenerateSummaryButtonVisible && (
                <div className="mb-4">
                  <button
                    onClick={handleGenerateSummaryVoice}
                    className="h-10 px-5  transition-colors duration-150 bg-success-300 rounded-lg focus:shadow-outline hover:bg-success-300"
                    disabled={isSummaryGenerating}
                  >
                    {isSummaryGenerating
                      ? "Zusammenfassung wird generiert..."
                      : "Zusammenfassung generieren"}
                  </button>
                  {isEmailButtonVisible && (
                    <button
                      onClick={handleNextPageClickListening}
                      className="h-10 px-5  transition-colors duration-150 bg-success-300 rounded-lg focus:shadow-outline hover:bg-success-300"
                    >
                      Per E-Mail senden
                    </button>
                  )}
                </div>
              )}

              <button
                disabled={isSummaryGenerating}
                onClick={() => {
                  if (isListening) {
                    handleStopListening();
                  } else {
                    setIsListening(true);
                    setIsEmailButtonVisible(false);
                    setIsGenerateSummaryButtonVisible(false);
                    setShowSummary(false);
                  }
                }}
                className={`h-10 px-5  transition-colors duration-150 bg-success-300 rounded-lg focus:shadow-outline hover:bg-success-300${isListening
                    ? "bg-warning-100 hover:bg-warning-300"
                    : "bg-success-300 hover:bg-success-300"
                  } mt-2 mb-3`}
              >
                {isListening ? (
                  <span className="flex items-center">
                    {" "}
                    <FontAwesomeIcon icon={faStopCircle} className="mr-2" />
                    Stop
                  </span>
                ) : (
                  <span className="flex items-center">
                    <FontAwesomeIcon icon={faMicrophone} className="mr-2" />
                    Record
                  </span>
                )}
              </button>

              {transcribing && (
                <div className="text-gray-600 mt-4">Transcribing...</div>
              )}

              {errorMessage && (
                <div className="text-red-500 mt-4">{errorMessage}</div>
              )}

              <div className="mb-4">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className=" text-base border border-blackgray-600  h-14 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder: placeholder:text-base"
                />
                <button
                  onClick={handleTranscribeClick}
                  className="h-10 px-5  transition-colors duration-150 bg-success-300 rounded-lg focus:shadow-outline hover:bg-success-300 mt-4"
                  disabled={transcribing}
                >
                  {transcribing ? "Transcribing..." : "Transcribe File"}
                </button>
              </div>

              {transcriptionText && (
                <div className="mb-4">
                  <h5 className="text-lg font-semibold  ">Transcription:</h5>
                  <p className=" ">{transcriptionText}</p>
                  <button
                    onClick={handleGenerateSummaryTranscription}
                    className="h-10 px-5  transition-colors duration-150 bg-success-300 rounded-lg focus:shadow-outline hover:bg-success-300
"
                    disabled={isSummaryGenerating}
                  >
                    {isSummaryGenerating
                      ? "Zusammenfassung wird generiert..."
                      : "Zusammenfassung generieren"}
                  </button>
                </div>
              )}

              {showTranscriptionSummary && (
                <div className="mb-4">
                  <h5 className="text-lg font-semibold ">Zusammenfassung:</h5>
                  <p className="">{transcriptionSummary}</p>
                  <button
                    onClick={handleNextPageClickTranscription}
                    className="h-10 px-5  transition-colors duration-150 bg-success-300 rounded-lg focus:shadow-outline hover:bg-success-300
"
                  >
                    Per E-Mail senden
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Voice;
