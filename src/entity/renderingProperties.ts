import { setWith, TypedAction, TypedReducer } from "redoodle";
import { IArtist } from "../rendering/artist";

export interface IRenderingProperties {
    color: number[];
    radius: number;
}

export const SetColor = TypedAction.define("RenderingProperties::SetColor")<{ color: number[] }>();
export const SetRadius = TypedAction.define("RenderingProperties::SetRadius")<{ radius: number }>();

export const renderingPropertiesReducer = TypedReducer.builder<IRenderingProperties>()
    .withHandler(SetColor.TYPE, (state, { color }) => setWith(state, { color }))
    .withHandler(SetRadius.TYPE, (state, { radius }) => setWith(state, { radius }))
    .build();