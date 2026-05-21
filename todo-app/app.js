// ==========================================
// SIMPLE TODO APP - BEGINNER FRIENDLY
// ==========================================

// 1. STATE (Our Data Drawer)
// This is a simple array of strings. We load it from local storage, or start empty [].
let todos = JSON.parse(localStorage.getItem('simple_todos')) || [];

// 2. DOM ELEMENTS (Wiring up our HTML)
const todoInput = document.querySelector('#todo-input');
const addBtn = document.querySelector('#add-btn');
const todoList = document.querySelector('#todo-list');

// 3. RENDER FUNCTION (Drawing the screen)
function render() {
    // Clear the board before drawing
    todoList.innerHTML = '';

    // Loop through our list of tasks
    todos.forEach((task, index) => {
        // Create a list item <li>
        const li = document.createElement('li');
        li.className = 'todo-item';

        // Create a text span
        const span = document.createElement('span');
        span.className = 'todo-text';
        span.textContent = task; // Set the task text

        // Create a delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '&times;'; // The 'X' symbol

        // When the 'X' button is clicked, delete this task
        deleteBtn.addEventListener('click', () => {
            deleteTodo(index);
        });

        // Glue them together
        li.appendChild(span);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });
}

// 4. ACTION FUNCTIONS (What happens when we do something)

// Function to add a new task
function addTodo() {
    const taskText = todoInput.value.trim(); // Get text and remove empty spaces

    if (taskText !== '') {
        todos.push(taskText); // Add the text directly to the array
        saveToLocalStorage(); // Save it!
        render();             // Redraw the screen
        todoInput.value = ''; // Clear the input box
    }
}

// Function to delete a task using its position (index)
function deleteTodo(index) {
    todos.splice(index, 1); // Remove 1 item at the specific position
    saveToLocalStorage();   // Save it!
    render();               // Redraw the screen
}

// Helper function to save our array of strings to local storage
function saveToLocalStorage() {
    localStorage.setItem('simple_todos', JSON.stringify(todos));
}

// 5. EVENT LISTENERS (Listening to User Actions)

// Click the "Add" button
addBtn.addEventListener('click', addTodo);

// Press "Enter" inside the input box
todoInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// 6. INITIAL RUN (Draw the saved tasks when the page loads)
render();
