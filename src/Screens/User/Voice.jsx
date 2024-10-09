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
    summary_id: "",
  });

  useEffect(() => {
    setHeaderData({ title: Helpers.getTranslationValue('voice_assistant'), desc: "" });
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
          throw new Error(response.message || Helpers.getTranslationValue('voice_assistant_file_upload_error'));
        }

        setState(prevState => ({
          ...prevState,
          transcriptionText: response.data.transcription.results.channels[0].alternatives[0].transcript
        }));
      } catch (error) {
        const errorMessage = error.message || Helpers.getTranslationValue('error_transcribing_file');
        setState(prevState => ({ ...prevState, errorMessage }));
      } finally {
        setState(prevState => ({ ...prevState, transcribing: false }));
      }
    } else {
      setState(prevState => ({ ...prevState, errorMessage: Helpers.getTranslationValue('select_file_first') }));
    }
  };

  const handleGenerateSummary = async (text, type) => {
    try {
      // Set loading state before starting the request
      setState(prevState => ({ ...prevState, isSummaryGenerating: true }));
  
      // Make the API request to generate the summary
      const response = await axios.post(
        `${Helpers.apiUrl}generateSummary`,
        { recordedText: text },
        Helpers.authHeaders
      );
  
      // Handle non-200 status responses
      if (response.status !== 200) {
        throw new Error(response.data.message || Helpers.getTranslationValue('fail_to_generate_summary'));
      }
  
      // Update the state based on the response
      setState(prevState => ({
        ...prevState,
        [type === 'voice' ? 'summary' : 'transcriptionSummary']: response.data.summary,
        [type === 'voice' ? 'summary_id' : 'summary_id']: response.data.summary_id,
        [type === 'voice' ? 'showSummary' : 'showTranscriptionSummary']: true,
        isEmailButtonVisible: true,
      }));
  
      // Show success toast notification
      Helpers.toast('success', Helpers.getTranslationValue('summary_generated_successfully'));
  
    } catch (error) {
      // Capture error message from the response if available
      const errorMessage = error.response?.data?.error || error.message || Helpers.getTranslationValue('fail_to_generate_summary');
  
      // Update the state with the error message
      setState(prevState => ({ ...prevState, summaryError: errorMessage }));
  
      // Show error toast notification
      Helpers.toast('error', errorMessage);
  
    } finally {
      // Reset the loading state
      setState(prevState => ({ ...prevState, isSummaryGenerating: false }));
    }
  };
  
  

  const handleFileChange = (event) => setState(prevState => ({ ...prevState, file: event.target.files[0] }));

  const handleNextPageClick = (summary_id ,text, summary) => {
    navigate("/transcription", { state: { summary_id, text, summary } });
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
          <div className="max-w-4xl mx-auto py-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6">{Helpers.getTranslationValue('voice_recording')}</h2>

              <div className="relative mb-4">
                <textarea
                  placeholder={Helpers.getTranslationValue('voice_recording')}
                  className="text-base border border-blackgray-600 h-32 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:placeholder:text-base"
                  readOnly={listening}
                  rows={8}
                  value={state.userTranscript}
                  onChange={handleTranscriptChange}
                />
              </div>
              {state.errorMessage && (
                <div className="text-blue-500 mb-4 text-sm">{state.errorMessage}</div>
              )}
              {state.showSummary && (
                <div className="mb-4">
                  <h5 className="text-lg font-semibold">{Helpers.getTranslationValue('summary')}:</h5>
                  <p>{state.summary}</p>
               
                </div>
              )}
              {!listening && state.isGenerateSummaryBtnVisible && (
                <div className="mb-4 space-x-2">
                  <button
                    onClick={() => handleGenerateSummary(state.userTranscript, 'voice')}
                    className="h-12 px-5 text-white  transition-colors duration-150 bg-success-300 rounded-lg focus:shadow-outline hover:bg-success-300"
                    disabled={state.isSummaryGenerating}
                  >
                    {Helpers.getTranslationValue(state.isSummaryGenerating ? 'generateing_summary' : "generate_summary")}
                  </button>
                  {state.isEmailButtonVisible && (
                    <button
                      onClick={() => handleNextPageClick(state.summary_id,state.userTranscript, state.summary)}
                      className="h-10 px-5 text-white  transition-colors duration-150 bg-success-300 rounded-lg focus:shadow-outline hover:bg-success-300"
                    >
                      {Helpers.getTranslationValue('send_via_email')}
                    </button>
                  )}
                </div>
              )}
              <button
                onClick={listening ? SpeechRecognition.stopListening : handleStartListening}
                className={`h-10 px-5 transition-colors text-white  duration-150 bg-success-300 rounded-lg focus:shadow-outline hover:bg-success-300 mt-2 mb-3 ${listening ? "bg-warning-100 hover:bg-warning-300" : "bg-success-300 hover:bg-success-300"}`}
              >
                {listening ? (
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
              {state.transcribing && (
                <div className="text-gray-600 mt-4">{Helpers.getTranslationValue('transcribe...')}</div>
              )}
              <div className="mb-4">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="text-base border border-blackgray-600 h-14 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-base"
                />
                <button
                  onClick={handleTranscribeClick}
                  className="h-10 px-5 transition-colors text-white  duration-150 bg-success-300 rounded-lg focus:shadow-outline hover:bg-success-300 mt-4"
                  disabled={state.transcribing}
                >
                  {Helpers.getTranslationValue(state.transcribing ? "transcribe..." : "transcribe_file")}
                </button>
              </div>
              {state.transcriptionText && (
                <div className="mb-4">
                  <h5 className="text-lg font-semibold">{Helpers.getTranslationValue('transcription')}:</h5>
                  <p>{state.transcriptionText}</p>
                  <button
                    onClick={() => handleGenerateSummary(state.transcriptionText, 'transcription')}
                    className="h-10 px-5 transition-colors text-white  duration-150 bg-success-300 rounded-lg focus:shadow-outline hover:bg-success-300"
                    disabled={state.isSummaryGenerating}
                  >
                    {Helpers.getTranslationValue(state.isSummaryGenerating ? 'generateing_summary' : "generate_summary")}
                  </button>
                </div>
              )}
              {state.showTranscriptionSummary && (
                <div className="mb-4">
                  <h5 className="text-lg font-semibold">{Helpers.getTranslationValue('summary')}:</h5>
                  <p>{state.transcriptionSummary}</p>
                  <button
                    onClick={() => handleNextPageClick(state.summary_id, state.transcriptionText, state.transcriptionSummary)}
                    className="h-10 px-5 transition-colors text-white  duration-150 bg-success-300 rounded-lg focus:shadow-outline hover:bg-success-300"
                  >
                    {Helpers.getTranslationValue('send_via_email')}
                  </button>
                </div>
              )}
              <div className="flex flex-col md:flex-row md:space-x-4 mb-4 gap-2 mt-8">
                <Link to="/sent-emails" className="text-white h-10 px-5 mb-2 transition-colors duration-150 bg-success-300 rounded-lg focus:shadow-outline hover:bg-success-300 flex items-center justify-center w-1/3 md:w-1/3">
                  {Helpers.getTranslationValue('emails_sent')}
                </Link>
                {state.hasHistory && (
                  <button onClick={() => window.history.forward()} className="text-white  h-10 px-5 mb-2 transition-colors duration-150 bg-success-300 rounded-lg focus:shadow-outline hover:bg-success-300 flex items-center justify-center w-1/3 md:w-1/3">
                    {Helpers.getTranslationValue('previous_history')}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Voice;
