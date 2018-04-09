import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import url from "url";
import { ScreenManager } from "./screenManager";

let window = null;
let screenManager: ScreenManager = null;

app.on("ready", () => {
    window = new BrowserWindow({ height: 600, width: 600 });
    window.on("closed", () => {
        window = null;
        screenManager = null;
    });

    screenManager = new ScreenManager(window);
    screenManager.pushScreen("newGame");
});

app.on("window-all-closed", () => {
    app.quit();
});

ipcMain.on("push-screen", (event: any, ...args: any[]) => {
    const screen: string = args[0];
    screenManager.pushScreen(screen);
});

ipcMain.on("pop-screen", () => {
    screenManager.popScreen();
})

ipcMain.on("quit", () => {
    app.quit();
});