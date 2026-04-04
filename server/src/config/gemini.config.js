const { GoogleGenAI } = require('@google/genai');
require('dotenv').config({ override: true });

// Unified Google AI SDK Initialization
const genAI = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY,
});

/**
 * CONFIGURATION: CHANGE MODEL NAME HERE
 * Recommended: 'gemini-1.5-flash' for stability
 * Latest: 'gemini-2.0-flash' for newer features
 */
const MODEL_NAME = 'models/gemini-flash-latest';

/**
 * Exponential Backoff Retry Utility
 */
const withRetry = async (fn, maxRetries = 5, delay = 2000) => {
  let attempt = 0;
  while (attempt <= maxRetries) {
    try {
      return await fn();
    } catch (error) {
      attempt++;
      if (attempt > maxRetries) throw error;

      const errorMessage = error.message.toLowerCase();
      const isRetryable = errorMessage.includes('429') || 
                         errorMessage.includes('500') || 
                         errorMessage.includes('quota') || 
                         errorMessage.includes('resource_exhausted') ||
                         errorMessage.includes('internal error');
      
      if (!isRetryable) throw error;

      const backoff = delay * Math.pow(2, attempt - 1) + (Math.random() * 500);
      console.warn(`[Gemini] Attempt ${attempt}/${maxRetries} failed. Retrying in ${Math.round(backoff)}ms...`);
      await new Promise(resolve => setTimeout(resolve, backoff));
    }
  }
};

/**
 * Production-ready content generation with error handling and retries.
 */
const generateContent = async (formattedPrompt) => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not defined in environment variables');
  }

  return await withRetry(async () => {
    try {
      const response = await genAI.models.generateContent({
        model: MODEL_NAME,
        contents: [{ role: 'user', parts: [{ text: formattedPrompt }] }],
      });

      // Handle different SDK response formats
      const text = typeof response.text === 'function' ? response.text() : response.text;
      
      if (!text) {
        console.error('Unexpected response structure:', JSON.stringify(response, null, 2));
        throw new Error('Empty response from AI');
      }
      return text;
    } catch (error) {
      // Debug: Log the full error to see what's really happening
      console.error('--- Gemini SDK Error Detail ---');
      console.dir(error);
      
      // Provide meaningful context for model not found
      if (error.message.includes('404') || error.message.toLowerCase().includes('not found') || error.message.toLowerCase().includes('unsupported')) {
        console.error(`Status 404: Model "${MODEL_NAME}" not found or unsupported.`);
        throw new Error(`Model ${MODEL_NAME} is not available with your current API key. Please verify model access in AI Studio.`);
      }
      throw error;
    }
  });
};

module.exports = { generateContent };
