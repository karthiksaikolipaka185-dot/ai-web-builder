# AI Web Builder

An AI-powered web application builder with a React frontend and Express backend server.

## Overview

AI Web Builder is a full-stack platform designed to facilitate rapid web application development through AI generation. It combines a responsive client interface with a resilient backend service for managing prompts, project states, and AI model interactions.

## Project Structure

```
.
├── client/          # React + Vite frontend application
│   ├── src/         # UI components, pages, and services
│   ├── index.html   # HTML entry point
│   └── vite.config.js
└── server/          # Express backend server
    ├── src/         # API routes, middleware, and services
    ├── app.js       # Express app configuration
    └── server.js    # HTTP server entry point
```

- `client/`: React frontend application built with Vite.
- `server/`: Express backend server handling API requests and integrations.


## Tech Stack

- **Frontend**: React, Vite, Lucide Icons, Vanilla CSS
- **Backend**: Node.js, Express, Groq SDK
- **Environment**: Node 22+

## Getting Started

### Prerequisites

- Node.js (v18+ or v22+)
- npm package manager

### Installation

1. Install dependencies for both client and server:
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```

### Environment Configuration

Create a `.env` file in the `server/` directory based on `server/.env.example`:

- `PORT`: Server port number (default: 5000)
- `GROQ_API_KEY`: API key for Groq service integration
- `VITE_API_URL`: Frontend API base endpoint URL

### Running the Application

1. Start the Express backend server:
   ```bash
   cd server
   npm run dev # or npm start
   ```

2. Start the Vite React development server:
   ```bash
   cd client
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`.





