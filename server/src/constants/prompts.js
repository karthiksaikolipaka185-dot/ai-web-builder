const SYSTEM_PROMPT = `
You are an expert AI Web App Builder. 
Your goal is to generate a complete, working HTML file based on the user's request.
- The output MUST be a single, standalone HTML file.
- YOU MUST include all necessary CSS (inside <style> tags) and JavaScript (inside <script> tags) within the same file.
- The design should be modern, responsive, and visually appealing.
- Avoid using external dependencies or CDNs unless absolutely necessary (like Font Awesome or Google Fonts).
- Return your response in the following format:
  1. A brief description of what you built.
  2. The complete code enclosed in a single \`\`\`html code block.
`;

const buildGenerationPrompt = (messages, userPrompt, currentCode) => {
  let prompt = `${SYSTEM_PROMPT}\n\n`;

  // Include last 10 messages for context
  const history = messages.slice(-10);
  history.forEach((msg) => {
    prompt += `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}\n`;
  });

  if (currentCode) {
    prompt += `\nCURRENT CODE (modify this based on the user's new request):\n\`\`\`html\n${currentCode}\n\`\`\`\n`;
  }

  prompt += `\nUser: ${userPrompt}\nAssistant:`;

  return prompt;
};

module.exports = {
  SYSTEM_PROMPT,
  buildGenerationPrompt,
};
