import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Helpers from "../../Config/Helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faStopCircle } from "@fortawesome/free-solid-svg-icons";
import { useHeader } from "../../Components/HeaderContext";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Voice = () => {
  const { setHeaderData } = useHeader();
  const navigate = useNavigate();
  const { listening, resetTranscript, transcript } = useSpeechRecognition();
  const [state, setState] = useState({
    transcriptionText: "",
    transcriptionSummary: "",
    summary: "",
    file: null,
    transcribing: false,
    errorMessage: "",
    summaryError: "",
    isEmailButtonVisible: false,
    isSummaryGenerating: false,
    showSummary: false,
    showTranscriptionSummary: false,
    hasHistory: false,
    isGenerateSummaryBtnVisible: false,
    userTranscript: "",
  });
  
  useEffect(() => {
    setHeaderData({ title: "Voice", desc: "" });
    setState(prevState => ({ ...prevState, hasHistory: window.history.length > 1 }));
  }, [setHeaderData]);

  useEffect(() => {
    setState(prevState => ({ ...prevState, userTranscript: transcript }));
  }, [transcript]);

  const handleTranscribeClick = async () => {
    if (state.file) {
      const formData = new FormData();
      formData.append("audio", state.file);

      try {
        setState(prevState => ({ ...prevState, transcribing: true, errorMessage: "" }));

        const response = await axios.post(
          `${Helpers.apiUrl}transcribe`,
          formData,
          Helpers.authFileHeaders
        );

        if (response.status !== 200) {
          throw new Error(response.message || "Netzwerkantwort war nicht erfolgreich.");
        }

        setState(prevState => ({
          ...prevState,
          transcriptionText: response.data.transcription.results.channels[0].alternatives[0].transcript
        }));
      } catch (error) {
        const errorMessage = error.message || "Fehler beim Transkribieren der Datei.";
        setState(prevState => ({ ...prevState, errorMessage }));
      } finally {
        setState(prevState => ({ ...prevState, transcribing: false }));
      }
    } else {
      setState(prevState => ({ ...prevState, errorMessage: "Bitte wählen Sie zuerst eine Datei aus." }));
    }
  };

  const handleGenerateSummary = async (text, type) => {
    try {
      setState(prevState => ({ ...prevState, isSummaryGenerating: true }));

      const response = await axios.post(
        `${Helpers.apiUrl}generateSummary`,
        { recordedText: text },
        Helpers.authHeaders
      );

      if (response.status !== 200) {
        throw new Error(response.message || "Failed to generate summary.");
      }

      setState(prevState => ({
        ...prevState,
        [type === 'voice' ? 'summary' : 'transcriptionSummary']: response.data.summary,
        [type === 'voice' ? 'showSummary' : 'showTranscriptionSummary']: true,
        isEmailButtonVisible: true,
      }));
    } catch (error) {
      setState(prevState => ({ ...prevState, summaryError: error.message || "Error generating summary." }));
    } finally {
      setState(prevState => ({ ...prevState, isSummaryGenerating: false }));
    }
  };

  const handleFileChange = (event) => setState(prevState => ({ ...prevState, file: event.target.files[0] }));

  const handleNextPageClick = (text, summary) => {
    navigate("/transcription", { state: { text, summary } });
  };

  const handleStartListening = () => {
    setState(prevState => ({ ...prevState, isGenerateSummaryBtnVisible: true }));
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true, language: 'de-DE' });
  };

  const handleTranscriptChange = (e) => {
    setState(prevState => ({ ...prevState, userTranscript: e.target.value }));
  };

  return (
    <section className="bg-white">
      <div className="flex flex-col lg:flex-row justify-between">
        <div className="xl:w-full lg:w-88 px-5 xl:pl-12">
          <div className="max-w-4xl mx-auto pt-10 pb-10">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6">Voice Recording</h2>
              <div className="flex flex-col md:flex-row md:space-x-4 mb-4 space-x-2">
                <Link to="/" className="h-10 px-5 mb-2 transition-colors duration-150 bg-success-300 rounded-lg focus:shadow-outline hover:bg-success-300 flex items-center justify-center w-1/2 md:w-1/2">
                  Werkzeuge
                </Link>
                <Link to="/sent-emails" className="h-10 px-5 mb-2 transition-colors duration-150 bg-success-300 rounded-lg focus:shadow-outline hover:bg-success-300 flex items-center justify-center w-1/2 md:w-1/2">
                  Vorherige Historie
                </Link>
                {state.hasHistory && (
                  <button onClick={() => window.history.forward()} className="h-10 px-5 mb-2 transition-colors duration-150 bg-success-300 rounded-lg focus:shadow-outline hover:bg-success-300 flex items-center justify-center w-1/2 md:w-1/2">
                    Zurück
                  </button>
                )}
              </div>
              <div className="relative mb-4">
                <textarea
                  className="text-base border border-blackgray-600 h-32 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:placeholder:text-base"
                  readOnly={listening}
                  value={state.userTranscript}
                  onChange={handleTranscriptChange}
                  placeholder="Beginnen Sie zu sprechen oder laden Sie Ihre Sprache hoch, um sie hier zu transkribieren."
                />
              </div>
              {state.errorMessage && (
                <div className="text-blue-500 mb-4 text-sm">{state.errorMessage}</div>
              )}
              {state.showSummary && (
                <div className="mb-4">
                  <h5 className="text-lg font-semibold">Zusammenfassung:</h5>
                  <p>{state.summary}</p>
                </div>
              )}
              {!listening && state.isGenerateSummaryBtnVisible && (
                <div className="mb-4 space-x-2">
                  <button
                    onClick={() => handleGenerateSummary(state.userTranscript, 'voice')}
                    className="h-10 px-5 transition-colors duration-150 bg-success-300 rounded-lg focus:shadow-outline hover:bg-success-300"
                    disabled={state.isSummaryGenerating}
                  >
                    {state.isSummaryGenerating ? "Zusammenfassung wird generiert..." : "Zusammenfassung generieren"}
                  </button>
                  {state.isEmailButtonVisible && (
                    <button
                      onClick={() => handleNextPageClick(state.userTranscript, state.summary)}
                      className="h-10 px-5 transition-colors duration-150 bg-success-300 rounded-lg focus:shadow-outline hover:bg-success-300"
                    >
                      Per E-Mail senden
                    </button>
                  )}
                </div>
              )}
              <button
                onClick={listening ? SpeechRecognition.stopListening : handleStartListening}
                className={`h-10 px-5 transition-colors duration-150 bg-success-300 rounded-lg focus:shadow-outline hover:bg-success-300 mt-2 mb-3 ${listening ? "bg-warning-100 hover:bg-warning-300" : "bg-success-300 hover:bg-success-300"}`}
              >
                {listening ? (
                  <span className="flex items-center">
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
              {state.transcribing && (
                <div className="text-gray-600 mt-4">Transcribing...</div>
              )}
              <div className="mb-4">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="text-base border border-blackgray-600 h-14 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-base"
                />
                <button
                  onClick={handleTranscribeClick}
                  className="h-10 px-5 transition-colors duration-150 bg-success-300 rounded-lg focus:shadow-outline hover:bg-success-300 mt-4"
                  disabled={state.transcribing}
                >
                  {state.transcribing ? "Transcribing..." : "Transcribe File"}
                </button>
              </div>
              {state.transcriptionText && (
                <div className="mb-4">
                  <h5 className="text-lg font-semibold">Transcription:</h5>
                  <p>{state.transcriptionText}</p>
                  <button
                    onClick={() => handleGenerateSummary(state.transcriptionText, 'transcription')}
                    className="h-10 px-5 transition-colors duration-150 bg-success-300 rounded-lg focus:shadow-outline hover:bg-success-300"
                    disabled={state.isSummaryGenerating}
                  >
                    {state.isSummaryGenerating ? "Zusammenfassung wird generiert..." : "Zusammenfassung generieren"}
                  </button>
                </div>
              )}
              {state.showTranscriptionSummary && (
                <div className="mb-4">
                  <h5 className="text-lg font-semibold">Zusammenfassung:</h5>
                  <p>{state.transcriptionSummary}</p>
                  <button
                    onClick={() => handleNextPageClick(state.transcriptionText, state.transcriptionSummary)}
                    className="h-10 px-5 transition-colors duration-150 bg-success-300 rounded-lg focus:shadow-outline hover:bg-success-300"
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
