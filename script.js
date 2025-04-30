// DOM Elements
const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// Load tasks from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render tasks to the DOM
function renderTasks() {
  todoList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = `todo-item ${task.completed ? 'completed' : ''}`;

    li.innerHTML = `
      <span>${task.text}</span>
      <div>
        <button class="complete" onclick="toggleComplete(${index})">
          ${task.completed ? 'Undo' : 'Complete'}
        </button>
        <button class="delete" onclick="deleteTask(${index})">Delete</button>
      </div>
    `;

    todoList.appendChild(li);
  });
}

// Add task
function addTask() {
  const taskText = todoInput.value.trim();
  if (taskText === '') {
    alert('Please enter a task!');
    return;
  }

  tasks.push({ text: taskText, completed: false });
  updateLocalStorage();
  renderTasks();
  todoInput.value = '';
}

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  updateLocalStorage();
  renderTasks();
}

// Toggle task completion
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  updateLocalStorage();
  renderTasks();
}

// Update local storage
function updateLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Event Listeners
addButton.addEventListener('click', addTask);
todoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});

// Initial render
renderTasks();