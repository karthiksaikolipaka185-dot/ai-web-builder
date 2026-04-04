import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import projectService from '../services/projectService';
import LivePreview from '../components/LivePreview';
import '../styles/publicView.css';

const PublicViewPage = () => {
  const { shareId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPublicProject = async () => {
      try {
        const data = await projectService.getPublicProject(shareId);
        setProject(data);
      } catch (err) {
        setError('Public project not found or no longer available.');
      } finally {
        setLoading(false);
      }
    };
    fetchPublicProject();
  }, [shareId]);

  if (loading) return <div className="loading">Loading project...</div>;

  if (error || !project) {
    return (
      <div className="public-view-error">
        <h2>Oops!</h2>
        <p>{error}</p>
        <Link to="/" className="btn-home">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="public-view-page">
      <header className="public-view-header">
        <div className="public-brand">
          <Link to="/">KksBuild</Link>
        </div>
        <div className="public-title">
          {project.title}
        </div>
        <div className="public-badge">
          Read-Only Mode
        </div>
      </header>

      <main className="public-view-content">
        <LivePreview code={project.generatedCode} />
      </main>
    </div>
  );
};

export default PublicViewPage;
