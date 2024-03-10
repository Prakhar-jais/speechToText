import React, { useState, useEffect } from 'react';

const SpeechToText = () => {
  const [recognizedText, setRecognizedText] = useState('');
  const [listening, setListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [msg,setMsg] = useState([]);

  useEffect(() => {
    if (listening) {
      startListening();
    } else {
      stopListening();
    }
  }, [listening]);

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition is not supported in your browser. Please try another browser.');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'hi';

    recognition.onstart = () => {
      setRecognizedText('');
    };

    recognition.onresult = event => {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('');
      setRecognizedText(transcript);
      setMsg([...msg,transcript]);
    };

    recognition.onerror = event => {
      console.error('Speech recognition error:', event.error);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.start();
    setRecognition(recognition);
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      console.log(msg);
    }
  };

  const toggleListening = () => {
    setListening(prevState => !prevState);
  };

  return (
    <div>
      <button onClick={toggleListening}>
        {listening ? 'Stop Listening' : 'Start Listening'}
      </button>
      <p>Recognized Text: {recognizedText}</p>
    </div>
  );
};

export default SpeechToText;
