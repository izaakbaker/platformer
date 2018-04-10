import { IArtist } from "../rendering/artist";

export class Entity {
    protected position: number[];

    public constructor(initialPosition: number[]) {
        this.position = initialPosition;
    }

    public isHoveredOver(pointer: number[]): boolean {
        return false;   
    }

    public renderWith(artist: IArtist): void { }
    public renderFocusedWith(artist: IArtist): void { }
}