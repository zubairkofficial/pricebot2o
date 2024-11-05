import React, { useState, useEffect, useRef } from "react";
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
  const { resetTranscript, transcript } = useSpeechRecognition();
  const wsRef = useRef(null);
  const mediaRecorderRef = useRef(null);

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
    summary_id: "",
    isListening: false, // Manual listening state for mobile
  });

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  useEffect(() => {
    setHeaderData({ title: Helpers.getTranslationValue('voice_assistant'), desc: "" });
    setState((prev) => ({ ...prev, hasHistory: window.history.length > 1 }));
  }, [setHeaderData]);

  useEffect(() => {
    setState((prev) => ({ ...prev, userTranscript: transcript }));
  }, [transcript]);

  const handleTranscribeClick = async () => {
    if (!state.file) {
      setState((prev) => ({ ...prev, errorMessage: Helpers.getTranslationValue('select_file_first') }));
      return;
    }

    const formData = new FormData();
    formData.append("audio", state.file);

    try {
      setState((prev) => ({ ...prev, transcribing: true, errorMessage: "" }));
      const response = await axios.post(`${Helpers.apiUrl}transcribe`, formData, Helpers.authFileHeaders);

      if (response.status !== 200) throw new Error(response.message || Helpers.getTranslationValue('voice_assistant_file_upload_error'));

      setState((prev) => ({
        ...prev,
        transcriptionText: response.data.transcription.results.channels[0].alternatives[0].transcript,
        transcribing: false,
      }));
    } catch (error) {
      setState((prev) => ({ ...prev, errorMessage: error.message || Helpers.getTranslationValue('error_transcribing_file'), transcribing: false }));
    }
  };

  const handleGenerateSummary = async (text, type) => {
    try {
      setState((prev) => ({ ...prev, isSummaryGenerating: true }));
      const response = await axios.post(`${Helpers.apiUrl}generateSummary`, { recordedText: text }, Helpers.authHeaders);

      if (response.status !== 200) throw new Error(response.data.message || Helpers.getTranslationValue('fail_to_generate_summary'));

      setState((prev) => ({
        ...prev,
        [type === 'voice' ? 'summary' : 'transcriptionSummary']: response.data.summary,
        summary_id: response.data.summary_id,
        [type === 'voice' ? 'showSummary' : 'showTranscriptionSummary']: true,
        isEmailButtonVisible: true,
        isSummaryGenerating: false,
      }));

      Helpers.toast('success', Helpers.getTranslationValue('summary_generated_successfully'));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        summaryError: error.response?.data?.error || error.message || Helpers.getTranslationValue('fail_to_generate_summary'),
        isSummaryGenerating: false,
      }));
      Helpers.toast('error', error.message);
    }
  };

  const startDeepgramRecognition = async () => {
    if (!window.MediaRecorder) {
      alert("MediaRecorder is not supported on this browser.");
      return;
    }

    try {
      const response = await fetch(`${Helpers.apiUrl}api-keys`, Helpers.authHeaders);

      if (!response.ok) {
        throw new Error("Failed to fetch Deepgram API key");
      }

      const data = await response.json();
      const deepgramApiKey = data.deepgram_key;
      wsRef.current = new WebSocket(`wss://api.deepgram.com/v1/listen?model=nova-2&language=de&numerals=true&punctuate=true`, ["token", deepgramApiKey]);

      wsRef.current.onopen = () => {
        setState((prev) => ({ ...prev, isListening: true }));
        startMediaRecorder();
      };

      wsRef.current.onmessage = (message) => {
        const data = JSON.parse(message.data);
        if (data.channel?.alternatives[0]) {
          setState((prev) => ({
            ...prev,
            transcriptionText: prev.transcriptionText + " " + data.channel.alternatives[0].transcript,
          }));
        }
      };

      wsRef.current.onclose = () => {
        setState((prev) => ({ ...prev, isListening: false }));
        stopMediaRecorder();
      };
      wsRef.current.onerror = () => alert("WebSocket connection failed. Please check your connection.");
    } catch (error) {
      setState((prev) => ({ ...prev, errorMessage: error.message }));
    }
  };

  const startMediaRecorder = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0 && wsRef.current.readyState === WebSocket.OPEN) {
            wsRef.current.send(event.data);
          }
        };
        mediaRecorderRef.current.start(250);
      })
      .catch((err) => alert("Error accessing microphone: " + err.message));
  };

  const stopMediaRecorder = () => {
    if (mediaRecorderRef.current?.state !== "inactive") mediaRecorderRef.current.stop();
  };

  const stopDeepgramRecognition = () => {
    wsRef.current?.close();
    stopMediaRecorder();
    if (state.transcriptionText) {
      setState((prev) => ({ ...prev, isGenerateSummaryBtnVisible: true }));
    }
  };

  const handleFileChange = (e) => setState((prev) => ({ ...prev, file: e.target.files[0] }));

  const handleNextPageClick = (summary_id, text, summary) => {
    navigate("/transcription", { state: { summary_id, text, summary } });
  };

  const handleStartListening = () => {
    setState((prev) => ({ ...prev, isGenerateSummaryBtnVisible: false }));
    resetTranscript();
    if (isMobile) {
      startDeepgramRecognition();
    } else {
      SpeechRecognition.startListening({ continuous: true, language: 'de-DE' });
      setState((prev) => ({ ...prev, isListening: true })); // Set for web listening
    }
  };

  const handleStopListening = () => {
    if (isMobile) {
      stopDeepgramRecognition();
      setState((prev) => ({ ...prev, isListening: false }));
    } else {
      SpeechRecognition.stopListening();
      setState((prev) => ({ ...prev, isListening: false }));
    }
    if (state.transcriptionText || transcript) {
      setState((prev) => ({ ...prev, isGenerateSummaryBtnVisible: true }));
    }
  };

  return (
    <section className="bg-white">
      <div className="flex flex-col lg:flex-row justify-between">
        <div className="xl:w-full lg:w-88 px-5 xl:pl-12">
          <div className="max-w-4xl mx-auto py-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6">{Helpers.getTranslationValue('voice_recording')}</h2>
              <div className="relative mb-4">
                <textarea
                  placeholder={Helpers.getTranslationValue('voice_recording')}
                  className="text-base border border-blackgray-600 h-32 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:placeholder:text-base"
                  readOnly={state.isListening}
                  rows={8}
                  value={state.transcriptionText || state.userTranscript}
                  onChange={(e) => setState((prev) => ({ ...prev, userTranscript: e.target.value }))}
                />
              </div>
              {state.errorMessage && <div className="text-blue-500 mb-4 text-sm">{state.errorMessage}</div>}
              {state.showSummary && (
                <div className="mb-4">
                  <h5 className="text-lg font-semibold">{Helpers.getTranslationValue('summary')}:</h5>
                  <p>{state.summary}</p>
                </div>
              )}
              {!state.isListening && state.isGenerateSummaryBtnVisible && (
                <div className="mb-4 space-x-2">
                  <button
                    onClick={() => handleGenerateSummary(state.transcriptionText || state.userTranscript, 'voice')}
                    className="h-12 px-5 text-white transition-colors duration-150 bg-success-300 rounded-lg focus:shadow-outline hover:bg-success-300"
                    disabled={state.isSummaryGenerating}
                  >
                    {Helpers.getTranslationValue(state.isSummaryGenerating ? 'generateing_summary' : "generate_summary")}
                  </button>
                  {state.isEmailButtonVisible && (
                    <button
                      onClick={() => handleNextPageClick(state.summary_id, state.userTranscript, state.summary)}
                      className="h-10 px-5 text-white transition-colors duration-150 bg-success-300 rounded-lg focus:shadow-outline hover:bg-success-300"
                    >
                      {Helpers.getTranslationValue('send_via_email')}
                    </button>
                  )}
                </div>
              )}
              <button
                onClick={state.isListening ? handleStopListening : handleStartListening}
                className={`h-10 px-5 transition-colors text-white duration-150 bg-success-300 rounded-lg focus:shadow-outline hover:bg-success-300 mt-2 mb-3 ${state.isListening ? "bg-warning-100 hover:bg-warning-300" : "bg-success-300 hover:bg-success-300"}`}
              >
                {state.isListening ? (
                  <span className="flex items-center">
                    <FontAwesomeIcon icon={faStopCircle} className="mr-2" />
                    {Helpers.getTranslationValue('stop')}
                  </span>
                ) : (
                  <span className="flex items-center">
                    <FontAwesomeIcon icon={faMicrophone} className="mr-2" />
                    {Helpers.getTranslationValue('record')}
                  </span>
                )}
              </button>
              <div className="mb-4">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="text-base border border-blackgray-600 h-14 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-base"
                />
                <button
                  onClick={handleTranscribeClick}
                  className="h-10 px-5 transition-colors text-white duration-150 bg-success-300 rounded-lg focus:shadow-outline hover:bg-success-300 mt-4"
                  disabled={state.transcribing}
                >
                  {Helpers.getTranslationValue(state.transcribing ? "transcribe..." : "transcribe_file")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Voice;
