import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import projectService from '../services/projectService';
import generationService from '../services/generationService';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import CodeEditor from '../components/CodeEditor';
import LivePreview from '../components/LivePreview';
import { ToastContext } from '../context/ToastContext';
import '../styles/builder.css';

const BuilderPage = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [messages, setMessages] = useState([]);
  const [code, setCode] = useState('');
  const [activeTab, setActiveTab] = useState('preview');
  const [generating, setGenerating] = useState(false);
  const [showVersions, setShowVersions] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  
  const { showToast } = useContext(ToastContext);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await projectService.getProject(projectId);
        setProject(data);
        setMessages(data.messages || []);
        setCode(data.generatedCode || '');
        if (data.isPublic && data.shareId) {
          setShareUrl(`${window.location.origin}/share/${data.shareId}`);
        }
      } catch (error) {
        showToast('Failed to load project', 'error');
      }
    };
    fetchProject();
  }, [projectId, showToast]);

  const handleSend = async (prompt) => {
    const optimisticUserMessage = {
      role: 'user',
      content: prompt,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, optimisticUserMessage]);
    setGenerating(true);

    try {
      const result = await generationService.generateCode(projectId, prompt);
      setMessages(result.messages);
      setCode(result.generatedCode);
      showToast('Generation complete!', 'success');
    } catch (error) {
      showToast(error.message || 'Generation failed', 'error');
      // Rollback optimistic update
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setGenerating(false);
    }
  };

  const handleRestore = async (versionIndex) => {
    if (!window.confirm("Are you sure you want to restore this version? This will overwrite your current code.")) return;
    
    try {
      const updatedProject = await projectService.restoreVersion(projectId, versionIndex);
      setProject(updatedProject);
      setCode(updatedProject.generatedCode);
      showToast('Version restored successfully', 'success');
      setShowVersions(false);
    } catch (error) {
      showToast('Failed to restore version', 'error');
    }
  };

  const handleShare = async () => {
    if (shareUrl) {
      setShowShare(true);
      return;
    }
    
    try {
      const result = await projectService.enableSharing(projectId);
      setShareUrl(`${window.location.origin}${result.shareUrl}`);
      setShowShare(true);
      showToast('Share link generated!', 'success');
    } catch (error) {
      showToast('Failed to generate share link', 'error');
    }
  };

  const copyToClipboard = () => {
    if (shareUrl) {
      navigator.clipboard.writeText(shareUrl);
      showToast('Link copied to clipboard!', 'success');
    }
  };

  const handleDownload = () => {
    if (!code) return;
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project?.title || 'project'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!project) return <div className="loading">Loading project...</div>;

  return (
    <div className="builder-page">
      {/* Left Panel: Chat */}
      <div className="chat-panel">
        <div className="chat-header">
          <input 
            type="text" 
            className="project-title-input"
            value={project.title}
            onChange={(e) => setProject({...project, title: e.target.value})}
            onBlur={() => projectService.updateProject(projectId, { title: project.title })}
          />
        </div>
        
        <div className="messages-list">
          {messages.length === 0 && (
            <div className="example-prompts">
              <p>Try these examples:</p>
              <button onClick={() => handleSend("Create a simple landing page for a coffee shop")}>Coffee shop landing page</button>
              <button onClick={() => handleSend("Build a personal portfolio with a dark theme")}>Dark portfolio</button>
            </div>
          )}
          {messages.map((msg, idx) => (
            <ChatMessage key={idx} message={msg} />
          ))}
          {generating && <div className="typing-indicator">AI is thinking...</div>}
        </div>

        <ChatInput onSend={handleSend} loading={generating} />
      </div>

      {/* Right Panel: Preview/Code */}
      <div className="viewer-panel">
        <div className="viewer-tabs">
          <button 
            className={activeTab === 'preview' ? 'active' : ''} 
            onClick={() => setActiveTab('preview')}
          >
            Preview
          </button>
          <button 
            className={activeTab === 'code' ? 'active' : ''} 
            onClick={() => setActiveTab('code')}
          >
            Code
          </button>
          <button 
            className={`btn-history ${showVersions ? 'active' : ''}`}
            onClick={() => setShowVersions(!showVersions)}
          >
            History
          </button>
          <button 
            className={`btn-share ${showShare ? 'active' : ''}`}
            onClick={handleShare}
          >
            Share
          </button>
          <button className="btn-download" onClick={handleDownload}>Download HTML</button>
        </div>

        <div className="viewer-content">
          {activeTab === 'preview' ? (
            <LivePreview code={code} />
          ) : (
            <CodeEditor code={code} onChange={setCode} />
          )}

          {/* Share Overlay Panel */}
          {showShare && (
            <div className="share-panel-overlay">
              <div className="share-panel">
                <div className="share-header">
                  <h3>Share Project</h3>
                  <button className="btn-close" onClick={() => setShowShare(false)}>&times;</button>
                </div>
                <div className="share-body">
                  <p>Anyone with this link can view a read-only version of your generated app.</p>
                  <div className="share-input-group">
                    <input type="text" readOnly value={shareUrl} />
                    <button onClick={copyToClipboard}>Copy</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Version History Overlay Panel */}
          {showVersions && (
            <div className="version-history-panel">
              <div className="version-history-header">
                <h3>Version History</h3>
                <button className="btn-close" onClick={() => setShowVersions(false)}>&times;</button>
              </div>
              <div className="version-list">
                {project.versions && project.versions.length > 0 ? (
                  project.versions.map((version, index) => (
                    <div className="version-item" key={index}>
                      <div className="version-info">
                        <strong>Version {index + 1}</strong>
                        <span className="version-time">{new Date(version.timestamp).toLocaleString()}</span>
                      </div>
                      <button 
                        className="btn-restore" 
                        onClick={() => handleRestore(index)}
                        disabled={version.code === project.generatedCode}
                      >
                        Restore
                      </button>
                    </div>
                  )).reverse() // Show newest first
                ) : (
                  <div className="no-versions">No previous versions available.</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuilderPage;
