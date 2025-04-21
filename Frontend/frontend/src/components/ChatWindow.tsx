// src/components/ChatWindow.tsx
import React from 'react';

type ChatMessage = {
  sender: 'user' | 'bot';
  text: string;
};

type Props = {
  messages: ChatMessage[];
};

const ChatWindow: React.FC<Props> = ({ messages }) => (
  <div style={{ border: '1px solid #ccc', padding: '1rem', minHeight: '250px' }}>
    {messages.map((msg, idx) => (
      <div key={idx} style={{ margin: '0.5rem 0' }}>
        <strong>{msg.sender === 'user' ? 'You' : 'Bot'}:</strong> {msg.text}
      </div>
    ))}
  </div>
);

export default ChatWindow;
