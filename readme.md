Rawad Hammoude 3199554 (back end), Sean Perales Ludden 3199613 (front end), Ayah El Aggadi 3199515 (backend/frontend)


Project Overview :

This project is a web app inspired by old-school arcade games (8-bit style). The goal is to create a simple platform where users can register, log in, and play some classic games. The design is made to look like retro consoles, with pixel vibes and bright colors.

You can access the website here:
https://client-gtow.onrender.com



How it works :

When users arrive on the site, they can either create an account or log in. Once connected, they are redirected to a “Game Hub” where all the games are available.

The session is handled using `localStorage`, so the user stays connected until they click the logout button.



Available Games :

The app currently includes three classic games:

Snake grow -> the snake without crashing
Pong play -> against a simple AI
Tetris -> stack blocks and clear lines

All games are built directly with React and JavaScript.



Technologies Used :

The frontend is built with React, using React Router for navigation and Material UI for styling.

The backend uses Node.js and Express, and user data is stored in MongoDB Atlas.

The whole project is deployed on Render.




Example:

GET /testAPI/user
POST /testAPI/login
POST /testAPI/user
