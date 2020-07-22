const todoinput = document.querySelector('.todo-input');
const todobutton = document.querySelector('.todo-button');
const todolist = document.querySelector('.todo-list');
const filteroption = document.querySelector('.filter-todo')

document.addEventListener('DOMContentLoaded',gettodos);
todobutton.addEventListener('click',addtodo);
todolist.addEventListener('click',deletecheck);
filteroption.addEventListener('click',filtertodo);




function addtodo(event){
    event.preventDefault();
    // create div
    const tododiv = document.createElement("div");
    tododiv.classList.add("todo");
    //create li
    const newtodo = document.createElement("li");
    newtodo.innerText =todoinput.value;
    newtodo.classList.add("todo-item");
    tododiv.appendChild(newtodo);

    // save to localstorage

    savetodoinlocal(todoinput.value);

    //check button

    const completebutton = document.createElement("button");
    completebutton.innerHTML = '<i class="fas fa-check" ></i>';
    completebutton.classList.add("complete-btn");
    tododiv.appendChild(completebutton);

    // delete button

    
    const deletebutton = document.createElement("button");
    deletebutton.innerHTML = '<i class="fas fa-trash" ></i>';
    deletebutton.classList.add("delete-btn");
    tododiv.appendChild(deletebutton);

    //append list

    todolist.appendChild(tododiv);
    //todo input value
    todoinput.value = "";
}

function deletecheck(e){
    const item = e.target;
    if(item.classList[0] === "delete-btn"){
    const todo = item.parentElement;
    //animation
    todo.classList.add("fall");
    removelocaltodo(todo);
    todo.addEventListener("transitionend",function(){
        todo.remove();
    });
    }

    if(item.classList[0] ==="complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }


}

function filtertodo(e){
    const todos = todolist.childNodes;
    todos.forEach(function(todo){
        switch (e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;

        }
        
    });


}

function savetodoinlocal(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));

}

function gettodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        
    const tododiv = document.createElement("div");
    tododiv.classList.add("todo");
    //create li
    const newtodo = document.createElement("li");
    newtodo.innerText = todo;
    newtodo.classList.add("todo-item");
    tododiv.appendChild(newtodo);


    //check button

    const completebutton = document.createElement("button");
    completebutton.innerHTML = '<i class="fas fa-check" ></i>';
    completebutton.classList.add("complete-btn");
    tododiv.appendChild(completebutton);

    // delete button

    
    const deletebutton = document.createElement("button");
    deletebutton.innerHTML = '<i class="fas fa-trash" ></i>';
    deletebutton.classList.add("delete-btn");
    tododiv.appendChild(deletebutton);

    //append list

    todolist.appendChild(tododiv);
    //todo input value
   


    });
}

function removelocaltodo(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoindex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoindex),1); 
    localStorage.setItem('todos',JSON.stringify(todos));
}