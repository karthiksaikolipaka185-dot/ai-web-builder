const { GoogleGenAI } = require('@google/genai');
require('dotenv').config();

const genAI = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY 
});

async function listAll() {
  try {
    console.log('Listing all available models for your key...');
    const result = await genAI.models.list();
    
    // Handle both {models: [...]} and सीधा [...]
    const modelsList = result.models || result;
    
    if (Array.isArray(modelsList)) {
      console.log(`Found ${modelsList.length} models:`);
      modelsList.forEach(m => console.log(`- ${m.name}`));
    } else {
      console.log('Unexpected response format:', JSON.stringify(result, null, 2));
    }
  } catch (error) {
    console.error('Error listing models:', error.message);
    if (error.response) console.error('Response details:', JSON.stringify(error.response, null, 2));
  }
}

listAll();
