// require('dotenv').config();

// const express = require('express');
// const cors = require('cors');
// const path = require('path');

// const taskRoutes = require('./src/routes/taskRoute');

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // ✅ Serve frontend folder
// app.use(express.static(path.join(__dirname, 'frontend')));

// // Root endpoint (optional override)
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
// });

// // Mount API routes
// app.use('/tasks', taskRoutes);

// // Error handler
// app.use((err, req, res, next) => {
//   console.error('Error:', err.stack);
//   res.status(err.statusCode || 500).json({
//     error: err.message || 'Internal Server Error',
//   });
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });


require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const taskRoutes = require('./src/routes/taskRoute');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Serve static frontend files
app.use(express.static(path.join(__dirname, 'frontend')));

// Root endpoint → serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// ✅ Mount API routes (always return JSON here)
app.use('/tasks', taskRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(err.statusCode || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
