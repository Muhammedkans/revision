// ==========================================
// ADVANCED TODO APP - COMPLETE IMPLEMENTATION
// ==========================================

// --- STEP 1: STATE (DATA) ---
// We load our todos from localStorage. If nothing is saved, we start with an empty array [].
let todos = JSON.parse(localStorage.getItem('todos')) ?? [];

// Keep track of which todo is being edited (null means no todo is currently being edited)
let editingTodoId = null;

// Keep track of the active filter ('all', 'active', or 'completed')
let currentFilter = 'all';

// --- STEP 2: DOM ELEMENT REFERENCES ---
// Grab all the HTML elements we need to interact with
const todoInput = document.querySelector('#todo-input');
const addBtn = document.querySelector('#add-btn');
const todoList = document.querySelector('#todo-list');
const itemsLeft = document.querySelector('#items-left');
const clearCompletedBtn = document.querySelector('#clear-completed-btn');
const filterBtns = document.querySelectorAll('.filter-btn');

// --- STEP 3: RENDER FUNCTION ---
// Wipes the HTML list clean and rebuilds it based on the current data in our 'todos' array
function render() {
    // 1. Clear the current HTML elements inside the list container to avoid duplication
    todoList.innerHTML = '';

    // 2. Filter our array of todos based on the currently selected filter category
    const filteredTodos = todos.filter(todo => {
        if (currentFilter === 'active') return !todo.completed;
        if (currentFilter === 'completed') return todo.completed;
        return true; // if currentFilter is 'all', show everything
    });

    // 3. Loop through our filtered list of todos and build HTML elements for each one
    filteredTodos.forEach(todo => {
        // Create the main wrapper list item <li>
        const li = document.createElement('li');
        li.className = 'todo-item';
        // Associate the todo's actual ID to the HTML element using a data attribute
        li.dataset.id = todo.id;

        if (todo.completed) {
            li.classList.add('completed');
        }

        // Create the left container (holds checkbox and text/input)
        const itemLeft = document.createElement('div');
        itemLeft.className = 'todo-item-left';

        // Create the checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'todo-checkbox';
        checkbox.checked = todo.completed;

        itemLeft.appendChild(checkbox);

        // Check if this specific todo is currently in "Edit Mode"
        if (editingTodoId === todo.id) {
            // Create an input box instead of text span
            const editInput = document.createElement('input');
            editInput.type = 'text';
            editInput.className = 'edit-input';
            editInput.value = todo.text;
            
            itemLeft.appendChild(editInput);

            // Automatically place focus on the input box so the user can type immediately
            setTimeout(() => editInput.focus(), 0);

            // Save changes on press of Enter key, cancel on Escape key
            editInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    saveEdit(todo.id, editInput.value.trim());
                } else if (e.key === 'Escape') {
                    cancelEdit();
                }
            });

            // Save changes automatically if user clicks away from the input field
            editInput.addEventListener('blur', () => {
                saveEdit(todo.id, editInput.value.trim());
            });

        } else {
            // Create the regular text span
            const textSpan = document.createElement('span');
            textSpan.className = 'todo-text';
            textSpan.textContent = todo.text;
            
            itemLeft.appendChild(textSpan);
        }

        // Create the delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '&times;'; // Displays the 'X' symbol

        // Append sub-elements to the main <li>
        li.appendChild(itemLeft);
        li.appendChild(deleteBtn);

        // Finally, add the <li> to our main <ul> container on the screen
        todoList.appendChild(li);
    });

    // 4. Update the items left counter
    const activeCount = todos.filter(todo => !todo.completed).length;
    itemsLeft.textContent = `${activeCount} item${activeCount === 1 ? '' : 's'} left`;

    // 5. Toggle visibility of the "Clear Completed" button (hide if no completed items exist)
    const hasCompleted = todos.some(todo => todo.completed);
    clearCompletedBtn.style.visibility = hasCompleted ? 'visible' : 'hidden';
}

// --- STEP 4: STATE MANAGEMENT & MUTATION FUNCTIONS ---
// These functions modify our 'todos' state array, save it, and trigger a UI redraw

function saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodo(text) {
    if (text === '') return;

    // Create a new todo object using the current timestamp as a unique ID
    const newTodo = {
        id: Date.now(),
        text: text,
        completed: false
    };

    todos.push(newTodo);
    saveToLocalStorage();
    render();
}

function toggleTodo(id) {
    // Find the item with matching ID and invert its boolean status
    todos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });
    saveToLocalStorage();
    render();
}

function deleteTodo(id) {
    // Keep everything EXCEPT the item that has the matching ID
    todos = todos.filter(todo => todo.id !== id);
    saveToLocalStorage();
    render();
}

function saveEdit(id, newText) {
    if (newText === '') {
        // If text is cleared completely, delete the item
        deleteTodo(id);
    } else {
        // Update the text property of our todo
        todos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, text: newText };
            }
            return todo;
        });
        saveToLocalStorage();
    }
    editingTodoId = null; // Exit edit mode
    render();
}

function cancelEdit() {
    editingTodoId = null; // Reset editing target without saving changes
    render();
}

function clearCompleted() {
    todos = todos.filter(todo => !todo.completed);
    saveToLocalStorage();
    render();
}

// --- STEP 5: EVENT LISTENERS ---

// Trigger adding a todo when clicking the Add button
addBtn.addEventListener('click', () => {
    addTodo(todoInput.value.trim());
    todoInput.value = ''; // Clear input field
});

// Trigger adding a todo when pressing the Enter key inside the input field
todoInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addTodo(todoInput.value.trim());
        todoInput.value = ''; // Clear input field
    }
});

// Event Delegation for handling checkbox clicks, delete button clicks, and double clicks
todoList.addEventListener('click', (e) => {
    const itemElement = e.target.closest('.todo-item');
    if (!itemElement) return;

    const id = Number(itemElement.dataset.id);

    // If checkbox is clicked
    if (e.target.classList.contains('todo-checkbox')) {
        toggleTodo(id);
    }
    // If delete button is clicked
    else if (e.target.classList.contains('delete-btn')) {
        deleteTodo(id);
    }
});

// Double click to enter edit mode
todoList.addEventListener('dblclick', (e) => {
    if (e.target.classList.contains('todo-text')) {
        const itemElement = e.target.closest('.todo-item');
        if (itemElement) {
            editingTodoId = Number(itemElement.dataset.id);
            render();
        }
    }
});

// Clear completed todos
clearCompletedBtn.addEventListener('click', clearCompleted);

// Handle filter switching
filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to the clicked button
        e.target.classList.add('active');
        // Update our active filter category and redraw
        currentFilter = e.target.dataset.filter;
        render();
    });
});

// --- INITIAL RUN ---
// Load state and draw the UI when the script runs for the first time
render();
