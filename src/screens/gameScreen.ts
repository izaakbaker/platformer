import { ipcRenderer } from "electron";
import { IArtist } from "../rendering/artist";
import { CanvasArtist } from "../rendering/canvasArtist";

const canvas: HTMLCanvasElement = document.getElementById("game-canvas") as HTMLCanvasElement;
const context: CanvasRenderingContext2D = canvas.getContext("2d");
const artist: CanvasArtist = new CanvasArtist(context);

ipcRenderer.on("ellipse", (event: any, x: number, y: number, radius: number) => {
    artist.ellipse(x, y, radius);
});

ipcRenderer.on("rect", (event: any, x: number, y: number, w: number, h: number) => {
    artist.rect(x, y, w, h);
});

ipcRenderer.on("fill", (event: any, r: number, g: number, b: number) => {
    artist.fill(r, g, b);
})

ipcRenderer.send("start-world");