import { Entity } from "../entity/entity";
import { EntityComponent } from "../entity/entityComponent";
import { IPhysicalProperties, SetPosition, ApplyForce, SetVelocity } from "../entity/physicalProperties";
import { product, sum } from "../math/vector";

export interface IPhysicalConstants {
    gravity: number[];
}

export class PhysicsSystem {
    private constants: IPhysicalConstants;

    public constructor(constants: IPhysicalConstants) {
        this.constants = constants;
    }

    public tick(entities: Entity[]): void {
        entities.forEach(entity => {
            const physicsComponent = entity.getComponent<IPhysicalProperties>("PhysicalProperties");
            if (physicsComponent !== undefined) {
                const dispatch = physicsComponent.getDispatch();

                // apply physical forces
                const { mass } = physicsComponent.getState();
                const gravitationalForce = product(mass, this.constants.gravity)
                dispatch(ApplyForce.create({ force: gravitationalForce }));

                // compute acceleration and use it to update velocity
                const { appliedForce, velocity } = physicsComponent.getState();
                const acceleration = appliedForce.map(component => component / mass);
                const newVelocity = sum(velocity, acceleration);
                dispatch(SetVelocity.create({ velocity: newVelocity }));

                // use velocity to update position
                const { position } = physicsComponent.getState();
                console.log(position);
                const newPosition = sum(position, newVelocity);
                dispatch(SetPosition.create({ position: newPosition }));
            }
        })
    }
}