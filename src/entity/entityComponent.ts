import { createStore, Dispatch, Reducer, Store } from "redux";
import { Entity } from "./entity";
import { IComponentLinker } from "./componentLinker";

export class EntityComponent<T> {
    private store: Store<T>;
    private linker?: IComponentLinker<T>;
    
    public constructor(reducer: Reducer<T>, initialState: T, linker?: IComponentLinker<T>) {
        this.store = createStore(reducer, initialState);
        this.linker = linker;
    }

    public getStore(): Store<T> {
        return this.store;
    }

    public getState(): T {
        return this.store.getState();
    }

    public getDispatch(): Dispatch<T> {
        return this.store.dispatch;
    }

    public initializeIn(entity: Entity) {
        if (this.linker !== undefined) {
            this.linker.linkWith(this.store, entity);
        }
    }
}