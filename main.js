const { app, BrowserWindow, Menu } = require("electron");
const url = require("url");
const path = require("path");

let win;

const isMac = process.platform === "darwin";

function createWindow() {
  win = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/index.html`),
      protocol: "file:",
      slashes: true,
    })
  );
  // Open the DevTools.
  win.webContents.openDevTools();

  win.on("closed", function () {
    win = null;
  });
}

app.on("ready", function () {
  createWindow();
  Menu.setApplicationMenu(null); // Remove o menu
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
  if (win === null) createWindow();
});

// JumpTaks (Com o botão direito na barra de tarefas do windows, é possível acessar tarefas rápidas)
app.setUserTasks([]);
