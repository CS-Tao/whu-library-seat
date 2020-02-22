'use strict'

import { autoUpdater } from 'electron-updater'
import { app, BrowserWindow, Menu, Tray, ipcMain, screen, session } from 'electron'
import path from 'path'
import Store from 'electron-store'
import notifier from 'node-notifier'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

const store = new Store({
  name: 'whu-library-seat'
})

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

const appVersion = app.getVersion()

let tray = null
app.on('ready', () => {
  const iconName = process.platform === 'win32' ? 'windows-tray.png' : 'trayTemplate.png'
  tray = new Tray(path.join(__static, iconName))

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
    {
      label: '打开软件',
      click () {
        mainWindow.show()
      }
    },
    { type: 'separator' },
    {
      label: '查看文档',
      click () { require('electron').shell.openExternal('https://home.cs-tao.cc/whu-library-seat/') }
    },
    {
      label: '项目地址',
      click () { require('electron').shell.openExternal('https://github.com/CS-Tao/whu-library-seat') }
    },
    { type: 'separator' },
    {
      label: 'Chat on gitter',
      click () { require('electron').shell.openExternal('https://gitter.im/whu-library-seat/Lobby') }
    },
    { type: 'separator' },
    {
      label: '恢复所有设置',
      click () {
        store.clear()
        if (mainWindow) {
          mainWindow.reload()
        }
      }
    },
    { type: 'separator' },
    {
      label: '退出程序',
      type: 'normal',
      click: (menuItem, browserWindow, event) => {
        store.set('mainWindowPosition', mainWindow.getPosition())
        mainWindow = null
        if (tray && process.platform !== 'darwin') {
          tray.destroy()
        }
        app.exit()
      }
    }
  ])
  tray.setToolTip('武汉大学图书馆抢座软件')
  tray.setContextMenu(contextMenu)

  const template = [
    {
      label: '文件',
      submenu: [
        {
          label: '退出程序',
          click () {
            store.set('mainWindowPosition', mainWindow.getPosition())
            mainWindow = null
            if (tray) {
              tray.destroy()
            }
            app.exit()
          }
        }
      ]
    }, {
      label: '设置',
      submenu: [
        {
          label: '恢复所有设置',
          click () {
            store.clear()
            if (mainWindow) {
              mainWindow.reload()
            }
          }
        }
      ]
    }, {
      label: '视图',
      submenu: [
        { role: 'reload', label: '重新加载' },
        { role: 'forcereload', label: '强制重新加载' }
      ]
    }, {
      label: '窗口',
      submenu: [
        {
          label: '置顶',
          type: 'checkbox',
          checked: store.get('mainWindowOnTop', false),
          click: (menuItem, browserWindow, event) => {
            mainWindow.setAlwaysOnTop(menuItem.checked)
            store.set('mainWindowOnTop', menuItem.checked)
            if (!mainWindow.isVisible()) {
              mainWindow.show()
              mainWindow.setSkipTaskbar(false)
            }
          }
        },
        { role: 'minimize', label: '最小化' },
        {
          label: '退出到托盘',
          click: (menuItem, browserWindow, event) => {
            mainWindow.hide()
            mainWindow.setSkipTaskbar(true)
          }
        }
      ]
    }, {
      label: '群聊',
      submenu: [
        {
          label: 'Chat on gitter',
          click () { require('electron').shell.openExternal('https://gitter.im/whu-library-seat/Lobby') }
        }
      ]
    }, {
      label: '关于',
      role: 'about',
      submenu: [
        {
          label: '版本 v' + appVersion,
          enabled: false
        },
        {
          label: '更新日志',
          click () { require('electron').shell.openExternal('https://github.com/CS-Tao/whu-library-seat/releases/tag/v' + appVersion) }
        },
        {
          label: '检查更新',
          click () { mainWindow.webContents.send('check-update-menu-clicked') }
        },
        { type: 'separator' },
        {
          label: '文档',
          click () { require('electron').shell.openExternal('https://home.cs-tao.cc/whu-library-seat/') }
        },
        {
          label: '项目',
          click () { require('electron').shell.openExternal('https://github.com/CS-Tao/whu-library-seat') }
        },
        { type: 'separator' },
        {
          label: '问题反馈',
          click () { require('electron').shell.openExternal('https://github.com/CS-Tao/whu-library-seat/issues/new') }
        }
      ]
    }
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
})

function createWindow () {
  /**
   * Initial window options
   */
  const windowOptions = {
    height: 550,
    width: 360,
    center: false,
    resizable: false,
    useContentSize: true,
    maximizable: false,
    darkTheme: true,
    webPreferences: { webSecurity: false },
    title: '武汉大学图书馆抢座软件',
    backgroundColor: '#1C1E23'
  }

  if (process.platform === 'linux' || process.platform === 'win32') {
    windowOptions.icon = path.join(__static, 'app-512.png')
  }

  mainWindow = new BrowserWindow(windowOptions)

  const size = screen.getPrimaryDisplay().size

  let position = store.get('mainWindowPosition', [size.width - 500, -1])

  if (position[0] < 0 || position[0] > size.width || position[1] < 0 || position[1] > size.height) {
    position = [size.width - 500, -1]
    store.set('mainWindowPosition', position)
    mainWindow.setPosition(position[0], position[1] === -1 ? mainWindow.getPosition()[1] : position[1])
  } else {
    mainWindow.setPosition(position[0], position[1] === -1 ? mainWindow.getPosition()[1] : position[1])
  }

  const baseLibUrl = store.get('baseUrl', 'https://seat.lib.whu.edu.cn:8443')
  session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    if (details.url && details.url.indexOf(baseLibUrl) !== -1) {
      details.requestHeaders['User-Agent'] = null
      details.requestHeaders['Accept'] = null
      details.requestHeaders['Accept-Encoding'] = null
      details.requestHeaders['Accept-Language'] = null
      details.requestHeaders['Referer'] = null
      details.requestHeaders['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
      details.requestHeaders['Origin'] = null
    }
    callback({ cancel: false, requestHeaders: details.requestHeaders }) // eslint-disable-line
  })

  mainWindow.loadURL(winURL)

  mainWindow.onbeforeunload = (e) => {
    e.returnValue = false
  }

  mainWindow.on('close', (e) => {
    let background = store.get('backgroundEnable', true)
    if (background) {
      e.preventDefault()
      if (mainWindow) {
        mainWindow.hide()
        mainWindow.setSkipTaskbar(true)
      }
    }
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.on('show', () => {
    tray.setHighlightMode('never')
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

ipcMain.on('exit-app', (event, arg) => {
  store.set('mainWindowPosition', mainWindow.getPosition())
  mainWindow = null
  if (tray) {
    tray.destroy()
  }
  if (app) {
    app.exit(arg)
  }
})

ipcMain.on('show-window-notify', (event, title, message) => {
  notifier.notify(
    {
      appName: 'cc.cs-tao.whu-library-seat',
      title: title,
      subTitle: title,
      message: message,
      icon: process.env.NODE_ENV !== 'production'
        ? path.join(__static, 'toast.png')
        : (process.platform === 'darwin'
          ? './Contents/Resources/static/toast.png'
          : './resources/static/toast.png'),
      sound: false,
      wait: true
    },
    () => {}
  )
  notifier.on('click', (notifierObject, options) => {
    mainWindow.show()
    mainWindow.setSkipTaskbar(false)
  })
  notifier.on('timeout', () => {})
})

// 配置自动更新
autoUpdater.autoDownload = false
autoUpdater.autoInstallOnAppQuit = true
autoUpdater.allowDowngrade = true

ipcMain.on('check-updates', (event, arg) => {
  // 检查更新
  if (process.env.NODE_ENV === 'production') {
    autoUpdater.checkForUpdates().then((info) => {
      mainWindow.webContents.send('update-available', info)
    }).catch((error) => {
      mainWindow.webContents.send('check-update-error', error)
    })
  }
})

ipcMain.on('download-update', (event, arg) => {
  // 下载更新
  if (process.env.NODE_ENV === 'production') autoUpdater.downloadUpdate()
})

ipcMain.on('quit-and-install', (event, arg) => {
  // 退出安装
  if (process.env.NODE_ENV === 'production') {
    if (tray) {
      tray.destroy()
    }
    autoUpdater.quitAndInstall()
  }
})

autoUpdater.on('download-progress', (progress) => {
  // 更新下载进度
  mainWindow.webContents.send('download-progress', progress)
})

autoUpdater.on('update-downloaded', () => {
  // 更新下载完毕
  mainWindow.webContents.send('update-downloaded')
})
