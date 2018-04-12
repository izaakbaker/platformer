import { IArtist } from "./artist";

export class CanvasArtist implements IArtist {
    private context: CanvasRenderingContext2D;
    private fillColor: number[];
    private strokeColor: number[];
    private shouldFill: boolean;
    private shouldStroke: boolean;
    private currentLineWidth: number;

    public constructor(context: CanvasRenderingContext2D) {
        this.context = context;
        this.reset();
    }

    public reset() {        
        this.fillColor = [0, 0, 0];
        this.strokeColor = [0, 0, 0];
        this.shouldFill = true;
        this.shouldStroke = false;
        this.currentLineWidth = 1;
    }

    public ellipse(x: number, y: number, radius: number): void {
        this.context.beginPath();
        this.context.arc(x, y, radius, 0, 2 * Math.PI);
        this.fillOrStrokePath();
    }

    public pieSlice(x: number, y: number, radius: number, a0: number, a1: number): void {
        const angle0 = a0 - (Math.PI / 2);
        const angle1 = a1 - (Math.PI / 2);
        this.context.beginPath();
        this.context.arc(x, y, radius, Math.min(angle0, angle1), Math.max(angle0, angle1));
        this.fillOrStrokePath();

        const effectiveRadius = radius * 1.02;
        const a0Point = [x + effectiveRadius * Math.cos(angle0), y + effectiveRadius * Math.sin(angle0)];
        const a1Point = [x + effectiveRadius * Math.cos(angle1), y + effectiveRadius * Math.sin(angle1)];

        this.context.beginPath();
        this.context.moveTo(x, y);
        this.context.lineTo(a0Point[0], a0Point[1]);
        this.context.lineTo(a1Point[0], a1Point[1]);
        this.context.lineTo(x, y);
        this.fillOrStrokePath();
    }

    public rect(x0: number, y0: number, w: number, h: number): void {
        if (this.shouldFill) {
            this.context.fillStyle = `#${this.toHexString(this.fillColor)}`
            this.context.fillRect(x0, y0, w, h);
        }
        if (this.shouldStroke) {
            this.context.strokeStyle = `#${this.toHexString(this.strokeColor)}`;
            this.context.lineWidth = this.currentLineWidth;
            this.context.strokeRect(x0, y0, w, h);
        }
    }

    public setFillColor(r: number, g: number, b: number): void {
        this.fillColor[0] = r;
        this.fillColor[1] = g;
        this.fillColor[2] = b;
    }

    public setFill(on: boolean): void {
        this.shouldFill = on;
    }

    public setStrokeColor(r: number, g: number, b: number): void {
        this.strokeColor[0] = r;
        this.strokeColor[1] = g;
        this.strokeColor[2] = b;
    }

    public setStroke(on: boolean): void {
        this.shouldStroke = on;
    }

    public setLineWidth(width: number): void {
        this.currentLineWidth = width;
    }

    private fillOrStrokePath(): void {
        if (this.shouldFill) {
            this.context.fillStyle = `#${this.toHexString(this.fillColor)}`;
            this.context.fill();
        }
        if (this.shouldStroke) {
            this.context.strokeStyle = `#${this.toHexString(this.strokeColor)}`;
            this.context.lineWidth = this.currentLineWidth;
            this.context.stroke();
        }
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