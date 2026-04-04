const express = require('express');
const cors = require('cors');
const routes = require('./src/routes');
const errorHandler = require('./error.middleware');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', routes);

// Error Handling Middleware
app.use(errorHandler);

module.exports = app;
