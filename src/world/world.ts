import { IRenderable, isRenderable } from "./renderable";
import { IArtist } from "../rendering/artist";
import { Ball } from "./ball";

export class World implements IRenderable {
    private entities: any[];
    
    public constructor() {
        this.entities = [];
        this.entities.push(new Ball(300, 300, 50));
    }

    public renderWith(artist: IArtist): void {
        this.entities.forEach((entity: any) => {
            if (isRenderable(entity)) {
                entity.renderWith(artist);
            }
        });
    }
}