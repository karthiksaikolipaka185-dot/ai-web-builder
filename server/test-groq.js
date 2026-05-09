const { askGroq } = require('./src/services/groq.service');
require('dotenv').config();

const testGroq = async () => {
  console.log('Testing Groq integration...');
  try {
    const prompt = 'Hello, can you hear me? Respond with a short greeting.';
    const response = await askGroq(prompt);
    console.log('Groq Response:', response);
    console.log('SUCCESS: Groq is working correctly!');
  } catch (error) {
    console.error('FAILURE: Groq integration test failed.');
    console.error(error.message);
  }
};

testGroq();
