'use strict';

let
    todoControl = document.querySelector('.todo-control'),
    newInput = document.querySelector('input[placeholder="Какие планы?"]'),
    btnAdd = document.querySelector('#add'),
    //btnRemove = document.querySelector('.todo-remove'),

    
    todoList = document.querySelector('.todo-list'),
    todoCompletedList = document.querySelector('.todo-completed');


let todoData = [];


const addTodo = function () {

   todoList.textContent = '';
   todoCompletedList.textContent = '';
    //функция перебирает todoData циклом

    todoData.forEach(function (item) {

        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = ' <span class="text-todo">' + item.value + '</span>' +
            '<div class="todo-buttons">' +
                '<button class="todo-remove"></button>' +
                '<button class="todo-complete"></button>' +
            '</div>';
        if (item.completed) {
            todoCompletedList.append(li);
        }
        else {
            todoList.append(li);
        }

        //сохраняю в localStorage
        localStorage.setItem('storedTodo', JSON.stringify(todoData));
        

        const btnCompleted = li.querySelector('.todo-complete');

        btnCompleted.addEventListener('click', function () {
            item.completed = !item.completed;
            addTodo();
        });

        const btnRemove = li.querySelector('.todo-remove');
        btnRemove.addEventListener('click', function () {
                
                todoData.splice(todoData.indexOf(item), 1);
                localStorage.setItem('storedTodo', JSON.stringify(todoData));
                addTodo();
            }          
        );
    });
};

todoControl.addEventListener('submit', function (event) {
    event.preventDefault();

    if (newInput.value.trim() === '') {
        return;
    }
    else {
    const newTodo = {
        value: newInput.value,
        completed: false
    };
    todoData.push(newTodo);
    newInput.value='';
    addTodo();
}
});

//получаю из  localStorage
const showList = function () {
   if (JSON.parse(localStorage.getItem('storedTodo'))) {
    todoData = JSON.parse(localStorage.getItem('storedTodo'));
   }
};

showList();


addTodo();
