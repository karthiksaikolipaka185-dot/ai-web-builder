const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || err.status || (res.statusCode === 200 ? 500 : res.statusCode);

  let safeMessage = err.message || 'Internal Server Error';

  // Sanitize sensitive credentials or configuration strings
  if (safeMessage.includes('GROQ_API_KEY') || safeMessage.includes('gsk_')) {
    safeMessage = 'AI service configuration error.';
  } else if (safeMessage.includes('mongodb+srv://') || safeMessage.includes('MONGODB_URI')) {
    safeMessage = 'Database service error.';
  }

  let safeStack = process.env.NODE_ENV === 'production' ? null : err.stack;
  if (safeStack) {
    safeStack = safeStack.replace(/gsk_[a-zA-Z0-9_-]+/g, '[REDACTED_API_KEY]')
                         .replace(/mongodb\+srv:\/\/[^@]+@/g, 'mongodb+srv://[REDACTED_CREDENTIALS]@');
  }

  res.status(statusCode).json({
    success: false,
    message: safeMessage,
    stack: safeStack,
  });
};

module.exports = errorHandler;
