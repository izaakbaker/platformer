import { Store } from "redux";
import { Entity } from "./entity";

export interface IComponentLinker<T> {
    linkWith(store: Store<T>, entity: Entity): void;
}