export interface IArtist {
    ellipse(x: number, y: number, radius: number): void;
    rect(x0: number, y0: number, w: number, h: number): void;
    fill(r: number, g: number, b: number): void;
}