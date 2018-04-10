import { EntityComponent } from "./entityComponent";

export class Entity {
    private type: string;
    private id: string;
    private components: { [key: string]: EntityComponent<any> }

    public constructor(type: string, id: string) {
        this.type = type;
        this.id = id;
        this.components = {};
    }

    public getComponent<T>(key: string): EntityComponent<T> | null {
        const component = this.components[key];
        if (component !== undefined) {
            return <EntityComponent<T>>component;
        }
        return null;
    }

    public addComponent(key: string, component: EntityComponent<any>) {
        this.components[key] = component;
        component.initializeIn(this);
    }
}