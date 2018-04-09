import { Entity } from "../entity/entity";
import { EntityComponent } from "../entity/entityComponent";
import { IPhysicalProperties, SetPosition } from "../entity/physicalProperties";

export class PhysicsSystem {
    public tick(entities: Entity[]): void {
        entities.forEach(entity => {
            const physicsComponent = entity.getComponent<IPhysicalProperties>("PhysicalProperties");
            if (physicsComponent !== undefined) {
                const state = physicsComponent.getState();
                const dispatch = physicsComponent.getDispatch();
                const position = state.position.map((element, index) => element + state.velocity[index]);
                dispatch(SetPosition.create({ position }));
            }
        })
    }
}