import { IArtist } from "../rendering/artist";
import { createBall } from "./ball";
import { PhysicsSystem } from "../systems/physicsSystem";
import { RenderingSystem } from "../systems/renderingSystem";

export class World {
    private entities: any[];
    private physicsSystem: PhysicsSystem;
    private renderingSystem: RenderingSystem;
    
    public constructor(physicsSystem: PhysicsSystem, renderingSystem: RenderingSystem) {
        this.physicsSystem = physicsSystem;
        this.renderingSystem = renderingSystem;
        this.entities = [];
        this.entities.push(createBall([300, 300], [0, 0], 50, [1, 0, 0]));
    }

    public tick() {
        this.physicsSystem.tick(this.entities);
        this.renderingSystem.tick(this.entities);
    }
}