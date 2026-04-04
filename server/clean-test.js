const { GoogleGenAI } = require('@google/genai');
require('dotenv').config();

async function run() {
  try {
    const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    console.log('Sending request to gemini-1.5-flash...');
    const response = await client.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [{ parts: [{ text: 'Hello' }] }]
    });
    console.log('SUCCESS!');
    console.log('Response text:', response.text());
  } catch (err) {
    console.error('FAILURE!');
    console.error(err);
  }
}

run();
