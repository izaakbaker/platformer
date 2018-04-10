import { setWith, TypedAction, TypedReducer } from "redoodle";
import { IArtist } from "../rendering/artist";
import { IComponentLinker } from "./componentLinker";
import { Store } from "redux";
import { Entity } from "./entity";
import { IPhysicalProperties } from "./physicalProperties";

export interface IRenderingProperties {
    color: number[];
    radius: number;
    position: number[];
}

const DEFAULTS: IRenderingProperties = {
    color: [1, 0, 0],
    radius: 0,
    position: [0, 0],
};

export const SetColor = TypedAction.define("RenderingProperties::SetColor")<{ color: number[] }>();
export const SetRadius = TypedAction.define("RenderingProperties::SetRadius")<{ radius: number }>();
export const SetRenderingPosition = TypedAction.define("RenderingProperties::SetRenderingPosition")<{ position: number[] }>();

export const renderingPropertiesReducer = TypedReducer.builder<IRenderingProperties>()
    .withHandler(SetColor.TYPE, (state, { color }) => setWith(state, { color }))
    .withHandler(SetRadius.TYPE, (state, { radius }) => setWith(state, { radius }))
    .withDefaultHandler((state = DEFAULTS) => state)
    .build();

export const renderingLinker: IComponentLinker<IRenderingProperties> = {
    linkWith(store: Store<IRenderingProperties>, entity: Entity) {
        console.log("TRYNA LINK");
        const physicsComponent = entity.getComponent<IPhysicalProperties>("RenderingProperties");
        if (physicsComponent === null) {
            console.warn("Expected PhysicsComponent but entity did not contain one");
            return;
        }
        const physicsStore = physicsComponent.getStore();
        physicsStore.subscribe(() => {
            console.log("HI THO!");
            const { position } = physicsStore.getState();
            store.dispatch(SetRenderingPosition.create({ position }));
        })
    }
}