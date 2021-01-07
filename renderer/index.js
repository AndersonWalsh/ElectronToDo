'use strict'

const { ipcRenderer } = require('electron')

//delete todo by text value
const deleteTodo = (e) => {
    ipcRenderer.send('delete-todo', e.target.textContent)
}

//open add todo window button
document.getElementById('createTodoBtn').addEventListener('click', () => {
    ipcRenderer.send('add-todo-window')
})

//when todo received
ipcRenderer.on('todos', (event, todos) => {
    //get todolist ul
    const todoList = document.getElementById('todoList')
    //html string
    const todoItems = todos.reduce((html, todo) => {
        html += `<li class="todo-item">${todo}</li>`
        return html
    }, '')

    //set list html to todo items
    todoList.innerHTML = todoItems

    //add click handlers to delete clicked todo
    todoList.querySelectorAll('.todo-item').forEach(item => {
        item.addEventListener('click', deleteTodo)
    })
})