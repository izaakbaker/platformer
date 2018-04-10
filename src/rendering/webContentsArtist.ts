import { IArtist } from "./artist";
import { WebContents } from "electron";

export class WebContentsArtist implements IArtist {
    private webContents: WebContents;

    public constructor(webContents: WebContents) {
        this.webContents = webContents;
    }

    public ellipse(x: number, y: number, radius: number): void {
        this.webContents.send("ellipse", x, y, radius);
    }

    public rect(x0: number, y0: number, w: number, h: number): void {
        this.webContents.send("rect", x0, y0, w, h);
    }

    public fill(r: number, g: number, b: number): void {
        this.webContents.send("fill", r, g, b);
    }
}