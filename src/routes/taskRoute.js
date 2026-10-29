// src/routes/taskRoute.js
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskcontrollers');

// Get all tasks
router.get('/', taskController.getAllTasks);

// Add a new task
router.post('/', taskController.createTask);

// Update a task (PATCH to match frontend)
router.patch('/:id', taskController.updateTask);

// Delete a task
router.delete('/:id', taskController.deleteTask);

module.exports = router;
