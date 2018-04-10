import { IArtist } from "./artist";

export class CanvasArtist implements IArtist {
    private context: CanvasRenderingContext2D;
    private fillColor: number[];

    public constructor(context: CanvasRenderingContext2D) {
        this.context = context;
        this.fillColor = [0, 0, 0];
    }

    public ellipse(x: number, y: number, radius: number): void {
        this.context.fillStyle = `#${this.toHexString(this.fillColor)}`
        this.context.beginPath();
        this.context.arc(x, y, radius, 0, 2 * Math.PI);
        this.context.fill();
    }

    public rect(x0: number, y0: number, w: number, h: number): void {
        this.context.fillStyle = `#${this.toHexString(this.fillColor)}`
        this.context.fillRect(x0, y0, w, h);
    }

    public fill(r: number, g: number, b: number): void {
        this.fillColor[0] = r;
        this.fillColor[1] = g;
        this.fillColor[2] = b;
    }

    private toHexString(color: number[]): string {
        return color.map(component => {
            let value = Math.floor(255 * component).toString(16);
            if (value.length < 2) {
                value = "0" + value;
            }
            return value;
        }).join("");
    }
}