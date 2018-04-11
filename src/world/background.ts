import { Entity, EntityType } from "./entity";
import uuid from "uuid";
import { World } from "./world";
import { Particle } from "./particle";
import { PointForce } from "./pointForce";

export class Background extends Entity {
    private generateType: EntityType;
    private world: World;

    public constructor(world: World) {
        super(`BACKGROUND ${uuid.v4()}`, [0, 0]);
        this.world = world;
        this.generateType = "PARTICLE";
    }

    public getPriority(): number {
        return 10;
    }

    public isHoveredOver(pointer: number[]): boolean {
        return true;
    }

    public onClick(event: MouseEvent) {
        const pointer = [event.offsetX, event.offsetY];
        switch (this.generateType) {
            case "PARTICLE":
                const newParticle: Particle = new Particle(pointer);
                this.world.addParticle(newParticle);
                break;
            case "POINT_FORCE":
                const newPointForce: PointForce = new PointForce(pointer, 0.5);
                this.world.addPointForce(newPointForce);
                break;
        }
    }

    public setGenerateType(type: EntityType) {
        this.generateType = type;
    }
}