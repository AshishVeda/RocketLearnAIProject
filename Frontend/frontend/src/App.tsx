// src/App.tsx
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import VoiceInput from './components/VoiceInput';
import ChatWindow from './components/ChatWindow';
import socket from './socket'; // or './socket' if in root

// const socket = io('http://127.0.0.1:5001');

type ChatMessage = {
  sender: 'user' | 'bot';
  text: string;
};

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [textInput, setTextInput] = useState('');

  useEffect(() => {

    socket.on('transcript', (userText: string) => {
      console.log("🧑 You said:", userText);
      setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    });
  
    socket.on('bot_response', (data: string) => {
      console.log("Bot replied:", data);  // 🔍 Check this in browser console
      setMessages((prev) => [...prev, { sender: 'bot', text: data }]);
    });
  
    socket.on('connect', () => {
      console.log("✅ Connected to backend");
    });
  
    return () => {
      socket.off('transcript');
      socket.off('bot_response');
      socket.off('connect');
    };
  }, []);

  const handleBotMessage = (msg: string) => {
    setMessages((prev) => [...prev, { sender: 'bot', text: msg }]);
  };

  const sendTextMessage = () => {
    if (textInput.trim()) {
      setMessages((prev) => [...prev, { sender: 'user', text: textInput }]);
      socket.emit('text_message', { text: textInput });
      setTextInput('');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2>🧠 OpenAI Voice & Text Chat</h2>

      <ChatWindow messages={messages} />

      <div style={{ display: 'flex', marginTop: '1rem' }}>
        <input
          style={{ flex: 1, padding: '0.5rem' }}
          type="text"
          value={textInput}
          placeholder="Type your message..."
          onChange={(e) => setTextInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') sendTextMessage();
          }}
        />
        <button onClick={sendTextMessage}>Send</button>
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <VoiceInput
          onMessage={(botReply: string) =>
            setMessages((prev) => [...prev, { sender: 'bot', text: botReply }])
          }
        />
      </div>
    </div>
  );
};

export default App;
