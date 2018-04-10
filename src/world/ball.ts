import { Entity } from "../entity/entity";
import uuid from "uuid";
import { IPhysicalProperties, physicalPropertiesReducer } from "../entity/physicalProperties";
import { IRenderingProperties, renderingPropertiesReducer } from "../entity/renderingProperties";
import { EntityComponent } from "../entity/entityComponent";

export function createBall(position: number[], velocity: number[], radius: number, color: number[]): Entity {
    let ball: Entity = new Entity("ball", uuid.v4());
    const ballPhysicalProperties: IPhysicalProperties = {
        position,
        velocity,
        mass: 1,
        appliedForce: [0, 0],
    };
    const ballRenderingProperties: IRenderingProperties = { radius, color };
    const ballPhysicalPropertiesComponent = new EntityComponent<IPhysicalProperties>(physicalPropertiesReducer, ballPhysicalProperties);
    const ballRenderingPropertiesComponent = new EntityComponent<IRenderingProperties>(renderingPropertiesReducer, ballRenderingProperties);
    ball.addComponent("PhysicalProperties", ballPhysicalPropertiesComponent);
    ball.addComponent("RenderingProperties", ballRenderingPropertiesComponent);
    return ball;
}