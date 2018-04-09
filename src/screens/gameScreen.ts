import { ipcRenderer } from "electron";

const canvas: HTMLCanvasElement = document.getElementById("game-canvas") as HTMLCanvasElement;
const context: CanvasRenderingContext2D = canvas.getContext("2d");

ipcRenderer.on("ellipse", (event: any, x: number, y: number, radius: number) => {
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.stroke();
});

ipcRenderer.send("start-world");