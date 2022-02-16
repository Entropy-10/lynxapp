import { app } from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers';

const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  const Store = require('electron-store');

  Store.initRenderer();
  await app.whenReady();

  const mainWindow = createWindow('main', {
    title: 'Lynx Admin Panel',
    width: 1120,
    height: 720,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    }
  });

  if (isProd) {
    mainWindow.setResizable(false);
    await mainWindow.loadURL('app://./home.html');
  } else {
    const port = process.argv[2];
    mainWindow.setResizable(false);
    await mainWindow.loadURL(`http://localhost:${port}/admin`);
  }
})();

app.on('window-all-closed', () => {
  app.quit();
});
