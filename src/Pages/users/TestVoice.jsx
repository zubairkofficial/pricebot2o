import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const TestVoice = () => {
  
  const {
    transcript,
    listening,
    resetTranscript
  } = useSpeechRecognition();
    const listenContinuously = () => SpeechRecognition.startListening({
      continuous: true,
      language: 'en-GB'
    })
    const listenOnce = () => SpeechRecognition.startListening({ continuous: false })
  
    return (
      <div>
        <h1>Microphone: {listening ? 'on' : 'off'}</h1>
        <button style={{margin:"10px",padding:"10px"}} onClick={listenOnce}>Listen once</button>
        <button style={{margin:"10px", padding:"10px"}}  onClick={listenContinuously}>Listen continuously</button>
        <button style={{margin:"10px", padding:"10px"}}  onClick={SpeechRecognition.stopListening}>Stop</button>
        <button style={{margin:"10px", padding:"10px"}}  onClick={resetTranscript}>Reset</button>
        <p>{transcript}</p>
      </div>
    )
  }
  
export default TestVoice;
// const TestVoice = () => {
//   const {
//     transcript,
//     listening,
//     resetTranscript,
//     browserSupportsSpeechRecognition
//   } = useSpeechRecognition();

//   if (!browserSupportsSpeechRecognition) {
//     return <span>Browser doesn't support speech recognition.</span>;
//   }

//   return (
//     <div>
//       <p>Microphone: {listening ? 'on' : 'off'}</p>
//       <button onClick={SpeechRecognition.startListening}>Start</button>
//       <button onClick={SpeechRecognition.stopListening}>Stop</button>
//       <button onClick={resetTranscript}>Reset</button>
//       <p>{transcript}</p>
//     </div>
//   );
// };
// export default TestVoice;