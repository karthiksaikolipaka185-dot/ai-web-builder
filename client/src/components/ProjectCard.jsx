import React from 'react';

const ProjectCard = ({ project, onOpen, onDelete }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  return (
    <div className="project-card">
      <div className="project-preview">
        {project.generatedCode ? (
          <iframe 
            srcDoc={project.generatedCode} 
            title={project.title} 
            sandbox="" 
          />
        ) : (
          <div className="no-preview">No preview yet</div>
        )}
      </div>
      <div className="project-info">
        <h3 className="project-title">{project.title}</h3>
        <span className="project-date">{formatDate(project.updatedAt)}</span>
      </div>
      <div className="project-actions">
        <button onClick={() => onOpen(project._id)} className="btn-open">Open</button>
        <button onClick={() => onDelete(project._id)} className="btn-delete">Delete</button>
      </div>
    </div>
  );
};

export default ProjectCard;
