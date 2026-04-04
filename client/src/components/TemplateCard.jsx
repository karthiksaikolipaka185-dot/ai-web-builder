import React from 'react';

const TemplateCard = ({ template, onClick, disabled }) => {
  return (
    <div className="template-card">
      <div className="template-info">
        <h3 className="template-title">{template.title}</h3>
        <p className="template-desc">{template.description}</p>
      </div>
      <div className="template-actions">
        <button 
          className="btn-use-template" 
          onClick={() => onClick(template.prompt)}
          disabled={disabled}
        >
          {disabled ? 'Generating...' : 'Use Template'}
        </button>
      </div>
    </div>
  );
};

export default TemplateCard;
