import { join } from 'path';
import { pathToFileURL } from 'url';
import { BrowserWindow, app } from 'electron';
import isDev from 'electron-is-dev';
import prepareNext from 'electron-next';

// Handlers
import './handlers/open-file-dialog';
import './handlers/select-output-directory';
import './handlers/convert-files';
import './handlers/get-input-files';

async function createWindow() {
  if (isDev) {
    await prepareNext('./renderer');
  }

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      preload: join(__dirname, 'preload.js'),
      webSecurity: !isDev,
      allowRunningInsecureContent: isDev,
      devTools: isDev,
    },
    icon: pathToFileURL(
      join(__dirname, '../renderer', 'favicon.ico')
    ).toString(),
    title: 'SRG Webp Converter',
  });

  const url = isDev
    ? 'http://localhost:8000/'
    : pathToFileURL(join(__dirname, '../renderer/index.html')).href;

  mainWindow.loadURL(url);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.setMenu(null);
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
