import React, { useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import socket from '../socket'; // or './socket' if in root


// const socket = io('http://127.0.0.1:5001');

const VoiceInput: React.FC<{ onMessage: (msg: string) => void }> = ({ onMessage }) => {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
//   useEffect(() => {
//     const handleBotResponse = (msg: string) => {
//       console.log("🤖 Bot responded (voice):", msg);
//       onMessage(msg);
//     };
  
//     socket.on('bot_response', handleBotResponse);
  
//     return () => {
//       socket.off('bot_response', handleBotResponse);
//     };
//   }, [onMessage]);
  
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    console.log("🎤 Mic permission granted");

    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: 'audio/webm;codecs=opus',
    });

    chunks.current = [];
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        console.log("📥 Got audio chunk:", e.data.size, "bytes");
        chunks.current.push(e.data);
      } else {
        console.warn("⚠️ Empty audio chunk received");
      }
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(chunks.current, { type: 'audio/webm' });

      if (audioBlob.size === 0) {
        console.error("❌ Final audio blob is empty");
        return;
      }

      console.log("📦 Final audio blob size:", audioBlob.size);

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Audio = (reader.result as string).split(',')[1];
        socket.emit('audio_chunk', { audio: base64Audio });
        console.log("📤 Sent full audio to backend");
      };
      reader.readAsDataURL(audioBlob);
    };

    mediaRecorder.start();
    console.log("🎙️ Started recording");
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    console.log("🛑 Stopped recording");
    setRecording(false);
  };

  return (
    <div>
      {!recording ? (
        <button onClick={startRecording}>🎤 Start Talking</button>
      ) : (
        <button onClick={stopRecording}>🛑 Stop</button>
      )}
    </div>
  );
};

export default VoiceInput;
