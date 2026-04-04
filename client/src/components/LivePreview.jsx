import React from 'react';

const LivePreview = ({ code }) => {
  if (!code) {
    return (
      <div className="preview-placeholder">
        <div className="placeholder-content">
          <p>Your generated app will appear here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="live-preview-container">
      <iframe
        srcDoc={code}
        title="Live Preview"
        sandbox="allow-scripts"
        className="preview-iframe"
      />
    </div>
  );
};

export default LivePreview;
