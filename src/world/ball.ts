import { IRenderable } from "./renderable";
import { IArtist } from "../rendering/artist";

export class Ball implements IRenderable {
    private x: number;
    private y: number;
    private radius: number;

    public constructor(x: number, y: number, radius: number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    public renderWith(artist: IArtist) {
        artist.ellipse(this.x, this.y, this.radius);
    }
}