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
```[cite: 2]

## 📁 Project Structure[cite: 2]

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
```[cite: 1, 2]

## 🚀 Getting Started[cite: 2]

**Prerequisites**[cite: 2]

*   Node.js and npm[cite: 2]
*   MongoDB database[cite: 2]
*   Gemini API key for AI features[cite: 2]
*   Cloudinary credentials for configured media features[cite: 2]

**1. Clone the Repository**[cite: 2]

```bash
git clone https://github.com/Asur654/Tag.git
cd Tag
```[cite: 2]

**2. Configure Environment Variables**[cite: 2]

Create a ".env" file inside the "backend" directory.[cite: 2]

```text
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_random_secret

GEMINI_API_KEY=your_gemini_api_key

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

CLIENT_URL=http://localhost:5173
NODE_ENV=development
```[cite: 2]

Replace the example values with your own credentials.[cite: 2] Never commit real API keys, database credentials, or JWT secrets to GitHub.[cite: 2]

**3. Install Dependencies and Build**[cite: 2]

From the project root, run:[cite: 2]

```bash
npm run build
```[cite: 2]

This installs the backend and frontend dependencies and builds the frontend application.[cite: 2]

**4. Start the Application**[cite: 2]

Start the backend in one terminal:[cite: 2]

```bash
cd backend
npm run dev
```[cite: 2]

Start the frontend in another terminal:[cite: 2]

```bash
cd frontend
npm run dev
```[cite: 2]

Open the local URL displayed by Vite, typically "http://localhost:5173".[cite: 2]

For a production-style start after building, run "npm start" from the project root.[cite: 2]

## 🔌 API Overview[cite: 2]

The backend currently exposes these route groups and endpoints:[cite: 2]

| Endpoint | Purpose |
| :--- | :--- |
| **"/api/auth"** | Authentication routes[cite: 2] |
| **"/api/messages"** | Messaging routes[cite: 2] |
| **"POST /chat"** | Gemini-powered AI chat[cite: 2] |

Refer to the backend source code for the individual routes, request payloads, and response formats.[cite: 2]

## 🔒 Security Considerations[cite: 2]

*   Use a strong, unique JWT secret.[cite: 2]
*   Keep API keys and database credentials on the server.[cite: 2]
*   Validate request data and enforce authorization on the backend.[cite: 2]
*   Restrict CORS to trusted origins in production.[cite: 2]
*   Apply appropriate rate limits to AI endpoints.[cite: 2]
*   Use HTTPS and secure cookie settings in production.[cite: 2]

## 🧪 Future Improvements[cite: 2]

*   Automated unit and integration tests.[cite: 2]
*   OpenAPI/Swagger API documentation.[cite: 2]
*   CI/CD workflows for automated testing and deployment.[cite: 2]
*   Structured logging and application health checks.[cite: 2]
*   Screenshots and a live demonstration of the application.[cite: 2]

## 📄 License[cite: 2]

No explicit license is currently documented.[cite: 2] Contact the repository owner before reusing or redistributing this project.[cite: 2]

***

Built with React, Node.js, MongoDB, Socket.IO, and Gemini.[cite: 2]
