// server.js — entry point
require('dotenv').config();

const express = require('express');
const cors = require('cors'); // <-- 1. Import CORS
const taskRoutes = require('./routes/taskRoute'); // Based on your screenshot

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // <-- 2. Enable CORS so the frontend can talk to the backend
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Task API is ready!', version: 'MySQL + MVC' });
});

// Mount the routes
app.use('/tasks', taskRoutes);

app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(err.statusCode || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});