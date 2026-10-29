// src/models/taskModels.js
const db = require('../db'); // your db.js sets up mysql2/promise pool

// Get all tasks
async function getTasks() {
  const [rows] = await db.query('SELECT * FROM tasks');
  return rows;
}

// Add a new task
async function addTask(title) {
  const [result] = await db.query(
    'INSERT INTO tasks (title, completed) VALUES (?, ?)',
    [title, 0]
  );
  return { id: result.insertId, title, completed: 0 };
}

// Update a task
async function updateTask(id, title, completed = 0) {
  await db.query(
    'UPDATE tasks SET title = ?, completed = ? WHERE id = ?',
    [title, completed, id]
  );
  return { id, title, completed };
}

// Delete a task
async function deleteTask(id) {
  await db.query('DELETE FROM tasks WHERE id = ?', [id]);
}

module.exports = {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
};
