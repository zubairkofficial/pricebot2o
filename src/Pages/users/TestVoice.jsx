import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const TestVoice = () => {

  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const listenContinuously = () => SpeechRecognition.startListening({ continuous: true, language: 'en-GB' })

  return (
    <div>
      <h1>Microphone: {listening ? 'on' : 'off'}</h1>
      <button style={{ margin: "10px", padding: "10px" }} onClick={listenContinuously}>Listen continuously</button>
      <button style={{ margin: "10px", padding: "10px" }} onClick={SpeechRecognition.stopListening}>Stop</button>
      <button style={{ margin: "10px", padding: "10px" }} onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </div>
  )
}

export default TestVoice;