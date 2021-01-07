'use strict'

const { BrowserWindow } = require('electron')

//default window settings
const defaultProps = {
    width: 500,
    height: 800,
    show: false,
    webPreferences: {
        nodeIntegration: true
    }
}

class Window extends BrowserWindow {
    constructor({ file, ...windowSettings }) {
        //new browser window with these props
        super({ ...defaultProps, ...windowSettings })
        //load html and open devtools
        this.loadFile(file)
        //this.webContents.openDevTools()
        //prevent flickering
        this.once('ready-to-show', () => {
            this.show()
        })
    }
}

module.exports = Window