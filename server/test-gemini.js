const { generateContent } = require('./src/config/gemini.config');

async function testGemini() {
  try {
    console.log('Testing Gemini content generation...');
    const response = await generateContent('Say "Hello World" if you are working.');
    console.log('Response:', response);
  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

testGemini();
