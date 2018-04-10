import { CircleCollider } from "./circleCollider";

export class Collider {
    private attachmentPoint: number[];
    private worldPoint: number[];

    public constructor(attachmentPoint: number[], worldPoint: number[]) {
        this.attachmentPoint = attachmentPoint;
        this.worldPoint = worldPoint;
    }

    public overlaps(collider: Collider): number[] {
        return [];
    }

    public overlapsCircleCollider(circleCollider: CircleCollider): number[] {
        return [];
    }

    public moveTo(worldPoint: number[]) {
        this.worldPoint = worldPoint;
    }

    public getAttachmentPoint(): number[] {
        return this.attachmentPoint;
    }

    public getWorldPoint(): number[] {
        return this.worldPoint;
    }
}