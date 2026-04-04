const generationService = require('../services/generation.service');

const generateCode = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const { prompt } = req.body;

    if (!prompt || prompt.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please describe what you want to build.',
      });
    }

    const result = await generationService.generateCode(projectId, req.user._id, prompt);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generateCode,
};
