import React, { useState } from 'react';

const ChatInput = ({ onSend, loading }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt.trim() && !loading) {
      onSend(prompt);
      setPrompt('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <form className="chat-input-container" onSubmit={handleSubmit}>
      <textarea
        placeholder="Describe what you want to build..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
      />
      <button type="submit" disabled={!prompt.trim() || loading}>
        {loading ? 'Generating...' : 'Send'}
      </button>
    </form>
  );
};

export default ChatInput;
