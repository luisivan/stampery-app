const { app, Menu, BrowserWindow } = require('electron')
const path = require('path')
const windowStateKeeper = require('electron-window-state')

const DnDHandler = require('./dnd')

const stamperyURL = 'https://stamp.io/sign-in'

let win = null

function createWindow() {
  const windowState = windowStateKeeper({
    defaultWidth: 1024,
    defaultHeight: 768,
  })

  win = new BrowserWindow({
    x: windowState.x,
    y: windowState.y,
    width: windowState.width,
    height: windowState.height,
    title: 'Stampery',
    titleBarStyle: 'hidden',
    icon: __dirname + '/icons/icon.png',
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, './preload.js'),
    },
  })

  windowState.manage(win)

  new DnDHandler(app, win)

  win.loadURL(stamperyURL)

  // win.webContents.openDevTools()

  win.on('closed', () => {
    win = null
  })
}

app.setName('Stampery')
// app.setBadgeCount(count)
app.dock.setIcon(__dirname + '/icons/icon.png')
app.setAboutPanelOptions({
  applicationName: 'Stampery Wrapper',
  applicationVersion: '1.0.0',
  copyright: 'AGPLv3',
  credits: 'Luis Cuende <me@luisivan.net>',
})

app.on('ready', () => {
  createWindow(stamperyURL)
  if (process.platform === 'darwin') {
    Menu.setApplicationMenu(require('./menu'))
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) createWindow()
})
