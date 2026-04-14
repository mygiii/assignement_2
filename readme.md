Full Stack Web App – React + Node + MongoDB
Description

This project is a full-stack web application built with:

Frontend: React
Backend: Node.js + Express
Database: MongoDB Atlas
Deployment: Render

The app allows users to:

Register an account
Login securely
Store user data in a MongoDB database
Live Demo
Frontend: https://client-gtow.onrender.com
Backend API: https://assignement-2-i26x.onrender.com
Tech Stack
Frontend
React
Fetch API
React Router
Backend
Node.js
Express
Mongoose
CORS
Database
MongoDB Atlas
Deployment
Render (Static + Web Service)
 Project Structure
project/
│
├── client/        # React frontend
│
├── api/           # Node/Express backend
│   ├── routes/
│   ├── models/
│   └── app.js
│
└── README.md
 Environment Variables
Backend (api/.env)
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret_key
CLIENT_URL=https://client-gtow.onrender.com
PORT=9000
Frontend (client/.env)
REACT_APP_API_URL=https://assignement-2-i26x.onrender.com
 API Endpoints
 Register User
POST /testAPI/user

Body:

{
  "name": "test",
  "age": 20,
  "password": "1234"
}
 Login
POST /testAPI/login

Body:

{
  "name": "test",
  "password": "1234"
}
 Get All Users
GET /testAPI/user
 Testing (Bruno / Postman)

Base URL:

https://assignement-2-i26x.onrender.com

Example:

GET /testAPI/user
POST /testAPI/login
POST /testAPI/user