const projectService = require('../services/project.service');

const getProjects = async (req, res, next) => {
  try {
    const projects = await projectService.getUserProjects(req.user._id);
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    next(error);
  }
};

const createProject = async (req, res, next) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, message: 'Title is required.' });
    }
    const project = await projectService.createProject(req.user._id, title);
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

const getProject = async (req, res, next) => {
  try {
    const project = await projectService.getProjectById(req.params.id, req.user._id);
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({ success: false, message: error.message });
    }
    next(error);
  }
};

const updateProject = async (req, res, next) => {
  try {
    const project = await projectService.updateProject(req.params.id, req.user._id, req.body);
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({ success: false, message: error.message });
    }
    next(error);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    const result = await projectService.deleteProject(req.params.id, req.user._id);
    res.status(200).json({ success: true, message: result.message });
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({ success: false, message: error.message });
    }
    next(error);
  }
};

const restoreVersion = async (req, res, next) => {
  try {
    const { versionIndex } = req.body;
    if (versionIndex === undefined) {
      return res.status(400).json({ success: false, message: 'versionIndex is required.' });
    }
    const project = await projectService.restoreVersion(req.params.id, req.user._id, versionIndex);
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({ success: false, message: error.message });
    }
    next(error);
  }
};

const enableSharing = async (req, res, next) => {
  try {
    const result = await projectService.enableSharing(req.params.id, req.user._id);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({ success: false, message: error.message });
    }
    next(error);
  }
};

const getPublicProject = async (req, res, next) => {
  try {
    const result = await projectService.getPublicProject(req.params.shareId);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({ success: false, message: error.message });
    }
    next(error);
  }
};

module.exports = {
  getProjects,
  createProject,
  getProject,
  updateProject,
  deleteProject,
  restoreVersion,
  enableSharing,
  getPublicProject,
};
