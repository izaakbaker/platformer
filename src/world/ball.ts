import { Entity } from "../entity/entity";
import uuid from "uuid";
import { ICollisionProperties, collisionPropertiesReducer, collisionLinker } from "../entity/collisionProperties";
import { IPhysicalProperties, physicalPropertiesReducer } from "../entity/physicalProperties";
import { IRenderingProperties, renderingPropertiesReducer, renderingLinker } from "../entity/renderingProperties";
import { EntityComponent } from "../entity/entityComponent";
import { CircleCollider } from "../collider/circleCollider";

export function createBall(position: number[], velocity: number[], radius: number, color: number[]): Entity {
    let ball: Entity = new Entity("ball", uuid.v4());

    const physPropsComponent = new EntityComponent<IPhysicalProperties>(physicalPropertiesReducer, {
        position,
        velocity,
        mass: 1,
        appliedForce: [0, 0],
    });

    const renderPropsComponent = new EntityComponent<IRenderingProperties>(renderingPropertiesReducer, {
        radius,
        color,
        position,
    }, renderingLinker);

    const collPropsComponent = new EntityComponent<ICollisionProperties>(collisionPropertiesReducer, {
        collider: new CircleCollider(radius, [0, 0], position),
        restitution: 1.0,
        fixed: false,
    }, collisionLinker);

    ball.addComponent("PhysicalProperties", physPropsComponent);
    ball.addComponent("RenderingProperties", renderPropsComponent);
    ball.addComponent("CollisionProperties", collPropsComponent);

    return ball;
}