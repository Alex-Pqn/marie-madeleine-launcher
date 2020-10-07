
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');

//DEV
// require('electron-reload')(__dirname, {
//   electron: require(`${__dirname}/node_modules/electron`),
// });

// Object.defineProperty(app, 'isPackaged', {
//   get() {
//     return true;
//   }
// });
//DEV

const { autoUpdater } = require("electron-updater")

let win;

const IMG_DIR = '/assets/img/icon/png/';
const ASSET_DIR = '/assets/html/';

// main window launcher creation

createWindow = () => {
  win = new BrowserWindow({
    width: 900,
    height: 650,
    minWidth: 900,
    minHeight: 650,
    title: 'Marie Madeleine Launcher',
    icon: path.join(__dirname, IMG_DIR, 'icon.png'),
    frame: false,
    movable: true,
    resizable: true,
    fullscreen: false,
    fullscreenable: true,
    center: true,
    backgroundThrottling: false,
    show: false,
    webPreferences: {
      enableRemoteModule: true,
      worldSafeExecuteJavaScript: true,
      webSecurity: true,
      preload: path.join(__dirname, 'preload.js'),
      devTools: true,
    },
  });

  // win.loadURL('https://url.com')
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, ASSET_DIR, 'index.html'),
      protocol: 'file:',
      slashes: true,
    })
  );

  win.once('ready-to-show', () => {
    win.show();
    autoUpdater.checkForUpdatesAndNotify();
  });
};


autoUpdater.on('update-available', (e) => {
  win.webContents.send('updater_update_available', e);
});
autoUpdater.on('error', (err) => {
  win.webContents.send('updater_error', err);
})

autoUpdater.on('download-progress', (progressObj) => {
  win.webContents.send('updater_download_progress', progressObj);
})
autoUpdater.on('update-downloaded', (e) => {
  win.webContents.send('updater_update_downloaded', e);
});

ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall();
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// app compatibility

app.on('window-all-closed', () => {
  if (process.plateform !== 'darwin') {
    app.quit();
  }
});

app.on('close', function (event) {
  event.preventDefault();
  app.hide();
  return false;
});

// login, auth, launch & opts minecraft launcher

ipcMain.on('login', (event, data) => {
  const Store = require('electron-store');
  const store = new Store();

  const { Client, Authenticator } = require('minecraft-launcher-core');
  const launcher = new Client();

  const appdataPathUser = app.getPath('appData');
  store.set('minecraftOptionAppdata', appdataPathUser);

  const OSname = require('os').userInfo().username;

  const maxRamUser = store.get('minecraftOptionMaxRam');
  const minRamUser = store.get('minecraftOptionMinRam');

  const heightRes = store.get('minecraftOptionHeightRes');
  const widthRes = store.get('minecraftOptionWidthRes');
  const fullscreenRes = store.get('minecraftOptionFullscreenRes');

  const JVMUser = store.get('minecraftOptionJvm');

  Authenticator.getAuth(data.u, data.p)
    .then(() => {
      event.sender.send('done');

      const opts = {
        clientPackage: `C:/Users/${OSname}/Desktop/Dev Web/clientPackage/clientPackage.zip`,
        authorization: Authenticator.getAuth('', ''),
        root: `${appdataPathUser}/.MMLauncher/`,
        customArgs: JVMUser,
        version: {
          number: '1.8.9',
          type: 'release',
        },
        window: {
          width: widthRes,
          height: heightRes,
          fullscreen: fullscreenRes,
        },
        forge: `${appdataPathUser}/.MMLauncher/forge.jar`,
        memory: {
          max: `${maxRamUser}M`,
          min: `${minRamUser}M`,
        },
        timeout: 3500,
      };

      launcher.launch(opts).then(() => {
        win.webContents.send('game-launched');
        setTimeout(() => {
          app.quit();
        }, 7500);
      });

      launcher.on('debug', (e) => {
        win.webContents.send('log', e);
      });
      launcher.on('data', (e) => {
        win.webContents.send('log', e);
      });
      launcher.on('progress', (e) => {
        win.webContents.send('progress', e);
      });
    })
    .catch((err) => {
      event.sender.send('err', { er: err });
    });
});
