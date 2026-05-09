const { generateContent } = require('../config/groq.config');

const askGroq = async (prompt) => {
  try {
    const responseText = await generateContent(prompt);
    if (!responseText) {
      throw new Error('Groq returned an empty response');
    }
    return responseText;
  } catch (error) {
    console.error('Groq Service Error Logic:', error);
    throw new Error(`Groq service error: ${error.message}`);
  }
};

module.exports = {
  askGroq,
};
