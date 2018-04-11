import { IArtist } from "../rendering/artist";

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

    public isHoveredOver(pointer: number[]): boolean {
        return false;   
    }

    public onFocus(): void { }
    public onLoseFocus(): void { }
    public renderWith(artist: IArtist): void { }
    public renderFocusedWith(artist: IArtist): void { }
}