/**
 * Express HTTP server initialization entry point.
 * Loads environment configuration, establishes database connection,
 * and starts listening for incoming HTTP requests.
 */
const dotenv = require('dotenv');
// Initialize environment variables from .env configuration file
dotenv.config();

const app = require('./app');
const connectDB = require('./db.config');

// Fallback to default port 5000 if PORT is not set in environment
const PORT = process.env.PORT || 5000;

// Establish database connection prior to starting listener
connectDB();

// Start HTTP server listener on configured port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
