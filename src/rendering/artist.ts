export interface IArtist {
    ellipse(x: number, y: number, radius: number): void;
    rect(x0: number, y0: number, w: number, h: number): void;
    setFillColor(r: number, g: number, b: number): void;
    setStrokeColor(r: number, g: number, b: number): void;
    setLineWidth(n: number): void;
    setFill(on: boolean): void;
    setStroke(on: boolean): void;
    reset(): void;
}