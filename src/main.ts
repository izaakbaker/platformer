import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import url from "url";
import { ScreenManager } from "./screens/screenManager";
import { World } from "./world/world";
import { WebContentsArtist } from "./rendering/webContentsArtist";
import { PhysicsSystem } from "./systems/physicsSystem";
import { RenderingSystem } from "./systems/renderingSystem";

let window: BrowserWindow | null = null;
let screenManager: ScreenManager | null = null;
let webContentsArtist: WebContentsArtist | null = null;
let world: World | null = null;
let tickIntervalId: NodeJS.Timer | null = null;
let physicsSystem: PhysicsSystem | null = null;
let renderingSystem: RenderingSystem | null = null;

app.on("ready", () => {
    window = new BrowserWindow({ height: 620, width: 600 });
    window.on("closed", () => {
        if (tickIntervalId !== null) {
            clearInterval(tickIntervalId);
        }
        window = null;
        screenManager = null;
        world = null;
        webContentsArtist = null;
        physicsSystem = null;
        renderingSystem = null;
    });

    webContentsArtist = new WebContentsArtist(window.webContents);
    screenManager = new ScreenManager(window);
    screenManager.pushScreen("newGameScreen");
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

ipcMain.on("start-world", () => {
    renderingSystem = new RenderingSystem(webContentsArtist);
    physicsSystem = new PhysicsSystem();
    world = new World(physicsSystem, renderingSystem);
    world.tick();
})