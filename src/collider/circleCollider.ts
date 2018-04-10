import { Collider } from "./collider";
import { difference, negative, squaredMagnitude, withMagnitude } from "../math/vector";

export class CircleCollider extends Collider {
    private radius: number;

    public constructor(radius: number, attachmentPoint: number[], worldPoint: number[]) {
        super(attachmentPoint, worldPoint);
        this.radius = radius;
    }

    public getRadius(): number {
        return this.radius;
    }

    public overlaps(collider: Collider): number[] {
        return negative(collider.overlapsCircleCollider(this));
    }

    public overlapsCircleCollider(circleCollider: CircleCollider): number[] {
        const theirCenter = difference(circleCollider.getWorldPoint(), circleCollider.getAttachmentPoint());
        const theirRadius = circleCollider.radius;
        const ourCenter = difference(this.getWorldPoint(), this.getAttachmentPoint());
        const ourRadius = this.radius;

        const squaredSumOfRadii = (theirRadius + ourRadius) * (theirRadius + ourRadius);
        const towardsOurCenter = difference(ourCenter, theirCenter);
        const actualSquaredDistance = squaredMagnitude(towardsOurCenter);
        const deviation = squaredSumOfRadii - actualSquaredDistance;
        if (deviation > 0) {
            return withMagnitude(towardsOurCenter, deviation);
        }
        return [];
    }
}