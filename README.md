Tag — Real-Time Messaging Platform 💬

Tag is a full-stack real-time messaging application built with the MERN stack. It combines instant messaging, online-user presence, JWT-based authentication, and AI-powered chat using Google's Gemini API.

✨ Features

- 🔐 Authentication & Authorization: JWT-based authentication and protected application workflows.
- 💬 Real-Time Messaging: Instant messaging powered by Socket.IO.
- 🟢 Online Presence: Real-time online-user status.
- 🤖 AI-Powered Chat: Gemini integration for AI-generated responses.
- 🖼️ Media Integration: Cloudinary configuration for media workflows.
- ⚡ State Management: Zustand for shared frontend state.
- 🛡️ Error Handling: Client-side and server-side error handling.
- 🚀 Production Deployment: Configuration for serving the built frontend through the backend.

🛠️ Tech Stack

Category| Technologies
Frontend| React, Vite, Tailwind CSS, DaisyUI
Backend| Node.js, Express.js
Database| MongoDB, Mongoose
Real-Time Communication| Socket.IO
Authentication| JWT, bcryptjs
State Management| Zustand
AI Integration| Google Gemini API
Media| Cloudinary

🏗️ Architecture

The frontend communicates with the Express backend through HTTP API requests and Socket.IO connections. The backend integrates with MongoDB for persistent data and Gemini for AI-powered responses.

             React + Vite
                  |
          HTTP / Socket.IO
                  |
          Node.js + Express
           /      |      \
          /       |       \
     MongoDB   Socket.IO   Gemini API
                  |
          Connected Clients

📁 Project Structure

```text
Tag/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── lib/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── seeds/
│   └── GPTConfig.js
├── frontend/
│   └── src/
│       ├── components/
│       ├── constants/
│       ├── lib/
│       ├── pages/
│       └── store/
└── README.md
```

🚀 Getting Started

Prerequisites

- Node.js and npm
- MongoDB database
- Gemini API key for AI features
- Cloudinary credentials for configured media features

1. Clone the Repository

git clone https://github.com/Asur654/Tag.git
cd Tag

2. Configure Environment Variables

Create a ".env" file inside the "backend" directory.

PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_random_secret

GEMINI_API_KEY=your_gemini_api_key

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

CLIENT_URL=http://localhost:5173
NODE_ENV=development

Replace the example values with your own credentials. Never commit real API keys, database credentials, or JWT secrets to GitHub.

3. Install Dependencies and Build

From the project root, run:

npm run build

This installs the backend and frontend dependencies and builds the frontend application.

4. Start the Application

Start the backend in one terminal:

cd backend
npm run dev

Start the frontend in another terminal:

cd frontend
npm run dev

Open the local URL displayed by Vite, typically "http://localhost:5173".

For a production-style start after building, run "npm start" from the project root.

🔌 API Overview

The backend currently exposes these route groups and endpoints:

Endpoint| Purpose
"/api/auth"| Authentication routes
"/api/messages"| Messaging routes
"POST /chat"| Gemini-powered AI chat

Refer to the backend source code for the individual routes, request payloads, and response formats.

🔒 Security Considerations

- Use a strong, unique JWT secret.
- Keep API keys and database credentials on the server.
- Validate request data and enforce authorization on the backend.
- Restrict CORS to trusted origins in production.
- Apply appropriate rate limits to AI endpoints.
- Use HTTPS and secure cookie settings in production.

🧪 Future Improvements

- Automated unit and integration tests.
- OpenAPI/Swagger API documentation.
- CI/CD workflows for automated testing and deployment.
- Structured logging and application health checks.
- Screenshots and a live demonstration of the application.

📄 License

No explicit license is currently documented. Contact the repository owner before reusing or redistributing this project.

---

Built with React, Node.js, MongoDB, Socket.IO, and Gemini.
