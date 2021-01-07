'use strict'

const { ipcRenderer } = require('electron')

//listen for form submission
document.getElementById('todoForm').addEventListener('submit', (evt) => {
    //prevent form refresh
    evt.preventDefault()
    //input on form
    const input = evt.target[0]

    //send todo to main process
    ipcRenderer.send('add-todo', input.value)

    //reset input
    input.value = ''
})