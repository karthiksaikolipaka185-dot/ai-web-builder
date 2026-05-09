const projectService = require('./project.service');
const { askGroq } = require('./groq.service');
const { buildGenerationPrompt } = require('../constants/prompts');
const { parseAIResponse } = require('../utils/code.utils');

const generateCode = async (projectId, userId, userPrompt) => {
  // 1. Fetch project
  const project = await projectService.getProjectById(projectId, userId);

  // 2. Build full prompt
  const fullPrompt = buildGenerationPrompt(project.messages, userPrompt, project.generatedCode);

  // 3. Call Groq
  const responseText = await askGroq(fullPrompt);

  // 4. Parse response
  const { description, code } = parseAIResponse(responseText);

  // 5. Save messages
  const userMessage = { 
    role: 'user', 
    content: userPrompt, 
    timestamp: new Date() 
  };
  const aiMessage = { 
    role: 'ai', 
    content: description, 
    timestamp: new Date() 
  };

  // 6. Save version
  if (project.generatedCode) {
    project.versions.push({
      code: project.generatedCode,
      timestamp: new Date()
    });
  }

  // 7. Update project data
  project.generatedCode = code || project.generatedCode;
  project.messages.push(userMessage, aiMessage);

  // 8. Auto-set title
  if (project.title === 'Untitled Project' || !project.title) {
    project.title = userPrompt.split(' ').slice(0, 5).join(' ') + '...';
  }

  // 9. Save project
  await project.save();

  // 10. Return result
  return {
    messages: project.messages,
    generatedCode: project.generatedCode,
    description
  };
};

module.exports = {
  generateCode,
};
