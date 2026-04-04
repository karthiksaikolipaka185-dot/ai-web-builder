const { GoogleGenAI } = require('@google/genai');
require('dotenv').config();

const genAI = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY,
});

const modelsToTest = [
  'gemini-1.5-flash',
  'models/gemini-1.5-flash',
  'gemini-2.0-flash',
  'models/gemini-2.0-flash',
  'gemini-1.5-flash-8b',
  'gemini-1.5-pro'
];

async function testAll() {
  console.log('Using API Key ending in:', process.env.GEMINI_API_KEY.slice(-4));
  
  for (const modelName of modelsToTest) {
    try {
      console.log(`\nTesting model: ${modelName}...`);
      const response = await genAI.models.generateContent({
        model: modelName,
        contents: [{ role: 'user', parts: [{ text: 'hi' }] }],
      });
      console.log(`✅ Success with ${modelName}`);
      process.exit(0);
    } catch (error) {
      console.log(`❌ Failed with ${modelName}: ${error.message}`);
      if (error.message.includes('429')) {
        console.log('   (Quota reached for this model)');
      }
    }
  }
  console.log('\nAll tests failed.');
}

testAll();
