const Groq = require('groq-sdk');
require('dotenv').config({ override: true });

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

/**
 * CONFIGURATION: Groq Model
 */
const MODEL_NAME = 'llama-3.3-70b-versatile'; // High performance model

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
                         errorMessage.includes('rate_limit_exceeded') ||
                         errorMessage.includes('internal error');
      
      if (!isRetryable) throw error;

      const backoff = delay * Math.pow(2, attempt - 1) + (Math.random() * 500);
      console.warn(`[Groq] Attempt ${attempt}/${maxRetries} failed. Retrying in ${Math.round(backoff)}ms...`);
      await new Promise(resolve => setTimeout(resolve, backoff));
    }
  }
};

/**
 * Production-ready content generation with error handling and retries.
 */
const generateContent = async (formattedPrompt) => {
  if (!process.env.GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY is not defined in environment variables');
  }

  return await withRetry(async () => {
    try {
      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: 'user',
            content: formattedPrompt,
          },
        ],
        model: MODEL_NAME,
      });

      const text = completion.choices[0]?.message?.content;
      
      if (!text) {
        console.error('Unexpected response structure:', JSON.stringify(completion, null, 2));
        throw new Error('Empty response from Groq');
      }
      return text;
    } catch (error) {
      console.error('--- Groq SDK Error Detail ---');
      console.dir(error);
      
      if (error.status === 404) {
        console.error(`Status 404: Model "${MODEL_NAME}" not found or unsupported.`);
        throw new Error(`Model ${MODEL_NAME} is not available. Please verify model access in Groq Console.`);
      }
      throw error;
    }
  });
};

module.exports = { generateContent };
