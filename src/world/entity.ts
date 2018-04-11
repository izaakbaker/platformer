import { IArtist } from "../rendering/artist";

export type EntityType = "PARTICLE" | "POINT_FORCE";
export class Entity {
    private id: string;
    protected position: number[];

    public constructor(id: string, initialPosition: number[]) {
        this.id = id;
        this.position = initialPosition;
    }

    public getId() {
        return this.id;
    }

    public isHoveredOver(pointer: number[]): boolean { return false; }
    public getPriority(): number { return -1; }
    public onFocus(): void { }
    public onClick(event: MouseEvent): void { }
    public onMouseUp(event: MouseEvent): void { }
    public onDrag(event: MouseEvent): void { }
    public onLoseFocus(): void { }
    public willRelinquishFocus(): boolean { return true; }
    public renderWith(artist: IArtist): void { }
    public renderFocusedWith(artist: IArtist): void { }
}