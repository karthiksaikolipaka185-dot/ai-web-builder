const { generateContent } = require('../config/gemini.config');

const askGemini = async (prompt) => {
  try {
    const responseText = await generateContent(prompt);
    if (!responseText) {
      throw new Error('Gemini returned an empty response');
    }
    return responseText;
  } catch (error) {
    console.error('AI Service Error Logic:', error);
    // During development, providing the actual error helps the user see if it's an API Key or Quota issue.
    throw new Error(`AI service error: ${error.message}`);
  }
};

module.exports = {
  askGemini,
};
