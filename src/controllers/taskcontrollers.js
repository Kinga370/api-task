// // src/controllers/taskcontrollers.js
// const db = require('../models/taskModels');

// exports.getAllTasks = async (req, res) => {
//   try {
//     const tasks = await db.getTasks();
//     res.json(tasks);
//   } catch (err) {
//     console.error('DB Error (getAllTasks):', err);
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.createTask = async (req, res) => {
//   try {
//     const { title } = req.body;
//     if (!title || title.trim() === '') {
//       return res.status(400).json({ error: 'Title is required' });
//     }
//     const newTask = await db.addTask(title);
//     res.status(201).json(newTask);
//   } catch (err) {
//     console.error('DB Error (createTask):', err);
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.updateTask = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, completed } = req.body;
//     const updatedTask = await db.updateTask(id, title, completed ?? 0);
//     res.json(updatedTask);
//   } catch (err) {
//     console.error('DB Error (updateTask):', err);
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.deleteTask = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await db.deleteTask(id);
//     res.json({ message: 'Task deleted' });
//   } catch (err) {
//     console.error('DB Error (deleteTask):', err);
//     res.status(500).json({ error: err.message });
//   }
// };


// src/controllers/taskcontrollers.js
const taskModel = require('../models/taskModels');

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await taskModel.getTasks();
    res.json(tasks);
  } catch (err) {
    console.error('DB Error (getAllTasks):', err);
    res.status(500).json({ error: err.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'Title is required' });
    }
    const newTask = await taskModel.addTask(title);
    res.status(201).json(newTask);
  } catch (err) {
    console.error('DB Error (createTask):', err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    const updatedTask = await taskModel.updateTask(id, { title, completed });
    res.json(updatedTask);
  } catch (err) {
    console.error('DB Error (updateTask):', err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await taskModel.deleteTask(id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error('DB Error (deleteTask):', err);
    res.status(500).json({ error: err.message });
  }
};
