import { IArtist } from "./artist";
import { WebContents } from "electron";

export class WebContentsArtist implements IArtist {
    private webContents: WebContents;

    public constructor(webContents: WebContents) {
        this.webContents = webContents;
    }

    public ellipse(x: number, y: number, radius: number) {
        console.log(`Ellipse at ${x}, ${y}, with radius ${radius}`);
        this.webContents.send("ellipse", x, y, radius);
    }
}