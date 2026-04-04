const { GoogleGenAI } = require('@google/genai');
require('dotenv').config();

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function listAll() {
  try {
    const response = await genAI.models.list();
    console.log('--- FULL RESPONSE START ---');
    console.log(JSON.stringify(response, null, 2));
    console.log('--- FULL RESPONSE END ---');
  } catch (err) {
    console.error('List failed:', err.message);
  }
}

listAll();
