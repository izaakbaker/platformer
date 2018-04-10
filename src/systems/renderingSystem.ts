import { IArtist } from "../rendering/artist";
import { Entity } from "../entity/entity";
import { IRenderingProperties } from "../entity/renderingProperties";
import { IPhysicalProperties } from "../entity/physicalProperties";

export class RenderingSystem {
    private artist: IArtist;

    public constructor(artist: IArtist) {
        this.artist = artist;
    }

    public tick(entities: Entity[]): void {
        this.artist.fill(1.0, 1.0, 1.0);
        this.artist.rect(0, 0, 600, 600);

        entities.forEach(entity => {
            const renderingComponent = entity.getComponent<IRenderingProperties>("RenderingProperties");
            const physicalComponent = entity.getComponent<IPhysicalProperties>("PhysicalProperties");
            if (renderingComponent !== null && physicalComponent !== null) {
                const { color, radius } = renderingComponent.getState();
                const { position } = physicalComponent.getState();

                this.artist.fill(color[0], color[1], color[2]);
                this.artist.ellipse(position[0], position[1], radius);
            }
        })
    }
}