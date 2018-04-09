import { createStore, Dispatch, Reducer, Store } from "redux";

export class EntityComponent<T> {
    private store: Store<T>;
    
    public constructor(reducer: Reducer<T>, initialState: T) {
        this.store = createStore(reducer, initialState);
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
}