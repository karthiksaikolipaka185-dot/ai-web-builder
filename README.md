# AI Web Builder

An AI-powered web application builder with a React frontend and Express backend server.

## Overview

AI Web Builder is a modern full-stack web development suite designed to streamline and accelerate web application creation using generative AI. It combines an intuitive React-based client interface with an Express backend service, allowing developers and designers to visually prompt, iterate, and generate dynamic Web application projects smoothly.

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

## Application Workflow

1. **User Request**: The user inputs prompt requirements or UI changes through the React client interface.
2. **API Routing**: Requests are sent to the Express backend endpoint services.
3. **AI Code Generation**: Backend services query the Groq model integration to process requirements and synthesize code.
4. **Real-Time Delivery**: Generated code structures and responses are transmitted back to the client for live preview.


## Tech Stack

### Frontend
- **React**: Component-based interactive user interface library.
- **Vite**: High-performance frontend build tool and dev server.
- **Lucide Icons**: Modern SVG icons for UI navigation and controls.
- **Vanilla CSS**: Custom CSS design system with CSS variables.

### Backend
- **Node.js & Express**: Lightweight REST API server architecture.
- **Groq SDK**: AI model provider integration for code and prompt processing.
- **dotenv & CORS**: Environment configuration and secure cross-origin support.

## Getting Started

### Prerequisites

- Node.js (v18+ or v22+)
- npm package manager

### Installation

1. Clone the repository and navigate into the project directory:
   ```bash
   git clone https://github.com/karthiksaikolipaka185-dot/ai-web-builder.git
   cd ai-web-builder
   ```

2. Install dependencies for both client and server applications:
   ```bash
   # Install client dependencies
   cd client && npm install

   # Install server dependencies
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

## Troubleshooting

- **Missing `GROQ_API_KEY`**: Ensure `.env` is created inside the `server/` directory containing a valid Groq API key.
- **Port Conflict (5000)**: If port 5000 is occupied, set a custom `PORT` variable in `server/.env`.
- **CORS Issues**: Ensure `VITE_API_URL` in `client/.env` points to the running backend address.






