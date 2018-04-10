import { setWith, TypedAction, TypedReducer } from "redoodle";

export interface IPhysicalProperties {
    position: number[];
    velocity: number[];
    appliedForce: number[];
    mass: number;
}

export const SetPosition = TypedAction.define("PhysicalProperties::SetPosition")<{ position: number[] }>();
export const SetVelocity = TypedAction.define("PhysicalProperties::SetVelocity")<{ velocity: number[] }>();
export const ApplyForce = TypedAction.define("PhysicalProperties::ApplyForce")<{ force: number[] }>();
export const SetMass = TypedAction.define("PhysicalProperties::SetMass")<{ mass: number }>();

export const physicalPropertiesReducer = TypedReducer.builder<IPhysicalProperties>()
    .withHandler(SetPosition.TYPE, (state, { position }) => setWith(state, { position }))
    .withHandler(SetVelocity.TYPE, (state, { velocity }) => setWith(state, { velocity }))
    .withHandler(SetMass.TYPE, (state, { mass }) => setWith(state, { mass }))
    .withHandler(ApplyForce.TYPE, (state, { force }) => {
        const appliedForce = state.appliedForce.map((component, index) => component + force[index]);
        return setWith(state, { appliedForce });
    })
    .build();