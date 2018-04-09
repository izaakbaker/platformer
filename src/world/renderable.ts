import { IArtist } from "../rendering/artist";

export interface IRenderable {
    renderWith(artist: IArtist): void;
}

export function isRenderable(entity: IRenderable | any): entity is IRenderable {
    return (<IRenderable>entity).renderWith !== undefined;
}