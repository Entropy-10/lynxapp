import { app } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'

const isProd: boolean = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

(async () => {
  const Store = require('electron-store');

  Store.initRenderer();
  await app.whenReady()

  const mainWindow = createWindow('main', {
    title: 'Lynx Admin Panel',
    width: 1120,
    height: 720,
    resizable: false,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
    }
  })

  if (isProd) {
    await mainWindow.loadURL('app://./admin.html')
  } else {
    const port = process.argv[2]
    
    await mainWindow.loadURL(`http://localhost:${port}/admin`)
    mainWindow.webContents.openDevTools()
  }
})()

app.on('window-all-closed', () => {
  app.quit()
})
