const API_URL = 'http://localhost:3000/api/todos';

// DOM Elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const itemCount = document.getElementById('item-count');
const clearCompletedBtn = document.getElementById('clear-completed');

// 1. Initial Load: Get all tasks from the database
document.addEventListener('DOMContentLoaded', fetchTodos);

async function fetchTodos() {
  try {
    const response = await fetch(API_URL);
    const todos = await response.json();

    todoList.innerHTML = '';
    todos.forEach((todo) => renderTodo(todo));
    updateCount(todos.length);
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
}

// 2. Add Task: Send a POST request to the backend
todoForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const task = todoInput.value.trim();
  if (!task) return;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        task,
        completed: false,
        date: new Date(),
      }),
    });

    if (response.ok) {
      todoInput.value = ''; // Reset input
      fetchTodos(); // Refresh UI
    }
  } catch (error) {
    console.error('Error adding task:', error);
  }
});

// 3. Render: Create the HTML for each task with modern Cyber-Minimalist styles
function renderTodo(todo) {
  const li = document.createElement('li');
  li.className = `flex items-center justify-between bg-white/[0.03] border border-white/5 p-4 rounded-2xl group hover:bg-white/[0.07] hover:border-white/10 transition-all duration-300 ${todo.completed ? 'opacity-60' : ''}`;

  li.innerHTML = `
      <div class="flex items-center space-x-4 flex-1">
          <button onclick="toggleTodo('${todo._id}', ${todo.completed})"
              class="w-6 h-6 rounded-lg border-2 border-slate-700 flex items-center justify-center group-hover:border-purple-500 transition-colors ${todo.completed ? 'bg-purple-500 border-purple-500' : ''}">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ${todo.completed ? 'text-white' : 'hidden'}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
              </svg>
          </button>
          <span class="text-slate-300 font-medium group-hover:text-white transition-colors truncate ${todo.completed ? 'line-through text-slate-500' : ''}">${todo.task}</span>
      </div>

      <div class="flex items-center space-x-2 ml-4 action-buttons">
          <button onclick="editTodo('${todo._id}', '${todo.task.replace(/'/g, "\\'")}')" class="text-slate-500 hover:text-blue-400 transition-all duration-200 opacity-0 group-hover:opacity-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
          <button onclick="deleteTodo('${todo._id}')" class="text-slate-600 hover:text-red-400 transition-all duration-200 opacity-0 group-hover:opacity-100">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
          </button>
      </div>
  `;
  todoList.appendChild(li);
}

// 4. Update: Toggle completion status
window.toggleTodo = async (id, currentStatus) => {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !currentStatus }),
    });
    fetchTodos();
  } catch (error) {
    console.error('Error updating status:', error);
  }
};

// 5. Edit Mode: Swap text for input
window.editTodo = (id, currentTask) => {
  const li = document.querySelector(`button[onclick*="${id}"]`).closest('li');
  const span = li.querySelector('span');
  const actionButtons = li.querySelector('.action-buttons');

  actionButtons.classList.add('hidden');

  span.innerHTML = `
    <div class="flex items-center space-x-2 w-full">
      <input type="text" id="edit-input-${id}"
        class="bg-slate-950 border border-purple-500/50 rounded-lg px-3 py-1 text-white focus:outline-none focus:border-purple-500 transition-all w-full font-medium"
        value="${currentTask}">
      <button onclick="saveEdit('${id}')" class="bg-purple-600 hover:bg-purple-500 text-white px-3 py-1 rounded-lg text-xs font-bold transition-colors">
        SAVE
      </button>
      <button onclick="fetchTodos()" class="text-slate-500 hover:text-white text-xs font-bold px-2">
        ESC
      </button>
    </div>
  `;

  const input = document.getElementById(`edit-input-${id}`);
  input.focus();
  // Allow saving with Enter key
  input.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') saveEdit(id);
    if (e.key === 'Escape') fetchTodos();
  });
};

// 6. Save Edit: Send PUT request with new task text
window.saveEdit = async (id) => {
  const input = document.getElementById(`edit-input-${id}`);
  const newTaskText = input.value.trim();

  if (!newTaskText) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: newTaskText }),
    });

    if (response.ok) {
      fetchTodos();
    }
  } catch (error) {
    console.error('Error saving task:', error);
  }
};

// 7. Delete: Remove specific task
window.deleteTodo = async (id) => {
  try {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchTodos();
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};

// 8. Clear Completed: Remove all finished tasks
clearCompletedBtn.addEventListener('click', async () => {
  try {
    const response = await fetch(`${API_URL}/clear`, { method: 'DELETE' });
    if (response.ok) fetchTodos();
  } catch (error) {
    console.error('Error clearing tasks:', error);
  }
});

function updateCount(count) {
  itemCount.innerText = `${count} task${count !== 1 ? 's' : ''} total`;
}
