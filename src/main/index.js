'use strict'

import { app, BrowserWindow, Menu, Tray } from 'electron'

import path from 'path'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

let tray = null
app.on('ready', () => {
  tray = new Tray(path.join(__static, '/app.png'))

  tray.on('click', () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide()
      mainWindow.setSkipTaskbar(true)
    } else {
      mainWindow.show()
      mainWindow.setSkipTaskbar(false)
    }
  })

  const contextMenu = Menu.buildFromTemplate([
    { label: '设置', type: 'normal' },
    {
      label: '窗口置顶',
      type: 'checkbox',
      checked: false,
      click: (menuItem, browserWindow, event) => {
        mainWindow.setAlwaysOnTop(menuItem.checked)
        if (!mainWindow.isVisible()) {
          mainWindow.show()
          mainWindow.setSkipTaskbar(false)
        }
      }
    },
    { type: 'separator' },
    {
      label: '退出程序',
      type: 'normal',
      click: (menuItem, browserWindow, event) => {
        mainWindow = null
        app.exit()
      }
    }
  ])
  tray.setToolTip('武汉大学图书馆抢座软件')
  tray.setContextMenu(contextMenu)
})

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 550,
    width: 360,
    center: false,
    resizable: false,
    useContentSize: true,
    maximizable: false,
    darkTheme: true,
    icon: path.join(__static, '/app.png'),
    webSecurity: false,
    title: '武汉大学图书馆抢座软件'
  })

  mainWindow.setPosition(100, mainWindow.getPosition()[1])

  mainWindow.loadURL(winURL)

  mainWindow.onbeforeunload = (e) => {
    e.returnValue = false
  }

  mainWindow.on('close', (e) => {
    e.preventDefault()
    if (mainWindow) {
      mainWindow.hide()
      mainWindow.setSkipTaskbar(true)
    }
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.on('show', () => {
    tray.setHighlightMode('always')
  })

  mainWindow.on('hide', () => {
    tray.setHighlightMode('never')
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
