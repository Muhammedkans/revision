


let todos  = JSON.parse(localStorage.getItem('simple_todos')) || [];


const todoInput = document.querySelector('#todo-input');

const addbtn  = document.querySelector('#add-btn');

const todoList  = document.querySelector('#todo-list');

function render(){
  todoList.innerHTML  = '';

  todos.forEach((tasks,index) => {
    const li = document.createElement('li');
    
    li.className = 'todo-item';

    const span = document.createElement('span');

    span.className = 'todo-text'
    
    span.textContent  = tasks;


    const deleteButton =  document.createElement('button');

    deleteButton.className = 'delete-btn';

    deleteButton.innerHTML =   '&times;';

    deleteButton.addEventListener('click' , ()=>{
      deleteTodo(index);
    })



    li.appendChild(span);
    li.appendChild(deleteButton);
    todoList.appendChild(li);
  })


}

 function addTodo(){
  const taskText = todoInput.value.trim()
 
  if(taskText !== ''){
  todos.push(taskText);
  saveToLocalStorage();
  render()
  todoInput.value = '';
  }

 }


 function deleteTodo(index){
  todos.splice(index, 1);
  saveToLocalStorage();
  render();
 }


 function saveToLocalStorage(){
  localStorage.setItem('simple_todos', JSON.stringify(todos));
 }


 addbtn.addEventListener('click',addTodo);


 todoInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

