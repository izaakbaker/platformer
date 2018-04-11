import { Particle } from "./particle";
import { difference, magnitude, normalized, product, squaredMagnitude } from "../math/vector";
import { IArtist } from "../rendering/artist";
import { Entity } from "./entity";
import uuid from "uuid";

export class PointForce extends Entity {
    private static NORMAL_RADIUS: number = 15;
    private static FOCUSED_RADIUS: number = 30;
    private static COLOR: number[] = [1, 0, 1];
    private static ATTRACTION_CONSTANT = 13;

    private attraction: number;
    private radius: number;

    public constructor(initialPosition: number[] = [0, 0], attraction: number = 0) {
        super(`POINT FORCE ${uuid.v4()}`, initialPosition);
        this.attraction = attraction;
        this.radius = PointForce.NORMAL_RADIUS;
    }

    public actOn(particle: Particle): void {
        let vectorToUs = difference(this.position, particle.getPosition());
        const invSqrtDistance: number = 1 / Math.sqrt(magnitude(vectorToUs));
        vectorToUs = normalized(vectorToUs);
        vectorToUs = product(this.attraction * PointForce.ATTRACTION_CONSTANT * invSqrtDistance, vectorToUs);
        particle.accelerate(vectorToUs);
    }

    public onFocus() {
        this.radius = PointForce.FOCUSED_RADIUS;
    }

    public onLoseFocus() {
        this.radius = PointForce.NORMAL_RADIUS;
    }

    public renderWith(artist: IArtist) {
        artist.reset();
        artist.setFillColor(PointForce.COLOR[0], PointForce.COLOR[1], PointForce.COLOR[2]);
        artist.ellipse(this.position[0], this.position[1], PointForce.NORMAL_RADIUS);
    }

    public renderFocusedWith(artist: IArtist) {
        artist.reset();
        artist.setStroke(true);
        artist.setFill(false);
        artist.setStrokeColor(0.5, 0, 0.5);
        artist.ellipse(this.position[0], this.position[1], PointForce.FOCUSED_RADIUS);
    }

    public isHoveredOver(pointer: number[]) {
        const pointerToCenter = difference(this.position, pointer);
        const distance = squaredMagnitude(pointerToCenter);
        return distance < this.radius * this.radius;
    }
}