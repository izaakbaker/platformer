import { TypedAction, TypedReducer, setWith } from "redoodle";
import { Collider } from "../collider/collider";
import { IComponentLinker } from "./componentLinker";
import { Store } from "redux";
import { Entity } from "./entity";
import { IPhysicalProperties } from "./physicalProperties";

export interface ICollisionProperties {
    collider: Collider
    restitution: number;
    fixed: boolean;
}

export const SetCollider = TypedAction.define("CollisionProperties::SetCollider")<{ collider: Collider }>();
export const MoveCollider = TypedAction.define("CollisionProperties::MoveCollider")<{ newWorldPoint: number[] }>();
export const SetRestitution = TypedAction.define("CollisionProperties::SetRestitution")<{ restitution: number }>();
export const SetFixed = TypedAction.define("CollisionProperties::SetFixed")<{ fixed: boolean }>();

export const collisionPropertiesReducer = TypedReducer.builder<ICollisionProperties>()
    .withHandler(SetCollider.TYPE, (state, { collider }) => setWith(state, { collider }))
    .withHandler(SetRestitution.TYPE, (state, { restitution }) => setWith(state, { restitution }))
    .withHandler(SetFixed.TYPE, (state, { fixed }) => setWith(state, { fixed }))
    .withHandler(MoveCollider.TYPE, (state, { newWorldPoint }) => {
        const newCollider = new Collider(state.collider.getAttachmentPoint(), newWorldPoint);
        return setWith(state, { collider: newCollider });
    })
    .build();

export const collisionLinker: IComponentLinker<ICollisionProperties> = {
    linkWith(store: Store<ICollisionProperties>, entity: Entity) {
        const physicsComponent = entity.getComponent<IPhysicalProperties>("PhysicalProperties");
        if (physicsComponent === null) {
            return;
        }
        const physicsStore = physicsComponent.getStore();
        physicsStore.subscribe(() => {
            const { position } = physicsStore.getState();
            store.dispatch(MoveCollider.create({ newWorldPoint: position }));
        })
    }
}