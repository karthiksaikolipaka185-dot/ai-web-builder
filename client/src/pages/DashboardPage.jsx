import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import projectService from '../services/projectService';
import generationService from '../services/generationService';
import ProjectCard from '../components/ProjectCard';
import TemplateCard from '../components/TemplateCard';
import { ToastContext } from '../context/ToastContext';
import '../styles/dashboard.css';

const PROMPT_TEMPLATES = [
  {
    title: 'Landing Page',
    description: 'A modern responsive landing page with a hero section, features section, pricing table, and contact form.',
    prompt: 'Create a modern responsive landing page with a hero section, features section, pricing table, and contact form.'
  },
  {
    title: 'Portfolio',
    description: 'A personal portfolio website with sections for About Me, Projects, Skills, and Contact.',
    prompt: 'Create a personal portfolio website with sections for About Me, Projects, Skills, and Contact. Use a clean modern design.'
  },
  {
    title: 'To-Do App',
    description: 'A clean and functional to-do list web app with add, delete, and mark-as-complete functionality.',
    prompt: 'Create a to-do list web app with add, delete, and mark-as-complete functionality using JavaScript.'
  }
];

const DashboardPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const { showToast } = useContext(ToastContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectService.getProjects();
        setProjects(data);
      } catch (error) {
        showToast('Failed to fetch projects', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [showToast]);

  const handleNewProject = async () => {
    try {
      const newProject = await projectService.createProject('Untitled Project');
      showToast('Project created successfully', 'success');
      navigate(`/builder/${newProject._id}`);
    } catch (error) {
      showToast('Failed to create project', 'error');
    }
  };

  const handleTemplateClick = async (prompt) => {
    setIsGenerating(true);
    try {
      showToast('Creating project and generating code...', 'success');
      const newProject = await projectService.createProject('New Project');
      await generationService.generateCode(newProject._id, prompt);
      showToast('Project created from template!', 'success');
      navigate(`/builder/${newProject._id}`);
    } catch (error) {
      showToast('Failed to generate template project', 'error');
      setIsGenerating(false);
    }
  };

  const handleDelete = async (projectId) => {
    try {
      await projectService.deleteProject(projectId);
      setProjects(projects.filter((p) => p._id !== projectId));
      showToast('Project deleted', 'success');
    } catch (error) {
      showToast('Failed to delete project', 'error');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard">
      <section className="templates-section">
        <h2>Start with a Template</h2>
        <div className="templates-grid">
          {PROMPT_TEMPLATES.map((template, index) => (
            <TemplateCard 
              key={index}
              template={template}
              onClick={handleTemplateClick}
              disabled={isGenerating}
            />
          ))}
        </div>
      </section>

      <div className="dashboard-header">
        <h1>My Projects</h1>
        <button onClick={handleNewProject} className="btn-create">New Project</button>
      </div>
      <div className="projects-grid">
        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard 
              key={project._id} 
              project={project} 
              onOpen={(id) => navigate(`/builder/${id}`)} 
              onDelete={handleDelete} 
            />
          ))
        ) : (
          <div className="no-projects">No projects found. Create your first one!</div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
