'use strict'

const path = require('path')
const { app, ipcMain } = require('electron')

//constructors
const Window = require('./Window')
const DataStore = require('./DataStore')

//new todo store
const todosData = new DataStore({ name: 'Todos Main' })

function main() {
    let mainWindow = new Window({
        file: path.join('renderer', 'index.html')
    })

    //add todo window
    let addTodoWin

    //put events in file, intiailize
    mainWindow.once('show', () => {
        mainWindow.webContents.send('todos', todosData.todos)

    })
    //create add todo window
    ipcMain.on('add-todo-window', () => {
        if (!addTodoWin) {
            //create new
            addTodoWin = new Window({
                file: path.join('renderer', 'add.html'),
                width: 400,
                height: 400,
                //close with main window
                parent: mainWindow
            })
            //cleanup
            addTodoWin.on('closed', () => {
                addTodoWin = null
            })
        }
    })
    //add-todo via add-todo window
    ipcMain.on('add-todo', (event, todo) => {
        const updatedTodos = todosData.addTodo(todo).todos
        mainWindow.send('todos', updatedTodos)
    })

    //delete todo from todo list window
    ipcMain.on('delete-todo', (event, todo) => {
        const updatedTodos = todosData.deleteTodo(todo).todos
        mainWindow.send('todos', updatedTodos)
    })
}

app.on('ready', main)

app.on('window-all-closed', function () {
    app.quit()
})
/*
function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.loadFile('index.html')
} //postcondition: create new browser window from index.html

app.whenReady().then(createWindow) //invoke create window after app initialized

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
}) //no-op on MACos, closes app when no active windows on other

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
}) //create new window if app started but no active windows*/
