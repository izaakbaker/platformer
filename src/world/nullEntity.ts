import { Entity } from "./entity";
import uuid from "uuid";

export class NullEntity extends Entity {
    public constructor() {
        super(`NULL ENTITY ${uuid.v4()}`, [-Infinity, -Infinity]);
    }

    public getPriority(): number {
        return -Infinity;
    }

    public isHoveredOver(): boolean {
        return true;
    }

    public willRelinquishFocus(): boolean {
        return true;
    }
}