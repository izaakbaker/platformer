import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import url from "url";
import { ScreenManager } from "./screens/screenManager";

let window: BrowserWindow | null = null;
let screenManager: ScreenManager | null = null;

app.on("ready", () => {
    window = new BrowserWindow({ height: 620, width: 600 });
    window.on("closed", () => {
        window = null;
        screenManager = null;
    });

    screenManager = new ScreenManager(window);
    screenManager.pushScreen("newGameScreen");
});

app.on("window-all-closed", () => {
    app.quit();
});

ipcMain.on("push-screen", (event: any, screen: string) => {
    screenManager.pushScreen(screen);
});

ipcMain.on("pop-screen", () => {
    screenManager.popScreen();
})

ipcMain.on("quit", () => {
    app.quit();
});