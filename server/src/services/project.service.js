const Project = require('../models/Project.model');
const crypto = require('crypto');

const createProject = async (userId, title) => {
  const project = await Project.create({
    userId,
    title,
    messages: [],
    versions: [],
  });
  return project;
};

const getUserProjects = async (userId) => {
  return await Project.find({ userId }).sort({ updatedAt: -1 });
};

const getProjectById = async (projectId, userId) => {
  const project = await Project.findOne({ _id: projectId, userId });
  if (!project) {
    const error = new Error('Project not found.');
    error.statusCode = 404;
    throw error;
  }
  return project;
};

const updateProject = async (projectId, userId, data) => {
  const project = await Project.findOneAndUpdate(
    { _id: projectId, userId },
    data,
    { new: true, runValidators: true }
  );
  if (!project) {
    const error = new Error('Project not found.');
    error.statusCode = 404;
    throw error;
  }
  return project;
};

const deleteProject = async (projectId, userId) => {
  const project = await Project.findOneAndDelete({ _id: projectId, userId });
  if (!project) {
    const error = new Error('Project not found.');
    error.statusCode = 404;
    throw error;
  }
  return { message: 'Project deleted successfully.' };
};

const restoreVersion = async (projectId, userId, versionIndex) => {
  const project = await Project.findOne({ _id: projectId, userId });
  if (!project) {
    const error = new Error('Project not found.');
    error.statusCode = 404;
    throw error;
  }

  if (versionIndex < 0 || versionIndex >= project.versions.length) {
    const error = new Error('Invalid version index.');
    error.statusCode = 400;
    throw error;
  }

  project.generatedCode = project.versions[versionIndex].code;
  await project.save();
  return project;
};

const enableSharing = async (projectId, userId) => {
  const project = await Project.findOne({ _id: projectId, userId });
  if (!project) {
    const error = new Error('Project not found.');
    error.statusCode = 404;
    throw error;
  }

  // If already shared, return existing share URL suffix
  if (!project.shareId) {
    project.shareId = crypto.randomUUID();
    project.isPublic = true;
    await project.save();
  }

  return { shareUrl: `/share/${project.shareId}` };
};

const getPublicProject = async (shareId) => {
  const project = await Project.findOne({ shareId, isPublic: true });
  if (!project) {
    const error = new Error('Public project not found.');
    error.statusCode = 404;
    throw error;
  }
  
  return {
    title: project.title,
    generatedCode: project.generatedCode,
  };
};

module.exports = {
  createProject,
  getUserProjects,
  getProjectById,
  updateProject,
  deleteProject,
  restoreVersion,
  enableSharing,
  getPublicProject,
};
