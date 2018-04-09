import { setWith, TypedAction, TypedReducer } from "redoodle";

export interface IPhysicalProperties {
    position: number[];
    velocity: number[];
}

export const SetPosition = TypedAction.define("PhysicalProperties::SetPosition")<{ position: number[] }>();
export const SetVelocity = TypedAction.define("PhysicalProperties::SetVelocity")<{ velocity: number[] }>();

export const physicalPropertiesReducer = TypedReducer.builder<IPhysicalProperties>()
    .withHandler(SetPosition.TYPE, (state, { position }) => setWith(state, { position }))
    .withHandler(SetVelocity.TYPE, (state, { velocity }) => setWith(state, { velocity }))
    .build();