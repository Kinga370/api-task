// The base URL of your Express API
const API_URL = 'http://localhost:3000/tasks';

// DOM Elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const errorMessage = document.getElementById('error-message');

// Show error messages
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove('hidden');
  setTimeout(() => {
    errorMessage.classList.add('hidden');
  }, 3000);
}

// Fetch and render all tasks (GET /tasks)
async function fetchTasks() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch tasks');
    
    const tasks = await response.json();
    renderTasks(tasks);
  } catch (error) {
    showError('Could not connect to the server. Is it running?');
    taskList.innerHTML = '<li class="loading">Failed to load tasks.</li>';
  }
}

// Create a single HTML element for a task
function createTaskElement(task) {
  const li = document.createElement('li');
  li.className = `task-item ${task.completed ? 'completed' : ''}`;
  li.dataset.id = task.id;

  // Checkbox for toggling completion
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'task-checkbox';
  checkbox.checked = task.completed;
  // Convert 1/0 from MySQL to true/false for the checkbox
  if (task.completed === 1) checkbox.checked = true; 
  
  checkbox.addEventListener('change', () => toggleTask(task.id, checkbox.checked));

  // Task Title
  const span = document.createElement('span');
  span.className = 'task-title';
  span.textContent = task.title;

  // Delete Button
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.innerHTML = '&#10005;'; // X symbol
  deleteBtn.title = 'Delete task';
  deleteBtn.addEventListener('click', () => deleteTask(task.id));

  // Append elements
  const contentDiv = document.createElement('div');
  contentDiv.className = 'task-content';
  contentDiv.appendChild(checkbox);
  contentDiv.appendChild(span);

  li.appendChild(contentDiv);
  li.appendChild(deleteBtn);

  return li;
}

// Render tasks to the screen
function renderTasks(tasks) {
  taskList.innerHTML = ''; // Clear current list
  
  if (tasks.length === 0) {
    taskList.innerHTML = '<li class="loading">No tasks yet. Add one above!</li>';
    return;
  }

  tasks.forEach(task => {
    taskList.appendChild(createTaskElement(task));
  });
}

// Add a new task (POST /tasks)
taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const title = taskInput.value.trim();
  if (!title) return;

  const submitBtn = document.getElementById('submit-btn');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Adding...';

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: title })
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || 'Failed to create task');
    }

    taskInput.value = ''; // Clear input
    await fetchTasks();   // Refresh list
    
  } catch (error) {
    showError(error.message);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Add Task';
  }
});

// Toggle task completion (PATCH /tasks/:id)
async function toggleTask(id, isCompleted) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: isCompleted })
    });

    if (!response.ok) throw new Error('Failed to update task');
    
    // Update UI without full reload
    const taskElement = document.querySelector(`[data-id="${id}"]`);
    if (isCompleted) {
      taskElement.classList.add('completed');
    } else {
      taskElement.classList.remove('completed');
    }

  } catch (error) {
    showError(error.message);
    await fetchTasks(); // Revert UI if failed
  }
}

// Delete a task (DELETE /tasks/:id)
async function deleteTask(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) throw new Error('Failed to delete task');
    
    // Remove from UI
    const taskElement = document.querySelector(`[data-id="${id}"]`);
    taskElement.remove();

    // If list is empty, show message
    if (taskList.children.length === 0) {
      renderTasks([]);
    }

  } catch (error) {
    showError(error.message);
  }
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', fetchTasks);