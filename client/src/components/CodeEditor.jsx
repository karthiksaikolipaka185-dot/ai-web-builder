import React from 'react';

const CodeEditor = ({ code, onChange, readOnly }) => {
  return (
    <div className="code-editor-container">
      <textarea
        className="code-editor"
        value={code}
        onChange={(e) => onChange(e.target.value)}
        readOnly={readOnly}
        spellCheck="false"
        placeholder="HTML code will appear here..."
      />
    </div>
  );
};

export default CodeEditor;
