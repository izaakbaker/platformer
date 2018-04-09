import { BrowserWindow } from "electron";
import path from "path";
import url from "url";

export class ScreenManager {
    private window: BrowserWindow;
    private screenStack: string[];

    public constructor(window: BrowserWindow) {
        this.window = window;
        this.screenStack = [];
    }

    public pushScreen(screen: string) {
        this.screenStack.push(screen);
        this.loadScreen(screen);
    }

    public popScreen() {
        this.screenStack.pop();
        const currentTopScreen: string = this.screenStack[this.screenStack.length - 1];
        this.loadScreen(currentTopScreen);
    }

    private loadScreen(screen: string) {
        this.window.loadURL(url.format({
            pathname: path.join(__dirname, `${screen}.html`),
            protocol: "file:",
            slashes: true,
        }));
    }
}