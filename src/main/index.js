'use strict'

import { autoUpdater } from 'electron-updater'
import { app, BrowserWindow, Menu, Tray, ipcMain } from 'electron'
import path from 'path'
import Store from 'electron-store'

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
  tray = new Tray(path.join(__static, '/tray.png'))

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
      label: '查看文档',
      click () { require('electron').shell.openExternal('https://home.cs-tao.cc/whu-library-seat/') }
    },
    {
      label: '项目地址',
      click () { require('electron').shell.openExternal('https://github.com/CS-Tao/whu-library-seat') }
    },
    { type: 'separator' },
    {
      label: '退出程序',
      type: 'normal',
      click: (menuItem, browserWindow, event) => {
        store.set('mainWindowPosition', mainWindow.getPosition())
        mainWindow = null
        tray.destroy()
        app.exit()
      }
    }
  ])
  tray.setToolTip('武汉大学图书馆抢座软件')
  tray.setContextMenu(contextMenu)
})

const template = [
  {
    label: '文件',
    submenu: [
      {
        label: '退出程序',
        click () {
          store.set('mainWindowPosition', mainWindow.getPosition())
          mainWindow = null
          tray.destroy()
          app.exit()
        }
      }
    ]
  },
  {
    label: '设置',
    submenu: [
      {
        label: '恢复所有设置',
        click () {
          store.clear()
          if (mainWindow) {
            mainWindow.reload()
          }
        }}
    ]
  },
  {
    label: '视图',
    submenu: [
      { role: 'reload', label: '重新加载' },
      { role: 'forcereload', label: '强制重新加载' }
    ]
  },
  {
    label: '窗口',
    role: 'window',
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
  },
  {
    label: '关于',
    role: 'about',
    submenu: [
      {
        label: '版本 v' + appVersion,
        click () { require('electron').shell.openExternal('https://github.com/CS-Tao/whu-library-seat/releases/tag/v' + appVersion) }
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
        label: '申请权限',
        click () { require('electron').shell.openExternal('https://home.cs-tao.cc/whu-library-seat/specification/#申请软件使用权') }
      },
      {
        label: '用户白名单',
        click () { require('electron').shell.openExternal('https://github.com/CS-Tao/whu-library-seat/blob/user-validation/validation.json') }
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
    webPreferences: { webSecurity: false },
    title: '武汉大学图书馆抢座软件',
    backgroundColor: '#1C1E23'
  })

  let position = store.get('mainWindowPosition', [150, -1])

  mainWindow.setPosition(position[0], position[1] === -1 ? mainWindow.getPosition()[1] : position[1])

  mainWindow.loadURL(winURL)

  mainWindow.onbeforeunload = (e) => {
    e.returnValue = false
  }

  mainWindow.on('close', (e) => {
    let background = store.get('backgroundEnable', false)
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

// 配置自动更新

ipcMain.on('check-updates', (event, arg) => {
  // 检查更新
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})

ipcMain.on('quit-and-install', (event, arg) => {
  // 退出安装
  if (process.env.NODE_ENV === 'production') autoUpdater.quitAndInstall()
})

autoUpdater.autoInstallOnAppQuit = false

autoUpdater.on('update-downloaded', () => {
  // 更新下载完毕
  mainWindow.webContents.send('update-downloaded')
})
