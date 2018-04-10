import { ipcRenderer } from "electron";
import { IArtist } from "../rendering/artist";
import { CanvasArtist } from "../rendering/canvasArtist";

const canvas: HTMLCanvasElement = document.getElementById("game-canvas") as HTMLCanvasElement;
const context: CanvasRenderingContext2D = canvas.getContext("2d");

const artist: IArtist = new CanvasArtist(context);

artist.fill(1, 0, 0);
artist.ellipse(300, 300, 50);