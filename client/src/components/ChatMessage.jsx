import React from 'react';

const ChatMessage = ({ message }) => {
  const isUser = message.role === 'user';
  
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className={`chat-message ${isUser ? 'user-message' : 'ai-message'}`}>
      <div className="message-content">
        <p>{message.content}</p>
        <span className="message-time">{formatTime(message.timestamp)}</span>
      </div>
    </div>
  );
};

export default ChatMessage;
